
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import AppRoutes from './router';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import ToastContainer from './components/common/ToastContainer';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>
            <div className="bg-cream min-h-screen font-sans text-soft-black antialiased">
              <Header />
              <ToastContainer />
              <main>
                <AppRoutes />
              </main>
              <Footer />
            </div>
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}

export default App;