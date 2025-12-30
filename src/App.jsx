import { useState, useEffect } from 'react';
import { LayoutGrid, LayoutDashboard, Search, Plus, User, LogOut, Image as ImageIcon } from 'lucide-react';
import { supabase as _supabase } from './lib/supabase';

// Components
import Toast from './components/Toast';
import PromptCard from './components/PromptCard';
import LoginModal from './components/LoginModal';
import UploadModal from './components/UploadModal';
import Dashboard from './components/Dashboard';
import DetailModal from './components/DetailModal';
import Header from './components/Header';
import Hero from './components/Hero';

const App = () => {
  const [session, setSession] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'dashboard'

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    _supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = _supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) setCurrentView('home'); // 로그아웃 시 홈으로 이동
    });

    fetchPosts();

    return () => subscription.unsubscribe();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await _supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setToast("데이터를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await _supabase.auth.signOut();
    setToast("로그아웃 되었습니다.");
  };

  const [likedPosts, setLikedPosts] = useState(() => {
    const saved = localStorage.getItem('likedPosts');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  }, [likedPosts]);

  const handleLike = async (id, currentLikes) => {
    const isLiked = likedPosts.includes(id);
    const newLikes = isLiked ? Math.max(0, (currentLikes || 0) - 1) : (currentLikes || 0) + 1;

    // UI 낙관적 업데이트
    setPosts(posts.map(post =>
      post.id === id ? { ...post, likes: newLikes } : post
    ));

    if (isLiked) {
      setLikedPosts(likedPosts.filter(postId => postId !== id));
    } else {
      setLikedPosts([...likedPosts, id]);
    }

    try {
      const { error } = await _supabase.from('posts').update({ likes: newLikes }).eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error("Error updating likes:", error);
      setToast("좋아요 반영에 실패했습니다.");
      // 실패 시 롤백
      setPosts(posts.map(post =>
        post.id === id ? { ...post, likes: currentLikes } : post
      ));
      if (isLiked) {
        setLikedPosts([...likedPosts, id]);
      } else {
        setLikedPosts(likedPosts.filter(postId => postId !== id));
      }
    }
  };


  const handleCopy = (text) => {
    try {
      navigator.clipboard.writeText(text);
      // fallback for older browsers if needed, but modern browsers support clipboard API
    } catch (err) {
      console.log('Clipboard access error', err);
    }
    setToast("프롬프트가 클립보드에 복사되었습니다!");
  };

  const handleDelete = async (id) => {
    if (!confirm("정말로 이 게시물을 삭제하시겠습니까?")) return;

    const previousPosts = [...posts];
    setPosts(posts.filter(p => p.id !== id));

    try {
      const { error } = await _supabase.from('posts').delete().eq('id', id);
      if (error) throw error;
      setToast("게시물이 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting post:", error);
      setToast("삭제 중 오류가 발생했습니다.");
      setPosts(previousPosts);
    }
  };

  const handleUpload = async (formData) => {
    if (!session) {
      setToast("로그인이 필요한 기능입니다.");
      setIsLoginOpen(true);
      return;
    }

    setIsUploading(true);
    const authorName = session.user.email.split('@')[0];

    try {
      const { data, error } = await _supabase
        .from('posts')
        .insert([
          {
            title: formData.title,
            prompt: formData.prompt,
            image: formData.image,
            model: formData.model,
            author: authorName,
            likes: 0,
            is_premium: false
          },
        ])
        .select();

      if (error) throw error;

      setPosts([data[0], ...posts]);
      setIsUploadOpen(false);
      setToast("성공적으로 등록되었습니다!");
    } catch (error) {
      console.error("Error uploading post:", error);
      setToast("업로드 중 오류가 발생했습니다: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const onUploadClick = () => {
    if (session) {
      setIsUploadOpen(true);
    } else {
      setToast("로그인 후 업로드할 수 있습니다.");
      setIsLoginOpen(true);
    }
  };

  const onPostClick = (post) => {
    setSelectedPost(post);
    setIsDetailOpen(true);
  };

  const filteredPosts = posts.filter(post => {
    const s = searchTerm.toLowerCase();
    const titleMatch = post.title?.toLowerCase().includes(s);
    const promptMatch = post.prompt?.toLowerCase().includes(s);
    const modelMatch = post.model?.toLowerCase().includes(s);
    return titleMatch || promptMatch || modelMatch;
  });

  return (
    <div className="min-h-screen pb-20 bg-slate-900">
      <Header
        session={session}
        currentView={currentView}
        setCurrentView={setCurrentView}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onUploadClick={onUploadClick}
        onLoginClick={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
      />

      {currentView === 'home' && (
        <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {currentView === 'home' ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">Discover AI Recipes</h1>
                <p className="text-slate-400 text-sm">최고의 프롬프트를 복사해서 바로 사용하세요.</p>
              </div>
              <div className="flex gap-2">
                <select className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-2 focus:outline-none">
                  <option>최신순</option>
                  <option>인기순</option>
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-20 flex flex-col items-center">
                <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500">데이터를 불러오는 중입니다...</p>
              </div>
            ) : (
              <>
                <div className="masonry-grid">
                  {filteredPosts.map(post => (
                    <PromptCard
                      key={post.id}
                      post={post}
                      onLike={handleLike}
                      onCopy={handleCopy}
                      isLiked={likedPosts.includes(post.id)}
                      onDetailClick={() => onPostClick(post)}
                    />
                  ))}
                </div>

                {filteredPosts.length === 0 && (
                  <div className="text-center py-20 border border-dashed border-slate-700 rounded-xl bg-slate-900/50">
                    <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-slate-800 mb-4">
                      <ImageIcon size={32} className="text-slate-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">아직 등록된 레시피가 없습니다</h3>
                    <p className="text-slate-400 mb-6">첫 번째 AI 작품을 등록하고 프롬프트를 공유해보세요!</p>
                    <button
                      onClick={onUploadClick}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
                    >
                      첫 작품 등록하기
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <Dashboard
            user={session.user}
            posts={posts}
            onDelete={handleDelete}
            onCopy={handleCopy}
            onLike={handleLike}
            likedPosts={likedPosts}
            onPostClick={onPostClick}
          />
        )}
      </main>

      <DetailModal
        isOpen={isDetailOpen}
        post={selectedPost}
        onClose={() => setIsDetailOpen(false)}
        onCopy={handleCopy}
        onLike={handleLike}
        isLiked={selectedPost ? likedPosts.includes(selectedPost.id) : false}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={() => {
          setToast("환영합니다!");
          setIsLoginOpen(false);
        }}
      />

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSubmit={handleUpload}
        isUploading={isUploading}
      />

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default App;
