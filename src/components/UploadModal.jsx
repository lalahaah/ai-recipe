import { useState, useRef } from 'react';
import { Plus, X, Image as ImageIcon, Video, FileVideo, AlertCircle } from 'lucide-react';

const UploadModal = ({ isOpen, onClose, onSubmit, isUploading }) => {
    const fileInputRef = useRef(null);
    const videoInputRef = useRef(null);
    const [uploadType, setUploadType] = useState('image'); // 'image' | 'video'
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        prompt: '',
        image: '',
        model: 'Midjourney v6.1'
    });

    const imageModels = [
        'Midjourney v6.1', 'Midjourney v6', 'DALL-E 3 (ChatGPT)',
        'Stable Diffusion 3', 'Flux.1 [dev/schnell]',
        'Claude 3.5 Sonnet (Artifacts)', 'Leonardo.ai',
        'Adobe Firefly', 'Niji Journey 6'
    ];

    const videoModels = [
        'Sora (OpenAI)', 'Runway Gen-3 Alpha', 'Luma Dream Machine',
        'Kling AI', 'Pika Art', 'CogVideoX', 'Stable Video Diffusion'
    ];

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (uploadType === 'video' && formData.image.startsWith('data:video') && formData.image.length > 5 * 1024 * 1024 * 1.37) {
            setError("영상 파일 용량이 5MB를 초과했습니다.");
            return;
        }
        onSubmit({ ...formData, type: uploadType });
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            // 용량 체크 (5MB)
            if (type === 'video' && file.size > 5 * 1024 * 1024) {
                setError("영상 파일은 5MB 이하만 업로드 가능합니다.");
                return;
            }

            setError(null);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTypeChange = (type) => {
        setUploadType(type);
        setFormData({
            ...formData,
            image: '',
            model: type === 'image' ? imageModels[0] : videoModels[0]
        });
        setError(null);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-slate-800 rounded-2xl w-full max-w-lg border border-slate-700 shadow-2xl overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-slate-700">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Plus className="text-indigo-500" /> 새 프롬프트 등록
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Tab Switcher */}
                <div className="flex p-1 bg-slate-900 mx-6 mt-6 rounded-xl border border-slate-700">
                    <button
                        onClick={() => handleTypeChange('image')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${uploadType === 'image' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                    >
                        <ImageIcon size={16} /> 이미지
                    </button>
                    <button
                        onClick={() => handleTypeChange('video')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${uploadType === 'video' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                    >
                        <Video size={16} /> 영상
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-xs flex items-center gap-2">
                            <AlertCircle size={14} /> {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">작품 제목</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            placeholder="예: 사이버펑크 고양이"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            {uploadType === 'image' ? '이미지' : '영상'} (URL 또는 파일 업로드)
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                required
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                                placeholder="https://... 또는 우측 버튼으로 업로드"
                                value={formData.image.startsWith('data:') ? '파일 업로드됨' : formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            />
                            <input
                                type="file"
                                ref={uploadType === 'image' ? fileInputRef : videoInputRef}
                                className="hidden"
                                accept={uploadType === 'image' ? "image/*" : "video/*"}
                                onChange={(e) => handleFileChange(e, uploadType)}
                            />
                            <button
                                type="button"
                                onClick={() => uploadType === 'image' ? fileInputRef.current?.click() : videoInputRef.current?.click()}
                                className={`w-10 h-10 md:w-12 md:h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${formData.image.startsWith('data:') ? 'bg-indigo-600' : 'bg-slate-700 hover:bg-slate-600'}`}
                                title="파일 업로드"
                            >
                                {uploadType === 'image' ? (
                                    <ImageIcon className={`w-4.5 h-4.5 md:w-5 md:h-5 ${formData.image.startsWith('data:') ? 'text-white' : 'text-slate-400'}`} />
                                ) : (
                                    <FileVideo className={`w-4.5 h-4.5 md:w-5 md:h-5 ${formData.image.startsWith('data:') ? 'text-white' : 'text-slate-400'}`} />
                                )}
                            </button>
                        </div>
                        <p className="text-[10px] md:text-xs text-slate-500 mt-1">
                            {uploadType === 'image'
                                ? '* 이미지 URL을 입력하거나 직접 업로드하세요.'
                                : '* 영상 URL을 입력하거나 직접 업로드하세요. (최대 5MB)'}
                        </p>
                    </div>

                    {formData.image && (
                        <div className="relative w-full h-32 bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
                            {uploadType === 'image' ? (
                                <img src={formData.image} alt="Preview" className="w-full h-full object-contain" />
                            ) : (
                                <video src={formData.image} className="w-full h-full object-contain" muted />
                            )}
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, image: '' })}
                                className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">사용된 모델</label>
                        <select
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                            value={formData.model}
                            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                        >
                            {(uploadType === 'image' ? imageModels : videoModels).map(model => (
                                <option key={model}>{model}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">프롬프트 (Recipe)</label>
                        <textarea
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white h-32 resize-none focus:outline-none focus:border-indigo-500 transition-colors font-mono text-sm"
                            placeholder="작품을 생성하기 위해 사용한 프롬프트를 입력하세요..."
                            value={formData.prompt}
                            onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={isUploading}
                        className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isUploading ? '저장 중...' : '갤러리에 등록하기'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadModal;
