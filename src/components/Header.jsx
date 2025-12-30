import { useState, useEffect } from 'react';
import { LayoutGrid, LayoutDashboard, Plus, User, LogOut } from 'lucide-react';

const Header = ({
    session,
    currentView,
    setCurrentView,
    onUploadClick,
    onLoginClick,
    onLogout
}) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-6'
            }`}>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <nav className={`transition-all duration-500 rounded-2xl border flex items-center justify-between px-4 md:px-6 h-14 md:h-16 ${isScrolled
                    ? 'glass shadow-2xl border-white/10'
                    : 'bg-transparent border-transparent'
                    }`}>
                    {/* Logo */}
                    <div
                        className="flex items-center gap-2 md:gap-3 cursor-pointer group"
                        onClick={() => setCurrentView('home')}
                    >
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                            <LayoutGrid className="w-[18px] h-[18px] md:w-[22px] md:h-[22px] text-white" />
                        </div>
                        <span className="text-lg md:text-2xl font-black text-white tracking-tighter">
                            AI<span className="text-indigo-500">.</span>RECIPE
                        </span>
                    </div>

                    <div className="flex-1"></div>

                    {/* User Actions */}
                    <div className="flex items-center gap-4">
                        {session ? (
                            <>
                                <button
                                    onClick={() => setCurrentView(currentView === 'home' ? 'dashboard' : 'home')}
                                    className={`text-sm font-black px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 ${currentView === 'dashboard'
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    <LayoutDashboard size={18} />
                                    <span className="hidden sm:inline">My Recipes</span>
                                </button>
                                <button
                                    onClick={onLogout}
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/20 transition-all group"
                                    title="로그아웃"
                                >
                                    <LogOut size={20} className="group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={onLoginClick}
                                className="text-sm font-black text-white bg-white/10 px-6 py-2.5 rounded-xl border border-white/10 hover:bg-white/20 transition-all flex items-center gap-2"
                            >
                                <User size={18} className="text-indigo-400" />
                                <span className="hidden sm:inline">Sign In</span>
                            </button>
                        )}

                        <button
                            onClick={onUploadClick}
                            className="bg-white text-slate-900 hover:bg-indigo-50 px-6 py-2.5 rounded-xl text-sm font-black flex items-center gap-2 transition-all shadow-xl shadow-white/10 hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <Plus size={18} />
                            <span className="hidden sm:inline">Upload</span>
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
