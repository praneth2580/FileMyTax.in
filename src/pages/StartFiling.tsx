import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ChevronRight, ChevronLeft, Check, Save } from 'lucide-react';
import './StartFiling.css';

const STEPS = ['Personal Details', 'Income Details', 'Deductions', 'Tax Regime', 'Review & Confirm'];

const StartFiling = () => {
    const { activeTaxpayerId, taxpayers } = useAppContext();
    const activeTaxpayer = taxpayers.find(t => t.id === activeTaxpayerId);
    const [currentStep, setCurrentStep] = useState(0);
    const [accepted, setAccepted] = useState(false);

    // Mock form data
    const [formData, setFormData] = useState({
        aadhaar: '',
        address: '',
        email: '',
        phone: '',
        bankAccount: '',
        grossSalary: 800000,
        hra: 120000,
        professionalTax: 2500,
        rentalIncome: 0,
        homeLoanInterest: 0,
        businessIncome: 0,
        shortTermCG: 0,
        longTermCG: 0,
        interestIncome: 15000,
        dividendIncome: 5000,
        deduction80C: 150000,
        deduction80D: 25000,
        deduction80G: 0,
        nps: 50000,
        homeLoanDeduction: 0,
        selectedRegime: 'new' as 'old' | 'new',
    });

    const handleChange = (field: string, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const totalIncome = formData.grossSalary + formData.rentalIncome + formData.businessIncome +
        formData.shortTermCG + formData.longTermCG + formData.interestIncome + formData.dividendIncome;

    const totalDeductions = formData.deduction80C + formData.deduction80D + formData.deduction80G +
        formData.nps + formData.homeLoanDeduction;

    const standardDeduction = 50000;
    const taxableOld = Math.max(0, totalIncome - standardDeduction - formData.hra - formData.professionalTax - totalDeductions);
    const taxableNew = Math.max(0, totalIncome - standardDeduction - formData.professionalTax);

    const calcTax = (income: number, regime: 'old' | 'new') => {
        if (regime === 'new') {
            if (income <= 300000) return 0;
            if (income <= 700000) return (income - 300000) * 0.05;
            if (income <= 1000000) return 20000 + (income - 700000) * 0.10;
            if (income <= 1200000) return 50000 + (income - 1000000) * 0.15;
            if (income <= 1500000) return 80000 + (income - 1200000) * 0.20;
            return 140000 + (income - 1500000) * 0.30;
        } else {
            if (income <= 250000) return 0;
            if (income <= 500000) return (income - 250000) * 0.05;
            if (income <= 1000000) return 12500 + (income - 500000) * 0.20;
            return 112500 + (income - 1000000) * 0.30;
        }
    };

    const taxOld = calcTax(taxableOld, 'old');
    const taxNew = calcTax(taxableNew, 'new');
    const recommendedRegime = taxOld <= taxNew ? 'old' : 'new';
    const savings = Math.abs(taxOld - taxNew);

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="step-content">
                        <h3>Personal Details</h3>
                        <p className="step-desc">Verify your identity and contact information.</p>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>PAN Number</label>
                                <input type="text" value={activeTaxpayer?.pan || ''} disabled className="disabled-input" />
                            </div>
                            <div className="form-group">
                                <label>Aadhaar Number *</label>
                                <input type="text" placeholder="XXXX-XXXX-XXXX" maxLength={14}
                                    value={formData.aadhaar} onChange={e => handleChange('aadhaar', e.target.value)} />
                            </div>
                            <div className="form-group full-width">
                                <label>Address *</label>
                                <textarea rows={3} placeholder="Enter your full address"
                                    value={formData.address} onChange={e => handleChange('address', e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Email *</label>
                                <input type="email" placeholder="you@example.com"
                                    value={formData.email} onChange={e => handleChange('email', e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Phone *</label>
                                <input type="tel" placeholder="+91 XXXXX XXXXX"
                                    value={formData.phone} onChange={e => handleChange('phone', e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Bank Account (for refund) *</label>
                                <input type="text" placeholder="Account number"
                                    value={formData.bankAccount} onChange={e => handleChange('bankAccount', e.target.value)} />
                            </div>
                        </div>
                    </div>
                );

            case 1:
                return (
                    <div className="step-content">
                        <h3>Income Details</h3>
                        <p className="step-desc">Enter your income details for the assessment year.</p>

                        <details className="accordion" open>
                            <summary className="accordion-header">A. Salary Income</summary>
                            <div className="accordion-body">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Gross Salary (₹)</label>
                                        <input type="number" value={formData.grossSalary}
                                            onChange={e => handleChange('grossSalary', Number(e.target.value))} />
                                    </div>
                                    <div className="form-group">
                                        <label>HRA Exemption (₹)</label>
                                        <input type="number" value={formData.hra}
                                            onChange={e => handleChange('hra', Number(e.target.value))} />
                                    </div>
                                    <div className="form-group">
                                        <label>Standard Deduction</label>
                                        <input type="text" value="₹ 50,000" disabled className="disabled-input" />
                                        <span className="field-note">Auto-applied</span>
                                    </div>
                                    <div className="form-group">
                                        <label>Professional Tax (₹)</label>
                                        <input type="number" value={formData.professionalTax}
                                            onChange={e => handleChange('professionalTax', Number(e.target.value))} />
                                    </div>
                                </div>
                            </div>
                        </details>

                        <details className="accordion">
                            <summary className="accordion-header">B. House Property Income</summary>
                            <div className="accordion-body">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Rental Income (₹)</label>
                                        <input type="number" value={formData.rentalIncome}
                                            onChange={e => handleChange('rentalIncome', Number(e.target.value))} />
                                    </div>
                                    <div className="form-group">
                                        <label>Home Loan Interest (₹)</label>
                                        <input type="number" value={formData.homeLoanInterest}
                                            onChange={e => handleChange('homeLoanInterest', Number(e.target.value))} />
                                    </div>
                                </div>
                            </div>
                        </details>

                        <details className="accordion">
                            <summary className="accordion-header">C. Business Income</summary>
                            <div className="accordion-body">
                                <div className="form-grid">
                                    <div className="form-group full-width">
                                        <label>Gross Receipts / Income (₹)</label>
                                        <input type="number" value={formData.businessIncome}
                                            onChange={e => handleChange('businessIncome', Number(e.target.value))} />
                                        <span className="field-note">For Presumptive scheme (44AD/44ADA)</span>
                                    </div>
                                </div>
                            </div>
                        </details>

                        <details className="accordion">
                            <summary className="accordion-header">D. Capital Gains</summary>
                            <div className="accordion-body">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Short-Term Capital Gains (₹)</label>
                                        <input type="number" value={formData.shortTermCG}
                                            onChange={e => handleChange('shortTermCG', Number(e.target.value))} />
                                    </div>
                                    <div className="form-group">
                                        <label>Long-Term Capital Gains (₹)</label>
                                        <input type="number" value={formData.longTermCG}
                                            onChange={e => handleChange('longTermCG', Number(e.target.value))} />
                                    </div>
                                </div>
                            </div>
                        </details>

                        <details className="accordion">
                            <summary className="accordion-header">E. Other Sources</summary>
                            <div className="accordion-body">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Interest Income (₹)</label>
                                        <input type="number" value={formData.interestIncome}
                                            onChange={e => handleChange('interestIncome', Number(e.target.value))} />
                                    </div>
                                    <div className="form-group">
                                        <label>Dividend Income (₹)</label>
                                        <input type="number" value={formData.dividendIncome}
                                            onChange={e => handleChange('dividendIncome', Number(e.target.value))} />
                                    </div>
                                </div>
                            </div>
                        </details>
                    </div>
                );

            case 2:
                return (
                    <div className="step-content">
                        <h3>Deductions</h3>
                        <p className="step-desc">Claim deductions to reduce your taxable income under the Old Regime.</p>

                        <div className="deduction-section">
                            <div className="deduction-header">
                                <span>Section 80C</span>
                                <span className="limit-badge">Limit: ₹1,50,000</span>
                            </div>
                            <div className="form-group">
                                <input type="number" value={formData.deduction80C} max={150000}
                                    onChange={e => handleChange('deduction80C', Math.min(150000, Number(e.target.value)))} />
                                <div className="limit-bar">
                                    <div className="limit-fill" style={{ width: `${Math.min(100, (formData.deduction80C / 150000) * 100)}%` }}></div>
                                </div>
                                <div className="limit-info">
                                    <span>Used: ₹{formData.deduction80C.toLocaleString('en-IN')}</span>
                                    <span>Remaining: ₹{(150000 - formData.deduction80C).toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="deduction-section">
                            <div className="deduction-header">
                                <span>Section 80D (Health Insurance)</span>
                                <span className="limit-badge">Limit: ₹25,000</span>
                            </div>
                            <div className="form-group">
                                <input type="number" value={formData.deduction80D} max={25000}
                                    onChange={e => handleChange('deduction80D', Math.min(25000, Number(e.target.value)))} />
                                <div className="limit-bar">
                                    <div className="limit-fill" style={{ width: `${Math.min(100, (formData.deduction80D / 25000) * 100)}%` }}></div>
                                </div>
                                <div className="limit-info">
                                    <span>Used: ₹{formData.deduction80D.toLocaleString('en-IN')}</span>
                                    <span>Remaining: ₹{(25000 - formData.deduction80D).toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="deduction-section">
                            <div className="deduction-header">
                                <span>Section 80G (Donations)</span>
                                <span className="limit-badge">No Cap</span>
                            </div>
                            <div className="form-group">
                                <input type="number" value={formData.deduction80G}
                                    onChange={e => handleChange('deduction80G', Number(e.target.value))} />
                            </div>
                        </div>

                        <div className="deduction-section">
                            <div className="deduction-header">
                                <span>NPS (80CCD)</span>
                                <span className="limit-badge">Limit: ₹50,000</span>
                            </div>
                            <div className="form-group">
                                <input type="number" value={formData.nps} max={50000}
                                    onChange={e => handleChange('nps', Math.min(50000, Number(e.target.value)))} />
                                <div className="limit-bar">
                                    <div className="limit-fill" style={{ width: `${Math.min(100, (formData.nps / 50000) * 100)}%` }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="deduction-section">
                            <div className="deduction-header">
                                <span>Home Loan Interest (24b)</span>
                                <span className="limit-badge">Limit: ₹2,00,000</span>
                            </div>
                            <div className="form-group">
                                <input type="number" value={formData.homeLoanDeduction} max={200000}
                                    onChange={e => handleChange('homeLoanDeduction', Math.min(200000, Number(e.target.value)))} />
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="step-content">
                        <h3>Tax Regime Comparison</h3>
                        <p className="step-desc">Compare Old and New tax regimes to pick the optimal one.</p>

                        <div className="regime-comparison">
                            <div className={`regime-col ${formData.selectedRegime === 'old' ? 'selected' : ''}`}
                                onClick={() => handleChange('selectedRegime', 'old')}>
                                <div className="regime-title">
                                    Old Regime
                                    {recommendedRegime === 'old' && <span className="badge badge-success">Recommended</span>}
                                </div>
                                <div className="regime-details">
                                    <div className="regime-row">
                                        <span>Gross Total Income</span>
                                        <span>₹{totalIncome.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="regime-row">
                                        <span>Standard Deduction</span>
                                        <span>-₹{standardDeduction.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="regime-row">
                                        <span>HRA Exemption</span>
                                        <span>-₹{formData.hra.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="regime-row">
                                        <span>Chapter VI-A Deductions</span>
                                        <span>-₹{totalDeductions.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="regime-row highlight">
                                        <span>Taxable Income</span>
                                        <span>₹{taxableOld.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="regime-row tax-row">
                                        <span>Tax Payable</span>
                                        <span className="tax-val">₹{taxOld.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                                <button className={`btn ${formData.selectedRegime === 'old' ? 'btn-primary' : 'btn-secondary'} w-full`}>
                                    {formData.selectedRegime === 'old' ? '✓ Selected' : 'Select Old Regime'}
                                </button>
                            </div>

                            <div className={`regime-col ${formData.selectedRegime === 'new' ? 'selected' : ''}`}
                                onClick={() => handleChange('selectedRegime', 'new')}>
                                <div className="regime-title">
                                    New Regime
                                    {recommendedRegime === 'new' && <span className="badge badge-success">Recommended</span>}
                                </div>
                                <div className="regime-details">
                                    <div className="regime-row">
                                        <span>Gross Total Income</span>
                                        <span>₹{totalIncome.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="regime-row">
                                        <span>Standard Deduction</span>
                                        <span>-₹{standardDeduction.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="regime-row muted">
                                        <span>Other Deductions</span>
                                        <span>Not Available</span>
                                    </div>
                                    <div className="regime-row highlight">
                                        <span>Taxable Income</span>
                                        <span>₹{taxableNew.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="regime-row tax-row">
                                        <span>Tax Payable</span>
                                        <span className="tax-val">₹{taxNew.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                                <button className={`btn ${formData.selectedRegime === 'new' ? 'btn-primary' : 'btn-secondary'} w-full`}>
                                    {formData.selectedRegime === 'new' ? '✓ Selected' : 'Select New Regime'}
                                </button>
                            </div>
                        </div>

                        <div className="savings-banner">
                            <span>💡 You save <strong>₹{savings.toLocaleString('en-IN')}</strong> with the <strong>{recommendedRegime === 'old' ? 'Old' : 'New'} Regime</strong></span>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="step-content">
                        <h3>Review & Confirm</h3>
                        <p className="step-desc">Review your filing data before submission.</p>

                        <div className="review-section">
                            <div className="review-header">
                                <h4>Income Summary</h4>
                                <button className="btn btn-secondary btn-sm" onClick={() => setCurrentStep(1)}>Edit</button>
                            </div>
                            <div className="review-grid">
                                <div className="review-item"><span>Gross Salary</span><span>₹{formData.grossSalary.toLocaleString('en-IN')}</span></div>
                                <div className="review-item"><span>Interest Income</span><span>₹{formData.interestIncome.toLocaleString('en-IN')}</span></div>
                                <div className="review-item"><span>Dividend Income</span><span>₹{formData.dividendIncome.toLocaleString('en-IN')}</span></div>
                                <div className="review-item total"><span>Total Income</span><span>₹{totalIncome.toLocaleString('en-IN')}</span></div>
                            </div>
                        </div>

                        <div className="review-section">
                            <div className="review-header">
                                <h4>Deductions Summary</h4>
                                <button className="btn btn-secondary btn-sm" onClick={() => setCurrentStep(2)}>Edit</button>
                            </div>
                            <div className="review-grid">
                                <div className="review-item"><span>Section 80C</span><span>₹{formData.deduction80C.toLocaleString('en-IN')}</span></div>
                                <div className="review-item"><span>Section 80D</span><span>₹{formData.deduction80D.toLocaleString('en-IN')}</span></div>
                                <div className="review-item"><span>NPS (80CCD)</span><span>₹{formData.nps.toLocaleString('en-IN')}</span></div>
                                <div className="review-item total"><span>Total Deductions</span><span>₹{totalDeductions.toLocaleString('en-IN')}</span></div>
                            </div>
                        </div>

                        <div className="review-section">
                            <div className="review-header">
                                <h4>Tax Computation</h4>
                                <button className="btn btn-secondary btn-sm" onClick={() => setCurrentStep(3)}>Edit</button>
                            </div>
                            <div className="review-grid">
                                <div className="review-item"><span>Selected Regime</span><span className="badge badge-neutral">{formData.selectedRegime === 'old' ? 'Old Regime' : 'New Regime'}</span></div>
                                <div className="review-item"><span>Taxable Income</span><span>₹{(formData.selectedRegime === 'old' ? taxableOld : taxableNew).toLocaleString('en-IN')}</span></div>
                                <div className="review-item total"><span>Tax Payable</span><span className="text-warning">₹{(formData.selectedRegime === 'old' ? taxOld : taxNew).toLocaleString('en-IN')}</span></div>
                            </div>
                        </div>

                        <div className="declaration-box">
                            <label className="checkbox-label">
                                <input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} />
                                <span>I hereby declare that the information provided is correct and complete to the best of my knowledge and belief.</span>
                            </label>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="filing-container">
            {/* Progress Bar */}
            <div className="wizard-progress">
                {STEPS.map((label, i) => (
                    <div key={label} className={`progress-step ${i < currentStep ? 'completed' : ''} ${i === currentStep ? 'current' : ''}`}
                        onClick={() => { if (i < currentStep) setCurrentStep(i); }}>
                        <div className="step-circle">
                            {i < currentStep ? <Check size={14} /> : <span>{i + 1}</span>}
                        </div>
                        <span className="step-label">{label}</span>
                    </div>
                ))}
            </div>

            {/* Step Content */}
            <div className="card wizard-card">
                {renderStep()}
            </div>

            {/* Footer Actions */}
            <div className="wizard-footer">
                <button className="btn btn-secondary" onClick={() => alert('Progress saved!')} >
                    <Save size={16} /> Save & Continue Later
                </button>
                <div className="wizard-nav-btns">
                    {currentStep > 0 && (
                        <button className="btn btn-secondary" onClick={() => setCurrentStep(currentStep - 1)}>
                            <ChevronLeft size={16} /> Previous
                        </button>
                    )}
                    {currentStep < STEPS.length - 1 ? (
                        <button className="btn btn-primary" onClick={() => setCurrentStep(currentStep + 1)}>
                            Next <ChevronRight size={16} />
                        </button>
                    ) : (
                        <button className="btn btn-primary" disabled={!accepted}
                            onClick={() => alert('Filing Confirmed! Proceeding to submit.')}>
                            <Check size={16} /> Confirm & Proceed to Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StartFiling;
