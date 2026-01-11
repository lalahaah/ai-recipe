import { useState, useRef, useEffect } from 'react';
import { X, User, MessageSquare, Camera } from 'lucide-react';
import { auth, db, storage } from '../lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProfileEditModal = ({ isOpen, onClose, user, onProfileUpdate }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        displayName: '',
        bio: '',
        photoURL: ''
    });

    useEffect(() => {
        if (isOpen && user) {
            loadUserProfile();
        }
    }, [isOpen, user]);

    const loadUserProfile = async () => {
        try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                const data = userDoc.data();
                setFormData({
                    displayName: data.displayName || '',
                    bio: data.bio || '',
                    photoURL: data.photoURL || ''
                });
            }
        } catch (err) {
            console.error("Error loading profile:", err);
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                setLoading(true);
                // Base64를 Blob으로 변환
                const reader = new FileReader();
                reader.onloadend = async () => {
                    const response = await fetch(reader.result);
                    const blob = await response.blob();

                    // Storage에 업로드
                    const fileName = `profile_${user.uid}_${Date.now()}.${blob.type.split('/')[1]}`;
                    const storageRef = ref(storage, `profiles/${fileName}`);
                    await uploadBytes(storageRef, blob);

                    // URL 가져오기
                    const photoURL = await getDownloadURL(storageRef);
                    setFormData({ ...formData, photoURL });
                };
                reader.readAsDataURL(file);
            } catch (err) {
                console.error("Error uploading photo:", err);
                setError("프로필 사진 업로드에 실패했습니다.");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await setDoc(doc(db, 'users', user.uid), {
                displayName: formData.displayName,
                bio: formData.bio,
                photoURL: formData.photoURL,
                email: user.email,
                updatedAt: new Date().toISOString()
            }, { merge: true });

            onProfileUpdate();
            onClose();
        } catch (err) {
            console.error("Error saving profile:", err);
            setError("프로필 저장에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-slate-800 rounded-2xl w-full max-w-md border border-slate-700 shadow-2xl p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">프로필 수정</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 프로필 사진 */}
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-900 border-2 border-slate-700">
                                {formData.photoURL ? (
                                    <img src={formData.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <User className="text-slate-600" size={40} />
                                    </div>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition-colors"
                            >
                                <Camera size={16} />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        <p className="text-slate-500 text-xs mt-2">프로필 사진 변경</p>
                    </div>

                    {/* 별명 */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">별명</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                required
                                placeholder="나만의 별명을 입력하세요"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500"
                                value={formData.displayName}
                                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* 인사말 */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">인사말</label>
                        <div className="relative">
                            <MessageSquare className="absolute left-3 top-3 text-slate-500" size={18} />
                            <textarea
                                placeholder="나를 소개하는 한마디를 적어보세요"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white h-24 resize-none focus:outline-none focus:border-indigo-500"
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors"
                    >
                        {loading ? "저장 중..." : "프로필 저장"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileEditModal;
