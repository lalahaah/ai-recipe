import { X, Copy, Heart, Zap, User, ExternalLink } from 'lucide-react';

const DetailModal = ({ isOpen, post, onClose, onCopy, onLike, isLiked, language, t, authorProfile }) => {
    if (!isOpen || !post) return null;

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in">
            <div className="bg-slate-800 rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden border border-slate-700 shadow-2xl flex flex-col md:flex-row">
                {/* Left: Image Section */}
                <div className="flex-1 bg-black/40 flex items-center justify-center relative group min-h-[300px] md:min-h-0">
                    {(post.type || 'image') === 'image' ? (
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <video
                            src={post.image}
                            className="w-full h-full object-contain"
                            controls
                            autoPlay
                            muted
                            loop
                        />
                    )}
                    <button
                        onClick={onClose}
                        className="absolute top-4 left-4 md:hidden bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Right: Info Section */}
                <div className="w-full md:w-[400px] lg:w-[450px] bg-slate-800 p-5 md:p-10 flex flex-col border-t md:border-t-0 md:border-l border-slate-700 overflow-y-auto">
                    <div className="flex justify-between items-start mb-6 md:mb-8">
                        <h2 className="text-xl md:text-3xl font-bold text-white tracking-tight leading-tight">{post.title}</h2>
                        <button
                            onClick={onClose}
                            className="hidden md:flex text-slate-400 hover:text-white transition-colors p-1"
                        >
                            <X size={28} />
                        </button>
                    </div>

                    <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400">
                            <User className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <div>
                            <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">{t.detail.creator}</p>
                            <p className="text-white text-sm md:text-base font-medium">{authorProfile?.displayName || post.author}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                        <div className="bg-slate-900/50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-slate-700/50">
                            <p className="text-slate-500 text-[10px] uppercase tracking-wider font-bold mb-1">{t.detail.aiModel}</p>
                            <div className="flex items-center gap-1.5 md:gap-2 text-indigo-400">
                                <Zap className="w-3 h-3 md:w-3.5 md:h-3.5" />
                                <span className="text-xs md:text-sm font-semibold truncate">{post.model}</span>
                            </div>
                        </div>
                        <div
                            className="bg-slate-900/50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-slate-700/50 cursor-pointer group/like"
                            onClick={() => onLike(post.id, post.likes)}
                        >
                            <p className="text-slate-500 text-[10px] uppercase tracking-wider font-bold mb-1">{t.detail.appreciation}</p>
                            <div className="flex items-center gap-1.5 md:gap-2">
                                <Heart
                                    className={`w-3 h-3 md:w-3.5 md:h-3.5 transition-all ${isLiked ? 'fill-pink-500 text-pink-500 scale-110' : 'text-slate-400 group-hover/like:text-pink-400'}`}
                                />
                                <span className={`text-xs md:text-sm font-semibold ${isLiked ? 'text-pink-500' : 'text-slate-300'}`}>{post.likes}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-grow">
                        <div className="flex justify-between items-center mb-3">
                            <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">{t.detail.promptRecipe}</label>
                            <button
                                onClick={() => onCopy(post.prompt)}
                                className="text-indigo-400 hover:text-indigo-300 text-[10px] md:text-xs font-bold flex items-center gap-1.5 transition-colors"
                            >
                                <Copy className="w-2.5 h-2.5 md:w-3 md:h-3" /> {t.detail.copyPrompt}
                            </button>
                        </div>
                        <div className="bg-slate-900 rounded-xl md:rounded-2xl p-4 md:p-5 border border-slate-700/50 font-mono text-[13px] md:text-sm leading-relaxed text-slate-300 break-words mb-6 md:mb-8 relative group/recipe">
                            {post.prompt}
                            <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover/recipe:opacity-100 transition-opacity rounded-xl md:rounded-2xl pointer-events-none"></div>
                        </div>
                    </div>

                    <div className="pt-4 md:pt-6 border-t border-slate-700/50 mt-auto">
                        <button
                            onClick={() => window.open(post.image, '_blank')}
                            className="w-full bg-slate-700 hover:bg-slate-600 text-white text-sm md:text-base font-bold py-3 md:py-4 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
                        >
                            <ExternalLink className="w-4 h-4 md:w-[18px] md:h-[18px]" /> {(post.type || 'image') === 'image' ? t.detail.openImage : t.detail.openVideo}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailModal;
