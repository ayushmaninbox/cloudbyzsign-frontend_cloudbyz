import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash, faSignature } from '@fortawesome/free-solid-svg-icons';
import Loader from '../ui/Loader';
import Error404 from '../ui/404error';

const SignIn = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState(false);

    useEffect(() => {
        localStorage.removeItem('username');
        localStorage.removeItem('useremail');
    }, []);

    const loadingStates = [
        { text: 'Verifying credentials...' },
        { text: 'Checking server connection...' },
        { text: 'Authenticating user...' },
        { text: 'Loading dashboard...' }
    ];

    const handleSignIn = async (e) => {
        e.preventDefault();
        const emailInput = document.getElementById("email").value;
        const passwordInput = document.getElementById("password").value;

        setIsLoading(true);
        setError('');
        setServerError(false);

        try {
            // Test server connection first
            const testResponse = await fetch('http://localhost:5000/api/stats');
            if (!testResponse.ok) {
                throw new Error('Server connection failed');
            }

            // Simulate loading delay
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Hardcoded credentials for John Doe
            if (emailInput === "john.doe@cloudbyz.com" && passwordInput === "password") {
                localStorage.setItem("username", "John Doe");
                localStorage.setItem("useremail", "john.doe@cloudbyz.com");
                setIsLoading(false);
                navigate("/home");
            } else {
                setError('Invalid email or password');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Server error:', error);
            setServerError(true);
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        setIsLoading(true);
        setError('');
        setServerError(false);

        // Simulate Google login
        setTimeout(() => {
            localStorage.setItem("username", "John Doe");
            localStorage.setItem("useremail", "john.doe@cloudbyz.com");
            setIsLoading(false);
            navigate("/home");
        }, 2000);
    };

    if (serverError) {
        return <Error404 />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-2 sm:p-4">
            <Loader loading={isLoading}>
                {loadingStates}
            </Loader>
            
            <div className="flex flex-col lg:flex-row w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-6xl min-h-[85vh] sm:min-h-[90vh] lg:h-[90vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
                {/* Left Side */}
                <div className="w-full lg:w-1/2 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden min-h-[120px] sm:min-h-[150px] md:min-h-[200px] lg:min-h-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-CloudbyzBlue/5 to-transparent"></div>
                    <FontAwesomeIcon icon={faSignature} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl text-CloudbyzBlue drop-shadow-lg relative z-10" />
                </div>

                {/* Right Side */}
                <div className="w-full lg:w-1/2 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-slate-50">
                    <div className="max-w-xs sm:max-w-sm md:max-w-md mx-auto w-full">
                        <img src="/images/cloudbyz.png" alt="Cloudbyz Logo" className="w-20 sm:w-24 md:w-32 lg:w-36 xl:w-48 mx-auto mb-3 sm:mb-4 md:mb-6 lg:mb-8 drop-shadow-sm" />
                        
                        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-800 mb-3 sm:mb-4 md:mb-6 lg:mb-8 text-center bg-gradient-to-r from-slate-800 to-CloudbyzBlue bg-clip-text text-transparent">
                            Welcome Back
                        </h2>

                        {error && (
                            <div className="mb-3 sm:mb-4 md:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl text-red-700 text-xs sm:text-sm font-medium animate-pulse">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSignIn} className="space-y-3 sm:space-y-4 lg:space-y-6">
                            <div className="relative group">
                                <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 z-10">
                                    <FontAwesomeIcon icon={faEnvelope} className="text-slate-400 group-focus-within:text-CloudbyzBlue transition-colors duration-200 text-sm sm:text-base" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    required
                                    className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 lg:py-4 border-2 border-slate-200 rounded-lg sm:rounded-xl bg-white/80 backdrop-blur-sm focus:border-CloudbyzBlue focus:ring-4 focus:ring-CloudbyzBlue/10 outline-none transition-all duration-200 text-slate-700 placeholder-slate-400 text-sm sm:text-base"
                                />
                            </div>

                            <div className="relative group">
                                <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 z-10">
                                    <FontAwesomeIcon icon={faLock} className="text-slate-400 group-focus-within:text-CloudbyzBlue transition-colors duration-200 text-sm sm:text-base" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter your password"
                                    required
                                    className="w-full pl-9 sm:pl-12 pr-9 sm:pr-12 py-2.5 sm:py-3 lg:py-4 border-2 border-slate-200 rounded-lg sm:rounded-xl bg-white/80 backdrop-blur-sm focus:border-CloudbyzBlue focus:ring-4 focus:ring-CloudbyzBlue/10 outline-none transition-all duration-200 text-slate-700 placeholder-slate-400 text-sm sm:text-base"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-CloudbyzBlue transition-colors duration-200 p-1 rounded-lg hover:bg-CloudbyzBlue/10"
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-sm sm:text-base" />
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2.5 sm:py-3 lg:py-4 bg-gradient-to-r from-CloudbyzBlue to-blue-600 text-white font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden group text-sm sm:text-base"
                            >
                                <span className="relative z-10">Sign In</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-CloudbyzBlue opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                            </button>

                            <div className="relative my-3 sm:my-4 lg:my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-xs sm:text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="w-full py-2.5 sm:py-3 lg:py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg sm:rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                <span>Login Using Google</span>
                            </button>
                        </form>

                        <p className="mt-3 sm:mt-4 md:mt-6 lg:mt-8 text-center text-slate-600 text-xs sm:text-sm lg:text-base">
                            New user?{' '}
                            <a href="/signup" className="text-CloudbyzBlue font-semibold hover:text-blue-600 transition-colors duration-200 relative group">
                                Sign up
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-CloudbyzBlue group-hover:w-full transition-all duration-200"></span>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;