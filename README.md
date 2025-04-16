# 이름 등록 서비스

이 프로젝트는 웹 페이지에서 이름을 입력하면 Google 스프레드시트에 해당 이름이 자동으로 기록되는 간단한 서비스입니다.

## 기능

- 사용자가 이름을 입력할 수 있는 간단한 웹 폼 제공
- 입력된 이름은 Google 스프레드시트에 자동으로 기록
- 이름과 함께 타임스탬프도 기록

## 설치 및 실행

1. 프로젝트 클론 및 패키지 설치
```bash
git clone [repository-url]
cd wow-order
npm install
```

2. Google Sheets API 설정
   - [Google Cloud Console](https://console.cloud.google.com)에서 새 프로젝트 생성
   - Google Sheets API 활성화
   - 서비스 계정 생성 및 JSON 키 다운로드
   - 스프레드시트 생성 및 서비스 계정에 접근 권한 부여

3. 환경 변수 설정
   - 프로젝트 루트에 `.env.local` 파일 생성 및 다음 변수 설정:
   ```
   SPREADSHEET_ID=your_spreadsheet_id
   SHEET_NAME=Sheet1
   CLIENT_EMAIL=your_service_account_email
   PRIVATE_KEY=your_private_key
   ```

4. 개발 서버 실행
```bash
npm run dev
```

5. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## Google Sheets API 설정 상세 가이드

### 1. Google Cloud Console 설정
1. [Google Cloud Console](https://console.cloud.google.com)에 접속하여 로그인
2. 새 프로젝트 생성 ("+ 새 프로젝트" 클릭)
3. 프로젝트 이름 입력 후 "만들기" 클릭
4. 프로젝트를 선택하고 왼쪽 메뉴에서 "API 및 서비스" > "라이브러리" 클릭
5. 검색창에 "Google Sheets API" 입력하고 선택
6. "사용 설정" 버튼 클릭하여 API 활성화

### 2. 서비스 계정 설정
1. 왼쪽 메뉴에서 "API 및 서비스" > "사용자 인증 정보" 클릭
2. "사용자 인증 정보 만들기" > "서비스 계정" 선택
3. 서비스 계정 이름과 설명 입력 후 "만들기 및 계속" 클릭
4. 역할 선택에서 "편집자" 역할 부여 후 "계속" 클릭
5. "완료" 클릭하여 서비스 계정 생성
6. 생성된 서비스 계정 이메일 주소 기록 (CLIENT_EMAIL로 사용)
7. 서비스 계정 목록에서 생성한 계정 클릭
8. "키" 탭으로 이동 후 "키 추가" > "새 키 만들기" 클릭
9. JSON 키 유형 선택 후 "만들기" 클릭 (키 파일이 자동 다운로드됨)
10. 다운로드된 JSON 파일에서 `private_key` 값을 PRIVATE_KEY로 사용

### 3. 스프레드시트 설정
1. [Google Sheets](https://sheets.google.com)에 접속
2. 새 스프레드시트 생성
3. 스프레드시트 URL에서 ID 추출 (https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit...)
4. 스프레드시트 우측 상단의 "공유" 버튼 클릭
5. 서비스 계정 이메일 추가하고 "편집자" 권한 부여

## 코드 설명

- `src/app/api/sheet/route.ts`: Google Sheets API와 통신하는 API 엔드포인트
- `src/app/page.tsx`: 이름 입력 폼을 제공하는 메인 페이지

## 기술 스택

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [TypeScript](https://www.typescriptlang.org/)
