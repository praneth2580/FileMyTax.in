import { useState } from 'react';
import { Upload, FileText, Shield, Image, File, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import './Documents.css';

interface DocFile {
    id: string;
    name: string;
    category: string;
    uploadDate: string;
    status: 'Uploaded' | 'Reviewed' | 'Parsed' | 'Pending Review' | 'Error';
}

const MOCK_DOCS: DocFile[] = [
    { id: '1', name: 'Form_16_2024.pdf', category: 'Form 16', uploadDate: '2024-06-15', status: 'Reviewed' },
    { id: '2', name: '26AS_2024.pdf', category: '26AS', uploadDate: '2024-06-10', status: 'Parsed' },
    { id: '3', name: 'LIC_Policy_Receipt.pdf', category: 'Investment Proofs', uploadDate: '2024-07-01', status: 'Uploaded' },
];

const Documents = () => {
    const [activeTab, setActiveTab] = useState('Form 16');
    const [docs, setDocs] = useState<DocFile[]>(MOCK_DOCS);
    const [dragOver, setDragOver] = useState(false);

    const tabs = ['Form 16', '26AS', 'AIS', 'Investment Proofs'];

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const files = Array.from(e.dataTransfer.files);
        const newDocs: DocFile[] = files.map((f, i) => ({
            id: `new-${Date.now()}-${i}`,
            name: f.name,
            category: activeTab,
            uploadDate: new Date().toISOString().split('T')[0],
            status: 'Uploaded'
        }));
        setDocs([...docs, ...newDocs]);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);
        const newDocs: DocFile[] = files.map((f, i) => ({
            id: `new-${Date.now()}-${i}`,
            name: f.name,
            category: activeTab,
            uploadDate: new Date().toISOString().split('T')[0],
            status: 'Uploaded'
        }));
        setDocs([...docs, ...newDocs]);
    };

    const filteredDocs = docs.filter(d => d.category === activeTab);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Reviewed':
            case 'Parsed':
                return <CheckCircle2 size={16} color="var(--success)" />;
            case 'Pending Review':
                return <Clock size={16} color="var(--warning)" />;
            case 'Error':
                return <AlertTriangle size={16} color="var(--error)" />;
            default:
                return <FileText size={16} color="var(--text-muted)" />;
        }
    };

    return (
        <div className="docs-container">
            <div className="docs-header">
                <h2>Documents</h2>
                <p className="text-muted">Upload and manage your tax-related documents.</p>
            </div>

            {/* Upload Zone */}
            <div
                className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
            >
                <div className="upload-inner">
                    <Upload size={40} className="upload-icon" />
                    <h3>Drag & Drop files here</h3>
                    <p className="text-muted">or click to browse. Supported: PDF, JPG, PNG</p>
                    <label className="btn btn-primary upload-btn">
                        <File size={16} /> Browse Files
                        <input type="file" accept=".pdf,.jpg,.jpeg,.png" multiple hidden onChange={handleFileInput} />
                    </label>
                </div>
            </div>

            {/* Tabs */}
            <div className="doc-tabs">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        className={`doc-tab ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === 'Form 16' && <FileText size={16} />}
                        {tab === '26AS' && <Shield size={16} />}
                        {tab === 'AIS' && <Shield size={16} />}
                        {tab === 'Investment Proofs' && <Image size={16} />}
                        {tab}
                    </button>
                ))}
            </div>

            {/* Document List */}
            <div className="card doc-list-card">
                {filteredDocs.length === 0 ? (
                    <div className="empty-docs">
                        <FileText size={32} color="var(--text-muted)" />
                        <p className="text-muted">No documents uploaded for "{activeTab}" yet.</p>
                    </div>
                ) : (
                    <div className="doc-list">
                        {filteredDocs.map(doc => (
                            <div key={doc.id} className="doc-item">
                                <div className="doc-info">
                                    <FileText size={20} className="doc-file-icon" />
                                    <div>
                                        <span className="doc-name">{doc.name}</span>
                                        <span className="doc-date">Uploaded: {doc.uploadDate}</span>
                                    </div>
                                </div>
                                <div className="doc-status">
                                    {getStatusIcon(doc.status)}
                                    <span className={`status-text status-${doc.status.toLowerCase().replace(' ', '-')}`}>{doc.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Documents;
