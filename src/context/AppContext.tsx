import { createContext, useContext, useState, type ReactNode } from 'react';

export interface Taxpayer {
    id: string;
    name: string;
    pan: string;
    itrType: string;
    filingStatus: 'Draft' | 'In Progress' | 'Filed' | 'Verified' | 'Processed';
}

interface AppContextType {
    assessmentYear: string;
    setAssessmentYear: (year: string) => void;
    activeTaxpayerId: string | null;
    setActiveTaxpayerId: (id: string | null) => void;
    taxpayers: Taxpayer[];
    addTaxpayer: (taxpayer: Taxpayer) => void;
    deleteTaxpayer: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [assessmentYear, setAssessmentYear] = useState('2024-2025');
    const [taxpayers, setTaxpayers] = useState<Taxpayer[]>([
        {
            id: '1',
            name: 'Rohan Sharma',
            pan: 'ABCDE1234F',
            itrType: 'ITR-1',
            filingStatus: 'Draft',
        },
        {
            id: '2',
            name: 'Priya Sharma',
            pan: 'FGHIJ5678K',
            itrType: 'ITR-2',
            filingStatus: 'Processed',
        }
    ]);
    const [activeTaxpayerId, setActiveTaxpayerId] = useState<string | null>('1');

    const addTaxpayer = (taxpayer: Taxpayer) => setTaxpayers([...taxpayers, taxpayer]);
    const deleteTaxpayer = (id: string) => setTaxpayers(taxpayers.filter(t => t.id !== id));

    return (
        <AppContext.Provider
            value={{
                assessmentYear,
                setAssessmentYear,
                activeTaxpayerId,
                setActiveTaxpayerId,
                taxpayers,
                addTaxpayer,
                deleteTaxpayer
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
