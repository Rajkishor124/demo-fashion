import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useCartDrawer } from '../../context/CartDrawerContext';
import Button from '../ui/Button';

const CartDrawer: React.FC = () => {
  const { isOpen, closeCart } = useCartDrawer();
  const { cart, removeFromCart, updateQuantity, cartCount, totalPrice } = useCart();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeCart();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeCart]);
  
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-beige">
            <h2 className="font-serif text-2xl">Shopping Bag ({cartCount})</h2>
            <button onClick={closeCart} className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          {cartCount > 0 ? (
            <>
              <div className="flex-1 overflow-y-auto p-6">
                <ul className="divide-y divide-beige -my-6">
                  {cart.map(item => (
                    <li key={item.cartItemId} className="flex py-6">
                      <div className="h-28 w-20 flex-shrink-0 overflow-hidden">
                        <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover object-center" />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-soft-black">
                            <h3 className="font-serif text-md"><Link to={`/product/${item.id}`} onClick={closeCart}>{item.name}</Link></h3>
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
              
              <div className="border-t border-beige p-6">
                <div className="flex justify-between text-base font-medium text-soft-black">
                  <p>Subtotal</p>
                  <p>${totalPrice.toFixed(2)}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                  <Button className="w-full" onClick={closeCart}>
                    <Link to="/cart" className="block w-full h-full">
                        Proceed to Checkout
                    </Link>
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  <button onClick={closeCart} className="text-charcoal hover:underline">
                    or Continue Shopping
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <h3 className="font-serif text-2xl">Your bag is empty</h3>
              <p className="mt-2 text-charcoal">Add your favorite items to your bag to see them here.</p>
              <Button variant="secondary" className="mt-6" onClick={closeCart}>
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;