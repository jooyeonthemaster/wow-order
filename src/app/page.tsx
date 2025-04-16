'use client';

import { useState, useEffect, useMemo } from 'react';

// 향수 정보 데이터 (사용자 제공)
const scents = [
  { id: 'AC01', name: "AC&apos;SCENT 01", notes: "블랙베리 + 월계수잎 + 시더우드" },
  { id: 'AC02', name: "AC&apos;SCENT 02", notes: "만다린 오렌지 + 그레이프프루트 + 피오니" },
  { id: 'AC03', name: "AC&apos;SCENT 03", notes: "스트로베리 + 자스민 + 바닐라" },
  { id: 'AC04', name: "AC&apos;SCENT 04", notes: "베르가못 + 오렌지 플라워 + 엠버" },
  { id: 'AC05', name: "AC&apos;SCENT 05", notes: "비터 오렌지 + 쥬니퍼베리 + 스파이시 우디 어코드" },
  { id: 'AC06', name: "AC&apos;SCENT 06", notes: "캐럿 + 자몽 + 로터스" },
  { id: 'AC07', name: "AC&apos;SCENT 07", notes: "로즈 + 다마스커스 로즈 + 머스크" },
  { id: 'AC08', name: "AC&apos;SCENT 08", notes: "튜베로즈 + 화이트 플로럴 + 프리지아" },
  { id: 'AC09', name: "AC&apos;SCENT 09", notes: "오렌지 블라썸 + 자스민 + 퉁카 빈" },
  { id: 'AC10', name: "AC&apos;SCENT 10", notes: "튤립 + 시클라멘 + 라일락" },
  { id: 'AC11', name: "AC&apos;SCENT 11", notes: "라임 + 바질 + 앰버우드" },
  { id: 'AC12', name: "AC&apos;SCENT 12", notes: "은방울꽃 + 핑크 프리지아 + 자스민" },
  { id: 'AC13', name: "AC&apos;SCENT 13", notes: "유자 + 로즈마리 + 민트" },
  { id: 'AC14', name: "AC&apos;SCENT 14", notes: "민트 + 자스민 + 마테 잎" },
  { id: 'AC15', name: "AC&apos;SCENT 15", notes: "페티그레인 + 비터오렌지 + 자몽" },
  { id: 'AC16', name: "AC&apos;SCENT 16", notes: "샌달우드 + 암브록산 + 파피루스" },
  { id: 'AC17', name: "AC&apos;SCENT 17", notes: "레몬페퍼 + 인센스 + 오리스" },
  { id: 'AC18', name: "AC&apos;SCENT 18", notes: "핑크페퍼 + 넛맥 + 민트" },
  { id: 'AC19', name: "AC&apos;SCENT 19", notes: "바다소금 + 세이지 + 자몽" },
  { id: 'AC20', name: "AC&apos;SCENT 20", notes: "타임 + 제라늄 + 엘레미" },
  { id: 'AC21', name: "AC&apos;SCENT 21", notes: "머스크 + 아프리카 오렌지꽃 + 튜베로즈" },
  { id: 'AC22', name: "AC&apos;SCENT 22", notes: "화이트로즈 + 핑크페퍼 + 머스크" },
  { id: 'AC23', name: "AC&apos;SCENT 23", notes: "스웨이드 + 은방울꽃 + 머스크" },
  { id: 'AC24', name: "AC&apos;SCENT 24", notes: "이탈리안만다린 + 암브레트 + 머스크" },
  { id: 'AC25', name: "AC&apos;SCENT 25", notes: "라벤더 + 시나몬 + 과이악우드" },
  { id: 'AC26', name: "AC&apos;SCENT 26", notes: "이탈리안사이프러스 + 시더우드 + 스파이시 어코드" },
  { id: 'AC27', name: "AC&apos;SCENT 27", notes: "스모키 블렌드 우드 + 로즈우드 + 카다멈" },
  { id: 'AC28', name: "AC&apos;SCENT 28", notes: "레더 + 통카빈 + 세이지" },
  { id: 'AC29', name: "AC&apos;SCENT 29", notes: "바이올렛 + 네스베리 + 프랑스머스크" },
  { id: 'AC30', name: "AC&apos;SCENT 30", notes: "베르가못 + 무화과 + 월계수잎" },
];

