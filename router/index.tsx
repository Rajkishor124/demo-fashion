
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';

const Home = lazy(() => import('../pages/Home'));
const Products = lazy(() => import('../pages/Products'));
const ProductDetail = lazy(() => import('../pages/ProductDetail'));
const Cart = lazy(() => import('../pages/Cart'));
const Wishlist = lazy(() => import('../pages/Wishlist'));
const Collections = lazy(() => import('../pages/Collections'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const Login = lazy(() => import('../pages/Login'));

const LazyPage = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-cream"><p>Loading...</p></div>}>
    <PageWrapper>{children}</PageWrapper>
  </Suspense>
);

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LazyPage><Home /></LazyPage>} />
    <Route path="/products" element={<LazyPage><Products /></LazyPage>} />
    <Route path="/product/:id" element={<LazyPage><ProductDetail /></LazyPage>} />
    <Route path="/cart" element={<LazyPage><Cart /></LazyPage>} />
    <Route path="/wishlist" element={<LazyPage><Wishlist /></LazyPage>} />
    <Route path="/collections" element={<LazyPage><Collections /></LazyPage>} />
    <Route path="/about" element={<LazyPage><About /></LazyPage>} />
    <Route path="/contact" element={<LazyPage><Contact /></LazyPage>} />
    <Route path="/login" element={<LazyPage><Login /></LazyPage>} />
  </Routes>
);

export default AppRoutes;
