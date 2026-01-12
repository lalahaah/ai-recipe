import React, { useEffect } from 'react';
import { Shield, ArrowLeft } from 'lucide-react';

const PrivacyPolicy = ({ setCurrentView }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <button
                onClick={() => setCurrentView('home')}
                className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-bold">홈으로 돌아가기</span>
            </button>

            <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-500">
                        <Shield size={28} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">개인정보 처리방침</h1>
                </div>

                <div className="space-y-12 text-slate-300 leading-relaxed">
                    <section>
                        <p className="text-lg font-medium text-slate-200 mb-4 bg-slate-700/50 p-4 rounded-xl border border-slate-600/50">
                            🛡️ Next Idea Lab 개인정보 처리방침 (2025.04 지침 준수)
                        </p>
                        <p>
                            Next Idea Lab(이하 '회사')는 이용자의 개인정보를 소중하게 처리하며, 「개인정보 보호법」 제30조에 따라 이용자의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같은 처리방침을 수립·공개합니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
                            제1조 (개인정보의 처리 목적)
                        </h2>
                        <p className="mb-4">회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
                        <ul className="space-y-3 list-disc pl-5 marker:text-indigo-500">
                            <li><strong>회원 가입 및 관리:</strong> 회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정 이용 방지, 각종 고지·통지 등을 목적으로 개인정보를 처리합니다.</li>
                            <li><strong>서비스 제공:</strong> AI 프롬프트(레시피) 업로드 및 공유, 개인 대시보드 제공, 콘텐츠 추천(큐레이션), 유료 콘텐츠 결제 및 정산 서비스를 제공합니다.</li>
                            <li><strong>고충 처리:</strong> 이용자의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리 결과 통보 등을 목적으로 개인정보를 처리합니다.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
                            제2조 (개인정보의 처리 및 보유 기간)
                        </h2>
                        <p className="mb-4">회사는 법령에 따른 개인정보 보유·이용 기간 또는 이용자로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용 기간 내에서 개인정보를 처리·보유합니다.</p>
                        <p className="mb-2 font-bold text-slate-200">각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>
                        <ul className="space-y-3 list-disc pl-5 marker:text-indigo-500">
                            <li><strong>홈페이지 회원 가입 및 관리:</strong> 홈페이지 탈퇴 시까지. 다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지 보유합니다.
                                <ul className="mt-2 space-y-1 pl-5 list-[circle]">
                                    <li>관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우 해당 수사·조사 종료 시까지</li>
                                    <li>홈페이지 이용에 따른 채권·채무관계 잔존 시 해당 채권·채무관계 정산 시까지</li>
                                </ul>
                            </li>
                            <li><strong>전자상거래 등에서의 소비자 보호에 관한 법률에 따른 보유:</strong>
                                <ul className="mt-2 space-y-1 pl-5 list-[circle]">
                                    <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                                    <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                                    <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
                                </ul>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
                            제3조 (처리하는 개인정보의 항목)
                        </h2>
                        <p className="mb-4 text-slate-200 font-bold">회사는 다음의 개인정보 항목을 처리하고 있습니다.</p>
                        <ul className="space-y-3 list-disc pl-5 marker:text-indigo-500">
                            <li><strong>회원 가입 및 관리 (필수):</strong> 이메일 주소, 비밀번호, 닉네임(사용자 ID)</li>
                            <li><strong>서비스 이용 과정에서 생성되는 항목:</strong> 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보, 기기 정보</li>
                            <li><strong>유료 서비스 결제 시 (선택):</strong> 결제수단 정보(신용카드 정보, 계좌 정보 등), 주문자 성명
                                <p className="mt-1 text-xs text-slate-400 italic">주: 실제 결제 데이터는 PG사(결제대행사)를 통해 처리되며 회사는 최소한의 식별 정보만 보유합니다.</p>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
                            제4조 (개인정보의 제3자 제공)
                        </h2>
                        <p>회사는 이용자의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 이용자의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
                            제5조 (개인정보 처리 업무의 위탁 및 국외 이전)
                        </h2>
                        <p className="mb-4">AI-Recipe는 안정적인 서비스 제공을 위하여 다음과 같이 개인정보 처리 업무를 위탁하고 있으며, 클라우드 인프라 활용에 따라 개인정보가 국외로 이전됩니다.</p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm border-collapse border border-slate-700">
                                <thead className="bg-slate-700/50">
                                    <tr>
                                        <th className="p-3 border border-slate-700">수탁자</th>
                                        <th className="p-3 border border-slate-700">국가</th>
                                        <th className="p-3 border border-slate-700">목적</th>
                                        <th className="p-3 border border-slate-700">항목</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-3 border border-slate-700 font-bold">Google Cloud (Firebase)</td>
                                        <td className="p-3 border border-slate-700">미국 등</td>
                                        <td className="p-3 border border-slate-700">인프라 제공 및 데이터 저장</td>
                                        <td className="p-3 border border-slate-700">이메일, 접속로그, 결제기록 등</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4 text-xs text-slate-400">
                            이전 거부 방법: 회원 탈퇴를 통해 개인정보 이전을 거부할 수 있으나, 이 경우 서비스 이용이 제한됩니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
                            제6조 (개인정보의 파기 절차 및 방법)
                        </h2>
                        <ul className="space-y-2 list-disc pl-5 marker:text-indigo-500">
                            <li><strong>파기절차:</strong> 파기 사유가 발생한 개인정보를 선정하고, 개인정보 보호책임자의 승인을 받아 파기합니다.</li>
                            <li><strong>파기방법:</strong> 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
                            제7조 (이용자의 권리·의무 및 행사방법)
                        </h2>
                        <p>이용자는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다. 권리 행사는 회사에 대해 서면, 전자우편 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
                            제8조 (개인정보의 안전성 확보 조치)
                        </h2>
                        <ul className="space-y-2 list-disc pl-5 marker:text-indigo-500">
                            <li>정기적인 자체 감사 실시</li>
                            <li>개인정보 취급 직원의 최소화 및 교육</li>
                            <li>해킹 등에 대비한 기술적 대책 (SSL 암호화 통신 등)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
                            제9조 (개인정보 자동 수집 장치의 설치·운영)
                        </h2>
                        <p>회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다. 이용자는 웹 브라우저 설정 메뉴를 통해 쿠키 저장을 거부할 수 있습니다.</p>
                    </section>

                    <section className="bg-slate-900/50 p-6 rounded-2xl border border-indigo-500/20">
                        <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
                            제10조 (개인정보 보호책임자)
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-slate-400">성명</p>
                                <p className="text-white font-bold">박원영</p>
                            </div>
                            <div>
                                <p className="text-slate-400">직책</p>
                                <p className="text-white font-bold">CEO</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-slate-400">연락처 (이메일)</p>
                                <p className="text-white font-bold">nextidealab.ai@gmail.com</p>
                            </div>
                        </div>
                    </section>

                    <footer className="pt-8 border-t border-slate-700 text-sm text-slate-500 italic">
                        공고일자: 2026년 1월 12일 / 시행일자: 2026년 1월 12일
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
