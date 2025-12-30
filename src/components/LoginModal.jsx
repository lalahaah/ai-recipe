import { useState } from 'react';
import { X, Mail, Key } from 'lucide-react';
import { supabase as _supabase } from '../lib/supabase';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isSignUp) {
                const { error } = await _supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                alert("회원가입 성공! 자동 로그인됩니다.");
            } else {
                const { error } = await _supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
            }
            onLoginSuccess();
            onClose();
        } catch (err) {
            console.error("Auth error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 shadow-2xl p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">
                        {isSignUp ? "회원가입" : "로그인"}
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">이메일</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="email"
                                required
                                placeholder="hello@alist.ai"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">비밀번호</label>
                        <div className="relative">
                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2"
                    >
                        {loading ? "처리 중..." : (isSignUp ? "가입하기" : "로그인하기")}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-400">
                    {isSignUp ? "이미 계정이 있으신가요? " : "계정이 없으신가요? "}
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-indigo-400 hover:text-indigo-300 font-bold ml-1 underline"
                    >
                        {isSignUp ? "로그인" : "회원가입"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
