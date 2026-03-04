import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { User, Calendar, Download, Trash2, AlertTriangle } from 'lucide-react';
import './Settings.css';

const Settings = () => {
    const { assessmentYear, setAssessmentYear, activeTaxpayerId, taxpayers, deleteTaxpayer, setActiveTaxpayerId } = useAppContext();
    const activeTaxpayer = taxpayers.find(t => t.id === activeTaxpayerId);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<'taxpayer' | 'account' | null>(null);
    const [confirmText, setConfirmText] = useState('');

    const handleDeleteConfirm = () => {
        if (confirmText !== 'DELETE') {
            alert('Please type DELETE to confirm.');
            return;
        }
        if (deleteTarget === 'taxpayer' && activeTaxpayerId) {
            deleteTaxpayer(activeTaxpayerId);
            const remaining = taxpayers.filter(t => t.id !== activeTaxpayerId);
            if (remaining.length > 0) setActiveTaxpayerId(remaining[0].id);
        }
        if (deleteTarget === 'account') {
            alert('All account data would be deleted in production.');
        }
        setShowDeleteModal(false);
        setConfirmText('');
        setDeleteTarget(null);
    };

    return (
        <div className="settings-container">
            <div className="settings-header">
                <h2>Settings</h2>
                <p className="text-muted">Manage your account and preferences.</p>
            </div>

            {/* Account Info */}
            <div className="card settings-section">
                <div className="section-title">
                    <User size={20} />
                    <h3>Account Information</h3>
                </div>
                <div className="settings-grid">
                    <div className="setting-item">
                        <label>Account Email</label>
                        <input type="email" value="rohan@example.com" disabled className="disabled-input" />
                    </div>
                    <div className="setting-item">
                        <label>Active Taxpayer</label>
                        <input type="text" value={activeTaxpayer?.name || '—'} disabled className="disabled-input" />
                    </div>
                </div>
            </div>

            {/* Default FY */}
            <div className="card settings-section">
                <div className="section-title">
                    <Calendar size={20} />
                    <h3>Default Financial Year</h3>
                </div>
                <div className="setting-item">
                    <label>Assessment Year</label>
                    <select value={assessmentYear} onChange={(e) => setAssessmentYear(e.target.value)}>
                        <option value="2024-2025">AY 2024-25</option>
                        <option value="2023-2024">AY 2023-24</option>
                    </select>
                </div>
            </div>

            {/* Data Export */}
            <div className="card settings-section">
                <div className="section-title">
                    <Download size={20} />
                    <h3>Data Export</h3>
                </div>
                <p className="text-muted mb-3">Download your filing data and documents as a ZIP archive.</p>
                <button className="btn btn-secondary" onClick={() => alert('Export feature coming soon!')}>
                    <Download size={16} /> Export All Data
                </button>
            </div>

            {/* Danger Zone */}
            <div className="card settings-section danger-zone">
                <div className="section-title">
                    <AlertTriangle size={20} />
                    <h3>Danger Zone</h3>
                </div>
                <div className="danger-actions">
                    <div className="danger-item">
                        <div>
                            <h4>Delete Current Taxpayer</h4>
                            <p className="text-muted">Remove "{activeTaxpayer?.name}" and all their filing data permanently.</p>
                        </div>
                        <button className="btn btn-danger" onClick={() => { setDeleteTarget('taxpayer'); setShowDeleteModal(true); }}>
                            <Trash2 size={16} /> Delete Taxpayer
                        </button>
                    </div>
                    <div className="danger-item">
                        <div>
                            <h4>Delete All Account Data</h4>
                            <p className="text-muted">Permanently erase all taxpayers and filing information from this account.</p>
                        </div>
                        <button className="btn btn-danger" onClick={() => { setDeleteTarget('account'); setShowDeleteModal(true); }}>
                            <Trash2 size={16} /> Delete Everything
                        </button>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <AlertTriangle size={24} color="var(--error)" />
                            <h3>Confirm Deletion</h3>
                        </div>
                        <p className="modal-body">
                            This action is <strong>irreversible</strong>. Type <strong>DELETE</strong> to confirm.
                        </p>
                        <input
                            type="text"
                            className="modal-input"
                            placeholder="Type DELETE"
                            value={confirmText}
                            onChange={e => setConfirmText(e.target.value)}
                            autoFocus
                        />
                        <div className="modal-actions">
                            <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            <button className="btn btn-danger" onClick={handleDeleteConfirm}>Confirm Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
