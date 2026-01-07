
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartCount, totalPrice } = useCart();

  if (cartCount === 0) {
    return (
      <Container className="text-center py-20">
        <h1 className="font-serif text-4xl">Your Bag is Empty</h1>
        <p className="mt-4 text-charcoal">Looks like you haven't added anything to your bag yet.</p>
        <Button className="mt-8">
          <Link to="/products">Continue Shopping</Link>
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-serif text-4xl text-center mb-10">Shopping Bag</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <ul className="divide-y divide-beige">
            {cart.map(item => (
              <li key={item.cartItemId} className="flex py-6">
                <div className="h-32 w-24 flex-shrink-0 overflow-hidden">
                  <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover object-center" />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-soft-black">
                      <h3 className="font-serif text-lg"><Link to={`/product/${item.id}`}>{item.name}</Link></h3>
                      <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.selectedColor}</p>
                    <p className="mt-1 text-sm text-gray-500">Size: {item.selectedSize}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center border border-beige">
                      <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} className="px-3 py-1">-</button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} className="px-3 py-1">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.cartItemId)} type="button" className="font-medium text-rose hover:text-rose/80">Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-1">
          <div className="border border-beige bg-ivory p-6">
            <h2 className="font-serif text-2xl mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between font-bold pt-4 mt-2 border-t border-beige">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full mt-6">Proceed to Checkout</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Cart;