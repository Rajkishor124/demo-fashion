
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 109.8 512 0 402.2 0 261.8S109.8 11.8 244 11.8c70.3 0 129.8 27.8 174.3 73.6l-63.8 62.4C322.8 127.3 286.7 107.5 244 107.5c-73.2 0-132.3 60.2-132.3 134.3s59.1 134.3 132.3 134.3c82.3 0 113.8-59.5 119.5-91.8H244v-76.3h239.3c1.3 12.8 2.7 25.4 2.7 38.6z"></path>
    </svg>
);

const FacebookIcon = () => (
    <svg className="w-5 h-5 mr-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
    </svg>
);


const Login: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-cream">
            <div className="relative flex-1 hidden lg:block h-screen">
                <img 
                    src="https://picsum.photos/id/1027/1200/1800" 
                    alt="Fashion model" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
                    <h1 className="font-serif text-6xl">Welcome Back</h1>
                    <p className="mt-4 text-lg">Sign in to access your wishlist and bag.</p>
                </div>
            </div>
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="text-center font-serif text-4xl text-soft-black">Login / Signup</h2>
                        <p className="mt-2 text-center text-sm text-charcoal">
                            Join the Demo family.
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="mobile-number" className="sr-only">Mobile Number</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 border border-r-0 border-beige bg-ivory text-charcoal text-sm">
                                        +91
                                    </span>
                                    <input 
                                        id="mobile-number" 
                                        name="mobile" 
                                        type="tel" 
                                        autoComplete="tel" 
                                        required 
                                        className="appearance-none relative block w-full px-3 py-3 border border-beige bg-ivory placeholder-gray-500 text-charcoal focus:outline-none focus:ring-rose focus:border-rose focus:z-10 sm:text-sm" 
                                        placeholder="Enter Mobile Number" 
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <Button type="submit" className="w-full justify-center">
                                Continue
                            </Button>
                        </div>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-beige" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-cream text-charcoal">OR</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                         <Button variant="secondary" className="w-full justify-center flex items-center">
                            <GoogleIcon /> Google
                         </Button>
                         {/* <Button variant="secondary" className="w-full justify-center flex items-center">
                            <FacebookIcon /> Facebook
                         </Button> */}
                    </div>

                     <p className="mt-6 text-center text-xs text-gray-500">
                        By creating an account, you agree to Demo's 
                        <Link to="/terms" className="font-medium text-charcoal hover:underline"> T&C</Link> and 
                        <Link to="/privacy" className="font-medium text-charcoal hover:underline"> Privacy Policy</Link>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
