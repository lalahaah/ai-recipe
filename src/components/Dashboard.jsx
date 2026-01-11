import { useState, useEffect } from 'react';
import { LayoutDashboard, User, Edit2, Heart, Copy, Image as ImageIcon, Video } from 'lucide-react';
import PromptCard from './PromptCard';
import ProfileEditModal from './ProfileEditModal';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

const Dashboard = ({ user, posts, onDelete, onCopy, onLike, likedPosts, onPostClick, authorProfiles, language, t }) => {
    const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
    const [userProfile, setUserProfile] = useState(null);

    // 현재 로그인한 사용자의 ID(이메일 앞부분)와 일치하는 글만 필터링
    const myPosts = posts.filter(p => p.author === user.email.split('@')[0]);
    const totalLikes = myPosts.reduce((sum, post) => sum + (post.likes || 0), 0);

    // 작품 수 통계
    const totalWorks = myPosts.length;
    const imageWorks = myPosts.filter(p => p.type === 'image').length;
    const videoWorks = myPosts.filter(p => p.type === 'video').length;

    // 프롬프트 복사 수 (현재는 localStorage에서 카운트, 추후 Firestore로 이전 가능)
    const copyCount = localStorage.getItem(`copyCount_${user.uid}`) || 0;

    useEffect(() => {
        loadUserProfile();
    }, [user]);

    const loadUserProfile = async () => {
        try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                setUserProfile(userDoc.data());
            }
        } catch (err) {
            console.error("Error loading profile:", err);
        }
    };

    const handleProfileUpdate = () => {
        loadUserProfile();
    };

    const displayName = userProfile?.displayName || user.email.split('@')[0];
    const bio = userProfile?.bio || (language === 'ko' ? "안녕하세요! AI Recipe에 오신 것을 환영합니다." : "Welcome to AI Recipe!");
    const photoURL = userProfile?.photoURL;

    return (
        <div className="animate-fade-in">
            {/* 프로필 헤더 */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 mb-8 border border-slate-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-3xl transform translate-x-20 -translate-y-20"></div>

                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        {/* 프로필 사진 */}
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-900 border-4 border-slate-700 shadow-lg">
                                {photoURL ? (
                                    <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                                        <User className="text-white" size={40} />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 프로필 정보 */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                                <h2 className="text-3xl font-bold text-white">{displayName}</h2>
                                <button
                                    onClick={() => setIsProfileEditOpen(true)}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm font-medium"
                                >
                                    <Edit2 size={16} />
                                    {t.dashboard.editProfile}
                                </button>
                            </div>
                            <p className="text-slate-400 mb-4">{bio}</p>
                            <p className="text-slate-500 text-sm">{user.email}</p>
                        </div>
                    </div>

                    {/* 통계 카드 */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
                        <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700 text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <LayoutDashboard className="text-indigo-400" size={20} />
                                <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">{t.dashboard.stats.total}</p>
                            </div>
                            <p className="text-3xl font-bold text-white">{totalWorks}</p>
                        </div>

                        <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700 text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <ImageIcon className="text-blue-400" size={20} />
                                <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">{t.dashboard.stats.images}</p>
                            </div>
                            <p className="text-3xl font-bold text-blue-500">{imageWorks}</p>
                        </div>

                        <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700 text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Video className="text-purple-400" size={20} />
                                <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">{t.dashboard.stats.videos}</p>
                            </div>
                            <p className="text-3xl font-bold text-purple-500">{videoWorks}</p>
                        </div>

                        <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700 text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Heart className="text-pink-400" size={20} />
                                <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">{t.dashboard.stats.likes}</p>
                            </div>
                            <p className="text-3xl font-bold text-pink-500">{totalLikes}</p>
                        </div>

                        <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700 text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Copy className="text-green-400" size={20} />
                                <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">{t.dashboard.stats.copies}</p>
                            </div>
                            <p className="text-3xl font-bold text-green-500">{copyCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 내 작품 관리 */}
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <LayoutDashboard className="text-indigo-500" size={20} /> {t.dashboard.title}
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
                            authorProfile={authorProfiles[post.author]}
                            language={language}
                            t={t}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 border border-dashed border-slate-700 rounded-xl bg-slate-900/30">
                    <p className="text-slate-500 mb-2">아직 등록한 작품이 없습니다.</p>
                    <p className="text-slate-600 text-sm">첫 번째 AI 아트를 공유해보세요!</p>
                </div>
            )}

            {/* 프로필 수정 모달 */}
            <ProfileEditModal
                isOpen={isProfileEditOpen}
                onClose={() => setIsProfileEditOpen(false)}
                user={user}
                onProfileUpdate={handleProfileUpdate}
            />
        </div>
    );
};

export default Dashboard;
