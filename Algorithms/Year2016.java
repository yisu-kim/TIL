
// 2016년
// https://programmers.co.kr/learn/courses/30/lessons/12901

import java.util.Scanner;
import java.util.Calendar;
import java.util.Locale;

class Year2016 {
  public static String solution(int a, int b) {
    Calendar cal = Calendar.getInstance();
    cal.set(2016, a - 1, b);
    String dayOfWeek = cal.getDisplayName(Calendar.DAY_OF_WEEK, Calendar.SHORT, Locale.US);
    String answer = dayOfWeek.toUpperCase();
    return answer;
  }

  private static final Scanner scanner = new Scanner(System.in);

  public static void main(String[] args) {
    int m = scanner.nextInt();
    int d = scanner.nextInt();

    String answer = solution(m, d);
    System.out.println(answer);

    scanner.close();
  }
}