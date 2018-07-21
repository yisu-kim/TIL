# Kaggle python tutorial on machine learning

## 01 Getting Started with Python

### Get the Data with Pandas

```python
# Import the Pandas library
import pandas as pd

# Load the train and test datasets to create two DataFrames
train_url = "http://s3.amazonaws.com/assets.datacamp.com/course/Kaggle/train.csv"
train = pd.read_csv(train_url)
test_url = "http://s3.amazonaws.com/assets.datacamp.com/course/Kaggle/test.csv"
test = pd.read_csv(test_url)

#Print the `head` of the train and test dataframes
print(train.head())
print(test.head())
```



### Understanding your data

```python
# shape of train data set
In [1]: train.shape
Out[1]: (891, 12)  # 891 observations and 12 variables

# describe train data set
In [2]: train.describe()
Out[2]: 
       PassengerId    Survived      Pclass         Age       SibSp  \
count   891.000000  891.000000  891.000000  714.000000  891.000000   
mean    446.000000    0.383838    2.308642   29.699118    0.523008   
std     257.353842    0.486592    0.836071   14.526497    1.102743   
min       1.000000    0.000000    1.000000    0.420000    0.000000   
25%     223.500000    0.000000    2.000000   20.125000    0.000000   
50%     446.000000    0.000000    3.000000   28.000000    0.000000   
75%     668.500000    1.000000    3.000000   38.000000    1.000000   
max     891.000000    1.000000    3.000000   80.000000    8.000000   

            Parch        Fare  
count  891.000000  891.000000  
mean     0.381594   32.204208  
std      0.806057   49.693429  
min      0.000000    0.000000  
25%      0.000000    7.910400  
50%      0.000000   14.454200  
75%      0.000000   31.000000  
max      6.000000  512.329200

# shape of test data set
In [3]: test.shape
Out[3]: (418, 11)  # 418 observations and 11 variables
    
# describe test data set
In [4]: test.describe()
Out[4]: 
       PassengerId      Pclass         Age       SibSp       Parch        Fare
count   418.000000  418.000000  332.000000  418.000000  418.000000  417.000000
mean   1100.500000    2.265550   30.272590    0.447368    0.392344   35.627188
std     120.810458    0.841838   14.181209    0.896760    0.981429   55.907576
min     892.000000    1.000000    0.170000    0.000000    0.000000    0.000000
25%     996.250000    1.000000   21.000000    0.000000    0.000000    7.895800
50%    1100.500000    3.000000   27.000000    0.000000    0.000000   14.454200
75%    1204.750000    3.000000   39.000000    1.000000    0.000000   31.500000
max    1309.000000    3.000000   76.000000    8.000000    9.000000  512.329200
```



### Rose vs Jack, or Female vs Male

```python
# Passengers that survived vs passengers that passed away
In [1]: train["Survived"].value_counts()
Out[1]: 
0    549
1    342
Name: Survived, dtype: int64
        
# As proportions
In [2]: train["Survived"].value_counts(normalize = True)
Out[2]: 
0    0.616162
1    0.383838
Name: Survived, dtype: float64
        
# Males that survived vs males that passed away
In [3]: train["Survived"][train["Sex"] == 'male'].value_counts()
Out[3]:
0    468
1    109
Name: Survived, dtype: int64
        
# Females that survived vs Females that passed away
In [4]: train["Survived"][train["Sex"] == 'female'].value_counts()
Out[4]: 
1    233
0     81
Name: Survived, dtype: int64
        
# Normalized male survival
In [5]: train["Survived"][train["Sex"] == 'male'].value_counts(normalize = True)
Out[5]: 
0    0.811092
1    0.188908
Name: Survived, dtype: float64
        
# Normalized female survival
In [6]: train["Survived"][train["Sex"] == 'female'].value_counts(normalize = True)
Out[6]: 
1    0.742038
0    0.257962
Name: Survived, dtype: float64
```



### Does age play a role?

```python
# Create the column Child and assign to 'NaN'
train["Child"] = float('NaN')

# Assign 1 to passengers under 18, 0 to those 18 or older. Print the new column.
train["Child"][train["Age"] < 18] = 1
train["Child"][train["Age"] >= 18] = 0
print(train["Child"])
# Out:
0      0.0
1      0.0
2      0.0
3      0.0
4      0.0
      ...
886    0.0
887    0.0
888    NaN
889    0.0
890    0.0

# Print normalized Survival Rates for passengers under 18
print(train["Survived"][train["Child"] == 1].value_counts(normalize = True))
# Out:
1    0.539823
0    0.460177

# Print normalized Survival Rates for passengers 18 or older
print(train["Survived"][train["Child"] == 0].value_counts(normalize = True))
# Out:
0    0.618968
1    0.381032
```



### First Prediction

```python
# Create a copy of test: test_one
test_one = test

# Initialize a Survived column to 0
test_one["Survived"] = 0

# Set Survived to 1 if Sex equals "female" and print the `Survived` column from `test_one`
test_one["Survived"][test_one["Sex"] == 'female'] = 1
print(test_one["Survived"])
# Out:
    0      0
    1      1
    2      0
    3      0
    4      1
          ..
    413    0
    414    1
    415    0
    416    0
    417    0
```



## 02 Predicting with Decision Trees

### Intro to decision trees

```python
# Import the Numpy library
import numpy as np

# Import 'tree' from scikit-learn library
from sklearn import tree
```



### Cleaning and Formatting your Data

