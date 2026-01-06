
import React from 'react';
import { Link } from 'react-router-dom';
import { collections } from '../../data/collections';
import Button from '../../components/ui/Button';
import Container from '../../components/ui/Container';

const Collections: React.FC = () => {
  return (
    <div>
      <div className="text-center py-16 bg-beige">
        <Container>
          <h1 className="font-serif text-5xl">Our Collections</h1>
          <p className="mt-4 max-w-2xl mx-auto text-charcoal">Each collection is a narrative, a mood, a moment in time, captured in fabric and form. Explore the stories we're telling this season.</p>
        </Container>
      </div>
      
      <div className="space-y-24 my-24">
        {collections.map((collection, index) => (
          <Container key={collection.id}>
            <div className={`grid md:grid-cols-2 items-center gap-12 ${index % 2 !== 0 ? 'md:grid-flow-row-dense' : ''}`}>
              <div className={`text-center md:text-left ${index % 2 !== 0 ? 'md:col-start-2' : ''}`}>
                <h3 className="font-sans text-sm uppercase tracking-widest text-rose">{collection.subtitle}</h3>
                <h2 className="font-serif text-4xl md:text-5xl mt-4">{collection.title}</h2>
                <p className="mt-4 text-charcoal">{collection.description}</p>
                <Button variant="secondary" className="mt-8">
                  <Link to="/products">Shop The Collection</Link>
                </Button>
              </div>
              <div className="h-[60vh]">
                <img src={collection.image} alt={collection.title} className="w-full h-full object-cover" />
              </div>
            </div>
          </Container>
        ))}
      </div>
    </div>
  );
};

export default Collections;
