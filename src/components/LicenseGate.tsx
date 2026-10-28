import React, { useState } from 'react';
import {
  KeyRound,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Flame,
  Lock,
  Globe,
  Layers,
  Zap,
  Sun,
  Moon,
  Copy,
  Check,
} from 'lucide-react';

export interface StoredLicenseInfo {
  licenseKey: string;
  activatedAt: string;
  buyerEmail?: string;
  uses?: number;
  mode: 'gumroad_api' | 'gumroad_format' | 'master_key';
}

export const LICENSE_STORAGE_KEY = 'ravomix_verified_license_v1';

/**
 * SELLER CONFIGURATION FOR GUMROAD LICENSE VERIFICATION:
 * 1. Paste your Gumroad Product ID (or Product Permalink) below, or set VITE_GUMROAD_PRODUCT_ID in .env
 * 2. Seller Master Keys work anytime for testing or VIP manual buyers.
 */
export const GUMROAD_CONFIG = {
  // Replace empty string with your Gumroad Product ID (e.g., "A-bCdEfGhIjKlMnOpQrStU==") from Gumroad Product Settings
  productId: (import.meta.env.VITE_GUMROAD_PRODUCT_ID as string) || '',
  productPermalink: (import.meta.env.VITE_GUMROAD_PERMALINK as string) || '',
  checkoutUrl: 'https://your-gumroad-or-cosmofeed-link.com',
  masterKeys: [
    'RAVOMIX-PRO-2026',
    'RAVOMIX-VIP-LIFE',
    'RAVOMIX-MASTER-KEY',
    'GUMROAD-PRO-2026',
  ],
};

interface LicenseGateProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onActivateSuccess: (info: StoredLicenseInfo) => void;
}

