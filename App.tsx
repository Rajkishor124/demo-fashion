
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import AppRoutes from './router';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <div className="bg-cream min-h-screen font-sans text-soft-black antialiased">
            <Header />
            <main>
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
