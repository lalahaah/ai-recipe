import { Search, Zap, Sparkles, Image as ImageIcon, MousePointer2, Cpu } from 'lucide-react';

const Hero = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#020617] pt-20">
            {/* Dynamic Background Elements (Spline Style) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-float opacity-50"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[130px] animate-float opacity-40" style={{ animationDelay: '2s', animationDuration: '10s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.05]"
                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-20">
                <div className="flex flex-col items-center text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6 md:mb-8 animate-fade-in hover:scale-105 transition-transform cursor-default">
                        <Cpu size={14} className="text-indigo-400" />
                        <span className="text-[10px] sm:text-xs font-black text-indigo-300 uppercase tracking-[0.2em]">Next-Gen Prompt Engineering</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-4xl sm:text-5xl md:text-8xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-[1] md:leading-[0.9] animate-fade-in relative">
                        상상을 현실로 만드는 <br />
                        <span className="text-gradient">
                            최고의 AI 레시피
                        </span>
                        <div className="absolute -top-4 -right-4 md:-top-10 md:-right-10 animate-bounce">
                            <Sparkles size={32} className="text-yellow-400 opacity-50 md:w-10 md:h-10" />
                        </div>
                    </h1>

                    {/* Description */}
                    <p className="max-w-xl text-base md:text-xl text-slate-400 mb-10 md:mb-12 leading-relaxed animate-fade-in font-medium px-4 md:px-0" style={{ animationDelay: '0.1s' }}>
                        검증된 프롬프트 하나로 당신의 AI 창작물 퀄리티를 혁신하세요. <br className="hidden md:block" />
                        전 세계 크리에이터들의 노하우를 지금 바로 내 것으로.
                    </p>

                    {/* Futuristic Search Bar */}
                    <div className="w-full max-w-3xl relative animate-fade-in group px-2 sm:px-0" style={{ animationDelay: '0.2s' }}>
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[24px] md:rounded-[28px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative flex items-center bg-[#0f172a] rounded-[20px] md:rounded-[24px] border border-white/5 p-1.5 md:p-2 shadow-2xl">
                            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 text-slate-500">
                                <Search className="w-5 h-5 md:w-[22px] md:h-[22px]" />
                            </div>
                            <input
                                type="text"
                                placeholder="어떤 스타일의 프롬프트를 찾고 있나요?"
                                className="flex-1 bg-transparent border-none text-base md:text-xl placeholder:text-slate-600 focus:ring-0 px-2 font-bold"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="hidden sm:flex items-center gap-2 bg-white text-black px-6 py-3 rounded-2xl font-black hover:bg-slate-200 transition-colors">
                                Explore Now
                            </button>
                        </div>
                    </div>

                    {/* Stats/Features */}
                    <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        {[
                            { icon: <Zap size={20} />, label: "Instant Access", color: "text-amber-400" },
                            { icon: <ImageIcon size={20} />, label: "HD Previews", color: "text-emerald-400" },
                            { icon: <MousePointer2 size={20} />, label: "One-Click Copy", color: "text-indigo-400" }
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center gap-3 group cursor-default">
                                <div className={`p-3 rounded-2xl glass border border-white/5 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>
                                <span className="text-sm font-black text-slate-300 group-hover:text-white transition-colors">{feature.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;

