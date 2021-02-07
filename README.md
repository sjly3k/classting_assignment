# 클래스팅 과제 : 투표 시스템 만들기

이 프로젝트는 클래스팅 과제입니다.
![](/images/classting-assignment.png)

## 기술 스택

이 프로젝트에 사용된 기술은 다음과 같습니다.
- Language : JavaScript
- Library : [React](https://github.com/facebook/react/), [Redux](https://github.com/reduxjs/redux), [Toast](https://github.com/fkhadra/react-toastify)
- Styling : [styled-components](https://github.com/styled-components/styled-components)
- Database : [Firebase](https://github.com/firebase/)
- Project Setup : [Create React App](https://github.com/facebook/create-react-app)
- Production : [Vercel](https://github.com/vercel/vercel)

## 프로젝트 시연
- Production : https://classting-assignment.vercel.app/
- Development 
	1. 원하는 디렉토리에 진입하여 Commend 창에 `https://github.com/sjly3k/classting_assignment.git` 입력
	2. 프로젝트 디렉토리로 진입하여 `yarn start` 명령어 실행 후 [http://localhost:3000](http://localhost:3000) 접속

## 요구사항
1. 사용자는 투표를 생성할 수 있어야 한다. (ok)
2. 투표 생성자는 제목을 입력할 수 있어야 한다. (ok)
3. 투표를 생성하면 항목이 기본으로 3개가 생성되어야 한다. (ok) -> 항목이 기본으로 3개가 생성되며, `Add Option` 버튼을 누르면 새로운 항목이 추가될 수 있도록 하였습니다.
4. 투표 생성자는 투표 항목의 이름을 변경할 수 있다. (ok)
5. 투표 생성자는 투표를 저장할 수 있어야 한다. (ok) -> LocalStorage에 저장하였음.
6. 투표 생성자는 투표를 삭제할 수 있어야 한다. (ok)
7. 사용자는 만들어진 투표 리스트를 볼 수 있어야 한다. (ok)
8. 사용자는 투표 리스트에서 제목, 생성자, 기간, 진행 중 여부를 확인 할 수 있어야 한다. (ok)
9. 사용자는 투표 리스트에서 특정 투표를 클릭시 투표내용 상세보기를 할 수 있다. (ok) -> Modal을 활용해 투표 제목, 투표에 대한 상세 내용, 투표 옵션에 대한 투표자 명단을 표시합니다.
10. 사용자는 투표 리스트에서 진행중인 투표에 투표 할 수 있다. (ok) -> 투표 종료, 예정된 투표가 아니라면, 1회 투표할 수 있도록 하였습니다.
11. 사용자는 투표 결과를 텍스트로 확인할 수 있어야 한다. (ok) -> 투표 리스트에서 투표 수를 확인할 수 있습니다. 
12. 투표 생성자는 투표 기간을 설정할 수 있다(시작, 종료). (ok) -> 시작 날짜와 종료 날짜를 달력을 활용해 설정할 수 있도록 하였습니다. (YYYY-MM-DD 형식)
13. 사용자는 종료시간이 지난 투표는 결과보기만 할 수 있다. (ok) -> 종료된 투표에 대해선 투표할 수 없으며, 투표 옵션 수정 및 투표 삭제를 진행할 수 없도록 하였습니다.
	
- 위의 요구사항을 전부 만족하는 과제를 진행하였습니다.
- 일부 액션이 일어날 때마다 Toast Notification을 이용해 알림을 주었습니다.
	- 새로운 투표 생성시
	- 투표 옵션 변경 시
	- 투표 삭제 시 
	- 로그인, 로그아웃, 회원가입 시
	- 투표 저장 시 (저장 취소 시)
	- 예정된, 종료된 투표를 누를 시
	- 이미 참여한 투표에 다시 참여할 시

- Unit Test를 대체하여, 다양한 투표를 DB에 저장하며 테스팅을 진행하였습니다.
	- 예정된 투표 만들기
	- 종료된 투표 만들기
	- 시작 시간보다 종료 시간이 늦은 경우 오류 발생
	- 옵션 개수 변경 시 잘 반영되는가
	- 로그인 / 회원가입을 의도적으로 실패하며 오류 검토
	- 등등..
