import { useAppContext } from '../context/AppContext';
import { Download } from 'lucide-react';
import './TaxSummary.css';

const TaxSummary = () => {
    const { activeTaxpayerId, taxpayers } = useAppContext();
    const activeTaxpayer = taxpayers.find(t => t.id === activeTaxpayerId);

    // Mock derived values
    const grossIncome = 820000;
    const totalDeductions = 225000;
    const taxableIncome = 545000;
    const slabTax = 14750;
    const cess = Math.round(slabTax * 0.04);
    const totalTax = slabTax + cess;
    const tds = 55000;
    const netPayable = totalTax - tds;
    const isRefund = netPayable < 0;

    return (
        <div className="summary-container">
            <div className="summary-header">
                <div>
                    <h2>Tax Summary</h2>
                    <p className="text-muted">Transparent computation sheet for {activeTaxpayer?.name || 'Select Taxpayer'}</p>
                </div>
                <button className="btn btn-secondary" onClick={() => alert('Download PDF feature coming soon!')}>
                    <Download size={16} /> Download Summary
                </button>
            </div>

            <div className="computation-sheet card">
                <div className="comp-row">
                    <span className="comp-label">A. Gross Total Income</span>
                    <span className="comp-value">₹{grossIncome.toLocaleString('en-IN')}</span>
                </div>

                <div className="comp-row sub">
                    <span className="comp-label">Salary Income</span>
                    <span className="comp-value">₹8,00,000</span>
                </div>
                <div className="comp-row sub">
                    <span className="comp-label">Interest Income</span>
                    <span className="comp-value">₹15,000</span>
                </div>
                <div className="comp-row sub">
                    <span className="comp-label">Dividend Income</span>
                    <span className="comp-value">₹5,000</span>
                </div>

                <div className="comp-divider"></div>

                <div className="comp-row deduction">
                    <span className="comp-label">B. Total Deductions</span>
                    <span className="comp-value">- ₹{totalDeductions.toLocaleString('en-IN')}</span>
                </div>

                <div className="comp-row sub">
                    <span className="comp-label">Section 80C</span>
                    <span className="comp-value">₹1,50,000</span>
                </div>
                <div className="comp-row sub">
                    <span className="comp-label">Section 80D</span>
                    <span className="comp-value">₹25,000</span>
                </div>
                <div className="comp-row sub">
                    <span className="comp-label">NPS (80CCD)</span>
                    <span className="comp-value">₹50,000</span>
                </div>

                <div className="comp-divider"></div>

                <div className="comp-row">
                    <span className="comp-label">C. Taxable Income (A - B)</span>
                    <span className="comp-value">₹{taxableIncome.toLocaleString('en-IN')}</span>
                </div>

                <div className="comp-divider"></div>

                <div className="comp-row">
                    <span className="comp-label">D. Tax on Slab</span>
                    <span className="comp-value">₹{slabTax.toLocaleString('en-IN')}</span>
                </div>

                <div className="comp-row sub">
                    <span className="comp-label">Health & Education Cess (4%)</span>
                    <span className="comp-value">₹{cess.toLocaleString('en-IN')}</span>
                </div>

                <div className="comp-row">
                    <span className="comp-label">E. Total Tax Liability</span>
                    <span className="comp-value">₹{totalTax.toLocaleString('en-IN')}</span>
                </div>

                <div className="comp-divider"></div>

                <div className="comp-row">
                    <span className="comp-label">F. TDS & Advance Tax Paid</span>
                    <span className="comp-value">₹{tds.toLocaleString('en-IN')}</span>
                </div>

                <div className="comp-divider thick"></div>

                <div className={`comp-row final ${isRefund ? 'refund' : 'payable'}`}>
                    <span className="comp-label">{isRefund ? 'G. Net Refund Due' : 'G. Net Tax Payable'}</span>
                    <span className="comp-value final-value">₹{Math.abs(netPayable).toLocaleString('en-IN')}</span>
                </div>
            </div>
        </div>
    );
};

export default TaxSummary;
