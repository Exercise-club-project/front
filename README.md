# 동아리 출석 관리 시스템

QR 코드 기반 동아리 모임 출석 체크 및 활동 관리 애플리케이션

---

## 목차
- [프로젝트 소개](#프로젝트-소개)
- [주요 기능](#주요-기능)
- [시연 영상](#시연-영상)
- [시스템 구조](#시스템-구조)
- [기술 스택](#기술-스택)
- [설치 및 실행](#설치-및-실행)
- [프로젝트 구조](#프로젝트-구조)
- [API 명세](#api-명세)
- [개발 팀](#개발-팀)

---

## 프로젝트 소개

대학 동아리의 모임 관리와 출석 체크를 효율적으로 처리하기 위한 React Native 기반 모바일 애플리케이션입니다.

### 개발 배경
- 동아리 모임 출석 체크의 번거로움
- 활동 내역 관리의 어려움
- 회원들의 참여도 평가 필요성

### 주요 특징
- QR 코드를 이용한 간편한 출석 체크
- 모임 유형별 차등 점수 시스템
- 실시간 랭킹 시스템
- 운영진/일반 회원 권한 분리

<!-- 메인 화면 이미지 -->
<!-- ![메인화면](docs/images/main-screen.png) -->

---

## 주요 기능

### 1. 회원 관리
- 이메일 기반 회원가입 및 로그인
- 동아리 검색 및 가입
- 개인 정보 관리

### 2. 모임 관리
**운영진**
- 모임 생성 (정기모임, 번개모임, 총회)
- 일시 및 장소 설정
- QR 코드 스캔으로 출석 체크

**일반 회원**
- 예정된 모임 조회
- QR 코드 생성 (15초마다 자동 갱신)

### 3. 출석 시스템
- QR 코드 기반 출석 인증
- 15초 주기로 QR 코드 갱신
- 실시간 출석 처리

<!-- QR 시스템 GIF -->
<!-- ![QR코드](docs/videos/qr-system.gif) -->

### 4. 활동 기록 및 통계
- 참여한 모임 목록 조회
- 모임 유형별 점수 집계
- 파이 차트로 통계 시각화

### 5. 랭킹 시스템
- 동아리 전체 랭킹
- 개인 전체 랭킹
- 동아리 내 개인 랭킹

<!-- 랭킹 화면 이미지 -->
<!-- ![랭킹](docs/images/ranking-system.png) -->

---

## 시연 영상

### 전체 기능 시연
<!-- 전체 시연 영상 링크 -->
<!-- [![시연영상](docs/images/demo-thumbnail.png)](https://youtube.com/watch?v=YOUR_VIDEO_ID) -->

### 기능별 시연

#### 회원가입 및 동아리 선택
<!-- ![회원가입](docs/videos/signup-flow.gif) -->

#### 모임 생성 및 상세보기
<!-- ![모임생성](docs/videos/meeting-flow.gif) -->

#### QR 출석 체크
<!-- ![출석체크](docs/videos/attendance-flow.gif) -->

#### 랭킹 조회
<!-- ![랭킹조회](docs/videos/ranking-flow.gif) -->

---

## 시스템 구조

### 전체 시스템 구조도
<!-- ![시스템구조](docs/diagrams/system-architecture.png) -->
```
┌─────────────────┐
│  Mobile Client  │  React Native + Expo
│  (iOS/Android)  │
└────────┬────────┘
         │
         │ REST API (Axios)
         │
         ▼
┌─────────────────┐
│   API Server    │  Spring Boot
│  Port: 8080     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Database     │  MySQL
└─────────────────┘
```

### 애플리케이션 구조
<!-- ![앱구조](docs/diagrams/app-architecture.png) -->
```
src/
├── screens/          화면 컴포넌트
├── components/       재사용 가능한 UI 컴포넌트
├── navigations/      네비게이션 설정
├── contexts/         전역 상태 관리
├── funtion/          API 통신 로직
└── theme.js          디자인 시스템
```

---

## 기술 스택

### Frontend
- React Native 0.64+
- Expo SDK 42+
- React Navigation 5.x
- Styled Components
- Axios
- AsyncStorage

### 주요 라이브러리
- expo-barcode-scanner: QR 코드 스캔
- react-native-qrcode-svg: QR 코드 생성
- react-native-chart-kit: 차트 시각화
- react-native-modal-datetime-picker: 날짜 선택
- react-native-keyboard-aware-scroll-view: 키보드 처리

### Backend
- Spring Boot
- MySQL
- JWT 인증

---

## 설치 및 실행

### 필요 사항
- Node.js v14 이상
- npm 또는 yarn
- Expo CLI
- iOS Simulator / Android Emulator (선택)

### 설치 방법

1. 저장소 클론
```bash
git clone https://github.com/YOUR_USERNAME/club-attendance-system.git
cd club-attendance-system
```

2. 패키지 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm start
```

4. 앱 실행
- iOS: `i` 키 입력
- Android: `a` 키 입력
- 실제 기기: Expo Go 앱으로 QR 코드 스캔

### 환경 설정

API 서버 주소 변경
```javascript
// src/funtion/request.js
export const baseURL = 'http://YOUR_SERVER_IP:8080';
```

---

## 프로젝트 구조
```
club-attendance-system/
├── src/
│   ├── screens/              화면 컴포넌트
│   │   ├── Signin.js         로그인
│   │   ├── Signup.js         회원가입
│   │   ├── SelectClub.js     동아리 선택
│   │   ├── Home.js           홈 화면
│   │   ├── CreateMeeting.js  모임 생성
│   │   ├── MeetingDetail.js  모임 상세
│   │   ├── QR.js             QR 코드 생성
│   │   ├── QRScanner.js      QR 스캔
│   │   ├── MyPage.js         마이페이지
│   │   ├── Ranking.js        랭킹
│   │   └── ...
│   │
│   ├── components/           재사용 컴포넌트
│   │   ├── Button.js
│   │   ├── Input.js
│   │   ├── Desc.js
│   │   ├── Datetime.js
│   │   ├── ErrorMessage.js
│   │   └── Spinner.js
│   │
│   ├── navigations/          네비게이션
│   │   ├── Auth.js           인증 네비게이터
│   │   ├── Main.js           메인 네비게이터
│   │   ├── Form.js           탭 네비게이터
│   │   └── Rank_index.js     랭킹 탭
│   │
│   ├── contexts/             상태 관리
│   │   ├── User.js
│   │   └── Progress.js
│   │
│   ├── funtion/              유틸리티
│   │   ├── request.js        일반 API 요청
│   │   └── QRrequest.js      QR API 요청
│   │
│   ├── theme.js              테마 설정
│   ├── util.js               유효성 검증
│   └── App.js                앱 진입점
│
├── assets/
├── package.json
└── README.md
```

### 화면 구성
<!-- ![네비게이션구조](docs/diagrams/navigation-flow.png) -->
```
SplashScreen
    │
    ├─ Auth (미로그인)
    │   ├─ Signin
    │   ├─ Signup
    │   └─ SelectClub
    │
    └─ Main (로그인)
        └─ Form (탭)
            ├─ Home
            ├─ Ranking
            ├─ MyPage
            └─ QR
```

---

## API 명세

### Base URL
```
http://23.23.240.178:8080
```

### 인증 방식
- JWT Token
- Header: `Access_Token`, `Qrcode_Token`

### 주요 엔드포인트

**인증**
```
POST /auth/register     회원가입
POST /auth/login        로그인
```

**동아리**
```
GET  /user/group/searchAll              동아리 목록
POST /{userId}/group/join/{groupId}     동아리 가입
GET  /group/get/{groupId}               동아리 정보
```

**모임**
```
POST /user/meeting/create               모임 생성
GET  /user/meeting/get/{groupId}        모임 목록
GET  /user/meetingInfo/get/{meetingId}  모임 상세
POST /{userId}/meeting/join/{meetingId} 모임 참여
GET  /user/meeting/history              참여 내역
```

**QR 코드**
```
POST /qr/create     QR 생성
GET  /qr/get        QR 정보
```

**랭킹**
```
GET /rank/group           동아리 랭킹
GET /rank/user            개인 전체 랭킹
GET /rank/group/user      동아리 내 랭킹
GET /user/history/{userId} 개인 통계
```

### API 사용 예시
```javascript
import request from '../funtion/request';

const getMeetings = async (groupId) => {
  const response = await request({
    method: 'GET',
    url: `/user/meeting/get/${groupId}`,
  });
  
  if (response.result === "SUCCESS") {
    return response.data;
  }
};
```

---

## 개발 팀

### 팀원

<!-- 
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/MEMBER1">
        <img src="https://github.com/MEMBER1.png" width="100px;"/>
        <br /><b>팀원1</b>
      </a>
      <br />Frontend
    </td>
    <td align="center">
      <a href="https://github.com/MEMBER2">
        <img src="https://github.com/MEMBER2.png" width="100px;"/>
        <br /><b>팀원2</b>
      </a>
      <br />Frontend
    </td>
  </tr>
</table>
-->

### 개발 기간
2022.03 - 2022.06 (4개월)

### 역할
- Frontend: React Native 앱 개발
- Backend: REST API 서버 개발
- 기획: 요구사항 분석 및 기능 설계

---

