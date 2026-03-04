import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { CheckCircle2, Circle, Send, Info } from 'lucide-react';
import './SubmitTrack.css';

const TIMELINE_STAGES = ['Draft', 'Filed', 'Verified', 'Processed', 'Refund Issued'];

const SubmitTrack = () => {
    const { activeTaxpayerId, taxpayers } = useAppContext();
    const activeTaxpayer = taxpayers.find(t => t.id === activeTaxpayerId);
    const [verificationMethod, setVerificationMethod] = useState('aadhaar');

    const checklist = [
        { label: 'All wizard steps completed', done: true },
        { label: 'No validation errors', done: true },
        { label: 'Required documents uploaded', done: false },
    ];

    const allChecksPassed = checklist.every(c => c.done);

    const currentStageIndex = (() => {
        switch (activeTaxpayer?.filingStatus) {
            case 'Draft': return 0;
            case 'In Progress': return 0;
            case 'Filed': return 1;
            case 'Verified': return 2;
            case 'Processed': return 3;
            default: return 0;
        }
    })();

    return (
        <div className="submit-container">
            <div className="submit-header">
                <h2>Submit & Track</h2>
                <p className="text-muted">Review your filing readiness and submit your return.</p>
            </div>

            {/* Pre-Submission Checklist */}
            <div className="card checklist-card">
                <h3>Pre-Submission Checklist</h3>
                <ul className="checklist">
                    {checklist.map((item, i) => (
                        <li key={i} className={`checklist-item ${item.done ? 'done' : 'pending'}`}>
                            {item.done ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                            <span>{item.label}</span>
                        </li>
                    ))}
                </ul>
                {!allChecksPassed && (
                    <div className="checklist-warning">
                        <Info size={16} />
                        <span>Please complete all items before submitting your return.</span>
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <div className="card submit-action-card">
                <button
                    className="btn btn-primary submit-btn"
                    disabled={!allChecksPassed}
                    onClick={() => alert('Return submitted successfully! Proceed to e-verification.')}
                >
                    <Send size={18} /> Submit Return
                </button>
            </div>

            {/* E-Verification */}
            <div className="card verification-card">
                <h3>E-Verification Guidance</h3>
                <p className="text-muted mb-3">After submission, you must verify your return within 30 days.</p>

                <div className="verification-options">
                    <label className={`verification-option ${verificationMethod === 'aadhaar' ? 'selected' : ''}`}>
                        <input type="radio" name="verify" value="aadhaar" checked={verificationMethod === 'aadhaar'}
                            onChange={() => setVerificationMethod('aadhaar')} />
                        <div className="vo-content">
                            <span className="vo-title">Aadhaar OTP</span>
                            <span className="vo-desc">Verify instantly using OTP sent to your Aadhaar-linked mobile number.</span>
                        </div>
                    </label>
                    <label className={`verification-option ${verificationMethod === 'netbanking' ? 'selected' : ''}`}>
                        <input type="radio" name="verify" value="netbanking" checked={verificationMethod === 'netbanking'}
                            onChange={() => setVerificationMethod('netbanking')} />
                        <div className="vo-content">
                            <span className="vo-title">Net Banking</span>
                            <span className="vo-desc">Login to your bank's portal to verify electronically.</span>
                        </div>
                    </label>
                    <label className={`verification-option ${verificationMethod === 'physical' ? 'selected' : ''}`}>
                        <input type="radio" name="verify" value="physical" checked={verificationMethod === 'physical'}
                            onChange={() => setVerificationMethod('physical')} />
                        <div className="vo-content">
                            <span className="vo-title">ITR-V Physical Submission</span>
                            <span className="vo-desc">Print and mail the signed ITR-V to CPC Bengaluru within 120 days.</span>
                        </div>
                    </label>
                </div>
            </div>

            {/* Timeline */}
            <div className="card timeline-card">
                <h3>Filing Timeline</h3>
                <div className="timeline">
                    {TIMELINE_STAGES.map((stage, i) => (
                        <div key={stage} className={`tl-step ${i <= currentStageIndex ? 'completed' : ''} ${i === currentStageIndex ? 'current' : ''}`}>
                            <div className="tl-dot"></div>
                            <span className="tl-label">{stage}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubmitTrack;
