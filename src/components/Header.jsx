import { LayoutGrid, LayoutDashboard, Search, Plus, User, LogOut } from 'lucide-react';

const Header = ({
    session,
    currentView,
    setCurrentView,
    searchTerm,
    setSearchTerm,
    onUploadClick,
    onLoginClick,
    onLogout
}) => {
    return (
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

                <div className="flex-1"></div>

                <div className="flex items-center gap-4">
                    {session ? (
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setCurrentView(currentView === 'home' ? 'dashboard' : 'home')}
                                className={`text-sm font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 ${currentView === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
                            >
                                <LayoutDashboard size={18} />
                                <span className="hidden sm:inline">My Recipes</span>
                            </button>
                            <div className="h-6 w-px bg-slate-700 mx-1"></div>
                            <button
                                onClick={onLogout}
                                className="text-slate-400 hover:text-white transition-colors p-2"
                                title="로그아웃"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={onLoginClick}
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
    );
};

export default Header;
