import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface AgeVerificationModalProps {
  isOpen: boolean;
  onVerify: (isVerified: boolean) => void;
}

const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({ isOpen, onVerify }) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => {
      onVerify(true);
    }, 800);
  };

  const handleDecline = () => {
    onVerify(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
      {/* Enhanced Casino/Gaming Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Casino Background Image Overlay */}
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1871508/pexels-photo-1871508.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
            filter: 'blur(3px) brightness(0.4) contrast(1.3) hue-rotate(10deg)'
          }}
        />
        
        {/* Age restriction themed elements */}
        <div className="absolute inset-0">
          {/* 18+ Symbols floating */}
          <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-red-500/40 to-red-700/40 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-red-400/60 animate-float shadow-lg" style={{ animationDelay: '0s' }}>
            18+
          </div>
          <div className="absolute top-32 right-24 w-12 h-12 bg-gradient-to-br from-orange-500/40 to-orange-700/40 rounded-full flex items-center justify-center text-white font-bold text-xs border-2 border-orange-400/60 animate-float shadow-lg" style={{ animationDelay: '1s' }}>
            21+
          </div>
          <div className="absolute bottom-32 left-24 w-14 h-14 bg-gradient-to-br from-yellow-500/40 to-yellow-700/40 rounded-full flex items-center justify-center text-white font-bold text-xs border-2 border-yellow-400/60 animate-float shadow-lg" style={{ animationDelay: '2s' }}>
            AGE
          </div>
          
          {/* Warning signs */}
          <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-gradient-to-br from-red-600/50 to-red-800/50 rounded-lg flex items-center justify-center animate-gentle-sway shadow-lg border border-red-500/50" style={{ animationDelay: '0.5s' }}>
            <AlertTriangle className="w-6 h-6 text-yellow-300" />
          </div>
          <div className="absolute top-1/3 right-1/3 w-10 h-10 bg-gradient-to-br from-orange-600/50 to-orange-800/50 rounded-lg flex items-center justify-center animate-gentle-sway shadow-lg border border-orange-500/50" style={{ animationDelay: '1.5s' }}>
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="absolute bottom-1/3 left-1/3 w-11 h-11 bg-gradient-to-br from-yellow-600/50 to-yellow-800/50 rounded-lg flex items-center justify-center animate-gentle-sway shadow-lg border border-yellow-500/50" style={{ animationDelay: '2.5s' }}>
            <span className="text-white font-bold text-xs">!</span>
          </div>
          
          {/* Responsible gaming symbols */}
          <div className="absolute top-1/2 left-1/6 w-16 h-10 bg-gradient-to-br from-green-600/40 to-green-800/40 rounded-lg flex items-center justify-center animate-gentle-sway shadow-lg border border-green-500/50" style={{ animationDelay: '1s' }}>
            <span className="text-white font-bold text-xs">SAFE</span>
          </div>
          <div className="absolute bottom-1/4 right-1/6 w-14 h-10 bg-gradient-to-br from-blue-600/40 to-blue-800/40 rounded-lg flex items-center justify-center animate-gentle-sway shadow-lg border border-blue-500/50" style={{ animationDelay: '3s' }}>
            <span className="text-white font-bold text-xs">PLAY</span>
          </div>
          
          {/* Casino chips with age theme */}
          <div className="absolute bottom-20 right-20 w-18 h-18 bg-gradient-to-br from-purple-500/40 to-purple-700/40 rounded-full border-4 border-purple-400/60 animate-float shadow-lg" style={{ animationDelay: '3s' }}>
            <div className="w-full h-full flex flex-col items-center justify-center text-white font-bold">
              <div className="text-xs">18</div>
              <div className="text-xs">+</div>
            </div>
          </div>
        </div>
        
        {/* Enhanced glowing orbs with age verification theme */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-red-500/12 to-orange-500/12 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/12 to-pink-500/12 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-gradient-to-r from-yellow-500/8 to-orange-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        
        {/* Warning sparkles */}
        <div className="absolute top-16 right-16 w-2 h-2 bg-red-400 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-24 left-32 w-1 h-1 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 right-32 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-16 left-16 w-1 h-1 bg-red-300 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Enhanced grid pattern with warning theme */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.06)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40 md:bg-[size:50px_50px] md:opacity-30"></div>

      <div className="relative bg-gradient-to-br from-gray-900/98 via-black/98 to-gray-900/98 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-4 md:p-8 w-full max-w-sm md:max-w-lg border border-gray-700/50 shadow-2xl mx-4 ring-1 ring-red-500/20">
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

        {!isConfirming ? (
          <>
            <div className="text-center mb-6 md:mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-500/20 to-purple-600/20 rounded-full mb-4 md:mb-6 border border-red-500/30 shadow-lg shadow-red-500/20">
                <AlertTriangle className="w-8 h-8 md:w-10 md:h-10 text-red-400" />
              </div>
              <h2 className="text-xl md:text-3xl font-bold text-white mb-3 md:mb-4">Age Verification</h2>
              <p className="text-gray-300 text-sm md:text-lg leading-relaxed">
                This website contains gambling content intended for adults only.
              </p>
            </div>

            <div className="bg-gradient-to-r from-red-500/10 to-purple-600/10 border border-red-500/20 rounded-lg md:rounded-xl p-4 md:p-6 mb-6 md:mb-8 backdrop-blur-sm">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">Are you 18 years or older?</h3>
              <p className="text-gray-400 text-sm md:text-base">
                By confirming, you certify that you are of legal gambling age in your jurisdiction and agree to our terms of service.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button
                onClick={handleConfirm}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 md:py-4 px-4 md:px-6 rounded-lg md:rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 text-sm md:text-base relative overflow-hidden"
              >
                {/* Button shimmer effect */}
                <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <span className="relative z-10">Yes, I am 18+</span>
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 bg-gray-700/70 hover:bg-gray-600/70 text-white py-3 md:py-4 px-4 md:px-6 rounded-lg md:rounded-xl font-semibold transition-all duration-300 border border-gray-600/50 hover:border-gray-500/50 text-sm md:text-base backdrop-blur-sm"
              >
                No, Exit
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-6 md:py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-full mb-4 md:mb-6 border border-green-500/30 shadow-lg shadow-green-500/20">
              <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-green-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Verification Complete</h3>
            <p className="text-gray-300 text-sm md:text-base">Welcome to Gladiator Studio</p>
            <div className="mt-4 md:mt-6">
              <div className="w-full bg-gray-700/50 rounded-full h-1.5 md:h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-1.5 md:h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-700/50">
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            Gambling can be addictive. Please play responsibly.<br />
            For help and support, visit <span className="text-red-400">BeGambleAware.org</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgeVerificationModal;