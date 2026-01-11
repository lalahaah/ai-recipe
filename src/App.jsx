import { useState, useEffect } from 'react';
import { LayoutGrid, LayoutDashboard, Search, Plus, User, LogOut, Image as ImageIcon, Video } from 'lucide-react';
import { auth, db, storage } from './lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { translations } from './lib/translations';

// Components
import Toast from './components/Toast';
import PromptCard from './components/PromptCard';
import LoginModal from './components/LoginModal';
import UploadModal from './components/UploadModal';
import Dashboard from './components/Dashboard';
import DetailModal from './components/DetailModal';
import ArtistGalleryModal from './components/ArtistGalleryModal';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';

const App = () => {
  const [session, setSession] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'dashboard'

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isArtistGalleryOpen, setIsArtistGalleryOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [authorProfiles, setAuthorProfiles] = useState({});
  const [language, setLanguage] = useState('ko'); // 'ko' | 'en'
  const t = translations[language]; // current translations

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setSession(user ? { user } : null);
      if (!user) setCurrentView('home');
    });

    fetchPosts();

    return () => unsubscribe();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const q = query(collection(db, 'posts'), orderBy('created_at', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(data);

      // 작가 프로필 정보 로드
      await loadAuthorProfiles(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setToast("데이터를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadAuthorProfiles = async (postsData) => {
    try {
      // 모든 고유한 작가 이름과 uid 추출
      const uniqueAuthors = [...new Set(postsData.map(post => post.author))];

      const profilesObj = {};

      // 각 작가의 프로필 정보를 병렬로 로드
      await Promise.all(
        uniqueAuthors.map(async (author) => {
          try {
            // posts에서 이 작가의 게시물 찾기 (uid 얻기)
            const authorPost = postsData.find(p => p.author === author);
            if (!authorPost || !authorPost.authorUid) {
              // uid가 없으면 기본 정보만 저장
              profilesObj[author] = {
                displayName: author,
                photoURL: null,
                uid: null
              };
              return;
            }

            // Firestore의 users 컬렉션에서 프로필 정보 로드
            const userDoc = await getDoc(doc(db, 'users', authorPost.authorUid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              profilesObj[author] = {
                displayName: userData.displayName || author,
                photoURL: userData.photoURL || null,
                uid: authorPost.authorUid
              };
            } else {
              // 프로필이 없으면 기본 정보 사용
              profilesObj[author] = {
                displayName: author,
                photoURL: null,
                uid: authorPost.authorUid
              };
            }
          } catch (err) {
            console.error(`Error loading profile for ${author}:`, err);
            profilesObj[author] = {
              displayName: author,
              photoURL: null,
              uid: null
            };
          }
        })
      );

      setAuthorProfiles(profilesObj);
    } catch (error) {
      console.error("Error loading author profiles:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
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
    // 로그인 검증
    if (!session) {
      setToast("좋아요를 누르려면 로그인이 필요합니다.");
      setIsLoginOpen(true);
      return;
    }

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
      const postRef = doc(db, 'posts', id);
      await updateDoc(postRef, { likes: newLikes });
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


  const handleCopy = (text, post) => {
    try {
      navigator.clipboard.writeText(text);
      // fallback for older browsers if needed, but modern browsers support clipboard API
    } catch (err) {
      console.log('Clipboard access error', err);
    }

    // 작성자의 복사 횟수 카운트 증가 (비로그인 유저도 가능)
    if (post && authorProfiles[post.author]?.uid) {
      const authorUid = authorProfiles[post.author].uid;
      const key = `copyCount_${authorUid}`;
      const currentCount = parseInt(localStorage.getItem(key) || '0');
      localStorage.setItem(key, (currentCount + 1).toString());
    }

    setToast("프롬프트가 클립보드에 복사되었습니다!");
  };

  const handleDelete = async (id) => {
    if (!confirm("정말로 이 게시물을 삭제하시겠습니까?")) return;

    const previousPosts = [...posts];
    setPosts(posts.filter(p => p.id !== id));

    try {
      await deleteDoc(doc(db, 'posts', id));
      setToast("게시물이 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting post:", error);
      setToast("삭제 중 오류가 발생했습니다.");
      setPosts(previousPosts);
    }
  };

  const [activeCategory, setActiveCategory] = useState('image'); // 'image' | 'video'

  const handleUpload = async (formData) => {
    if (!session) {
      setToast("로그인이 필요한 기능입니다.");
      setIsLoginOpen(true);
      return;
    }

    setIsUploading(true);
    const authorName = session.user.email.split('@')[0];

    try {
      let imageUrl = formData.image;

      // Base64 이미지인 경우 Firebase Storage에 업로드
      if (formData.image.startsWith('data:')) {
        // Base64를 Blob으로 변환
        const response = await fetch(formData.image);
        const blob = await response.blob();

        // 고유한 파일명 생성
        const fileExtension = blob.type.split('/')[1];
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExtension}`;
        const storageRef = ref(storage, `posts/${fileName}`);

        // Storage에 업로드
        await uploadBytes(storageRef, blob);

        // 다운로드 URL 가져오기
        imageUrl = await getDownloadURL(storageRef);
      }

      const newPost = {
        title: formData.title,
        prompt: formData.prompt,
        image: imageUrl,
        model: formData.model,
        type: formData.type || 'image',
        author: authorName,
        authorUid: session.user.uid,
        likes: 0,
        is_premium: false,
        created_at: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'posts'), newPost);

      setPosts([{ id: docRef.id, ...newPost }, ...posts]);
      setIsUploadOpen(false);
      setToast("성공적으로 등록되었습니다!");
      setActiveCategory(formData.type || 'image'); // 업로드한 카테고리로 이동
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

  const handleAuthorClick = (authorName) => {
    setSelectedAuthor(authorName);
    setIsArtistGalleryOpen(true);
  };

  const onPostClick = (post) => {
    setSelectedPost(post);
    setIsDetailOpen(true);
  };

  const filteredPosts = posts.filter(post => {
    const s = searchTerm.toLowerCase();
    const matchesSearch = (
      post.title?.toLowerCase().includes(s) ||
      post.prompt?.toLowerCase().includes(s) ||
      post.model?.toLowerCase().includes(s)
    );

    // 만약 검색어가 비어있지 않다면, 모든 카테고리에서 검색 결과를 보여줄지, 
    // 아니면 현재 탭 내에서만 보여줄지 결정해야 합니다.
    // 사용자 요청은 "영상 부분도 검색될 수 있게 해달라"는 것이므로, 
    // 검색어가 있을 때는 카테고리 필터를 완화하거나 스마트하게 전환하는 로직을 추가합니다.
    const matchesCategory = searchTerm ? true : (post.type || 'image') === activeCategory;

    return matchesSearch && matchesCategory;
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
        language={language}
        setLanguage={setLanguage}
        t={t}
      />

      {currentView === 'home' && (
        <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} language={language} t={t} />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {currentView === 'home' ? (
          <>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
              <div className="text-center md:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">{t.main.title}</h1>
                <p className="text-slate-400 text-sm md:text-base font-medium">{t.main.subtitle}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-3">
                {/* Category Tabs */}
                <div className="flex p-1 bg-slate-800 rounded-xl border border-slate-700 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveCategory('image')}
                    className={`flex-1 sm:flex-none px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-black transition-all flex items-center justify-center gap-2 ${activeCategory === 'image' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                  >
                    <ImageIcon className="w-3.5 h-3.5 md:w-4 md:h-4" /> {t.main.categories.images}
                  </button>
                  <button
                    onClick={() => setActiveCategory('video')}
                    className={`flex-1 sm:flex-none px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-black transition-all flex items-center justify-center gap-2 ${activeCategory === 'video' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                  >
                    <Video className={`w-3.5 h-3.5 md:w-4 md:h-4 ${activeCategory === 'video' ? 'text-white' : 'text-slate-400'}`} /> {t.main.categories.videos}
                  </button>
                </div>

                <div className="h-10 w-px bg-slate-700 hidden md:block"></div>

                <select className="w-full sm:w-auto bg-slate-800 border border-slate-700 text-slate-300 text-sm font-bold rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition-colors">
                  <option>{t.main.sort.latest}</option>
                  <option>{t.main.sort.popular}</option>
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-20 flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-6"></div>
                <p className="text-slate-400 font-bold">새로운 레시피를 가져오는 중...</p>
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
                      onAuthorClick={handleAuthorClick}
                      authorProfile={authorProfiles[post.author]}
                      language={language}
                      t={t}
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
            authorProfiles={authorProfiles}
            language={language}
            t={t}
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
        language={language}
        t={t}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={() => {
          setToast("환영합니다!");
          setIsLoginOpen(false);
        }}
        language={language}
        t={t}
      />

      <ArtistGalleryModal
        isOpen={isArtistGalleryOpen}
        onClose={() => setIsArtistGalleryOpen(false)}
        authorName={selectedAuthor}
        posts={posts}
        onCopy={handleCopy}
        onLike={handleLike}
        likedPosts={likedPosts}
        onPostClick={onPostClick}
        authorProfiles={authorProfiles}
        language={language}
        t={t}
      />

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSubmit={handleUpload}
        isUploading={isUploading}
        language={language}
        t={t}
      />

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <Footer setCurrentView={setCurrentView} currentView={currentView} language={language} setLanguage={setLanguage} t={t} />
    </div>
  );
};

export default App;
