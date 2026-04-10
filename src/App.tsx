import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import GPACalculator from './components/GPACalculator';
import Glossary from './components/Glossary';
import ContactDirectory from './components/ContactDirectory';
import AskSenior from './components/AskSenior';

export default function App() {
  // Defaulting to true to "sign in" the user as requested
  // but respecting if they explicitly logged out (set to 'false')
  const isLoggedIn = localStorage.getItem('isLoggedIn') !== 'false'; 

  if (localStorage.getItem('isLoggedIn') === null) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('collegeId', 'DEMO_USER');
  }

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <Toaster position="top-center" richColors visibleToasts={20} expand={false} />
        {isLoggedIn && <Navbar />}
        <main>
          <Routes>
            {!isLoggedIn ? (
              <Route path="*" element={<LoginPage />} />
            ) : (
              <>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/gpa" element={<GPACalculator />} />
                <Route path="/glossary" element={<Glossary />} />
                <Route path="/directory" element={<ContactDirectory />} />
                <Route path="/ask-senior" element={<AskSenior />} />
                <Route path="/login" element={<LoginPage />} />
              </>
            )}
          </Routes>
        </main>
        
        <footer className="bg-white border-t py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
            <div className="text-xl font-bold text-emerald-600">MyUniPlan</div>
            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} MyUniPlan Platform. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}
