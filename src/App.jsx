import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ArchitectureOCPV from './components/ArchitectureOCPV';
import TpeMockup from './components/TpeMockup';
import DashboardAntenne from './components/DashboardAntenne';
import DashboardDGM from './components/DashboardDGM';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ArchitectureOCPV />} />
        <Route path="/tpe-mockup" element={<TpeMockup />} />
        <Route path="/dashboard-antenne" element={<DashboardAntenne />} />
        <Route path="/dashboard-dgm" element={<DashboardDGM />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
