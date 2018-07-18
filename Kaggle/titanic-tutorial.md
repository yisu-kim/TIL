# Kaggle python tutorial on machine learning

## Get the Data with Pandas

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



## Understanding your data

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



## Rose vs Jack, or Female vs Male

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



## Does age play a role?

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



## First Prediction

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





## Ref.

[DataCamp - Kaggle Python Tutorial on Machine Learning](https://www.datacamp.com/community/open-courses/kaggle-python-tutorial-on-machine-learning)