import { useEffect } from 'react';
import { Zap } from 'lucide-react';

const Toast = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 2000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-5 right-5 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-xl z-50 flex items-center gap-2 animate-fade-in">
            <Zap size={18} className="text-yellow-300" />
            <span className="font-medium">{message}</span>
        </div>
    );
};

export default Toast;
