import { useState, useRef } from 'react';
import { Plus, X, Image as ImageIcon } from 'lucide-react';

const UploadModal = ({ isOpen, onClose, onSubmit, isUploading }) => {
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        title: '',
        prompt: '',
        image: '',
        model: 'Midjourney v6'
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-slate-800 rounded-2xl w-full max-w-lg border border-slate-700 shadow-2xl">
                <div className="flex justify-between items-center p-6 border-b border-slate-700">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Plus className="text-indigo-500" /> 새 프롬프트 등록
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
                        <label className="block text-sm font-medium text-slate-300 mb-1">이미지 (URL 또는 파일 업로드)</label>
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
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <button
                                type="button"
                                onClick={triggerFileSelect}
                                className={`w-12 h-10 rounded flex items-center justify-center shrink-0 transition-colors ${formData.image.startsWith('data:') ? 'bg-indigo-600' : 'bg-slate-700 hover:bg-slate-600'}`}
                                title="파일 업로드"
                            >
                                <ImageIcon size={20} className={formData.image.startsWith('data:') ? 'text-white' : 'text-slate-400'} />
                            </button>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">* 이미지 URL을 입력하거나 아이콘 버튼을 클릭해 직접 업로드하세요.</p>
                    </div>

                    {formData.image && (
                        <div className="relative w-full h-32 bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
                            <img src={formData.image} alt="Preview" className="w-full h-full object-contain" />
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
                            <option>Midjourney v6</option>
                            <option>DALL-E 3</option>
                            <option>Stable Diffusion XL</option>
                            <option>Niji Journey 5</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">프롬프트 (Recipe)</label>
                        <textarea
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white h-32 resize-none focus:outline-none focus:border-indigo-500 transition-colors font-mono text-sm"
                            placeholder="이 이미지를 생성하기 위해 사용한 프롬프트를 입력하세요..."
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

