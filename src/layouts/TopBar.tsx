import { useAppContext } from '../context/AppContext';
import { UserCircle } from 'lucide-react';
import './TopBar.css';

const TopBar = () => {
    const { taxpayers, activeTaxpayerId, setActiveTaxpayerId } = useAppContext();

    const handleProfileChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (window.confirm("Switching profile will refresh the current application context. Continue?")) {
            setActiveTaxpayerId(e.target.value);
        } else {
            e.target.value = activeTaxpayerId || '';
        }
    };

    return (
        <header className="top-bar">
            <div className="top-bar-left">
                <div className="logo">
                    <span className="logo-icon">📄</span> FileMyTax.in
                </div>
            </div>

            <div className="top-bar-center">
                <h2>FileMyTax.in</h2>
            </div>

            <div className="top-bar-right">
                <div className="top-bar-controls">
                    <div className="control-group profile-group">
                        <UserCircle size={20} className="profile-icon" />
                        <select
                            className="topbar-select profile-select"
                            value={activeTaxpayerId || ''}
                            onChange={handleProfileChange}
                        >
                            {taxpayers.map(t => (
                                <option key={t.id} value={t.id}>{t.name} ({t.pan.slice(0, 4)}...)</option>
                            ))}
                            <option value="add_new">+ Add Taxpayer</option>
                        </select>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
