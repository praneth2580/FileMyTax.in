import { useState } from 'react';
import { useAppContext, type Taxpayer } from '../context/AppContext';
import { UserPlus, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import './MyTaxpayers.css';

const MyTaxpayers = () => {
  const { assessmentYear, taxpayers, activeTaxpayerId, setActiveTaxpayerId, addTaxpayer, deleteTaxpayer } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [step, setStep] = useState(1);
  const [newTaxpayer, setNewTaxpayer] = useState<Partial<Taxpayer>>({
    itrType: 'ITR-1',
    filingStatus: 'Draft'
  });

  const handleDelete = (id: string, name: string) => {
    const confirmationWord = window.prompt(`Type DELETE to confirm removing ${name}`);
    if (confirmationWord === 'DELETE') {
      deleteTaxpayer(id);
      if (activeTaxpayerId === id && taxpayers.length > 1) {
        const another = taxpayers.find(t => t.id !== id);
        if (another) setActiveTaxpayerId(another.id);
      }
    }
  };

  const handleNextStep = () => {
    if (step === 1 && newTaxpayer.pan && newTaxpayer.name) {
      setStep(2);
    } else {
      alert("Please fill mandatory fields (PAN and Name)");
    }
  };

  const handleSaveTaxpayer = () => {
    const tp: Taxpayer = {
      id: Math.random().toString(36).substring(7),
      name: newTaxpayer.name!,
      pan: newTaxpayer.pan!,
      itrType: newTaxpayer.itrType || 'ITR-1',
      filingStatus: 'Draft'
    };
    addTaxpayer(tp);
    setActiveTaxpayerId(tp.id);
    setIsAdding(false);
    setStep(1);
    setNewTaxpayer({ itrType: 'ITR-1', filingStatus: 'Draft' });
  };

  return (
    <div className="taxpayer-container">
      <div className="taxpayer-header">
        <div>
          <h2>My Taxpayers</h2>
          <p className="text-muted">Manage individuals and families under one account.</p>
        </div>
        {!isAdding && (
          <button className="btn btn-primary" onClick={() => setIsAdding(true)}>
            <UserPlus size={18} /> Add Taxpayer
          </button>
        )}
      </div>

      {isAdding ? (
        <div className="card add-flow-card">
          <div className="card-header pb-0">
            <h3>{step === 1 ? 'Step 1: Identity Details' : 'Step 2: Income Type Selection'}</h3>
            <div className="step-indicator">
              <span className={`step-dot ${step >= 1 ? 'active' : ''}`}></span>
              <span className="step-line"></span>
              <span className={`step-dot ${step >= 2 ? 'active' : ''}`}></span>
            </div>
          </div>
          <div className="add-flow-content">
            {step === 1 && (
              <div className="grid-2-col">
                <div className="form-group">
                  <label>PAN Number *</label>
                  <input
                    type="text"
                    placeholder="ABCDE1234F"
                    value={newTaxpayer.pan || ''}
                    onChange={(e) => setNewTaxpayer({ ...newTaxpayer, pan: e.target.value.toUpperCase() })}
                    maxLength={10}
                  />
                </div>
                <div className="form-group">
                  <label>Full Name (As per PAN) *</label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={newTaxpayer.name || ''}
                    onChange={(e) => setNewTaxpayer({ ...newTaxpayer, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input type="date" />
                </div>
                <div className="form-group">
                  <label>Residential Status</label>
                  <select>
                    <option>Resident</option>
                    <option>Non-Resident (NRI)</option>
                    <option>Resident Not Ordinarily Resident (RNOR)</option>
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="income-selection">
                <p className="text-muted mb-4">Select all applicable income sources. We'll automatically determine the correct ITR form.</p>
                <div className="grid-2-col">
                  <label className="checkbox-card">
                    <input type="checkbox" defaultChecked onChange={(e) => {
                      if (e.target.checked) setNewTaxpayer({ ...newTaxpayer, itrType: 'ITR-1' });
                    }} />
                    <div className="cc-content">
                      <span className="cc-title">Salary / Pension</span>
                      <span className="cc-desc">Income from salary or pension</span>
                    </div>
                  </label>
                  <label className="checkbox-card">
                    <input type="checkbox" onChange={(e) => {
                      if (e.target.checked) setNewTaxpayer({ ...newTaxpayer, itrType: 'ITR-3' });
                    }} />
                    <div className="cc-content">
                      <span className="cc-title">Business / Profession</span>
                      <span className="cc-desc">Freelance, consulting, or trading</span>
                    </div>
                  </label>
                  <label className="checkbox-card">
                    <input type="checkbox" onChange={(e) => {
                      if (e.target.checked) setNewTaxpayer({ ...newTaxpayer, itrType: 'ITR-2' });
                    }} />
                    <div className="cc-content">
                      <span className="cc-title">Capital Gains</span>
                      <span className="cc-desc">Stocks, mutual funds, or property</span>
                    </div>
                  </label>
                  <label className="checkbox-card">
                    <input type="checkbox" defaultChecked />
                    <div className="cc-content">
                      <span className="cc-title">Other Sources</span>
                      <span className="cc-desc">Interest, dividends, family pension</span>
                    </div>
                  </label>
                </div>
                <div className="recommended-badge mt-4">
                  <CheckCircle2 color="var(--success)" size={18} />
                  <span>Recommended Form: <strong>{newTaxpayer.itrType}</strong></span>
                </div>
              </div>
            )}
          </div>
          <div className="add-flow-footer">
            <button className="btn btn-secondary" onClick={() => {
              if (step === 1) setIsAdding(false);
              else setStep(1);
            }}>
              {step === 1 ? 'Cancel' : 'Back'}
            </button>
            {step === 1 ? (
              <button className="btn btn-primary" onClick={handleNextStep}>Next Step</button>
            ) : (
              <button className="btn btn-primary" onClick={handleSaveTaxpayer}>Save Taxpayer</button>
            )}
          </div>
        </div>
      ) : (
        <div className="taxpayer-list">
          <div className="desktop-table card p-0">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th>Taxpayer Name</th>
                  <th>PAN</th>
                  <th>ITR Type</th>
                  <th>FY Status ({assessmentYear})</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {taxpayers.map(t => (
                  <tr key={t.id} className={t.id === activeTaxpayerId ? 'active-row' : ''}>
                    <td className="font-medium">
                      {t.name}
                      {t.id === activeTaxpayerId && <span className="badge badge-neutral ml-2">Active</span>}
                    </td>
                    <td className="text-muted">{t.pan}</td>
                    <td><span className="badge badge-neutral">{t.itrType}</span></td>
                    <td>
                      <span className={`badge badge-${t.filingStatus === 'Processed' ? 'success' : 'warning'}`}>
                        {t.filingStatus}
                      </span>
                    </td>
                    <td className="text-right table-actions">
                      {t.id !== activeTaxpayerId && (
                        <button className="btn btn-secondary btn-sm" onClick={() => setActiveTaxpayerId(t.id)}>
                          Switch
                        </button>
                      )}
                      <button className="icon-btn text-muted"><Edit2 size={16} /></button>
                      <button className="icon-btn text-error" onClick={() => handleDelete(t.id, t.name)}><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mobile-cards">
            {taxpayers.map(t => (
              <div key={t.id} className={`card tp-card ${t.id === activeTaxpayerId ? 'active-card' : ''}`}>
                <div className="tp-card-header">
                  <div>
                    <h4>{t.name}</h4>
                    <span className="text-muted text-sm">{t.pan}</span>
                  </div>
                  {t.id === activeTaxpayerId && <span className="badge badge-neutral">Active</span>}
                </div>
                <div className="tp-card-body">
                  <div className="grid-2-col gap-2 mt-2 border-t pt-2">
                    <div>
                      <span className="text-xs text-muted block uppercase">Form</span>
                      <span className="font-medium">{t.itrType}</span>
                    </div>
                    <div>
                      <span className="text-xs text-muted block uppercase">Status</span>
                      <span className={`badge badge-${t.filingStatus === 'Processed' ? 'success' : 'warning'} mt-1`}>
                        {t.filingStatus}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="tp-card-actions border-t mt-3 pt-3">
                  {t.id !== activeTaxpayerId ? (
                    <button className="btn btn-secondary w-full" onClick={() => setActiveTaxpayerId(t.id)}>Switch Profile</button>
                  ) : (
                    <div className="active-text text-sm font-medium text-center w-full text-primary">Currently Editing</div>
                  )}
                  <div className="icon-actions">
                    <button className="icon-btn"><Edit2 size={18} /></button>
                    <button className="icon-btn text-error" onClick={() => handleDelete(t.id, t.name)}><Trash2 size={18} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTaxpayers;
