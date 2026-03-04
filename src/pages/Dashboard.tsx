import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle2, FileText, ArrowRight, Play } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const { assessmentYear, setAssessmentYear, activeTaxpayerId, taxpayers } = useAppContext();

    const activeTaxpayer = taxpayers.find(t => t.id === activeTaxpayerId);
    const isDataAvailable = activeTaxpayer && assessmentYear === '2024-2025';

    const estimatedTax = activeTaxpayerId === '1' ? -42500 : 12500;
    const isRefund = estimatedTax < 0;

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="fy-selector">
                    <label htmlFor="ay-select" className="fy-label">Assessment Year</label>
                    <select
                        id="ay-select"
                        className="fy-select"
                        value={assessmentYear}
                        onChange={(e) => setAssessmentYear(e.target.value)}
                    >
                        <option value="2024-2025">2024-2025 (Current)</option>
                        <option value="2023-2024">2023-2024</option>
                    </select>
                </div>
            </div>

            {!isDataAvailable ? (
                <div className="empty-state-banner">
                    <AlertCircle size={24} />
                    <div>
                        <h3>No filing data found for {assessmentYear}</h3>
                        <p>Start a new return to begin your tax filing process.</p>
                    </div>
                </div>
            ) : (
                <div className="dashboard-grid">
                    <div className="card status-card">
                        <div className="card-header">
                            <h3>Filing Status</h3>
                            <span className={`badge badge-${activeTaxpayer.filingStatus === 'Processed' ? 'success' : 'warning'}`}>
                                {activeTaxpayer.filingStatus}
                            </span>
                        </div>
                        <div className="status-details">
                            <div className="detail-item">
                                <span className="detail-label">ITR Form</span>
                                <span className="detail-value">{activeTaxpayer.itrType}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Last Updated</span>
                                <span className="detail-value">Today, 10:30 AM</span>
                            </div>
                        </div>
                        {activeTaxpayer.filingStatus === 'Draft' && (
                            <div className="progress-bar-container">
                                <div className="progress-bar" style={{ width: '40%' }}></div>
                                <span className="progress-text">40% Complete</span>
                            </div>
                        )}
                    </div>

                    <div className="card snapshot-card">
                        <div className="card-header">
                            <h3>Tax Snapshot</h3>
                            <span className="regime-badge">New Regime</span>
                        </div>
                        <div className="snapshot-content">
                            <div className={`tax-amount ${isRefund ? 'text-success' : 'text-warning'}`}>
                                <span className="currency">₹</span>
                                {Math.abs(estimatedTax).toLocaleString('en-IN')}
                            </div>
                            <div className="tax-label">
                                {isRefund ? 'Estimated Refund' : 'Estimated Tax Payable'}
                            </div>
                        </div>
                        <button className="btn btn-secondary w-full" onClick={() => navigate('/start-filing')}>
                            Compare Regimes
                        </button>
                    </div>

                    <div className="card actions-card">
                        <div className="card-header">
                            <h3>Pending Actions</h3>
                        </div>
                        <ul className="action-list">
                            <li className="action-item" onClick={() => navigate('/documents')}>
                                <div className="action-icon warning-icon"><AlertCircle size={18} /></div>
                                <div className="action-text">Upload Form 16</div>
                                <ArrowRight size={16} className="chevron" />
                            </li>
                            <li className="action-item" onClick={() => navigate('/start-filing')}>
                                <div className="action-icon warning-icon"><FileText size={18} /></div>
                                <div className="action-text">Review Deductions (80C)</div>
                                <ArrowRight size={16} className="chevron" />
                            </li>
                            <li className="action-item completed">
                                <div className="action-icon success-icon"><CheckCircle2 size={18} /></div>
                                <div className="action-text">Personal Details Verified</div>
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            <div className="sticky-mobile-cta">
                <button className="btn btn-primary cta-button" onClick={() => navigate('/start-filing')}>
                    <Play size={18} />
                    {activeTaxpayer?.filingStatus === 'Draft' ? 'Resume Filing' : 'Start Filing'}
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
