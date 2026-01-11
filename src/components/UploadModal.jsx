import { useState, useRef, useEffect } from 'react';
import { Plus, X, Image as ImageIcon, Video, FileVideo, AlertCircle } from 'lucide-react';

const UploadModal = ({ isOpen, onClose, onSubmit, isUploading, language, t }) => {
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

    // 모달이 열릴 때마다 폼 초기화
    useEffect(() => {
        if (isOpen) {
            setFormData({
                title: '',
                prompt: '',
                image: '',
                model: uploadType === 'image' ? imageModels[0] : videoModels[0]
            });
            setError(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (uploadType === 'video' && formData.image.startsWith('data:video') && formData.image.length > 5 * 1024 * 1024 * 1.37) {
            setError(t.upload.errorVideoSize);
            return;
        }
        onSubmit({ ...formData, type: uploadType });
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            // 용량 체크 (5MB)
            if (type === 'video' && file.size > 5 * 1024 * 1024) {
                setError(t.upload.errorVideoOnly);
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
                        <Plus className="text-indigo-500" /> {t.upload.title}
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
                        <ImageIcon size={16} /> {t.upload.imageTab}
                    </button>
                    <button
                        onClick={() => handleTypeChange('video')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${uploadType === 'video' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                    >
                        <Video size={16} /> {t.upload.videoTab}
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-xs flex items-center gap-2">
                            <AlertCircle size={14} /> {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">{t.upload.recipeTitle}</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            placeholder={t.upload.titlePlaceholder}
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            {uploadType === 'image' ? t.upload.mediaLabel : t.upload.mediaLabelVideo}
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                required
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                                placeholder={t.upload.mediaPlaceholder}
                                value={formData.image.startsWith('data:') ? t.upload.fileUploaded : formData.image}
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
                                ? t.upload.mediaHelpImage
                                : t.upload.mediaHelpVideo}
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
                        <label className="block text-sm font-medium text-slate-300 mb-1">{t.upload.aiModel}</label>
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
                        <label className="block text-sm font-medium text-slate-300 mb-1">{t.upload.promptRecipe}</label>
                        <textarea
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white h-32 resize-none focus:outline-none focus:border-indigo-500 transition-colors font-mono text-sm"
                            placeholder={t.upload.promptPlaceholder}
                            value={formData.prompt}
                            onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={isUploading}
                        className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isUploading ? t.upload.uploading : t.upload.uploadButton}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadModal;
