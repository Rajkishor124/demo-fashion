
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import AppRoutes from './router';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import { CartDrawerProvider } from './context/CartDrawerContext';
import { StyleAssistantProvider } from './context/StyleAssistantContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import ToastContainer from './components/common/ToastContainer';
import CartDrawer from './components/cart/CartDrawer';
import StyleAssistantFab from './components/assistant/StyleAssistantFab';
import StyleAssistantDrawer from './components/assistant/StyleAssistantDrawer';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>
            <CartDrawerProvider>
              <StyleAssistantProvider>
                <div className="bg-cream min-h-screen font-sans text-soft-black antialiased">
                  <Header />
                  <ToastContainer />
                  <CartDrawer />
                  <StyleAssistantDrawer />
                  <main>
                    <AppRoutes />
                  </main>
                  <Footer />
                  <StyleAssistantFab />
                </div>
              </StyleAssistantProvider>
            </CartDrawerProvider>
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}

export default App;