const PERFUME_PRICE = 38000;
const SACHET_PRICE = 15000;
const SHIPPING_FEE = 3500;
const FREE_SHIPPING_THRESHOLD = 50000;
const KAKAO_BANK_ACCOUNT = '7979-73-48689';

// 향 정보 모달 컴포넌트
const ScentInfoModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">향 정보 안내</h2>
        <div className="space-y-4">
          {scents.map((scent) => (
            <div key={scent.id} className="p-4 border border-gray-200 rounded-md bg-gray-50 shadow-sm">
              <h3 className="text-lg font-medium text-indigo-600">{scent.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{scent.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 주문 확인 모달 컴포넌트
const OrderConfirmModal = ({ isOpen, onClose, orderDetails }: { 
  isOpen: boolean, 
  onClose: () => void,
  orderDetails?: {
    name: string;
    totalAmount: number;
  }
}) => {
  if (!isOpen || !orderDetails) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">주문이 접수되었습니다!</h2>
          <p className="text-gray-600 mb-4">{orderDetails.name}님, 주문해주셔서 감사합니다.</p>

          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <p className="text-sm font-medium mb-2">입금 안내</p>
            <p className="text-sm text-gray-600 mb-1">카카오뱅크 {KAKAO_BANK_ACCOUNT} (예금주: ㅇㅅㅎ)</p>
            <p className="text-sm text-gray-600 mb-1">금액: {orderDetails.totalAmount.toLocaleString()}원</p>
            <p className="text-sm text-red-500 font-medium">1시간 이내로 입금해주세요!</p>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors text-sm"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  // 주문 정보 상태
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [event, setEvent] = useState('');
  const [perfumeQuantity, setPerfumeQuantity] = useState(0);
  const [sachetQuantity, setSachetQuantity] = useState(0);
  
  // 다중 향 선택 상태 (최대 perfumeQuantity개까지)
  const [selectedScents, setSelectedScents] = useState<string[]>([]);

  // UI 상태
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showAllScents, setShowAllScents] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderConfirmModalOpen, setIsOrderConfirmModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState<{ name: string; totalAmount: number } | undefined>(undefined);

  // 가격 계산 로직
  const subtotal = useMemo(() => {
    return (perfumeQuantity * PERFUME_PRICE) + (sachetQuantity * SACHET_PRICE);
  }, [perfumeQuantity, sachetQuantity]);

  const finalShippingFee = useMemo(() => {
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  }, [subtotal]);

  const totalAmount = useMemo(() => {
    return subtotal + finalShippingFee;
  }, [subtotal, finalShippingFee]);

  // 향수 수량 변경 시 선택된 향 배열 조정
  useEffect(() => {
    if (perfumeQuantity === 0) {
      setSelectedScents([]);
    } else {
      // 수량이 줄어든 경우, 초과하는 향은 제거
      if (selectedScents.length > perfumeQuantity) {
        setSelectedScents(prev => prev.slice(0, perfumeQuantity));
      }
    }
  }, [perfumeQuantity, selectedScents.length]);

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 입력값 검증
    if (!name.trim()) return handleError('성함을 입력해주세요.');
    if (!phone.trim()) return handleError('전화번호를 입력해주세요.');
    if (!address.trim()) return handleError('상세 주소를 입력해주세요.');
    if (!event.trim()) return handleError('이벤트명을 입력해주세요.');
    if (perfumeQuantity === 0 && sachetQuantity === 0) return handleError('상품을 1개 이상 선택해주세요.');
    if (perfumeQuantity > 0 && selectedScents.length < perfumeQuantity) return handleError(`향수 ${perfumeQuantity}개에 대한 향을 모두 선택해주세요.`);

    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);

    try {
      const response = await fetch('/api/sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          address,
          event,
          perfumeQuantity,
          sachetQuantity,
          selectedScent: selectedScents.join(', '), // 쉼표로 구분된 선택된 향 목록
          totalAmount,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        handleSuccess(data.message || '주문이 성공적으로 접수되었습니다. 1시간 이내로 입금 확인이 안 될 경우 주문 접수가 자동 취소됩니다.');
        // 주문 성공 시 모달 표시
        setOrderDetails({ name, totalAmount });
        setIsOrderConfirmModalOpen(true);
        resetForm();
      } else {
        handleError(data.error || '주문 처리 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('주문 처리 중 에러:', error);
      handleError('서버 연결 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper 함수
  const handleError = (msg: string) => {
    setMessage(msg);
    setIsError(true);
    setIsSuccess(false);
  };

  const handleSuccess = (msg: string) => {
    setMessage(msg);
    setIsSuccess(true);
    setIsError(false);
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setAddress('');
    setEvent('');
    setPerfumeQuantity(0);
    setSachetQuantity(0);
    setSelectedScents([]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('계좌번호가 복사되었습니다.'))
      .catch(err => console.error('복사 실패:', err));
  };

  // 수량 조절 함수
  const handleQuantityChange = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    delta: number
  ) => {
    setter(prev => Math.max(0, prev + delta));
  };

  // 향 선택 추가/제거 함수
  const toggleScent = (scentName: string) => {
    setSelectedScents(prev => {
      const isSelected = prev.includes(scentName);
      
      // 이미 선택된 경우 제거
      if (isSelected) {
        return prev.filter(s => s !== scentName);
      }
      
      // 선택되지 않았고, 최대 선택 개수에 도달하지 않은 경우 추가
      if (prev.length < perfumeQuantity) {
        return [...prev, scentName];
      }
      
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-[375px] mx-auto px-3">
        {/* Header */}
        <header className="pt-10 pb-8 border-b border-black">
          <h1 className="text-xl font-light uppercase tracking-widest text-center mb-2">AC&apos;SCENT WOW ONLINE</h1>
          <p className="text-[11px] text-center uppercase tracking-wider">이벤트 온라인 주문 페이지</p>
        </header>

        {/* Main Content */}
        <main className="pt-4">
          {/* Order Guide */}
          <section className="mb-8 py-4 border-b border-black">
            <h2 className="text-xs uppercase tracking-wider mb-3">주문 안내</h2>
            <ul className="text-[11px] space-y-1">
              <li>이벤트 종료 후 순차적으로 배송됩니다.</li>
              <li>향수 38,000원 / 샤쉐(방향제) 15,000원</li>
              <li>배송비: 3,500원 (5만원 이상 무료배송)</li>
              <li>결제 방법: 계좌 이체</li>
              <li>주문 접수 후 1시간 이내로 입금 확인이 안 될 경우 주문이 취소됩니다.</li>
            </ul>
            
            <div className="mt-4 mb-2">
              <a 
                href="https://www.acscent-universe.co.kr" 
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-black text-white py-3 px-4 text-center rounded-md shadow-sm hover:bg-gray-800 transition-colors"
              >
                <span className="text-[14px] font-medium uppercase tracking-wider">AI 최애 향수 분석 바로가기</span>
                <svg className="w-4 h-4 ml-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </section>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Shipping Information */}
            <section className="border-b border-black py-4">
              <h2 className="text-xs uppercase tracking-wider mb-3">배송 정보</h2>
              <div className="space-y-3">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-[10px] mb-1">성함</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="input-minimal" 
                    placeholder="이름을 입력하세요"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="phone" className="text-[10px] mb-1">전화번호</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    className="input-minimal" 
                    placeholder="010-0000-0000"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="address" className="text-[10px] mb-1">주소</label>
                  <input 
                    type="text" 
                    id="address" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    className="input-minimal" 
                    placeholder="배송지 주소를 입력하세요"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="event" className="text-[10px] mb-1">이벤트명</label>
                  <input 
                    type="text" 
                    id="event" 
                    value={event} 
                    onChange={(e) => setEvent(e.target.value)} 
                    className="input-minimal" 
                    placeholder="참여 이벤트명을 입력하세요"
                  />
                </div>
              </div>
            </section>

            {/* Product Selection */}
            <section className="border-b border-black py-4">
              <h2 className="text-xs uppercase tracking-wider mb-3">상품 선택</h2>
              
              {/* Perfume Selection */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="text-[11px] font-medium uppercase">향수</h3>
                    <p className="text-[10px] text-gray-700 mt-0.5">{PERFUME_PRICE.toLocaleString()}원</p>
                  </div>
                  <div className="flex items-center">
                    <button type="button" onClick={() => handleQuantityChange(setPerfumeQuantity, -1)} className="quantity-btn-minimal">-</button>
                    <span className="text-xs w-6 text-center">{perfumeQuantity}</span>
                    <button type="button" onClick={() => handleQuantityChange(setPerfumeQuantity, 1)} className="quantity-btn-minimal">+</button>
                  </div>
                </div>

                {/* Scent Selection */}
                {perfumeQuantity > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between items-center">
                      <p className="text-[10px]">
                        향 선택 ({selectedScents.length}/{perfumeQuantity})
                      </p>
                      <button 
                        type="button" 
                        onClick={() => setShowAllScents(!showAllScents)}
                        className="text-[10px] underline"
                      >
                        {showAllScents ? '접기' : '모든 향 보기'}
                      </button>
                    </div>
                    
                    <div className="mt-2 max-h-[200px] overflow-y-auto scent-scrollbar border border-gray-200">
                      <div className="grid grid-cols-1 divide-y divide-gray-100">
                        {scents.filter(scent => showAllScents || selectedScents.includes(scent.name) || selectedScents.length < perfumeQuantity).map(scent => (
                          <div 
                            key={scent.id}
                            className={`p-2.5 flex items-start hover:bg-gray-50 cursor-pointer transition-colors ${
                              selectedScents.includes(scent.name) ? 'bg-gray-50' : ''
                            }`}
                            onClick={() => toggleScent(scent.name)}
                          >
                            <div className="flex-shrink-0 mt-0.5">
                              <div className={`w-3 h-3 border border-black flex items-center justify-center ${
                                selectedScents.includes(scent.name) ? 'bg-black' : 'bg-white'
                              }`}>
                                {selectedScents.includes(scent.name) && (
                                  <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                  </svg>
                                )}
                              </div>
                            </div>
                            <div className="ml-2">
                              <p className="text-[11px] font-medium">{scent.name}</p>
                              <p className="text-[9px] text-gray-500 mt-0.5">{scent.notes}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {perfumeQuantity > selectedScents.length && (
                      <p className="text-[9px] text-red-500 mt-1">
                        {perfumeQuantity - selectedScents.length}개 더 선택해주세요.
                      </p>
                    )}
                    
                    <div className="mt-2">
                      <a 
                        href="https://www.acscent-universe.co.kr" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] underline flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        향을 못 고르시겠다고요? (AI 도움받기)
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Sachet Selection */}
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-[11px] font-medium uppercase">샤쉐 (방향제)</h3>
                    <p className="text-[10px] text-gray-700 mt-0.5">{SACHET_PRICE.toLocaleString()}원</p>
                  </div>
                  <div className="flex items-center">
                    <button type="button" onClick={() => handleQuantityChange(setSachetQuantity, -1)} className="quantity-btn-minimal">-</button>
                    <span className="text-xs w-6 text-center">{sachetQuantity}</span>
                    <button type="button" onClick={() => handleQuantityChange(setSachetQuantity, 1)} className="quantity-btn-minimal">+</button>
                  </div>
                </div>
                {sachetQuantity > 0 && (
                  <p className="text-[9px] text-gray-500 mt-1">향 선택 불가 상품입니다.</p>
                )}
              </div>
              
              {/* AI 추천 및 오프라인 방문 안내 */}
              <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100 shadow-sm overflow-hidden">
                <div className="p-4 space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-indigo-100 rounded-full p-2 mr-3">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[13px] font-semibold text-indigo-900">AI로 향 추천받기</h4>
                      <p className="text-[11px] text-indigo-700 leading-tight mt-1">
                        AI를 통해 최애의 이미지를 분석하고, 나에게 맞는 향을 추천받아보세요!
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-purple-100 rounded-full p-2 mr-3">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[13px] font-semibold text-purple-900">오프라인 방문</h4>
                      <p className="text-[11px] text-purple-700 leading-tight mt-1">
                        AC&apos;SCENT WOW에 방문하시면 다양한 향을 직접 맡아보실 수 있습니다.
                      </p>
                    </div>
                  </div>
                  
                  <a 
                    href="https://www.acscent-universe.co.kr" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 text-center rounded-md shadow-sm hover:from-indigo-700 hover:to-purple-700 transition-all text-[12px] font-medium mt-3"
                  >
                    나에게 맞는 향 찾으러 가기
                    <svg className="w-3.5 h-3.5 ml-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </section>

            {/* Order Summary */}
            <section className="border-b border-black py-4">
              <h2 className="text-xs uppercase tracking-wider mb-3">주문 요약</h2>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span>상품 소계</span>
                  <span>{subtotal.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>배송비</span>
                  {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                    <span>무료</span>
                  ) : (
                    <span>{finalShippingFee.toLocaleString()}원</span>
                  )}
                </div>
                {subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
                  <p className="text-[9px] text-right">
                    {(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString()}원 더 구매 시 무료배송
                  </p>
                )}
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between text-[12px] font-medium mt-1">
                    <span>총 결제 금액</span>
                    <span>{totalAmount.toLocaleString()}원</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Information */}
            <section className="border-b border-black py-4">
              <h2 className="text-xs uppercase tracking-wider mb-3">결제 안내</h2>
              <div className="space-y-3">
                <p className="text-[10px]">
                  주문 접수 후 아래 계좌로 <span className="font-medium">{totalAmount.toLocaleString()}원</span>을 입금해주세요.
                </p>
                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 border border-gray-200">
                  <span className="text-[11px] font-mono">
                    카카오뱅크 {KAKAO_BANK_ACCOUNT}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(`카카오뱅크 ${KAKAO_BANK_ACCOUNT}`)}
                    className="text-[10px] underline"
                  >
                    복사
                  </button>
                </div>
                <p className="text-[9px] text-gray-500">
                  * 입금자명은 주문자 성함과 동일하게 입력해주세요.
                </p>
                <p className="text-[9px] text-gray-500">
                  * 예금주: ㅇㅅㅎ
                </p>
                <p className="text-[9px] text-red-500 font-medium">
                  * 주문 접수 후 1시간 이내로 입금 확인이 안 될 경우 주문 접수가 자동 취소됩니다.
                </p>
              </div>
            </section>

            {/* Submit Button */}
            <div className="py-6">
              <button
                type="submit"
                disabled={isLoading || totalAmount === 0}
                className={`w-full py-3 uppercase tracking-wider text-[11px] transition-colors ${
                  isLoading || totalAmount === 0
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-900'
                }`}
              >
                {isLoading ? '처리 중...' : '주문 접수하기'}
              </button>

              {message && (
                <div
                  className={`mt-4 p-3 text-[11px] text-center ${
                    isSuccess ? 'bg-gray-100 text-gray-800' :
                    isError ? 'bg-red-50 text-red-900' : ''
                  }`}
                >
                  {message}
                </div>
              )}
            </div>
          </form>
        </main>

        {/* Footer */}
        <footer className="py-5 text-center border-t border-black">
          <p className="text-[10px] text-gray-500">문의사항은 OOO으로 연락주세요.</p>
        </footer>
      </div>

      {/* Scent Info Modal */}
      <ScentInfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Order Confirm Modal */}
      <OrderConfirmModal 
        isOpen={isOrderConfirmModalOpen} 
        onClose={() => setIsOrderConfirmModalOpen(false)} 
        orderDetails={orderDetails}
      />

      {/* Styles */}
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .input-minimal {
          width: 100%;
          height: 28px;
          padding: 0;
          border: none;
          border-bottom: 1px solid #000;
          font-size: 11px;
          background: transparent;
          transition: border-color 0.15s;
          outline: none;
        }
        .input-minimal:focus {
          border-color: #000;
        }
        .quantity-btn-minimal {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          border: 1px solid #000;
          background: white;
          transition: all 0.15s;
        }
        .quantity-btn-minimal:hover {
          background: #f9f9f9;
        }
        .scent-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #ddd transparent;
        }
        .scent-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .scent-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .scent-scrollbar::-webkit-scrollbar-thumb {
          background-color: #ddd;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
