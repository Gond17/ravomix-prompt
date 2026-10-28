import React, { useState } from 'react';
import { Download, Share, Smartphone, WifiOff, X } from 'lucide-react';
import { usePWAInstall, useOnlineStatus } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  isDark: boolean;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ isDark }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className={`h-9 sm:h-10 px-2.5 sm:px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 cursor-pointer ${
          isDark
            ? 'bg-gradient-to-r from-[#F5C451] to-[#FF9F0A] text-[#08090D] hover:brightness-110 shadow-xs'
            : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xs'
        }`}
        title="Install Offline PWA App"
      >
        <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
        <span className="hidden md:inline">Install</span>
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className={`h-9 sm:h-10 px-2.5 sm:px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
          isDark
            ? 'border-white/15 bg-[#12141C] text-[#F5C451] hover:bg-white/5'
            : 'border-slate-200 bg-slate-100 text-slate-800 hover:bg-slate-200'
        }`}
        title="Install Ravomix Offline App"
      >
        <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
        <span className="hidden md:inline">{isIOS ? 'iOS App' : 'App'}</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div
            className={`w-full max-w-md rounded-2xl p-5 sm:p-6 border shadow-2xl ${
              isDark
                ? 'bg-[#12141C] border-white/10 text-[#F8FAFC]'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-current/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F5C451] to-[#FF9F0A] flex items-center justify-center text-[#08090D] font-bold">
                  R
                </div>
                <div>
                  <h3 className="text-base font-bold">Install Ravomix Prompt</h3>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    100% Offline-First Mobile & Desktop PWA
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-current/5 cursor-pointer"
                aria-label="Close install guide"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm leading-relaxed">
              {isIOS ? (
                <div className="space-y-2">
                  <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                    To install <strong>Ravomix Prompt</strong> on your iPhone or iPad for full offline access:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 pt-1">
                    <li>
                      Tap the <Share className="inline w-4 h-4 mx-1 text-[#F5C451]" /> <strong>Share</strong> button in your Safari toolbar.
                    </li>
                    <li>
                      Scroll down and select <strong>Add to Home Screen</strong>.
                    </li>
                    <li>
                      Tap <strong>Add</strong> in the top-right corner to launch offline anytime.
                    </li>
                  </ol>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                    All <strong>42 categories</strong> and <strong>10,500+ multilingual prompts</strong> are bundled directly inside this app for zero-internet usage:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 pt-1">
                    <li>
                      Click the <strong>Install icon</strong> in your browser&apos;s address bar (Chrome, Edge, Brave) or browser menu.
                    </li>
                    <li>
                      On Android Chrome, tap the three-dot menu and choose <strong>Add to Home screen / Install app</strong>.
                    </li>
                    <li>
                      Once installed, all 10 languages and 10,500 prompts work in Airplane mode.
                    </li>
                  </ol>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="mt-6 w-full h-11 rounded-xl bg-gradient-to-r from-[#F5C451] to-[#FF9F0A] text-[#08090D] font-bold text-sm hover:brightness-110 transition cursor-pointer"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 md:bottom-5 left-4 z-50 flex items-center gap-2 rounded-xl bg-[#F5C451] px-3.5 py-2 text-xs font-bold text-[#08090D] shadow-lg">
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>Offline Mode Active · All 10,500 Prompts Ready</span>
    </div>
  );
};
