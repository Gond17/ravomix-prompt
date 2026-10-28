import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  Sun,
  Moon,
  Globe,
  Bookmark,
  Sparkles,
  Flame,
  ShieldCheck,
  X,
  SlidersHorizontal,
  Download,
  ChevronRight,
  ChevronLeft,
  Layers,
  Check,
  Compass,
  Wand2,
  Copy,
  ArrowUp,
  Grid,
  ArrowLeft,
  ExternalLink,
  Crown,
} from 'lucide-react';
import {
  CATEGORIES_DATA,
  SUPPORTED_LANGUAGES,
  LanguageCode,
  CategoryDefinition,
  CategoryCluster,
} from './data/categoriesData';
import {
  getAllPrompts,
  PromptItem,
  getTranslatedTitle,
  getTranslatedDescription,
  renderPromptInLanguage,
} from './data/multilingualEngine';
import { PromptCard } from './components/PromptCard';
import { CategoryIcon } from './components/CategoryIcon';
import { PWAInstallButton, OfflineIndicator } from './components/PWAInstallButton';
import { Scene3DBackground } from './components/Scene3DBackground';

type ActiveTab = 'home' | 'category_detail' | 'search' | 'saved' | 'studio';

const EXTERNAL_CHECKOUT_URL = 'https://your-gumroad-or-cosmofeed-link.com';

const CLUSTER_FILTERS: CategoryCluster[] = [
  'All',
  'Creative & Media AI',
  'Tech, Coding & Cyber',
  'Business, Finance & Legal',
  'Career, Study & Wellness',
  'Monetization & Online Income',
  'Next-Gen & Specialized AI',
];

const ACCENT_PALETTE = [
  '#F5C451',
  '#FF9F0A',
  '#38BDF8',
  '#34D399',
  '#A78BFA',
  '#F472B6',
  '#FB923C',
  '#2DD4BF',
];

