import { useState, useEffect } from 'react';
import { X, User, Heart, Image as ImageIcon, Video } from 'lucide-react';
import PromptCard from './PromptCard';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

const ArtistGalleryModal = ({ isOpen, onClose, authorName, posts, onCopy, onLike, likedPosts, onPostClick, authorProfiles, language, t }) => {
    const [authorProfile, setAuthorProfile] = useState(null);

    // 작가의 작품 필터링
    const artistPosts = posts.filter(p => p.author === authorName);
    const totalLikes = artistPosts.reduce((sum, post) => sum + (post.likes || 0), 0);

    const imageCount = artistPosts.filter(p => p.type === 'image').length;
    const videoCount = artistPosts.filter(p => p.type === 'video').length;

    useEffect(() => {
        if (isOpen && authorName) {
            loadAuthorProfile();
        }
    }, [isOpen, authorName]);

    const loadAuthorProfile = async () => {
        try {
            // posts에서 이 작가의 게시물 찾기
            const authorPost = posts.find(p => p.author === authorName);
            if (!authorPost) return;

            // 이메일에서 UID를 찾아야 하는데, 현재는 email을 직접 알 수 없으므로
            // 일단 기본 프로필 정보를 표시
            setAuthorProfile({
                displayName: authorName,
                bio: `${authorName}님의 작품 갤러리`,
                photoURL: null
            });
        } catch (err) {
            console.error("Error loading author profile:", err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
            <div className="bg-slate-800 rounded-2xl w-full max-w-6xl border border-slate-700 shadow-2xl my-8">
                {/* 헤더 */}
                <div className="flex justify-between items-center p-6 border-b border-slate-700">
                    <h2 className="text-2xl font-bold text-white">{language === 'ko' ? '작가 갤러리' : 'Artist Gallery'}</h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* 작가 프로필 카드 */}
                <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        {/* 프로필 사진 */}
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-900 border-4 border-slate-700 shadow-lg flex-shrink-0">
                            {authorProfile?.photoURL ? (
                                <img src={authorProfile.photoURL} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                                    <User className="text-white" size={32} />
                                </div>
                            )}
                        </div>

                        {/* 작가 정보 */}
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-2xl font-bold text-white mb-2">
                                {authorProfile?.displayName || authorName}
                            </h3>
                            <p className="text-slate-400 mb-4">
                                {authorProfile?.bio || `${authorName}님의 AI 아트 컬렉션`}
                            </p>

                            {/* 통계 */}
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <div className="bg-slate-900/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-700">
                                    <span className="text-slate-400 text-sm">{language === 'ko' ? '전체 작품' : 'Total'}</span>
                                    <span className="ml-2 text-white font-bold">{artistPosts.length}</span>
                                </div>
                                <div className="bg-slate-900/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-700">
                                    <ImageIcon className="inline-block text-blue-400 mr-1" size={16} />
                                    <span className="text-slate-400 text-sm">{language === 'ko' ? '이미지' : 'Images'}</span>
                                    <span className="ml-2 text-blue-400 font-bold">{imageCount}</span>
                                </div>
                                <div className="bg-slate-900/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-700">
                                    <Video className="inline-block text-purple-400 mr-1" size={16} />
                                    <span className="text-slate-400 text-sm">{language === 'ko' ? '영상' : 'Videos'}</span>
                                    <span className="ml-2 text-purple-400 font-bold">{videoCount}</span>
                                </div>
                                <div className="bg-slate-900/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-700">
                                    <Heart className="inline-block text-pink-400 mr-1" size={16} />
                                    <span className="text-slate-400 text-sm">{language === 'ko' ? '받은 좋아요' : 'Total Likes'}</span>
                                    <span className="ml-2 text-pink-400 font-bold">{totalLikes}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 작품 그리드 */}
                <div className="p-6 max-h-[600px] overflow-y-auto">
                    {artistPosts.length > 0 ? (
                        <div className="masonry-grid">
                            {artistPosts.map(post => (
                                <PromptCard
                                    key={post.id}
                                    post={post}
                                    onCopy={onCopy}
                                    onLike={onLike}
                                    isLiked={likedPosts.includes(post.id)}
                                    onDetailClick={() => {
                                        onClose();
                                        onPostClick(post);
                                    }}
                                    isDashboard={false}
                                    authorProfile={authorProfiles[post.author]}
                                    language={language}
                                    t={t}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-slate-500">아직 등록된 작품이 없습니다.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArtistGalleryModal;