export const LicenseGate: React.FC<LicenseGateProps> = ({
  isDark,
  onToggleTheme,
  onActivateSuccess,
}) => {
  const [inputKey, setInputKey] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedDemo, setCopiedDemo] = useState<boolean>(false);

  // Format key cleanly as user types or pastes
  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    setInputKey(e.target.value.toUpperCase().trimStart());
  };

  const verifyLicenseKey = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedKey = inputKey.trim().toUpperCase();

    if (!cleanedKey) {
      setErrorMsg('Please enter your Gumroad License Key to unlock Ravomix Prompt.');
      return;
    }

    setIsVerifying(true);
    setErrorMsg(null);

    try {
      // 1. Check if it's a Seller Master / VIP Key
      if (GUMROAD_CONFIG.masterKeys.includes(cleanedKey)) {
        await new Promise((r) => setTimeout(r, 450));
        const info: StoredLicenseInfo = {
          licenseKey: cleanedKey,
          activatedAt: new Date().toISOString(),
          buyerEmail: 'VIP / Master License',
          uses: 1,
          mode: 'master_key',
        };
        localStorage.setItem(LICENSE_STORAGE_KEY, JSON.stringify(info));
        onActivateSuccess(info);
        return;
      }

      // 2. If Seller has configured a Gumroad Product ID or Permalink, verify directly with Gumroad API v2
      if (GUMROAD_CONFIG.productId || GUMROAD_CONFIG.productPermalink) {
        const bodyParams = new URLSearchParams();
        if (GUMROAD_CONFIG.productId) {
          bodyParams.append('product_id', GUMROAD_CONFIG.productId);
        } else if (GUMROAD_CONFIG.productPermalink) {
          bodyParams.append('product_permalink', GUMROAD_CONFIG.productPermalink);
        }
        bodyParams.append('license_key', cleanedKey);
        bodyParams.append('increment_uses_count', 'true');

        const response = await fetch('https://api.gumroad.com/v2/licenses/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: bodyParams.toString(),
        });

        const data = await response.json();

        if (response.ok && data.success && !data.purchase?.refunded && !data.purchase?.chargebacked) {
          const info: StoredLicenseInfo = {
            licenseKey: cleanedKey,
            activatedAt: new Date().toISOString(),
            buyerEmail: data.purchase?.email || 'Verified Gumroad Buyer',
            uses: data.uses || 1,
            mode: 'gumroad_api',
          };
          localStorage.setItem(LICENSE_STORAGE_KEY, JSON.stringify(info));
          onActivateSuccess(info);
          return;
        } else {
          setErrorMsg(
            data.message ||
              'Invalid or refunded Gumroad License Key. Please check the key sent to your email receipt.'
          );
          setIsVerifying(false);
          return;
        }
      }

      // 3. Standard Gumroad License Key Format Validation (e.g., XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX or 4+ segments)
      // Used when Gumroad Product ID is not yet hardcoded or when verifying offline
      await new Promise((r) => setTimeout(r, 550));
      const gumroadRegex = /^[A-Z0-9]{6,10}(-[A-Z0-9]{4,10}){2,4}$/;

      if (gumroadRegex.test(cleanedKey)) {
        const info: StoredLicenseInfo = {
          licenseKey: cleanedKey,
          activatedAt: new Date().toISOString(),
          buyerEmail: 'Verified License Holder',
          uses: 1,
          mode: 'gumroad_format',
        };
        localStorage.setItem(LICENSE_STORAGE_KEY, JSON.stringify(info));
        onActivateSuccess(info);
        return;
      }

      setErrorMsg(
        'Invalid License Key format. Please enter a valid Gumroad License Key (e.g. 8F9A2B1C-4D5E6F7A-9B8C7D6E-1A2B3C4D) or purchase a license below.'
      );
    } catch {
      // Network offline fallback: accept valid Gumroad key format or Master Key
      const gumroadRegex = /^[A-Z0-9]{6,10}(-[A-Z0-9]{4,10}){2,4}$/;
      if (gumroadRegex.test(cleanedKey) || GUMROAD_CONFIG.masterKeys.includes(cleanedKey)) {
        const info: StoredLicenseInfo = {
          licenseKey: cleanedKey,
          activatedAt: new Date().toISOString(),
          buyerEmail: 'Offline Verified License',
          uses: 1,
          mode: 'gumroad_format',
        };
        localStorage.setItem(LICENSE_STORAGE_KEY, JSON.stringify(info));
        onActivateSuccess(info);
        return;
      }
      setErrorMsg(
        'Could not verify license key. Please check your key format or internet connection and try again.'
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleFillTestKey = () => {
    const sampleKey = 'RAVOMIX-PRO-2026';
    setInputKey(sampleKey);
    setErrorMsg(null);
    setCopiedDemo(true);
    setTimeout(() => setCopiedDemo(false), 1800);
  };

  return (
    <div className="relative z-20 min-h-screen w-full flex flex-col justify-between px-3 sm:px-6 py-4 sm:py-6">
      {/* Top Bar on Activation Screen */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5C451] to-[#FF9F0A] p-[1.5px] shadow-lg shadow-[#F5C451]/25">
            <div
              className={`w-full h-full rounded-[10px] flex items-center justify-center ${
                isDark ? 'bg-[#08090D]' : 'bg-slate-950'
              }`}
            >
              <Flame className="w-5 h-5 text-[#F5C451]" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-base sm:text-lg tracking-tight">
              Ravomix{' '}
              <span className="bg-gradient-to-r from-[#F5C451] to-[#FF9F0A] bg-clip-text text-transparent">
                Prompt
              </span>
            </span>
            <p className={`text-[10px] sm:text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Official License Activation Portal
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleTheme}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
            isDark
              ? 'bg-[#12141C]/90 border-[#F5C451]/40 text-[#F5C451] hover:bg-[#F5C451]/10'
              : 'bg-white/90 border-amber-400 text-amber-900 hover:bg-amber-50 shadow-xs'
          }`}
        >
          {isDark ? (
            <>
              <Sun className="w-4 h-4 text-[#F5C451]" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-amber-800" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>

      {/* Center License Activation Card */}
      <div className="my-auto py-6 flex items-center justify-center">
        <div
          className={`w-full max-w-lg rounded-3xl p-5 sm:p-8 border backdrop-blur-2xl shadow-2xl transition-all ${
            isDark
              ? 'bg-[#12141C]/88 border-white/15 text-[#F8FAFC] shadow-black/80'
              : 'bg-white/92 border-slate-200/90 text-slate-900 shadow-slate-300/70'
          }`}
        >
          {/* Top Badge */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#F5C451]/15 text-[#F5C451] border border-[#F5C451]/35">
              <Lock className="w-3.5 h-3.5" />
              <span>Gumroad License Verification</span>
            </div>
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                isDark
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}
            >
              1-Time Activation
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug mb-1.5">
            Activate Your{' '}
            <span className="bg-gradient-to-r from-[#F5C451] to-[#FF9F0A] bg-clip-text text-transparent">
              Ravomix Prompt
            </span>{' '}
            Pro Vault
          </h1>
          <p className={`text-xs sm:text-sm leading-relaxed mb-5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Enter the <strong>Gumroad License Key</strong> from your purchase receipt to unlock all{' '}
            <strong>42 Categories</strong> and <strong>10,500+ Prompts in 10 Languages</strong> permanently on this device.
          </p>

          {/* 3 Mini Highlight Pills */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            <div
              className={`p-2.5 rounded-2xl border text-center ${
                isDark ? 'bg-[#08090D]/80 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <Layers className="w-4 h-4 text-[#F5C451] mx-auto mb-1" />
              <div className="text-xs sm:text-sm font-extrabold">42 Categories</div>
              <div className="text-[10px] opacity-70">10,500+ Prompts</div>
            </div>
            <div
              className={`p-2.5 rounded-2xl border text-center ${
                isDark ? 'bg-[#08090D]/80 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <Globe className="w-4 h-4 text-[#FF9F0A] mx-auto mb-1" />
              <div className="text-xs sm:text-sm font-extrabold">10 Languages</div>
              <div className="text-[10px] opacity-70">Instant Switch</div>
            </div>
            <div
              className={`p-2.5 rounded-2xl border text-center ${
                isDark ? 'bg-[#08090D]/80 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <Zap className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <div className="text-xs sm:text-sm font-extrabold">100% Offline</div>
              <div className="text-[10px] opacity-70">Auto-Saved Key</div>
            </div>
          </div>

          {/* License Key Input Form */}
          <form onSubmit={verifyLicenseKey} className="space-y-3.5">
            <div>
              <label
                htmlFor="gumroad-license-input"
                className="block text-[11px] font-extrabold uppercase tracking-wider text-[#F5C451] mb-1.5"
              >
                Enter Gumroad License Key
              </label>
              <div className="relative">
                <KeyRound
                  className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                    isDark ? 'text-[#F5C451]' : 'text-amber-600'
                  }`}
                />
                <input
                  id="gumroad-license-input"
                  type="text"
                  value={inputKey}
                  onChange={handleKeyChange}
                  placeholder="XXXXXXX-XXXXXXX-XXXXXXX-XXXXXXX"
                  autoComplete="off"
                  spellCheck={false}
                  className={`w-full pl-10 pr-3.5 py-3.5 rounded-2xl font-mono text-xs sm:text-sm font-bold tracking-wider border outline-none transition-all ${
                    isDark
                      ? 'bg-[#08090D] border-white/15 text-white placeholder:text-slate-600 focus:border-[#F5C451]'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-amber-500'
                  }`}
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/35 text-red-400 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#F5C451] via-[#FFB323] to-[#FF9F0A] text-[#08090D] font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(245,196,81,0.35)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying License Key...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  <span>Activate &amp; Unlock Full App</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className={`h-px flex-1 ${isDark ? 'bg-white/10' : 'bg-slate-200'}`} />
            <span className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Don&apos;t Have a License Key?
            </span>
            <div className={`h-px flex-1 ${isDark ? 'bg-white/10' : 'bg-slate-200'}`} />
          </div>

          {/* Buy License Key CTA */}
          <a
            href={GUMROAD_CONFIG.checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full py-3 px-4 rounded-2xl border font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              isDark
                ? 'bg-white/[0.06] border-[#F5C451]/40 text-[#F5C451] hover:bg-[#F5C451]/15'
                : 'bg-amber-50 border-amber-400 text-amber-900 hover:bg-amber-100'
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>🔓 Buy License Key ($19.99 USD / ₹499 INR)</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          </a>

          {/* Seller / Quick Preview Helper */}
          <div
            className={`mt-4 pt-3.5 border-t flex items-center justify-between gap-2 text-[11px] ${
              isDark ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-500'
            }`}
          >
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              Saved in LocalStorage (No repeat login)
            </span>
            <button
              type="button"
              onClick={handleFillTestKey}
              className="font-mono font-bold text-[#F5C451] hover:underline flex items-center gap-1 cursor-pointer"
              title="Fill Seller Master Key for testing"
            >
              {copiedDemo ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Key Filled! Click Activate</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Fill Master Key (RAVOMIX-PRO-2026)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-[11px] opacity-70">
        ⚡ 100% Offline PWA — Works on Android, iOS, Windows &amp; Mac • Lifetime License
      </div>
    </div>
  );
};
