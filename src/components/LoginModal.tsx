import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onLogin: (success: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onLogin }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://game-lobby-kappa.vercel.app/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.message === 'Login successful') {
        onLogin(true);
      } else {
        setError('Incorrect password. Please try again.');
        setPassword('');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Connection error. Please try again.');
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
      {/* Enhanced Casino Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Casino Background Image Overlay */}
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1871508/pexels-photo-1871508.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
            filter: 'blur(2px) brightness(0.3) contrast(1.2)'
          }}
        />
        
        {/* Animated Casino Elements */}
        <div className="absolute inset-0">
          {/* Floating casino chips */}
          <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-red-500/30 to-red-700/30 rounded-full border-4 border-red-400/50 animate-float" style={{ animationDelay: '0s' }}>
            <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">100</div>
          </div>
          <div className="absolute top-32 right-24 w-12 h-12 bg-gradient-to-br from-blue-500/30 to-blue-700/30 rounded-full border-4 border-blue-400/50 animate-float" style={{ animationDelay: '1s' }}>
            <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">50</div>
          </div>
          <div className="absolute bottom-32 left-24 w-14 h-14 bg-gradient-to-br from-green-500/30 to-green-700/30 rounded-full border-4 border-green-400/50 animate-float" style={{ animationDelay: '2s' }}>
            <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">25</div>
          </div>
          <div className="absolute bottom-20 right-20 w-18 h-18 bg-gradient-to-br from-purple-500/30 to-purple-700/30 rounded-full border-4 border-purple-400/50 animate-float" style={{ animationDelay: '3s' }}>
            <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">500</div>
          </div>
          
          {/* Floating cards */}
          <div className="absolute top-1/4 left-1/4 w-12 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-600 animate-gentle-sway shadow-lg" style={{ animationDelay: '0.5s' }}>
            <div className="w-full h-full flex flex-col items-center justify-center text-red-500">
              <div className="text-lg">♠</div>
              <div className="text-xs">A</div>
            </div>
          </div>
          <div className="absolute top-1/3 right-1/3 w-12 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-600 animate-gentle-sway shadow-lg" style={{ animationDelay: '1.5s' }}>
            <div className="w-full h-full flex flex-col items-center justify-center text-red-500">
              <div className="text-lg">♥</div>
              <div className="text-xs">K</div>
            </div>
          </div>
          <div className="absolute bottom-1/3 left-1/3 w-12 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-600 animate-gentle-sway shadow-lg" style={{ animationDelay: '2.5s' }}>
            <div className="w-full h-full flex flex-col items-center justify-center text-black">
              <div className="text-lg">♣</div>
              <div className="text-xs">Q</div>
            </div>
          </div>
          
          {/* Dice */}
          <div className="absolute top-1/2 left-1/6 w-10 h-10 bg-gradient-to-br from-white to-gray-200 rounded-lg shadow-lg animate-gentle-sway border border-gray-300" style={{ animationDelay: '1s' }}>
            <div className="w-full h-full flex items-center justify-center">
              <div className="grid grid-cols-2 gap-1">
                <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-1/4 right-1/6 w-10 h-10 bg-gradient-to-br from-white to-gray-200 rounded-lg shadow-lg animate-gentle-sway border border-gray-300" style={{ animationDelay: '3s' }}>
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Enhanced glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-red-500/15 to-orange-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        
        {/* Sparkle effects */}
        <div className="absolute top-16 right-16 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-24 left-32 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 right-32 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-16 left-16 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Enhanced grid pattern with casino theme */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.08)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40 md:bg-[size:50px_50px] md:opacity-30"></div>

      <div className="relative bg-gradient-to-br from-gray-900/98 via-black/98 to-gray-900/98 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-4 md:p-8 w-full max-w-sm md:max-w-md border border-gray-700/50 shadow-2xl mx-4 ring-1 ring-red-500/20">
        {/* Branding */}
        <div className="text-center mb-6 md:mb-8">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
            <img 
              src="https://metawin.com/_nuxt/MetaWin-logo-white.02822cdb.svg"
              alt="MetaWin"
              className="h-6 md:h-8"
            />
            <div className="w-px h-6 md:h-8 bg-gray-600"></div>
            <div className="flex items-center gap-1 md:gap-2">
              <Shield className="w-4 h-4 md:w-6 md:h-6 text-red-500" />
              <span className="text-sm md:text-lg font-bold text-white">GLADIATOR</span>
            </div>
          </div>
          <div className="w-12 md:w-16 h-0.5 md:h-1 bg-gradient-to-r from-red-500 to-purple-600 rounded-full mx-auto mb-4 md:mb-6"></div>
        </div>

        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-500/20 to-purple-600/20 rounded-full mb-4 md:mb-6 border border-red-500/30 shadow-lg shadow-red-500/20">
            <Lock className="w-8 h-8 md:w-10 md:h-10 text-red-400" />
          </div>
          <h2 className="text-xl md:text-3xl font-bold text-white mb-3 md:mb-4">Access Required</h2>
          <p className="text-gray-300 text-sm md:text-lg leading-relaxed">
            This website is currently in private beta. Please enter the access code to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label htmlFor="password" className="block text-xs md:text-sm font-medium text-gray-300 mb-2">
              Access Code
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-3 md:px-4 md:py-4 bg-gray-800/70 border border-gray-600/50 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 pr-10 md:pr-12 text-sm md:text-base backdrop-blur-sm"
                placeholder="Enter access code"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : <Eye className="w-4 h-4 md:w-5 md:h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 md:p-4 bg-red-500/10 border border-red-500/20 rounded-lg md:rounded-xl text-red-400 backdrop-blur-sm">
              <AlertCircle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span className="text-xs md:text-sm">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 md:py-4 px-4 md:px-6 rounded-lg md:rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 hover:shadow-lg hover:shadow-red-500/25 disabled:shadow-none flex items-center justify-center gap-2 text-sm md:text-base relative overflow-hidden"
          >
            {/* Button shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            
            {isLoading ? (
              <>
                <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 md:w-5 md:h-5" />
                <span>Access Website</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-700/50">
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            This is a private preview of Gladiator Studio's gaming portfolio.<br />
            Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;