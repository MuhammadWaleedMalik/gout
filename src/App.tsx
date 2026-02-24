import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Toaster } from 'react-hot-toast';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Privacy from './pages/Privacy';
import Blog from './pages/Blog';
import Cookies from './pages/Cookies';
import Terms from './pages/Terms';

import FAQs from './pages/Faqs';


import Join from './pages/Services/JoinChurches';
import Donate from './pages/Services/Donate';
import Pledges from './pages/Services/Pledges';
import ManageEvents from './pages/Services/ManageEvents';
import Pricing from './pages/Pricing';
import Findings from './pages/Findings';
import ProductDetail from './pages/ProductDetail';
import Jewellery from './pages/Jewellery';
import BeadStrings from './pages/BeadStrings';
import PearlStrings from './pages/PearlStrings';
import Beads from './pages/Beads';
import Rocks from './pages/Rocks';
import Birthstones from './pages/BirthStones';
import Checkout from './pages/Checkout';
import AdminApp from './admin/App';




function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Toaster position="top-right" />
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />

                <Route path="/blogs" element={<Blog />} />



                // In your App.js, add this route:

                // Inside your Routes component:
                <Route path="/findings" element={<Findings />} />
                <Route path="/jewellery" element={<Jewellery />} />
                <Route path="/bead-strings" element={<BeadStrings />} />
                <Route path="/pearl-strings" element={<PearlStrings />} />
                <Route path="/beads" element={<Beads />} />
                <Route path="/rocks" element={<Rocks />} />
                <Route path="/other" element={<Rocks />} />
                <Route path="/birthstones" element={<Birthstones />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/checkout/:id" element={<Checkout />} />
                <Route path="/admin" element={<AdminApp />} />




                <Route path="/faqs" element={<FAQs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/pricing" element={<Pricing />} />




                <Route path="/join-churches" element={<ProtectedRoute> <Join /> </ProtectedRoute>} />
                <Route path="/donate" element={<ProtectedRoute> <Donate /> </ProtectedRoute>} />
                <Route path="/pledges" element={<ProtectedRoute> <Pledges /> </ProtectedRoute>} />
                <Route path="/manage-events" element={<ProtectedRoute> <ManageEvents /> </ProtectedRoute>} />













              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;