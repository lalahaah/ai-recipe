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

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.prompt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-20 bg-slate-900">
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('home')}>
            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <LayoutGrid size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              AI-Recipe
            </span>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="스타일, 모델, 키워드로 검색..."
              className="w-full bg-slate-800 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={currentView === 'dashboard'}
            />
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentView(currentView === 'home' ? 'dashboard' : 'home')}
                  className={`text-sm font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 ${currentView === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
                >
                  <LayoutDashboard size={18} />
                  <span className="hidden sm:inline">Dashboard</span>
                </button>
                <div className="h-6 w-px bg-slate-700 mx-1"></div>
                <button
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-white transition-colors p-2"
                  title="로그아웃"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="text-slate-400 hover:text-white transition-colors text-sm font-medium hidden sm:flex items-center gap-2"
              >
                <User size={18} /> 로그인
              </button>
            )}

            <button
              onClick={onUploadClick}
              className="bg-white text-slate-900 hover:bg-indigo-50 text-sm font-bold py-2 px-4 rounded-full flex items-center gap-2 transition-colors shadow-lg shadow-indigo-500/20"
            >
              <Plus size={16} /> <span className="hidden sm:inline">업로드</span>
            </button>
          </div>
        </div>
      </header>

      <div className="md:hidden px-4 py-3 bg-slate-900 border-b border-slate-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="검색..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
