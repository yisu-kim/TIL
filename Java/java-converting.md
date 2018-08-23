# Converting

## convert int to string

**String.valueOf(int i)** vs. **Integer.toString(int i)**

String.valueOf() 메서드는 들어온 파라미터에 따라 해당 데이터 타입의 toString() 메서드를 호출한다.

toString() 메서드를 바로 사용하는 것보다 호출이 한 번 더 일어나지만 코드에 일관성이 있다는 장점이 있다.

예를 들어, double 타입으로 바꿔야 할 때 valueOf() 메서드를 사용하면 `String.valueOf(double d)`라고 바꾸면 되지만 toString() 메서드를 사용하면 `Double.toString(double d)`라고 바꿔야 하므로 변경점이 늘어난다.
