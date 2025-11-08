# 🎓 동아리 출석 관리 시스템 (Club Attendance Management System)

> QR 코드 기반 실시간 동아리 모임 출석 체크 및 활동 관리 모바일 애플리케이션

![React Native](https://img.shields.io/badge/React_Native-0.64+-61DAFB?style=flat-square&logo=react)
![Expo](https://img.shields.io/badge/Expo-SDK_42+-000020?style=flat-square&logo=expo)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 📑 목차
- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [시연 영상](#-시연-영상)
- [시스템 아키텍처](#️-시스템-아키텍처)
- [기술 스택](#-기술-스택)
- [시작하기](#-시작하기)
- [프로젝트 구조](#-프로젝트-구조)
- [화면 구성](#-화면-구성)
- [API 연동](#-api-연동)
- [개발 팀](#-개발-팀)
- [라이선스](#-라이선스)

---

## 🎯 프로젝트 소개

동아리 출석 관리 시스템은 대학 동아리의 모임 관리와 출석 체크를 효율적으로 처리하기 위한 React Native 기반 모바일 애플리케이션입니다. QR 코드를 활용한 실시간 출석 체크와 활동 점수 시스템을 통해 동아리 운영을 체계화합니다.

### 🌟 핵심 가치
- **간편한 출석 체크**: QR 코드 스캔으로 15초 내 빠른 출석 인증
- **투명한 활동 관리**: 모임별 점수 시스템으로 공정한 평가
- **실시간 랭킹**: 동아리/개인 활동 순위를 실시간으로 확인
- **체계적인 운영**: 운영진/일반 회원 권한 분리로 효율적 관리

<!-- 여기에 앱 메인 화면 스크린샷 추가 -->
<!-- ![메인화면](docs/images/main-screen.png) -->

---

## ✨ 주요 기능

### 1️⃣ 회원 관리
- 이메일 기반 회원가입/로그인
- 동아리 검색 및 가입
- 프로필 관리 (이름, 생년월일, 성별, 연락처)

### 2️⃣ 모임 관리
- **모임 생성** (운영진 전용)
  - 모임 유형: 정기모임, 번개모임, 총회
  - 일시 및 설명 등록
- **실시간 모임 조회**
  - 진행 예정 모임 목록
  - 모임 상세 정보 확인

### 3️⃣ QR 출석 시스템
- **QR 코드 생성** (일반 회원)
  - 15초 주기 자동 갱신
  - 보안 토큰 기반 인증
- **QR 코드 스캔** (운영진)
  - 카메라 권한 자동 요청
  - 실시간 출석 처리

<!-- 여기에 QR 코드 생성/스캔 화면 GIF 추가 -->
<!-- ![QR시스템](docs/videos/qr-system.gif) -->

### 4️⃣ 활동 내역 & 랭킹
- **개인 활동 내역**
  - 참여한 모임 목록
  - 모임별 상세 정보
- **점수 시스템**
  - 정기모임, 번개모임, 총회별 차등 점수
  - 파이 차트로 시각화
- **랭킹 시스템**
  - 동아리 전체 랭킹
  - 개인(전체) 랭킹
  - 개인(동아리 내) 랭킹

<!-- 여기에 랭킹 화면 스크린샷 추가 -->
<!-- ![랭킹시스템](docs/images/ranking-system.png) -->

---

## 🎬 시연 영상

### 전체 플로우 시연
<!-- 여기에 전체 앱 사용 시연 영상 임베드 (YouTube 등) -->
<!-- [![전체시연](docs/images/demo-thumbnail.png)](https://youtube.com/watch?v=YOUR_VIDEO_ID) -->

### 기능별 시연

#### 1. 회원가입 및 동아리 가입
<!-- 여기에 회원가입 -> 동아리 선택 플로우 GIF 추가 -->
<!-- ![회원가입플로우](docs/videos/signup-flow.gif) -->

#### 2. 모임 생성 및 관리
<!-- 여기에 모임 생성 -> 상세보기 플로우 GIF 추가 -->
<!-- ![모임관리플로우](docs/videos/meeting-flow.gif) -->

#### 3. QR 출석 체크
<!-- 여기에 QR 생성 -> 스캔 -> 출석완료 플로우 GIF 추가 -->
<!-- ![출석체크플로우](docs/videos/attendance-flow.gif) -->

#### 4. 랭킹 및 통계
<!-- 여기에 랭킹 조회 및 통계 화면 GIF 추가 -->
<!-- ![랭킹조회플로우](docs/videos/ranking-flow.gif) -->

---

## 🏗️ 시스템 아키텍처

### 전체 시스템 구조
<!-- 여기에 전체 시스템 아키텍처 다이어그램 추가 -->
<!-- ![시스템아키텍처](docs/diagrams/system-architecture.png) -->
```
┌─────────────────┐
│  Mobile Client  │ (React Native + Expo)
│  (iOS/Android)  │
└────────┬────────┘
         │ REST API
         │ (Axios)
         ▼
┌─────────────────┐
│   API Server    │ (Spring Boot)
│  Port: 8080     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Database     │ (MySQL/PostgreSQL)
└─────────────────┘
```

### 앱 아키텍처
<!-- 여기에 앱 내부 아키텍처 다이어그램 추가 -->
<!-- ![앱아키텍처](docs/diagrams/app-architecture.png) -->
```
src/
├── screens/          # 화면 컴포넌트 (View Layer)
├── components/       # 재사용 컴포넌트 (UI Components)
├── navigations/      # 내비게이션 구조 (Navigation Layer)
├── contexts/         # 전역 상태 관리 (State Management)
├── funtion/          # API 통신 로직 (Service Layer)
└── theme.js          # 디자인 시스템
```

### 데이터 플로우
<!-- 여기에 데이터 플로우 다이어그램 추가 -->
<!-- ![데이터플로우](docs/diagrams/data-flow.png) -->

---

## 🛠 기술 스택

### Frontend
| 기술 | 버전 | 용도 |
|------|------|------|
| React Native | 0.64+ | 크로스 플랫폼 모바일 앱 개발 |
| Expo | SDK 42+ | 개발 환경 및 빌드 도구 |
| React Navigation | 5.x | 화면 네비게이션 |
| Styled Components | 5.x | CSS-in-JS 스타일링 |
| Axios | 0.21+ | HTTP 통신 |
| AsyncStorage | 1.15+ | 로컬 데이터 저장 |

### 주요 라이브러리
```json
{
  "expo-barcode-scanner": "QR 코드 스캔",
  "react-native-qrcode-svg": "QR 코드 생성",
  "react-native-chart-kit": "차트 및 통계 시각화",
  "react-native-modal-datetime-picker": "날짜/시간 선택",
  "react-native-keyboard-aware-scroll-view": "키보드 대응"
}
```

### Backend (연동 API)
- **Base URL**: `http://23.23.240.178:8080`
- **인증 방식**: JWT Token (Access/Refresh)
- **헤더**: `Access_Token`, `Qrcode_Token`

---

## 🚀 시작하기

### 필수 요구사항
- Node.js (v14.0 이상)
- npm 또는 yarn
- Expo CLI
- iOS Simulator 또는 Android Emulator (선택사항)
- Expo Go 앱 (실제 디바이스 테스트용)

### 설치 및 실행

#### 1. 저장소 클론
```bash
git clone https://github.com/YOUR_USERNAME/club-attendance-system.git
cd club-attendance-system
```

#### 2. 의존성 설치
```bash
npm install
# 또는
yarn install
```

#### 3. 개발 서버 실행
```bash
npm start
# 또는
expo start
```

#### 4. 앱 실행
- **iOS**: `i` 키 입력 (macOS에서만 가능)
- **Android**: `a` 키 입력
- **실제 디바이스**: Expo Go 앱에서 QR 코드 스캔

### 환경 설정

#### API 서버 주소 변경 (선택사항)
```javascript
// src/funtion/request.js
export const baseURL = 'YOUR_API_SERVER_URL';
```

---

## 📁 프로젝트 구조
```
club-attendance-system/
├── src/
│   ├── screens/              # 화면 컴포넌트
│   │   ├── Signin.js         # 로그인
│   │   ├── Signup.js         # 회원가입
│   │   ├── SelectClub.js     # 동아리 선택
│   │   ├── Home.js           # 홈 (모임 목록)
│   │   ├── CreateMeeting.js  # 모임 생성
│   │   ├── MeetingDetail.js  # 모임 상세
│   │   ├── QR.js             # QR 코드 생성
│   │   ├── QRScanner.js      # QR 코드 스캔
│   │   ├── MyPage.js         # 마이페이지
│   │   ├── MyPage_Act.js     # 활동 내역
│   │   ├── MyPage_MyInfo.js  # 내 정보
│   │   ├── MyPage_MyClub.js  # 나의 동아리
│   │   ├── Ranking.js        # 랭킹 메인
│   │   └── ...
│   │
│   ├── components/           # 재사용 컴포넌트
│   │   ├── Button.js         # 버튼
│   │   ├── Input.js          # 입력 필드
│   │   ├── Desc.js           # 설명 텍스트 영역
│   │   ├── Datetime.js       # 날짜/시간 선택
│   │   ├── ErrorMessage.js   # 에러 메시지
│   │   └── Spinner.js        # 로딩 스피너
│   │
│   ├── navigations/          # 네비게이션 구조
│   │   ├── Auth.js           # 인증 네비게이터
│   │   ├── Main.js           # 메인 네비게이터
│   │   ├── Form.js           # 탭 네비게이터
│   │   └── Rank_index.js     # 랭킹 탭 네비게이터
│   │
│   ├── contexts/             # Context API
│   │   ├── User.js           # 유저 상태
│   │   └── Progress.js       # 로딩 상태
│   │
│   ├── funtion/              # 유틸리티 함수
│   │   ├── request.js        # API 요청 (Access Token)
│   │   └── QRrequest.js      # QR API 요청 (QR Token)
│   │
│   ├── theme.js              # 테마 정의
│   ├── util.js               # 유효성 검증 함수
│   └── App.js                # 앱 진입점
│
├── assets/                   # 이미지, 폰트 등
├── package.json
└── README.md
```

---

## 📱 화면 구성

### 네비게이션 구조
<!-- 여기에 네비게이션 플로우 차트 추가 -->
<!-- ![네비게이션구조](docs/diagrams/navigation-flow.png) -->
```
SplashScreen
    │
    ├─ Auth (인증되지 않은 경우)
    │   ├─ Signin
    │   ├─ Signup
    │   └─ SelectClub
    │
    └─ Main (인증된 경우)
        └─ Form (탭 네비게이터)
            ├─ Home
            │   ├─ CreateMeeting
            │   └─ MeetingDetail
            │       └─ QRScanner
            ├─ Ranking
            │   ├─ 동아리 랭킹
            │   ├─ 개인(전체) 랭킹
            │   └─ 개인(동아리내) 랭킹
            ├─ MyPage
            │   ├─ MyPage_MyInfo
            │   ├─ MyPage_Act
            │   │   └─ MyPage_Act_Detail
            │   └─ MyPage_MyClub
            └─ QR
```

### 주요 화면 스크린샷
<!-- 여기에 각 주요 화면 스크린샷 그리드로 추가 -->
<!-- 
![화면구성](docs/images/screens-overview.png)

또는 개별 이미지:
<div align="center">
  <img src="docs/images/signin.png" width="200" />
  <img src="docs/images/home.png" width="200" />
  <img src="docs/images/qr.png" width="200" />
  <img src="docs/images/ranking.png" width="200" />
</div>
-->

---

## 🔌 API 연동

### 인증 플로우
<!-- 여기에 인증 시퀀스 다이어그램 추가 -->
<!-- ![인증플로우](docs/diagrams/auth-sequence.png) -->
```
1. 회원가입 → POST /auth/register
2. 로그인 → POST /auth/login
3. AccessToken 저장 → AsyncStorage
4. 이후 모든 요청 헤더에 포함
```

### 주요 API 엔드포인트

#### 인증 관련
```javascript
POST /auth/register     // 회원가입
POST /auth/login        // 로그인
```

#### 동아리 관련
```javascript
GET  /user/group/searchAll       // 동아리 목록 조회
POST /{userId}/group/join/{groupId}  // 동아리 가입
GET  /group/get/{groupId}        // 동아리 상세 정보
```

#### 모임 관련
```javascript
POST /user/meeting/create        // 모임 생성
GET  /user/meeting/get/{groupId} // 모임 목록 조회
GET  /user/meetingInfo/get/{meetingId}  // 모임 상세 조회
POST /{userId}/meeting/join/{meetingId}  // 모임 참여
GET  /user/meeting/history       // 참여 내역 조회
```

#### QR 코드 관련
```javascript
POST /qr/create     // QR 코드 생성
GET  /qr/get        // QR 정보 조회
```

#### 랭킹 관련
```javascript
GET /rank/group       // 동아리 랭킹
GET /rank/user        // 개인(전체) 랭킹
GET /rank/group/user  // 개인(동아리내) 랭킹
GET /user/history/{userId}  // 개인 활동 통계
```

### API 사용 예시
```javascript
// request.js를 통한 API 호출
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

## 👥 개발 팀

<!-- 팀원 정보를 프로필과 함께 추가 -->
<!--
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/MEMBER1">
        <img src="https://github.com/MEMBER1.png" width="100px;" alt=""/>
        <br /><sub><b>팀원1</b></sub>
      </a>
      <br />Frontend
    </td>
    <td align="center">
      <a href="https://github.com/MEMBER2">
        <img src="https://github.com/MEMBER2.png" width="100px;" alt=""/>
        <br /><sub><b>팀원2</b></sub>
      </a>
      <br />Frontend
    </td>
    <td align="center">
      <a href="https://github.com/MEMBER3">
        <img src="https://github.com/MEMBER3.png" width="100px;" alt=""/>
        <br /><sub><b>팀원3</b></sub>
      </a>
      <br />Backend
    </td>
    <td align="center">
      <a href="https://github.com/MEMBER4">
        <img src="https://github.com/MEMBER4.png" width="100px;" alt=""/>
        <br /><sub><b>팀원4</b></sub>
      </a>
      <br />Backend
    </td>
  </tr>
</table>
-->

### 역할 분담
- **Frontend**: React Native 앱 개발, UI/UX 구현
- **Backend**: REST API 개발, 데이터베이스 설계
- **기획**: 요구사항 분석, 기능 정의
- **디자인**: UI/UX 디자인, 프로토타입 제작

---

<div align="center">

[⬆ Back to top](#-동아리-출석-관리-시스템-club-attendance-management-system)

</div>
