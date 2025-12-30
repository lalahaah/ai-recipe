import { LayoutDashboard } from 'lucide-react';
import PromptCard from './PromptCard';

const Dashboard = ({ user, posts, onDelete, onCopy, onLike, likedPosts, onPostClick }) => {
    // 현재 로그인한 사용자의 ID(이메일 앞부분)와 일치하는 글만 필터링
    const myPosts = posts.filter(p => p.author === user.email.split('@')[0]);
    const totalLikes = myPosts.reduce((sum, post) => sum + (post.likes || 0), 0);

    return (
        <div className="animate-fade-in">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 mb-8 border border-slate-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-3xl transform translate-x-20 -translate-y-20"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">My Recipes</h2>
                        <p className="text-slate-400">안녕하세요, <span className="text-indigo-400 font-semibold">{user.email.split('@')[0]}</span>님!</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 text-center min-w-[120px]">
                            <p className="text-slate-400 text-xs mb-1 uppercase tracking-wider">My Recipes</p>
                            <p className="text-2xl font-bold text-white">{myPosts.length}</p>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 text-center min-w-[120px]">
                            <p className="text-slate-400 text-xs mb-1 uppercase tracking-wider">Total Likes</p>
                            <p className="text-2xl font-bold text-pink-500">{totalLikes}</p>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <LayoutDashboard className="text-indigo-500" size={20} /> 내 작품 관리
            </h3>

            {myPosts.length > 0 ? (
                <div className="masonry-grid">
                    {myPosts.map(post => (
                        <PromptCard
                            key={post.id}
                            post={post}
                            onCopy={onCopy}
                            onLike={onLike}
                            isLiked={likedPosts.includes(post.id)}
                            onDetailClick={() => onPostClick(post)}
                            isDashboard={true}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 border border-dashed border-slate-700 rounded-xl bg-slate-900/30">
                    <p className="text-slate-500 mb-2">아직 등록한 작품이 없습니다.</p>
                    <p className="text-slate-600 text-sm">첫 번째 AI 아트를 공유해보세요!</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
