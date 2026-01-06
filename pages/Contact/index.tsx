
import React from 'react';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';

const Contact: React.FC = () => {
  return (
    <Container className="py-16 sm:py-24">
      <div className="text-center">
        <h1 className="font-serif text-5xl">Get in Touch</h1>
        <p className="mt-4 max-w-2xl mx-auto text-charcoal">
          We're here to help. Whether you have a question about our products, an order, or just want to say hello, we'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 mt-16 max-w-5xl mx-auto">
        <div>
          <h2 className="font-serif text-3xl mb-6">Send us a message</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-charcoal">Name</label>
              <input type="text" id="name" className="mt-1 block w-full bg-ivory border-beige focus:ring-rose focus:border-rose p-3" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-charcoal">Email</label>
              <input type="email" id="email" className="mt-1 block w-full bg-ivory border-beige focus:ring-rose focus:border-rose p-3" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-charcoal">Message</label>
              <textarea id="message" rows={5} className="mt-1 block w-full bg-ivory border-beige focus:ring-rose focus:border-rose p-3"></textarea>
            </div>
            <div>
              <Button type="submit">Send Message</Button>
            </div>
          </form>
        </div>
        <div className="md:pt-16">
          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-xl">Customer Service</h3>
              <p className="text-charcoal mt-2">hello@demo.com</p>
              <p className="text-charcoal">+1 (555) 123-4567</p>
              <p className="text-sm text-gray-500 mt-1">Monday - Friday, 9am - 5pm EST</p>
            </div>
            <div>
              <h3 className="font-serif text-xl">Press Inquiries</h3>
              <p className="text-charcoal mt-2">press@demo.com</p>
            </div>
            <div>
              <h3 className="font-serif text-xl">Follow Us</h3>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="text-charcoal hover:underline">Instagram</a>
                <a href="#" className="text-charcoal hover:underline">Pinterest</a>
                <a href="#" className="text-charcoal hover:underline">Facebook</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Contact;
