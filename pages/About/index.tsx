
import React from 'react';
import Container from '../../components/ui/Container';

const About: React.FC = () => {
  return (
    <div className="bg-cream">
      <div className="relative h-96 flex items-center justify-center">
        <img src="https://picsum.photos/id/367/1600/600" alt="Our Atelier" className="absolute inset-0 w-full h-full object-cover opacity-60"/>
        <h1 className="relative font-serif text-6xl text-soft-black z-10">Our Story</h1>
      </div>
      
      <Container className="py-16 sm:py-24 max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="font-serif text-4xl">Conscious Craft, Timeless Design</h2>
          <p className="mt-6 text-lg text-charcoal leading-relaxed">
            Demo was born from a simple idea: to create beautiful, high-quality clothing that stands the test of time, both in style and in make. We believe in a slower, more intentional approach to fashion. In a world of fleeting trends, we design for the woman who is confident in her own style, who values craftsmanship, and who seeks a deeper connection with the clothes she wears.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mt-20 items-center">
          <div>
            <h3 className="font-serif text-3xl mb-4">Our Philosophy</h3>
            <p className="text-charcoal leading-relaxed">
              <strong>Less, but better.</strong> We focus on creating versatile, essential pieces that form the foundation of a modern wardrobe. Each garment is thoughtfully designed in our studio, with a meticulous focus on fit, fabric, and detail.
            </p>
            <p className="mt-4 text-charcoal leading-relaxed">
              <strong>Sustainability as a standard.</strong> We are committed to minimizing our environmental impact by using natural, organic, and recycled materials wherever possible. We partner with ethical manufacturers who share our values of fair labor and responsible production.
            </p>
          </div>
          <div>
            <img src="https://picsum.photos/id/1078/800/1000" alt="Fabric details" className="w-full h-full object-cover" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
