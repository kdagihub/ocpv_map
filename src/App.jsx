import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import AgrilinkLanding from './components/agrilink/AgrilinkLanding';
import ArchitectureOCPV from './components/ArchitectureOCPV';
import TpeMockup from './components/TpeMockup';
import DashboardAntenne from './components/DashboardAntenne';
import DashboardDGM from './components/DashboardDGM';
import ProducerDemo from './components/producteur/ProducerDemo';
import BuyerDemo from './components/acheteur/BuyerDemo';
import TransporterDemo from './components/transporteur/TransporterDemo';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AgrilinkLanding />} />
          <Route path="/architecture-v1" element={<ArchitectureOCPV />} />
          <Route path="/tpe-mockup" element={<TpeMockup />} />
          <Route path="/dashboard-antenne" element={<DashboardAntenne />} />
          <Route path="/demo-producteur" element={<ProducerDemo />} />
          <Route path="/demo-acheteur" element={<BuyerDemo />} />
          <Route path="/demo-transporteur" element={<TransporterDemo />} />
          <Route path="/dashboard-dgm" element={<DashboardDGM />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
