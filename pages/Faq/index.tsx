
import React from 'react';
import Container from '../../components/ui/Container';

const Faq: React.FC = () => {
  return (
    <Container className="py-16 sm:py-24 text-center min-h-[50vh] flex flex-col justify-center items-center">
      <h1 className="font-serif text-5xl">Frequently Asked Questions</h1>
      <p className="mt-4 text-charcoal max-w-md">This page is currently under construction. Please check back later for updates on our most common inquiries!</p>
    </Container>
  );
};

export default Faq;
