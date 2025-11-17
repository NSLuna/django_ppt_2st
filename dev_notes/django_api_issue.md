# Django API 구축 중 발생한 문제 & 해결과정 기록(25.11.18)

## 1. 문제 개요
Django Rest API 개발 도중 /api/about/, /api/projects/ 엔드포인트 접속시 
404 Not Found / Model class doesn't declare an explicit app_label 등 여러 오류가 터짐

프로젝트 구조는 수차례 확인했을때 정상적으로 보였으나 Django가 portfolio 앱을 INSATALLD_APP에서 인식하지 못하는 문제가 반복적으로 나타남

## 2. 원인 분석 (실제원인)

### 1) Anaconda(콘다 아오 EC..)가 자동으로 환경을 탈취함

- VSCode에서 python 인터프리터에 어떤것을 선택해도 Django 서버를 실행할 때마다 콘다 Python(3.12)로 실행
- 그 결과 Django가 실제 설치된 곳이 아닌 Anaconda환경을 계속적으로 참조함
- portfolio앱이 INSTALLED_APPS에 있어도, Django는 다른 Python 환경을 참조하며 없다 라고 판단

### 2) DB 테이블이 생성되지 않은 상태로 API 호출 -> OperationalError
- 가상환경이 바뀌면서 sqlite3 파일 경로가 달라졌고, 이전 환경에서 만든 테이블이 없어 새로운 환경에서 오류 발생


## 3. 해결 과정 (타임라인)

### 1) 파이썬 버전/환경꼬임 발견
- where python -> 파이썬이 여러개 설치된 상태였음 (아마 여러 수업을 집에서 실습하는 과정중에 생긴 문제라 판단)
- python manage.py runserver 실행시 Anaconda Python(그노무 아나콘다)이 실행됨

-------------------------------------------------------------------------------

### 2) 프로젝트 전용 가상환경(venv) 생성
```python -m venv venv
venv/Scripts/activate
```
---------------------------------------------------

### 3) venv안에 Django 설치
```
pip install django djangorestframework
```

### 4) VSCode에서 Python Interpreter를 venv로 강제 변경

### 5) 콘다 환경이 다시 점유하지 않도록 cmd에서 직접 실행

```
python manage.py makemigrations
python manage.py migrate
```

### 6) 계속해서 콘다환경이 개입되어 
conda deactivate를 두번 (class1과 Base) 명령어로 입력하여 콘다를 deactivate 시킨 후 
python manage.py runserver로 로컬 서버를 구동
DB가 정상적으로 생성되었고 API 호출 성공

## 4. 최종 결과
/api/about/ -> 정상출력
/api/projects/ -> 정상출력

Django REST Framework 브라우징 API 페이지에도 정상 렌더링 확인

5. 이번 이슈로 배운점 

1) Django 프로젝트는 반드시 conda를 deactivate 시키거나 가상환경을 사용해야한다

2) VSCode 인터프리터 선택만 믿으면 안됨 -> 실제로 콘다 환경이 구동중일 가능성이 있음

3) 환경이 꼬이면 Django 가 INSTALLED_APPS를 제대로 못읽을수 있다...

4) 개발 환경 설정 문제 = 증상은 진짜 다양하고 복잡하게 나타난다.. (404, runtime error, operational error.. etc..)

5) 기본 개발 환경이 모든 개발의 기본 핵심이다 ..!

6. 다음에 해야할것

- About, Project OPM 데이터 넣기
- API 구조확장
- React(or Next JS)프론트 엔드와 연결
- 모달로 예쁘게 출력하는 UI 설계..? 
- ... etc.. 