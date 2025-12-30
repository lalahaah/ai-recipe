import { X, Copy, Heart, Zap, User, ExternalLink } from 'lucide-react';

const DetailModal = ({ isOpen, post, onClose, onCopy, onLike, isLiked }) => {
    if (!isOpen || !post) return null;

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in">
            <div className="bg-slate-800 rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden border border-slate-700 shadow-2xl flex flex-col md:flex-row">
                {/* Left: Image Section */}
                <div className="flex-1 bg-black/40 flex items-center justify-center relative group min-h-[300px] md:min-h-0">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-contain"
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-4 left-4 md:hidden bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Right: Info Section */}
                <div className="w-full md:w-[400px] lg:w-[450px] bg-slate-800 p-6 md:p-10 flex flex-col border-t md:border-t-0 md:border-l border-slate-700 overflow-y-auto">
                    <div className="flex justify-between items-start mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">{post.title}</h2>
                        <button
                            onClick={onClose}
                            className="hidden md:flex text-slate-400 hover:text-white transition-colors p-1"
                        >
                            <X size={28} />
                        </button>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400">
                            <User size={20} />
                        </div>
                        <div>
                            <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">Creator</p>
                            <p className="text-white font-medium">{post.author}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/50">
                            <p className="text-slate-500 text-[10px] uppercase tracking-wider font-bold mb-1">AI Model</p>
                            <div className="flex items-center gap-2 text-indigo-400">
                                <Zap size={14} />
                                <span className="text-sm font-semibold">{post.model}</span>
                            </div>
                        </div>
                        <div
                            className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/50 cursor-pointer group/like"
                            onClick={() => onLike(post.id, post.likes)}
                        >
                            <p className="text-slate-500 text-[10px] uppercase tracking-wider font-bold mb-1">Appreciation</p>
                            <div className="flex items-center gap-2">
                                <Heart
                                    size={14}
                                    className={`transition-all ${isLiked ? 'fill-pink-500 text-pink-500 scale-110' : 'text-slate-400 group-hover/like:text-pink-400'}`}
                                />
                                <span className={`text-sm font-semibold ${isLiked ? 'text-pink-500' : 'text-slate-300'}`}>{post.likes}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-grow">
                        <div className="flex justify-between items-center mb-3">
                            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Prompt Recipe</label>
                            <button
                                onClick={() => onCopy(post.prompt)}
                                className="text-indigo-400 hover:text-indigo-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
                            >
                                <Copy size={12} /> Copy Prompt
                            </button>
                        </div>
                        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-700/50 font-mono text-sm leading-relaxed text-slate-300 break-words mb-8 relative group/recipe">
                            {post.prompt}
                            <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover/recipe:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-700/50 mt-auto">
                        <button
                            onClick={() => window.open(post.image, '_blank')}
                            className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
                        >
                            <ExternalLink size={18} /> Open Original Image
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailModal;
