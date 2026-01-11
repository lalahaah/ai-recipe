import { Mail, MapPin, Phone, Building2 } from 'lucide-react';

const Footer = ({ setCurrentView, language, setLanguage, t }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 border-t border-slate-800 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* 상단 링크 섹션 */}
                <div className="flex flex-wrap justify-start gap-4 md:gap-8 mb-8">
                    <a href="#" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">
                        {t.footer.privacy}
                    </a>
                    <a href="#" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">
                        {t.footer.terms}
                    </a>
                    <a href="#" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">
                        {t.footer.report}
                    </a>
                    <button
                        onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
                        className="text-sm font-bold text-slate-300 hover:text-white transition-colors"
                    >
                        {t.footer.language}
                    </button>
                </div>

                {/* 사업자 정보 섹션 - 한국어일 때만 표시 */}
                {language === 'ko' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {/* 왼쪽: 회사 기본 정보 */}
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <Building2 size={16} className="text-slate-500 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-slate-300 font-medium">{t.footer.company}</p>
                                    <p className="text-xs text-slate-500">{t.footer.ceo}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin size={16} className="text-slate-500 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-slate-500">{t.footer.address}</p>
                            </div>
                        </div>

                        {/* 오른쪽: 연락처 정보 */}
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <Phone size={16} className="text-slate-500 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-slate-500">{t.footer.phone}</p>
                            </div>

                            <div className="flex items-start gap-3">
                                <Mail size={16} className="text-slate-500 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-slate-500">{t.footer.email}</p>
                            </div>

                            <div className="flex items-start gap-3">
                                <Building2 size={16} className="text-slate-500 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-slate-500">{t.footer.businessNumber}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* 하단: 로고 및 Copyright */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-800">
                    <div
                        className="flex items-center gap-1.5 mb-4 md:mb-0 cursor-pointer group"
                        onClick={() => {
                            setCurrentView('home');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        <img src="/logo.svg" alt="AI-Recipe Logo" className="w-8 h-8 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-black text-white tracking-tighter">
                            AI<span className="text-orange-500">RECIPE</span>
                        </span>
                    </div>

                    <p className="text-xs text-slate-500">
                        © {currentYear} {t.footer.copyright}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
