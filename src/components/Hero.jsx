import { Search, Zap, Sparkles, Image as ImageIcon } from 'lucide-react';

const Hero = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="relative overflow-hidden bg-slate-900 pt-16 pb-20 lg:pt-24 lg:pb-32">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate_x-1/2 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6 animate-fade-in">
                        <Sparkles size={14} className="text-indigo-400" />
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">The Ultimate Prompt Library</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight animate-fade-in">
                        상상을 현실로 만드는 <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                            최고의 AI 레시피
                        </span>
                    </h1>

                    <p className="text-lg text-slate-400 mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        검증된 프롬프트 하나로 당신의 AI 창작물 퀄리티를 혁신하세요. <br className="hidden md:block" />
                        전 세계 크리에이터들의 노하우를 지금 바로 내 것으로.
                    </p>

                    <div className="relative max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <input
                            type="text"
                            placeholder="어떤 스타일의 이미지를 찾고 있나요?"
                            className="w-full bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl py-5 pl-14 pr-6 text-white text-lg focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-2xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="mt-8 flex flex-wrap justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        <div className="flex items-center gap-2 text-slate-500">
                            <Zap size={14} />
                            <span className="text-sm font-medium">Fast Copy-Paste</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                            <ImageIcon size={14} />
                            <span className="text-sm font-medium">Real-time Preview</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                            <Sparkles size={14} />
                            <span className="text-sm font-medium">Model Specific</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>
    );
};

export default Hero;
