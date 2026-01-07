import React, { Suspense, lazy, PropsWithChildren } from 'react';
import { Routes, Route } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import ProductGridSkeleton from '../components/skeletons/ProductGridSkeleton';
import ProductDetailSkeleton from '../components/skeletons/ProductDetailSkeleton';
import GenericPageSkeleton from '../components/skeletons/GenericPageSkeleton';

const Home = lazy(() => import('../pages/Home'));
const Products = lazy(() => import('../pages/Products'));
const ProductDetail = lazy(() => import('../pages/ProductDetail'));
const Cart = lazy(() => import('../pages/Cart'));
const Wishlist = lazy(() => import('../pages/Wishlist'));
const Collections = lazy(() => import('../pages/Collections'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const Login = lazy(() => import('../pages/Login'));
const Faq = lazy(() => import('../pages/Faq'));
const Shipping = lazy(() => import('../pages/Shipping'));

const LazyPage = ({ children, skeleton }: PropsWithChildren<{ skeleton: React.ReactNode }>) => (
  <Suspense fallback={skeleton}>
    <PageWrapper>{children}</PageWrapper>
  </Suspense>
);

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LazyPage skeleton={<ProductGridSkeleton />}><Home /></LazyPage>} />
    <Route path="/products" element={<LazyPage skeleton={<ProductGridSkeleton />}><Products /></LazyPage>} />
    <Route path="/product/:id" element={<LazyPage skeleton={<ProductDetailSkeleton />}><ProductDetail /></LazyPage>} />
    <Route path="/cart" element={<LazyPage skeleton={<GenericPageSkeleton />}><Cart /></LazyPage>} />
    <Route path="/wishlist" element={<LazyPage skeleton={<ProductGridSkeleton />}><Wishlist /></LazyPage>} />
    <Route path="/collections" element={<LazyPage skeleton={<GenericPageSkeleton />}><Collections /></LazyPage>} />
    <Route path="/about" element={<LazyPage skeleton={<GenericPageSkeleton />}><About /></LazyPage>} />
    <Route path="/contact" element={<LazyPage skeleton={<GenericPageSkeleton />}><Contact /></LazyPage>} />
    <Route path="/login" element={<LazyPage skeleton={<div />}><Login /></LazyPage>} />
    <Route path="/faq" element={<LazyPage skeleton={<GenericPageSkeleton />}><Faq /></LazyPage>} />
    <Route path="/shipping" element={<LazyPage skeleton={<GenericPageSkeleton />}><Shipping /></LazyPage>} />
  </Routes>
);

export default AppRoutes;