import java.util.Scanner;

// 가운데 글자 가져오기
// https://programmers.co.kr/learn/courses/30/lessons/12903

class GetMiddleString {
    public static String solution(String s) {
        int index = s.length() / 2;
        String answer = "";
        if (s.length() % 2 == 0) {
            answer = s.substring(index - 1, index + 1);
        } else {
            answer = Character.toString(s.charAt(index));
        }
        return answer;
    }

    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        String s = scanner.next();
        
        String answer = solution(s);
        System.out.println(answer);
        
        scanner.close();
    }
}