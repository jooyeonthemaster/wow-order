import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// 환경 변수에서 값을 가져옵니다.
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const SHEET_NAME = process.env.SHEET_NAME || 'Sheet1';
const CLIENT_EMAIL = process.env.CLIENT_EMAIL;
const PRIVATE_KEY = process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'); // \n 문자를 실제 줄바꿈으로 변환

// Google API 클라이언트 설정
const getGoogleSheetsClient = () => {
  if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
    throw new Error('Google Sheets API 환경 변수가 설정되지 않았습니다.');
  }

  const auth = new google.auth.JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // 확장된 필드 추출
    const {
      name,
      phone,
      address,
      event,
      perfumeQuantity,
      sachetQuantity,
      selectedScent,
      totalAmount
    } = body;

    // 필수 필드 검증 (선택된 향은 향수 수량이 0보다 클 때만 필수)
    if (!name || !phone || !address || !event || (perfumeQuantity === undefined) || (sachetQuantity === undefined) || !totalAmount) {
      return NextResponse.json(
        { error: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }
    if (perfumeQuantity > 0 && !selectedScent) {
        return NextResponse.json(
            { error: '향수 향이 선택되지 않았습니다.' },
            { status: 400 }
        );
    }
    if (perfumeQuantity === 0 && sachetQuantity === 0) {
        return NextResponse.json(
            { error: '상품 수량은 최소 1개 이상이어야 합니다.' },
            { status: 400 }
        );
    }

    // 현재 날짜와 시간 (한국 시간 기준)
    const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

    // Google Sheets 클라이언트 초기화
    const sheets = getGoogleSheetsClient();

    // Google Sheets에 추가할 데이터 행 준비 (순서 중요)
    const values = [
      [
        timestamp,
        name,
        phone,
        address,
        event,
        perfumeQuantity,
        sachetQuantity,
        selectedScent || '-', // 향수 미선택 시 '-' 표시
        totalAmount
      ]
    ];

    // Google Sheets에 데이터 추가 (범위를 실제 시트 열 개수에 맞게 조정하세요. 예: A:I)
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:I`, // 시트의 실제 열 범위에 맞게 수정 (A부터 I까지 9개 열이라고 가정)
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: values,
      },
    });

    return NextResponse.json(
      { success: true, message: '주문이 성공적으로 접수되었습니다.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error adding data to Google Sheet:', error);
    return NextResponse.json(
      { error: '데이터를 기록하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 