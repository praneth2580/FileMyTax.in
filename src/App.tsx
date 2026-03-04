import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import MyTaxpayers from './pages/MyTaxpayers';
import StartFiling from './pages/StartFiling';
import Documents from './pages/Documents';
import TaxSummary from './pages/TaxSummary';
import SubmitTrack from './pages/SubmitTrack';
import Settings from './pages/Settings';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="taxpayers" element={<MyTaxpayers />} />
            <Route path="start-filing" element={<StartFiling />} />
            <Route path="documents" element={<Documents />} />
            <Route path="summary" element={<TaxSummary />} />
            <Route path="submit" element={<SubmitTrack />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