```python
# Convert the male and female groups to integer form
train["Sex"][train["Sex"] == "male"] = 0
train["Sex"][train["Sex"] == "female"] = 1

# Impute the Embarked variable
train["Embarked"] = train["Embarked"].fillna("S")

# Convert the Embarked classes to integer form
train["Embarked"][train["Embarked"] == "S"] = 0
train["Embarked"][train["Embarked"] == "C"] = 1
train["Embarked"][train["Embarked"] == "Q"] = 2

# Print the Sex and Embarked columns
print(train["Sex"])
print(train["Embarked"])
```



### Creating your first decision tree

```python
# Print the train data to see the available features
print(train)

# Create the target and features numpy arrays: target, features_one
target = train["Survived"].values
features_one = train[["Pclass", "Sex", "Age", "Fare"]].values

# Fit your first decision tree: my_tree_one
my_tree_one = tree.DecisionTreeClassifier()
my_tree_one = my_tree_one.fit(features_one, target)

# Look at the importance and score of the included features
print(my_tree_one.feature_importances_)
print(my_tree_one.score(features_one, target))
#
[0.1269655 , 0.31274009, 0.23147703, 0.32881738]
0.9775533108866442
```



### Predict and submit to Kaggle

```python
# Impute the missing value with the median
test.Fare[152] = test["Fare"].median()

# Extract the features from the test set: Pclass, Sex, Age, and Fare.
test_features = test[["Pclass", "Sex", "Age", "Fare"]].values

# Make your prediction using the test set
my_prediction = my_tree_one.predict(test_features)

# Create a data frame with two columns: PassengerId & Survived. Survived contains your predictions
PassengerId =np.array(test["PassengerId"]).astype(int)
my_solution = pd.DataFrame(my_prediction, PassengerId, columns = ["Survived"])
print(my_solution)
#
      Survived
892          0
893          0
894          1
895          1
896          1
...        ...
1305         0
1306         1
1307         0
1308         0
1309         0

# Check that your data frame has 418 entries
print(my_solution.shape)
#
(418, 1)

# Write your solution to a csv file with the name my_solution.csv
my_solution.to_csv("my_solution_one.csv", index_label = ["PassengerId"])
```



### Overfitting and how to control it

```python
# Create a new array with the added features: features_two
features_two = train[["Pclass","Age","Sex","Fare", "SibSp", "Parch", "Embarked"]].values

# Control overfitting by setting "max_depth" to 10 and "min_samples_split" to 5 : my_tree_two
max_depth = 10
min_samples_split = 5
my_tree_two = tree.DecisionTreeClassifier(max_depth = max_depth, min_samples_split = min_samples_split, random_state = 1)
my_tree_two = my_tree_two.fit(features_two, target)

# Look at the importance of the included features
print(my_tree_two.feature_importances_)
#
[0.14130255 0.17906027 0.41616727 0.17938711 0.05039699 0.01923751 0.0144483 ]

#Print the score of the new decison tree
print(my_tree_two.score(features_two, target))
#
0.9057239057239057
```



### Feature-engineering for our Titanic data set

```python
# Create train_two with the newly defined feature
train_two = train.copy()
train_two["family_size"] = train_two["SibSp"] + train_two["Parch"] + 1

# Create a new feature set and add the new feature
features_three = train_two[["Pclass", "Sex", "Age", "Fare", "SibSp", "Parch", "family_size"]].values

# Define the tree classifier, then fit the model
my_tree_three = tree.DecisionTreeClassifier()
my_tree_three = my_tree_three.fit(features_three, target)

# Print the score of this decision tree
print(my_tree_three.score(features_three, target))
#
0.9797979797979798
```



## 03 Improving your predictions through Random Forests

### A Random Forest analysis in Python

```python
# Import the `RandomForestClassifier`
from sklearn.ensemble import RandomForestClassifier

# We want the Pclass, Age, Sex, Fare,SibSp, Parch, and Embarked variables
features_forest = train[["Pclass", "Age", "Sex", "Fare", "SibSp", "Parch", "Embarked"]].values

# Building and fitting my_forest
forest = RandomForestClassifier(max_depth = 10, min_samples_split=2, n_estimators = 100, random_state = 1)
my_forest = forest.fit(features_forest, target)

# Print the score of the fitted random forest
print(my_forest.score(features_forest, target))
#
0.9393939393939394

# Compute predictions on our test set features then print the length of the prediction vector
test_features = test[["Pclass", "Age", "Sex", "Fare", "SibSp", "Parch", "Embarked"]].values
pred_forest = my_forest.predict(test_features)
print(len(pred_forest))
#
418
```



### Interpreting and Comparing

```python
#Request and print the `.feature_importances_` attribute
print(my_tree_two.feature_importances_)
print(my_forest.feature_importances_)
#
[0.14130255 0.17906027 0.41616727 0.17938711 0.05039699 0.01923751 0.0144483 ]
[0.10384741 0.20139027 0.31989322 0.24602858 0.05272693 0.04159232 0.03452128]

#Compute and print the mean accuracy score for both models
print(my_tree_two.score(features_two, target))
print(my_forest.score(features_forest, target))
#
0.9057239057239057
0.9393939393939394
```



### Conclude and Submit

> The most important feature was "Sex", but it was more significant for "my_tree_two"





## Kaggle Submissions

| Submission        | Public Score |
| ----------------- | ------------ |
| my_solution       | 0.76555      |
| my_solution_one   | 0.56937      |
| my_solution_two   | 0.69377      |
| my_solution_three | 0.75598      |
| my_solution_four  | 0.77990      |





## Ref.

- [DataCamp - Kaggle Python Tutorial on Machine Learning](https://www.datacamp.com/community/open-courses/kaggle-python-tutorial-on-machine-learning)
- [Kaggle - Titanic: Machine Learning from Disaster](https://www.kaggle.com/c/titanic) 