import { useState } from 'react';
import { Heart, Unlock, Lock, Copy, Trash2, Zap } from 'lucide-react';

const PromptCard = ({ post, onLike, onCopy, isDashboard, onDelete, isLiked, onDetailClick, onAuthorClick, authorProfile, language, t }) => {
    const [showPrompt, setShowPrompt] = useState(false);

    return (
        <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-700 flex flex-col h-full animate-fade-in relative group/card">
            {isDashboard && (
                <button
                    onClick={() => onDelete(post.id)}
                    className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-lg z-20 opacity-0 group-hover/card:opacity-100 transition-opacity"
                    title="삭제하기"
                >
                    <Trash2 size={16} />
                </button>
            )}
            <div className="relative group cursor-pointer overflow-hidden" onClick={onDetailClick}>
                {(post.type || 'image') === 'image' ? (
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=AI+Image+Error' }}
                    />
                ) : (
                    <div className="w-full h-56 md:h-64 bg-slate-900 border-b border-slate-700/50 flex items-center justify-center">
                        <video
                            src={post.image}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            autoPlay
                            muted
                            loop
                            playsInline
                            onError={(e) => { e.target.parentElement.innerHTML = '<div class="text-slate-500 text-xs">Video Error</div>' }}
                        />
                    </div>
                )}
                {post.is_premium && (
                    <div className="absolute top-3 left-3 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-md z-10">
                        <Zap size={10} fill="black" /> PREMIUM
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-medium">{post.model}</p>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="text-lg font-bold text-white truncate pr-2">{post.title}</h3>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onAuthorClick && onAuthorClick(post.author);
                            }}
                            className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 text-xs mt-1 transition-colors cursor-pointer"
                        >
                            {authorProfile?.photoURL ? (
                                <img
                                    src={authorProfile.photoURL}
                                    alt={authorProfile.displayName || post.author}
                                    className="w-5 h-5 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
                                    {(authorProfile?.displayName || post.author).charAt(0).toUpperCase()}
                                </div>
                            )}
                            <span>{authorProfile?.displayName || post.author}</span>
                        </button>
                    </div>
                    <button
                        onClick={() => onLike(post.id, post.likes)}
                        className={`flex items-center gap-1 transition-colors group ${!isDashboard ? 'hover:text-pink-500' : 'hover:scale-105'} ${isLiked ? 'text-pink-500' : 'text-slate-400'}`}
                    >
                        <Heart size={18} className={`transition-transform group-active:scale-125 ${isLiked ? 'fill-pink-500' : ''}`} />
                        <span className="text-sm font-medium">{post.likes}</span>
                    </button>
                </div>

                <div className={`mt-auto bg-slate-900/50 rounded-lg p-3 border border-slate-700/50 transition-all duration-300 ${showPrompt ? 'bg-slate-900' : ''}`}>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{t?.promptCard?.promptRecipe || 'PROMPT RECIPE'}</span>
                        <button
                            onClick={() => setShowPrompt(!showPrompt)}
                            className="text-slate-400 hover:text-white transition-colors"
                        >
                            {showPrompt ? <Unlock size={14} /> : <Lock size={14} />}
                        </button>
                    </div>

                    {showPrompt ? (
                        <div className="animate-fade-in">
                            <p className="text-slate-300 text-sm leading-relaxed mb-3 break-words font-mono bg-black/30 p-2 rounded">
                                {post.prompt}
                            </p>
                            <button
                                onClick={() => onCopy(post.prompt, post)}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2 px-3 rounded flex items-center justify-center gap-2 transition-colors"
                            >
                                <Copy size={12} /> {t?.promptCard?.copy || '복사'}
                            </button>
                        </div>
                    ) : (
                        <div onClick={() => setShowPrompt(true)} className="cursor-pointer group">
                            <div className="h-12 w-full bg-slate-700/30 rounded flex items-center justify-center backdrop-blur-sm group-hover:bg-slate-700/50 transition-colors">
                                <span className="text-xs text-slate-500 flex items-center gap-2 group-hover:text-indigo-400">
                                    <Lock size={12} /> {t?.promptCard?.unlockRecipe || '레시피 잠금 해제 (Click)'}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PromptCard;
