# Jupyter notebook

> Anaconda 3 설치



1. 접속 테스트

   ```shell
   # local
   jupyter notebook
   
   # external
   jupyter notebook --ip 0.0.0.0 --port 8888
   
   Copy/paste this URL into your browser when you connect for the first time,
       to login with a token:
           http://Server01:8888/?token=첫번째토큰&token=두번째토큰
   ```

   http://server01:8888로 접속하여 위의 두 번재 token을 비밀번호로 입력하여 접속한다.

2. 환경 설정

   - 암호 및 hash 키 생성

     ```shell
     ipython
     ```

     ```python
     # ipython
     from IPython.lib import passwd
     passwd()
     '해시키'
     ```

   - config 파일 생성

     ```shell
     jupyter notebook --generate-config
     ```

     홈에 .jupyter/ 가 생성된 것을 확인할 수 있다.

   - .jupyter/jupyter_notebook_config.py

     ```shell
     c.NotebookApp.notebook_dir='/home/hadoop/jupyter'
     
     c.NotebookApp.ip = '0.0.0.0'
     c.NotebookApp.open_browser = False
     c.NotebookApp.port = 8888
     c.NotebookApp.password = '해시키'
     ```

     차례대로 주피터 노트북의 시작(root) 디렉터리, ip 주소, 브라우저 오픈 여부, 포트 번호, 비밀번호 설정 항목이다.ㅇ

3. 주피터 노트북 실행

   환경 설정이 끝났으므로 http://server01:8888로 접속하면 비밀번호 입력 없이 바로 접속할 수 있다.