export default function App() {
  // 1. NO LOGIN / NO SIGN-UP: Opens 100% frictionless directly to the 42+ Categories Home screen
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('ravomix_theme');
      return saved ? saved === 'dark' : true;
    } catch {
      return true;
    }
  });

  const [globalLang, setGlobalLang] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem('ravomix_lang') as LanguageCode;
      return saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved) ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);
  const [selectedCluster, setSelectedCluster] = useState<CategoryCluster>('All');
  const [categoryFilterQuery, setCategoryFilterQuery] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedComplexityFilter, setSelectedComplexityFilter] = useState<string>('ALL');
  const [selectedSubTopicIndex, setSelectedSubTopicIndex] = useState<number | 'ALL'>('ALL');
  const [globalNiche, setGlobalNiche] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(24);
  const [showLangMenu, setShowLangMenu] = useState<boolean>(false);
  const [showProLicenseModal, setShowProLicenseModal] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Custom Prompt Studio State
  const [studioGoal, setStudioGoal] = useState<string>(
    'Launch a high-converting digital product business in 30 days'
  );
  const [studioAudience, setStudioAudience] = useState<string>(
    'Creators, freelancers, and modern entrepreneurs'
  );
  const [studioTone, setStudioTone] = useState<string>(
    'Executive, actionable, zero-fluff, conversion-focused'
  );
  const [studioCopied, setStudioCopied] = useState<boolean>(false);

  // Saved Bookmarks State
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ravomix_saved_prompts');
      if (saved) {
        const parsed: string[] = JSON.parse(saved);
        return parsed.map((id) => id.replace(/^RPA-/, 'RP-'));
      }
      return ['RP-00001', 'RP-00251', 'RP-01501', 'RP-05251'];
    } catch {
      return ['RP-00001', 'RP-00251'];
    }
  });

  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('ravomix_theme', isDark ? 'dark' : 'light');
      document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    } catch {
      // ignore storage errors
    }
  }, [isDark]);

  useEffect(() => {
    try {
      localStorage.setItem('ravomix_lang', globalLang);
    } catch {
      // ignore
    }
  }, [globalLang]);

  useEffect(() => {
    try {
      localStorage.setItem('ravomix_saved_prompts', JSON.stringify(savedIds));
    } catch {
      // ignore
    }
  }, [savedIds]);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Track window scroll for floating back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 380);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset pagination when category or search changes
  useEffect(() => {
    setVisibleCount(24);
  }, [selectedCategoryId, searchQuery, selectedComplexityFilter, selectedSubTopicIndex, activeTab]);

  const allPrompts = useMemo(() => getAllPrompts(), []);

  const toggleSavePrompt = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCopyToast = (_text: string, title: string, langLabel: string) => {
    setToastMessage(`Copied "${title.slice(0, 38)}..." (${langLabel})`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const currentLangInfo = useMemo(
    () => SUPPORTED_LANGUAGES.find((l) => l.code === globalLang) || SUPPORTED_LANGUAGES[0],
    [globalLang]
  );

  const activeCategory: CategoryDefinition = useMemo(
    () => CATEGORIES_DATA.find((c) => c.id === selectedCategoryId) || CATEGORIES_DATA[0],
    [selectedCategoryId]
  );

  // Filtered Categories for Home View (All 42 Categories)
  const filteredCategories = useMemo(() => {
    return CATEGORIES_DATA.filter((cat) => {
      const matchesCluster = selectedCluster === 'All' || cat.cluster === selectedCluster;
      if (!matchesCluster) return false;
      if (!categoryFilterQuery.trim()) return true;
      const q = categoryFilterQuery.toLowerCase();
      return (
        cat.name.toLowerCase().includes(q) ||
        cat.shortTitle.toLowerCase().includes(q) ||
        cat.description.toLowerCase().includes(q) ||
        cat.subTopics.some((st) => st.toLowerCase().includes(q)) ||
        String(cat.id) === q.replace('#', '')
      );
    });
  }, [selectedCluster, categoryFilterQuery]);

  // Prompts for Selected Category (250 complete prompts per category)
  const categoryPrompts: PromptItem[] = useMemo(() => {
    if (activeTab !== 'category_detail') return [];
    return allPrompts.filter((p) => {
      if (p.categoryId !== selectedCategoryId) return false;
      if (selectedSubTopicIndex !== 'ALL' && p.subTopicIndex !== selectedSubTopicIndex) {
        return false;
      }
      if (selectedComplexityFilter !== 'ALL' && p.complexity !== selectedComplexityFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const locTitle = getTranslatedTitle(p, globalLang).toLowerCase();
        const locDesc = getTranslatedDescription(p, globalLang).toLowerCase();
        return (
          p.subTopic.toLowerCase().includes(q) ||
          locTitle.includes(q) ||
          locDesc.includes(q) ||
          p.frameworkBadge.toLowerCase().includes(q) ||
          p.frameworkCode.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [
    allPrompts,
    selectedCategoryId,
    selectedSubTopicIndex,
    selectedComplexityFilter,
    searchQuery,
    activeTab,
    globalLang,
  ]);

  // Global Offline Search Results across all 10,500 prompts
  const searchResults: PromptItem[] = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const matches: PromptItem[] = [];
    for (let i = 0; i < allPrompts.length; i++) {
      const p = allPrompts[i];
      if (
        selectedComplexityFilter !== 'ALL' &&
        p.complexity !== selectedComplexityFilter
      ) {
        continue;
      }
      const locTitle = getTranslatedTitle(p, globalLang).toLowerCase();
      if (
        p.subTopic.toLowerCase().includes(q) ||
        locTitle.includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.frameworkBadge.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
      ) {
        matches.push(p);
        if (matches.length >= 200) break;
      }
    }
    return matches;
  }, [allPrompts, searchQuery, selectedComplexityFilter, globalLang]);

  // Saved Prompts List
  const savedPrompts: PromptItem[] = useMemo(() => {
    const idSet = new Set(savedIds);
    return allPrompts.filter((p) => idSet.has(p.id));
  }, [allPrompts, savedIds]);

  const exportSavedPromptsBundle = () => {
    const content = savedPrompts
      .map((p, idx) => {
        const title = getTranslatedTitle(p, globalLang);
        const text = renderPromptInLanguage(p, globalLang);
        return `====================================================================\n#${idx + 1} | ${title} (${p.categoryName})\nLanguage: ${currentLangInfo.nativeName} (${currentLangInfo.region})\n====================================================================\n\n${text}\n\n`;
      })
      .join('\n');

    const blob = new Blob([content || 'No saved prompts yet.'], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ravomix-Prompt-Vault-${globalLang.toUpperCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openCategoryPrompts = (catId: number) => {
    setSelectedCategoryId(catId);
    setSelectedSubTopicIndex('ALL');
    setSelectedComplexityFilter('ALL');
    setSearchQuery('');
    setActiveTab('category_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBackToCategories = () => {
    setSearchQuery('');
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen w-full overflow-x-hidden transition-colors duration-300 font-sans selection:bg-[#F5C451] selection:text-[#08090D] ${
        isDark ? 'bg-[#08090D] text-[#F8FAFC]' : 'bg-[#F8FAFC] text-[#0F172A]'
      }`}
    >
      {/* INTERACTIVE 3D SPATIAL MOTION BACKGROUND (CATEGORY & PAGE REACTIVE) */}
      <Scene3DBackground
        isDark={isDark}
        activeTab={activeTab}
        categoryId={selectedCategoryId}
        cluster={activeTab === 'category_detail' ? activeCategory.cluster : selectedCluster}
        categoryName={activeCategory.name}
      />

      {/* COPY TOAST FEEDBACK */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-emerald-500 text-slate-950 font-extrabold text-xs shadow-2xl flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* PRO COMMERCIAL LICENSE & MONETIZATION MODAL */}
      {showProLicenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
          <div
            className={`w-full max-w-md rounded-3xl p-5 sm:p-6 border shadow-2xl ${
              isDark
                ? 'bg-[#12141C] border-white/15 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base">Ravomix Pro Vault Edition</h3>
              </div>
              <button
                onClick={() => setShowProLicenseModal(false)}
                className="p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div
              className={`space-y-3 text-xs leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              <p>
                <strong className="text-[#F5C451]">100% Offline Architecture:</strong> All 42
                categories and 10,500+ multilingual prompts are bundled inside this application for
                instant offline execution without API keys or monthly fees.
              </p>
              <p>
                <strong className="text-[#F5C451]">10 Global Languages Included:</strong> Switch
                between English, Hinglish, Español, Français, 日本語, Italiano, Deutsch, Português,
                العربية, and 中文 on any prompt card.
              </p>
              <div
                className={`p-3.5 rounded-2xl border ${
                  isDark ? 'bg-[#08090D] border-white/10' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1">
                  Lifetime Pro Pack — Instant Checkout
                </div>
                <div className="text-[11px] opacity-80">
                  Get lifetime offline updates, commercial usage rights, and full multi-device
                  access for a one-time payment of $19.99 USD / ₹499 INR.
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <a
                href={EXTERNAL_CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F5C451] to-[#FF9F0A] text-[#08090D] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#F5C451]/20 hover:brightness-110 transition-all"
              >
                <span>🔓 Unlock Full Pro Access ($19.99 USD / ₹499 INR)</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
              <button
                onClick={() => setShowProLicenseModal(false)}
                className={`w-full py-2.5 rounded-xl font-bold text-xs border cursor-pointer ${
                  isDark
                    ? 'border-white/10 text-slate-400 hover:text-white'
                    : 'border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                Continue Exploring App
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOP STICKY HEADER — PERFECTLY FITTED FOR ALL MOBILE & DESKTOP SCREENS */}
      <header
        className={`sticky top-0 z-30 backdrop-blur-2xl border-b transition-colors duration-300 ${
          isDark
            ? 'bg-[#08090D]/92 border-white/[0.08]'
            : 'bg-white/95 border-slate-200/90 shadow-xs'
        }`}
      >
        {/* HEADER CALL-TO-ACTION BAR LINKING TO PAYMENT GATEWAY (GUMROAD/COSMOFEED) */}
        <div
          className={`w-full border-b transition-colors ${
            isDark
              ? 'bg-gradient-to-r from-[#12141C] via-[#1E1910] to-[#12141C] border-[#F5C451]/25'
              : 'bg-gradient-to-r from-amber-50 via-amber-100/80 to-amber-50 border-amber-300/70'
          }`}
        >
          <div className="max-w-7xl mx-auto px-2.5 sm:px-5 py-1.5 flex items-center justify-between gap-2">
            <div className="hidden md:flex items-center gap-2 text-[11px] font-semibold">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold text-[10px]">
                100% NO LOGIN
              </span>
              <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                Instant access to 42+ Categories &amp; 10,500+ Prompts in 10 Languages
              </span>
            </div>

            <a
              href={EXTERNAL_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#F5C451] to-[#FF9F0A] text-[#08090D] font-extrabold text-[11px] sm:text-xs tracking-tight shadow-md shadow-[#F5C451]/20 hover:brightness-110 active:scale-[0.99] transition-all"
            >
              <Crown className="w-3.5 h-3.5 shrink-0 fill-[#08090D]" />
              <span className="truncate">🔓 Unlock Full Pro Access ($19.99 USD / ₹499 INR)</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-2.5 sm:px-5 py-2.5">
          {/* ROW 1: BRAND + LANGUAGE + LIGHT/DARK MODE TOGGLE */}
          <div className="flex items-center justify-between gap-1.5 sm:gap-3">
            {/* Brand Logo & Back Button when inside a category */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
              {activeTab !== 'home' && (
                <button
                  onClick={goBackToCategories}
                  className={`p-2 rounded-xl border shrink-0 transition-all active:scale-95 cursor-pointer ${
                    isDark
                      ? 'bg-[#12141C] border-white/15 text-[#F5C451] hover:border-[#F5C451]/50'
                      : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                  }`}
                  title="Back to All 42 Categories"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={goBackToCategories}
                className="flex items-center gap-2 text-left group focus:outline-none min-w-0 cursor-pointer"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#F5C451] to-[#FF9F0A] p-[1.5px] shadow-md shadow-[#F5C451]/20 shrink-0 group-hover:scale-105 transition-transform">
                  <div
                    className={`w-full h-full rounded-[10px] flex items-center justify-center ${
                      isDark ? 'bg-[#08090D]' : 'bg-slate-950'
                    }`}
                  >
                    <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5C451]" />
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-xs sm:text-base md:text-lg tracking-tight truncate">
                      Ravomix{' '}
                      <span className="bg-gradient-to-r from-[#F5C451] to-[#FF9F0A] bg-clip-text text-transparent">
                        Prompt
                      </span>
                    </span>
                  </div>
                  <p
                    className={`text-[10px] sm:text-[11px] truncate font-medium ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    42 Categories • 10,500+ Prompts • 10 Languages
                  </p>
                </div>
              </button>
            </div>

            {/* Right Controls: PWA Install, Global Language Switcher & Labeled Light/Dark Mode Toggle */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Install App / Offline Ready Button */}
              <PWAInstallButton isDark={isDark} />

              {/* Global 10-Language Selector Dropdown */}
              <div className="relative" ref={langDropdownRef}>
                <button
                  onClick={() => setShowLangMenu((prev) => !prev)}
                  className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold border transition-all cursor-pointer ${
                    isDark
                      ? 'bg-[#12141C] border-white/15 text-slate-100 hover:border-[#F5C451]/50'
                      : 'bg-slate-100 border-slate-300 text-slate-800 hover:border-amber-500'
                  }`}
                  title="Global Prompt Output Language (10 Languages)"
                >
                  <Globe className="w-3.5 h-3.5 text-[#F5C451] shrink-0" />
                  <span className="hidden md:inline">{currentLangInfo.nativeName}</span>
                  <span className="md:hidden uppercase">{currentLangInfo.code}</span>
                </button>

                {showLangMenu && (
                  <div
                    className={`absolute right-0 mt-2 w-60 sm:w-64 rounded-2xl p-1.5 border shadow-2xl z-50 backdrop-blur-2xl ${
                      isDark
                        ? 'bg-[#12141C]/98 border-white/15 text-slate-100 shadow-black'
                        : 'bg-white/98 border-slate-200 text-slate-800 shadow-slate-300/80'
                    }`}
                  >
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#F5C451] border-b border-white/5 mb-1">
                      Global Prompt Language (10)
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-white/5">
                      {SUPPORTED_LANGUAGES.map((lang) => {
                        const active = lang.code === globalLang;
                        return (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setGlobalLang(lang.code);
                              setShowLangMenu(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                              active
                                ? 'bg-gradient-to-r from-[#F5C451]/20 to-[#FF9F0A]/20 text-[#F5C451] font-bold'
                                : isDark
                                ? 'hover:bg-white/5 text-slate-300'
                                : 'hover:bg-slate-100 text-slate-700'
                            }`}
                          >
                            <div className="flex flex-col text-left">
                              <span>{lang.label}</span>
                              <span className="text-[10px] opacity-65">
                                {lang.nativeName} • {lang.region}
                              </span>
                            </div>
                            {active && <Check className="w-4 h-4 text-[#F5C451]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Prominent Light / Dark Theme Switcher Button with clear label */}
              <button
                onClick={() => setIsDark((prev) => !prev)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border text-[11px] sm:text-xs font-bold transition-all active:scale-95 cursor-pointer ${
                  isDark
                    ? 'bg-[#12141C] border-[#F5C451]/40 text-[#F5C451] hover:bg-[#F5C451]/10'
                    : 'bg-amber-50 border-amber-400 text-amber-900 hover:bg-amber-100 shadow-xs'
                }`}
                aria-label="Toggle Dark or Light Mode"
                title={isDark ? 'Switch to Clean Light Mode' : 'Switch to OLED Dark Mode'}
              >
                {isDark ? (
                  <>
                    <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F5C451] shrink-0" />
                    <span>Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-800 shrink-0" />
                    <span>Dark</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ROW 2: SEARCH BAR OR CATEGORY FILTER */}
          <div className="mt-2.5 flex items-center gap-2">
            {activeTab === 'home' ? (
              /* On Home Page: Search/Filter across the 42 Categories */
              <div className="relative flex-1">
                <Search
                  className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                />
                <input
                  type="text"
                  value={categoryFilterQuery}
                  onChange={(e) => setCategoryFilterQuery(e.target.value)}
                  placeholder="Filter 42 categories by name or topic (e.g., Midjourney, YouTube, Coding, Tax)..."
                  className={`w-full pl-9 pr-24 py-2 rounded-xl text-xs sm:text-sm border outline-none transition-all ${
                    isDark
                      ? 'bg-[#12141C] border-white/10 text-white placeholder:text-slate-500 focus:border-[#F5C451]/60'
                      : 'bg-slate-100 border-slate-200/90 text-slate-900 placeholder:text-slate-500 focus:bg-white focus:border-amber-500'
                  }`}
                />
                {categoryFilterQuery ? (
                  <button
                    onClick={() => setCategoryFilterQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-white/10 text-slate-400 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab('search')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded-lg text-[10px] font-bold bg-[#F5C451]/15 text-[#F5C451] hover:bg-[#F5C451]/25 transition-colors cursor-pointer"
                  >
                    Global Search
                  </button>
                )}
              </div>
            ) : (
              /* Inside Category or Global Search: Search across prompts */
              <div className="relative flex-1">
                <Search
                  className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (
                      e.target.value.trim().length > 0 &&
                      activeTab !== 'search' &&
                      activeTab !== 'category_detail'
                    ) {
                      setActiveTab('search');
                    }
                  }}
                  placeholder={
                    activeTab === 'category_detail'
                      ? `Search inside ${activeCategory.name} (250 prompts)...`
                      : `Search all ${allPrompts.length.toLocaleString()}+ prompts offline...`
                  }
                  className={`w-full pl-9 pr-9 py-2 rounded-xl text-xs sm:text-sm border outline-none transition-all ${
                    isDark
                      ? 'bg-[#12141C] border-white/10 text-white placeholder:text-slate-500 focus:border-[#F5C451]/60'
                      : 'bg-slate-100 border-slate-200/90 text-slate-900 placeholder:text-slate-500 focus:bg-white focus:border-amber-500'
                  }`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-white/10 text-slate-400 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN RESPONSIVE CONTAINER */}
      <main className="relative z-10 max-w-7xl mx-auto px-2.5 sm:px-5 pt-3 sm:pt-4 pb-40">
        {/* OFFLINE STATUS INDICATOR */}
        <OfflineIndicator />

        {/* ===================================================================
            TAB 1: HOME VIEW — ONLY THE 42 CATEGORIES (ZERO PROMPTS ON HOME PAGE)
           =================================================================== */}
        {activeTab === 'home' && (
          <div className="space-y-4 sm:space-y-5">
            {/* 4. OFFLINE PWA NOTICE PILL ON THE HOME PAGE */}
            <div
              className={`w-full rounded-2xl px-3.5 py-2.5 border flex items-center justify-between gap-2.5 transition-all ${
                isDark
                  ? 'bg-gradient-to-r from-[#12141C] via-[#151A24] to-[#12141C] border-[#F5C451]/35 text-slate-100 shadow-lg shadow-black/40'
                  : 'bg-gradient-to-r from-amber-50 via-white to-amber-50 border-amber-300 text-slate-900 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold leading-snug">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#F5C451]/20 text-[#F5C451] shrink-0">
                  ⚡
                </span>
                <span>
                  ⚡ 100% Offline PWA — No installation required, works instantly on all browsers &amp; devices.
                </span>
              </div>
              <span
                className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shrink-0 ${
                  isDark
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Zero Login
              </span>
            </div>

            {/* COMPACT HERO BANNER */}
            <div
              className={`relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 border overflow-hidden backdrop-blur-xl ${
                isDark
                  ? 'bg-gradient-to-br from-[#12141C]/80 via-[#12141C]/75 to-[#1A1610]/80 border-white/15 shadow-xl shadow-black/50'
                  : 'bg-gradient-to-br from-white/85 via-amber-50/75 to-amber-100/70 border-slate-200/90 shadow-md shadow-slate-200/60'
              }`}
            >
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-[#F5C451]/15 text-[#F5C451] border border-[#F5C451]/30">
                    <Grid className="w-3 h-3" />
                    Select Any Category Below to Open Its 250 Prompts
                  </div>
                  <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight leading-snug">
                    Browse All{' '}
                    <span className="bg-gradient-to-r from-[#F5C451] to-[#FF9F0A] bg-clip-text text-transparent">
                      42 AI Prompt Categories
                    </span>
                  </h2>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    Tap any category card below to unlock{' '}
                    <strong>250 complete, copy-ready prompts</strong> inside that category with
                    instant translation in{' '}
                    <strong>
                      {currentLangInfo.nativeName} ({currentLangInfo.region})
                    </strong>
                    .
                  </p>
                </div>

                {/* Quick Stats on Hero */}
                <div className="grid grid-cols-3 gap-2 shrink-0">
                  <div
                    className={`px-3 py-2 rounded-xl border text-center ${
                      isDark ? 'bg-[#08090D]/80 border-white/10' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="text-sm sm:text-base font-extrabold text-[#F5C451]">42</div>
                    <div className="text-[10px] opacity-70 font-semibold">Categories</div>
                  </div>
                  <div
                    className={`px-3 py-2 rounded-xl border text-center ${
                      isDark ? 'bg-[#08090D]/80 border-white/10' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="text-sm sm:text-base font-extrabold text-[#FF9F0A]">250</div>
                    <div className="text-[10px] opacity-70 font-semibold">Per Category</div>
                  </div>
                  <div
                    className={`px-3 py-2 rounded-xl border text-center ${
                      isDark ? 'bg-[#08090D]/80 border-white/10' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="text-sm sm:text-base font-extrabold text-emerald-400">
                      10,500
                    </div>
                    <div className="text-[10px] opacity-70 font-semibold">Total Vault</div>
                  </div>
                </div>
              </div>

              {/* CLUSTER FILTER PILLS */}
              <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto pb-1">
                {CLUSTER_FILTERS.map((cluster) => {
                  const active = selectedCluster === cluster;
                  return (
                    <button
                      key={cluster}
                      onClick={() => setSelectedCluster(cluster)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                        active
                          ? 'bg-gradient-to-r from-[#F5C451] to-[#FF9F0A] text-[#08090D] shadow-sm'
                          : isDark
                          ? 'bg-[#08090D]/80 text-slate-300 border border-white/10 hover:border-white/25'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {cluster === 'All' ? 'All 42 Categories' : cluster}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ALL 42 CATEGORIES RESPONSIVE GRID */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#F5C451]" />
                  <h3 className="font-extrabold text-sm sm:text-base tracking-tight">
                    All Categories ({filteredCategories.length} of 42)
                  </h3>
                </div>
                <span
                  className={`text-[11px] font-semibold ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  Tap any category to open prompts →
                </span>
              </div>

              {filteredCategories.length === 0 ? (
                <div
                  className={`rounded-2xl p-8 text-center border ${
                    isDark ? 'bg-[#12141C] border-white/10' : 'bg-white border-slate-200'
                  }`}
                >
                  <p className="text-sm font-bold mb-2">
                    No matching category found for &ldquo;{categoryFilterQuery}&rdquo;
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <button
                      onClick={() => {
                        setCategoryFilterQuery('');
                        setSelectedCluster('All');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-[#F5C451] text-[#08090D] cursor-pointer"
                    >
                      Show All 42 Categories
                    </button>
                    <button
                      onClick={() => {
                        setSearchQuery(categoryFilterQuery);
                        setActiveTab('search');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                        isDark ? 'border-white/15 text-white' : 'border-slate-300 text-slate-800'
                      }`}
                    >
                      Search All 10,500 Prompts Instead
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5">
                  {filteredCategories.map((cat) => {
                    const accentColor = ACCENT_PALETTE[(cat.id - 1) % ACCENT_PALETTE.length];
                    return (
                      <button
                        key={cat.id}
                        onClick={() => openCategoryPrompts(cat.id)}
                        className={`group text-left p-3.5 sm:p-4 rounded-2xl border backdrop-blur-xl transition-all duration-200 flex flex-col justify-between relative overflow-hidden active:scale-[0.99] cursor-pointer ${
                          isDark
                            ? 'bg-[#12141C]/78 border-white/[0.11] hover:border-[#F5C451]/70 hover:bg-[#161924]/90 shadow-lg shadow-black/40'
                            : 'bg-white/85 border-slate-200/90 hover:border-amber-500 hover:bg-white/95 hover:shadow-md shadow-xs'
                        }`}
                      >
                        {/* Top Row: Icon + Category Badge + Prompt Count */}
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2.5">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div
                                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                                style={{
                                  backgroundColor: `${accentColor}18`,
                                  color: accentColor,
                                  border: `1px solid ${accentColor}35`,
                                }}
                              >
                                <CategoryIcon name={cat.iconName} className="w-5 h-5" />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                                      isDark
                                        ? 'bg-white/5 text-slate-400'
                                        : 'bg-slate-100 text-slate-600'
                                    }`}
                                  >
                                    #{String(cat.id).padStart(2, '0')}
                                  </span>
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F5C451]/15 text-[#F5C451]">
                                    250 Prompts
                                  </span>
                                </div>
                                <h4
                                  className={`font-extrabold text-sm sm:text-base mt-1 leading-snug group-hover:text-[#F5C451] transition-colors ${
                                    isDark ? 'text-white' : 'text-slate-900'
                                  }`}
                                >
                                  {cat.name}
                                </h4>
                              </div>
                            </div>

                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-0.5 ${
                                isDark
                                  ? 'bg-white/5 text-slate-400 group-hover:bg-[#F5C451] group-hover:text-[#08090D]'
                                  : 'bg-slate-100 text-slate-500 group-hover:bg-amber-500 group-hover:text-slate-950'
                              }`}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </div>

                          <p
                            className={`text-xs leading-relaxed line-clamp-2 mb-3 ${
                              isDark ? 'text-slate-400' : 'text-slate-600'
                            }`}
                          >
                            {cat.description}
                          </p>
                        </div>

                        {/* Preview of subtopics inside this category */}
                        <div className="pt-2.5 border-t border-white/[0.06] flex flex-wrap items-center gap-1">
                          {cat.subTopics.slice(0, 3).map((topic, idx) => (
                            <span
                              key={idx}
                              className={`text-[10px] px-2 py-0.5 rounded-md truncate max-w-[140px] ${
                                isDark ? 'bg-[#08090D] text-slate-300' : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {topic}
                            </span>
                          ))}
                          <span className="text-[10px] font-bold text-[#F5C451] ml-auto">
                            +{cat.subTopics.length - 3} more →
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        )}

        {/* ===================================================================
            TAB 2: CATEGORY DETAIL VIEW — OPENS ALL 250 PROMPTS OF SELECTED CATEGORY
           =================================================================== */}
        {activeTab === 'category_detail' && (
          <div className="space-y-4">
            {/* Category Header Banner with Back Button & Next/Prev Category Switcher */}
            <div
              className={`rounded-2xl sm:rounded-3xl p-4 sm:p-5 border backdrop-blur-xl ${
                isDark
                  ? 'bg-[#12141C]/82 border-white/15 shadow-xl shadow-black/50'
                  : 'bg-white/88 border-slate-200/90 shadow-sm'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <button
                  onClick={goBackToCategories}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    isDark
                      ? 'bg-[#08090D] border-white/15 text-[#F5C451] hover:border-[#F5C451]/60'
                      : 'bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to All 42 Categories</span>
                </button>

                {/* Prev / Next Category Quick Navigation */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() =>
                      openCategoryPrompts(selectedCategoryId > 1 ? selectedCategoryId - 1 : 42)
                    }
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1 cursor-pointer ${
                      isDark
                        ? 'bg-[#08090D] border-white/10 text-slate-300 hover:text-white'
                        : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                    }`}
                    title="Previous Category"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Prev</span>
                  </button>
                  <span className="text-xs font-mono font-bold px-2 py-1 rounded-lg bg-[#F5C451]/15 text-[#F5C451]">
                    #{selectedCategoryId} / 42
                  </span>
                  <button
                    onClick={() =>
                      openCategoryPrompts(selectedCategoryId < 42 ? selectedCategoryId + 1 : 1)
                    }
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1 cursor-pointer ${
                      isDark
                        ? 'bg-[#08090D] border-white/10 text-slate-300 hover:text-white'
                        : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                    }`}
                    title="Next Category"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: '#F5C45120',
                      color: '#F5C451',
                      border: '1px solid #F5C45140',
                    }}
                  >
                    <CategoryIcon name={activeCategory.iconName} className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#F5C451]/15 text-[#F5C451]">
                        Category #{activeCategory.id}
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          isDark ? 'text-emerald-400' : 'text-emerald-700'
                        }`}
                      >
                        • {categoryPrompts.length} Complete Prompts Ready
                      </span>
                    </div>
                    <h1 className="text-base sm:text-xl font-extrabold tracking-tight mt-0.5">
                      {activeCategory.name}
                    </h1>
                    <p
                      className={`text-xs mt-0.5 ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {activeCategory.description}
                    </p>
                  </div>
                </div>

                {/* Complexity Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {(['ALL', 'Foundation', 'Advanced', 'Masterclass', 'Enterprise'] as const).map(
                    (tier) => (
                      <button
                        key={tier}
                        onClick={() => setSelectedComplexityFilter(tier)}
                        className={`px-2.5 py-1.5 rounded-xl text-[10px] sm:text-[11px] font-bold tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
                          selectedComplexityFilter === tier
                            ? 'bg-[#F5C451] text-[#08090D] shadow-xs'
                            : isDark
                            ? 'bg-[#08090D] text-slate-400 border border-white/10 hover:text-white'
                            : 'bg-slate-100 text-slate-600 border border-slate-200 hover:text-slate-900'
                        }`}
                      >
                        {tier}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* 25 Sub-Topic Filter Bar inside Category */}
              <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto pb-1">
                <button
                  onClick={() => setSelectedSubTopicIndex('ALL')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedSubTopicIndex === 'ALL'
                      ? 'bg-[#F5C451] text-[#08090D]'
                      : isDark
                      ? 'bg-[#08090D] text-slate-300 border border-white/10'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  All 25 Sub-Topics (250)
                </button>
                {activeCategory.subTopics.map((topic, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSubTopicIndex(idx)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap shrink-0 cursor-pointer ${
                      selectedSubTopicIndex === idx
                        ? 'bg-[#F5C451] text-[#08090D] font-bold'
                        : isDark
                        ? 'bg-[#08090D] text-slate-400 border border-white/10 hover:text-white'
                        : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {idx + 1}. {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Cards Grid inside Category */}
            {categoryPrompts.length === 0 ? (
              <div
                className={`rounded-3xl p-8 text-center border ${
                  isDark ? 'bg-[#12141C] border-white/10' : 'bg-white border-slate-200'
                }`}
              >
                <p className="text-sm font-bold mb-2">
                  No prompts match your filter in this category.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedComplexityFilter('ALL');
                    setSelectedSubTopicIndex('ALL');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#F5C451] text-[#08090D] cursor-pointer"
                >
                  Reset Category Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4">
                  {categoryPrompts.slice(0, visibleCount).map((prompt) => (
                    <PromptCard
                      key={prompt.id}
                      item={prompt}
                      globalLang={globalLang}
                      globalNiche={globalNiche}
                      isDark={isDark}
                      isBookmarked={savedIds.includes(prompt.id)}
                      onToggleBookmark={toggleSavePrompt}
                      onCopyPrompt={handleCopyToast}
                      onSelectCategory={openCategoryPrompts}
                    />
                  ))}
                </div>

                {/* Load More Button inside Category */}
                {visibleCount < categoryPrompts.length && (
                  <div className="pt-4 text-center">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 24)}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#F5C451] to-[#FF9F0A] text-[#08090D] font-extrabold text-xs sm:text-sm tracking-wide shadow-lg shadow-[#F5C451]/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                    >
                      Load More Prompts ({visibleCount} of {categoryPrompts.length} shown)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ===================================================================
            TAB 3: GLOBAL OFFLINE SEARCH ACROSS ALL 10,500+ PROMPTS
           =================================================================== */}
        {activeTab === 'search' && (
          <div className="space-y-4">
            <div
              className={`rounded-2xl sm:rounded-3xl p-4 sm:p-5 border ${
                isDark ? 'bg-[#12141C] border-white/10' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold flex items-center gap-2">
                    <Compass className="w-5 h-5 text-[#F5C451]" />
                    <span>Global 10,500+ Prompt Search Engine</span>
                  </h2>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Search any topic across all 42 categories offline or tap a popular tag below.
                  </p>
                </div>
                <button
                  onClick={goBackToCategories}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer ${
                    isDark ? 'border-white/15 text-[#F5C451]' : 'border-slate-300 text-slate-800'
                  }`}
                >
                  View All 42 Categories
                </button>
              </div>

              {/* Popular Instant Search Tags */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Midjourney',
                  'Sora',
                  'SaaS',
                  'YouTube',
                  'Cold Email',
                  'Resume',
                  'Legal',
                  'Tax',
                  'Prompt',
                  'Cybersecurity',
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      searchQuery === tag
                        ? 'bg-[#F5C451] text-[#08090D] border-[#F5C451] font-bold'
                        : isDark
                        ? 'bg-[#08090D] border-white/10 text-slate-300 hover:border-[#F5C451]/40'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-amber-500'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {searchQuery.trim() && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold">
                    Found <span className="text-[#F5C451]">{searchResults.length}</span> prompts
                    matching &ldquo;{searchQuery}&rdquo;
                  </span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs font-bold text-[#F5C451] hover:underline cursor-pointer"
                  >
                    Clear Search
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {searchResults.slice(0, visibleCount).map((prompt) => (
                    <PromptCard
                      key={prompt.id}
                      item={prompt}
                      globalLang={globalLang}
                      globalNiche={globalNiche}
                      isDark={isDark}
                      isBookmarked={savedIds.includes(prompt.id)}
                      onToggleBookmark={toggleSavePrompt}
                      onCopyPrompt={handleCopyToast}
                      onSelectCategory={openCategoryPrompts}
                    />
                  ))}
                </div>

                {visibleCount < searchResults.length && (
                  <div className="pt-4 text-center">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 24)}
                      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#F5C451] to-[#FF9F0A] text-[#08090D] font-extrabold text-xs tracking-wide shadow-lg cursor-pointer"
                    >
                      Show More Results ({visibleCount} of {searchResults.length})
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            TAB 4: SAVED VAULT (OFFLINE BOOKMARKS)
           =================================================================== */}
        {activeTab === 'saved' && (
          <div className="space-y-4">
            <div
              className={`rounded-2xl sm:rounded-3xl p-4 sm:p-5 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isDark ? 'bg-[#12141C] border-white/10' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#F5C451] mb-1">
                  <Bookmark className="w-3.5 h-3.5 fill-[#F5C451]" />
                  Offline Personal Vault
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold">
                  Saved Prompts ({savedPrompts.length})
                </h2>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Stored locally on your device. Export your entire saved collection in{' '}
                  {currentLangInfo.nativeName} anytime.
                </p>
              </div>

              {savedPrompts.length > 0 && (
                <button
                  onClick={exportSavedPromptsBundle}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#F5C451] to-[#FF9F0A] text-[#08090D] font-extrabold text-xs shadow-md shadow-[#F5C451]/20 hover:brightness-110 transition-all shrink-0 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Saved Vault (.TXT)</span>
                </button>
              )}
            </div>

            {savedPrompts.length === 0 ? (
              <div
                className={`rounded-3xl p-10 text-center border ${
                  isDark ? 'bg-[#12141C]/60 border-white/10' : 'bg-white border-slate-200'
                }`}
              >
                <Bookmark className="w-10 h-10 text-[#F5C451] mx-auto mb-3 opacity-60" />
                <h3 className="font-bold text-base mb-1">Your Offline Vault is Empty</h3>
                <p
                  className={`text-xs max-w-md mx-auto mb-4 ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  Open any of the 42 categories and tap the bookmark icon on any prompt card to save
                  your favorite frameworks here.
                </p>
                <button
                  onClick={goBackToCategories}
                  className="px-4 py-2.5 rounded-xl bg-[#F5C451] text-[#08090D] font-extrabold text-xs cursor-pointer"
                >
                  Browse 42 Categories
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {savedPrompts.map((prompt) => (
                  <PromptCard
                    key={prompt.id}
                    item={prompt}
                    globalLang={globalLang}
                    globalNiche={globalNiche}
                    isDark={isDark}
                    isBookmarked={true}
                    onToggleBookmark={toggleSavePrompt}
                    onCopyPrompt={handleCopyToast}
                    onSelectCategory={openCategoryPrompts}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            TAB 5: CUSTOM MULTILINGUAL PROMPT BUILDER STUDIO
           =================================================================== */}
        {activeTab === 'studio' && (
          <div className="max-w-4xl mx-auto space-y-5">
            <div
              className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 border ${
                isDark ? 'bg-[#12141C] border-white/10' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#F5C451]/15 text-[#F5C451] border border-[#F5C451]/30 mb-3">
                <Wand2 className="w-3.5 h-3.5" />
                Offline Custom Prompt Architect
              </div>
              <h2 className="text-lg sm:text-2xl font-extrabold mb-1">
                Ravomix Custom Mega-Prompt Generator
              </h2>
              <p className={`text-xs sm:text-sm mb-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Combine any category, objective, target audience, and output language to synthesize a
                bespoke mega-prompt offline.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#F5C451] mb-1.5">
                    1. Select Domain Category (42 Available)
                  </label>
                  <select
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold border outline-none ${
                      isDark
                        ? 'bg-[#08090D] border-white/15 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    {CATEGORIES_DATA.map((c) => (
                      <option key={c.id} value={c.id}>
                        #{c.id} - {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#F5C451] mb-1.5">
                    2. Output Target Language (10 Languages)
                  </label>
                  <select
                    value={globalLang}
                    onChange={(e) => setGlobalLang(e.target.value as LanguageCode)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold border outline-none ${
                      isDark
                        ? 'bg-[#08090D] border-white/15 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    {SUPPORTED_LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.label} ({l.nativeName})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#F5C451] mb-1.5">
                    3. Primary Project Objective / Goal
                  </label>
                  <input
                    type="text"
                    value={studioGoal}
                    onChange={(e) => setStudioGoal(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                      isDark
                        ? 'bg-[#08090D] border-white/15 text-white focus:border-[#F5C451]'
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#F5C451] mb-1.5">
                    4. Target Audience / Market
                  </label>
                  <input
                    type="text"
                    value={studioAudience}
                    onChange={(e) => setStudioAudience(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                      isDark
                        ? 'bg-[#08090D] border-white/15 text-white focus:border-[#F5C451]'
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#F5C451] mb-1.5">
                    5. Desired Tone &amp; Style
                  </label>
                  <input
                    type="text"
                    value={studioTone}
                    onChange={(e) => setStudioTone(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                      isDark
                        ? 'bg-[#08090D] border-white/15 text-white focus:border-[#F5C451]'
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                    }`}
                  />
                </div>
              </div>

              {/* Synthesized Custom Prompt Output */}
              {(() => {
                const sampleItem =
                  allPrompts.find((p) => p.categoryId === selectedCategoryId) || allPrompts[0];
                const customBuiltPrompt = renderPromptInLanguage(sampleItem, globalLang, {
                  primaryGoal: studioGoal,
                  targetAudience: studioAudience,
                  toneOrStyle: studioTone,
                });

                return (
                  <div className="space-y-3">
                    <div
                      className={`p-4 rounded-2xl border font-mono text-xs leading-relaxed whitespace-pre-line max-h-96 overflow-y-auto prompt-scroll ${
                        isDark
                          ? 'bg-[#08090D] border-white/10 text-slate-200'
                          : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      {customBuiltPrompt}
                    </div>
                    <button
                      onClick={async () => {
                        await navigator.clipboard.writeText(customBuiltPrompt);
                        setStudioCopied(true);
                        setTimeout(() => setStudioCopied(false), 2000);
                      }}
                      className={`w-full py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        studioCopied
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-gradient-to-r from-[#F5C451] to-[#FF9F0A] text-[#08090D] shadow-lg shadow-[#F5C451]/20'
                      }`}
                    >
                      {studioCopied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Custom Mega-Prompt Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Custom {currentLangInfo.nativeName} Mega-Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </main>

      {/* FLOATING SCROLL-TO-TOP BUTTON FOR SMOOTH MOBILE BROWSING */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-32 right-3 sm:right-5 z-40 p-3 rounded-2xl bg-gradient-to-br from-[#F5C451] to-[#FF9F0A] text-[#08090D] shadow-xl shadow-black/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Scroll to Top"
          aria-label="Scroll to Top"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}

      {/* 2 & 3. MULTI-CURRENCY PRO FLOATING ACTION BUTTON AT BOTTOM LINKING TO EXTERNAL CHECKOUT */}
      <div className="fixed bottom-[62px] sm:bottom-[66px] left-0 right-0 z-40 px-2.5 sm:px-4 pointer-events-none flex justify-center">
        <a
          href={EXTERNAL_CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto w-full max-w-xl py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#F5C451] via-[#FFB323] to-[#FF9F0A] text-[#08090D] font-extrabold text-xs sm:text-sm tracking-tight shadow-[0_0_28px_rgba(245,196,81,0.45)] border border-white/40 flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] transition-all"
        >
          <span className="truncate">🔓 Unlock Full Pro Access ($19.99 USD / ₹499 INR)</span>
          <ExternalLink className="w-4 h-4 shrink-0 stroke-[2.5]" />
        </a>
      </div>

      {/* FLOATING GLASSMORPHIC MOBILE BOTTOM NAVIGATION BAR */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-40 backdrop-blur-2xl border-t transition-colors ${
          isDark
            ? 'bg-[#08090D]/95 border-white/10 text-slate-400'
            : 'bg-white/95 border-slate-200 text-slate-600 shadow-lg'
        }`}
      >
        <div className="max-w-lg mx-auto px-2 py-1.5 grid grid-cols-5 gap-1">
          <button
            onClick={goBackToCategories}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'home' || activeTab === 'category_detail'
                ? 'text-[#F5C451] font-bold bg-[#F5C451]/10'
                : 'hover:text-[#F5C451]'
            }`}
          >
            <Grid className="w-4 h-4 mb-0.5" />
            <span className="text-[10px]">42 Categories</span>
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'search'
                ? 'text-[#F5C451] font-bold bg-[#F5C451]/10'
                : 'hover:text-[#F5C451]'
            }`}
          >
            <Search className="w-4 h-4 mb-0.5" />
            <span className="text-[10px]">Search</span>
          </button>

          <button
            onClick={() => setActiveTab('studio')}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'studio'
                ? 'text-[#F5C451] font-bold bg-[#F5C451]/10'
                : 'hover:text-[#F5C451]'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 mb-0.5" />
            <span className="text-[10px]">Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`relative flex flex-col items-center justify-center py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'saved'
                ? 'text-[#F5C451] font-bold bg-[#F5C451]/10'
                : 'hover:text-[#F5C451]'
            }`}
          >
            <Bookmark className="w-4 h-4 mb-0.5" />
            <span className="text-[10px]">Saved ({savedIds.length})</span>
          </button>

          <button
            onClick={() => setShowProLicenseModal(true)}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all cursor-pointer ${
              showProLicenseModal
                ? 'text-[#F5C451] font-bold bg-[#F5C451]/10'
                : 'hover:text-[#F5C451]'
            }`}
          >
            <Crown className="w-4 h-4 mb-0.5 text-[#F5C451]" />
            <span className="text-[10px] font-bold text-[#F5C451]">Pro Pack</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
