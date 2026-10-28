import React, { useEffect, useState } from 'react';
import {
  Bookmark,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  Globe,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import {
  LanguageCode,
  SUPPORTED_LANGUAGES,
} from '../data/categoriesData';
import {
  CustomVariableOverrides,
  PromptItem,
  getTranslatedDescription,
  getTranslatedTitle,
  renderPromptInLanguage,
} from '../data/multilingualEngine';

interface PromptCardProps {
  item: PromptItem;
  globalLang: LanguageCode;
  globalNiche: string;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onCopyPrompt: (text: string, title: string, langLabel: string) => void;
  onSelectCategory?: (categoryId: number) => void;
  isDark: boolean;
}

export const PromptCard: React.FC<PromptCardProps> = ({
  item,
  globalLang,
  globalNiche,
  isBookmarked,
  onToggleBookmark,
  onCopyPrompt,
  onSelectCategory,
  isDark,
}) => {
  const [cardLang, setCardLang] = useState<LanguageCode>(globalLang);
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showVariableEditor, setShowVariableEditor] = useState(false);
  const [overrides, setOverrides] = useState<CustomVariableOverrides>({});

  // Sync card language whenever user changes the Global Language Switcher
  useEffect(() => {
    setCardLang(globalLang);
  }, [globalLang]);

  const activeLangMeta =
    SUPPORTED_LANGUAGES.find((l) => l.code === cardLang) || SUPPORTED_LANGUAGES[0];

  const effectiveOverrides: CustomVariableOverrides = {
    ...overrides,
    targetAudience:
      overrides.targetAudience ||
      (globalNiche.trim()
        ? `${globalNiche.trim()} (${item.defaultVariables.targetAudience})`
        : undefined),
  };

  const translatedTitle = getTranslatedTitle(item, cardLang);
  const translatedDesc = getTranslatedDescription(item, cardLang);
  const fullPromptText = renderPromptInLanguage(item, cardLang, effectiveOverrides);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullPromptText);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = fullPromptText;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
    } catch {
      // Fallback copy if clipboard API is restricted in iframe
      const textArea = document.createElement('textarea');
      textArea.value = fullPromptText;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    onCopyPrompt(fullPromptText, translatedTitle, activeLangMeta.nativeName);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([`${translatedTitle}\n\n${fullPromptText}`], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.id}-${cardLang}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const hasCustomOverrides = Boolean(
    overrides.customTopic ||
      overrides.targetAudience ||
      overrides.primaryGoal ||
      overrides.toneOrStyle ||
      globalNiche.trim()
  );

  return (
    <article
      className={`rounded-2xl border backdrop-blur-xl transition-all flex flex-col justify-between p-4 sm:p-5 ${
        isDark
          ? 'bg-[#12141C]/82 border-white/[0.11] hover:border-[#F5C451]/60 shadow-lg shadow-black/35'
          : 'bg-white/88 border-slate-200/95 hover:border-amber-500 shadow-sm hover:shadow-md'
      }`}
    >
      <div>
        {/* Unboxed Metadata Row */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div
            className={`flex flex-wrap items-center gap-1.5 text-xs font-mono tabular-nums ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            <span
              className={
                isDark ? 'text-[#F5C451] font-bold' : 'text-amber-700 font-bold'
              }
            >
              #{item.id}
            </span>
            <span aria-hidden="true">·</span>
            {onSelectCategory ? (
              <button
                type="button"
                onClick={() => onSelectCategory(item.categoryId)}
                className="hover:underline text-left font-sans font-semibold cursor-pointer"
              >
                {item.categoryShortTitle}
              </button>
            ) : (
              <span className="font-sans font-semibold">{item.categoryShortTitle}</span>
            )}
            <span aria-hidden="true">·</span>
            <span>{item.frameworkCode}</span>
            <span aria-hidden="true">·</span>
            <span>{item.complexity}</span>
          </div>

          <button
            type="button"
            onClick={() => onToggleBookmark(item.id)}
            aria-label={isBookmarked ? 'Remove from saved prompts' : 'Save prompt to bookmarks'}
            className={`min-h-[42px] min-w-[42px] -my-1.5 -mr-1.5 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
              isBookmarked
                ? isDark
                  ? 'text-[#F5C451] bg-[#F5C451]/10'
                  : 'text-amber-600 bg-amber-50'
                : isDark
                  ? 'text-slate-400 hover:text-white hover:bg-white/5'
                  : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title={isBookmarked ? 'Saved in Bookmarks' : 'Save Prompt'}
          >
            <Bookmark className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Prompt Card Title */}
        <h3
          dir={activeLangMeta.dir}
          className={`text-base sm:text-lg font-bold leading-snug tracking-tight mb-1.5 ${
            isDark ? 'text-[#F8FAFC]' : 'text-slate-900'
          }`}
        >
          {translatedTitle}
        </h3>

        {/* Detailed Instructions Summary */}
        <p
          dir={activeLangMeta.dir}
          className={`text-xs sm:text-sm leading-relaxed mb-3.5 ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {translatedDesc}
        </p>

        {/* Per-Card Interactive 10-Language Selector + Customize Variables Button */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="relative flex-1 min-w-[190px]">
            <Globe
              className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${
                isDark ? 'text-[#F5C451]' : 'text-amber-600'
              }`}
            />
            <select
              aria-label={`Select translation language for prompt ${item.id}`}
              value={cardLang}
              onChange={(e) => setCardLang(e.target.value as LanguageCode)}
              className={`w-full min-h-[42px] pl-9 pr-8 py-2 rounded-xl text-xs font-bold appearance-none border transition-colors cursor-pointer focus:outline-none ${
                isDark
                  ? 'bg-[#08090D] border-white/15 text-[#F8FAFC] focus:border-[#F5C451]'
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600'
              }`}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option
                  key={lang.code}
                  value={lang.code}
                  className={isDark ? 'bg-[#12141C] text-white' : 'bg-white text-slate-900'}
                >
                  {lang.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className={`w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            />
          </div>

          <button
            type="button"
            onClick={() => setShowVariableEditor((prev) => !prev)}
            className={`min-h-[42px] px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              showVariableEditor || hasCustomOverrides
                ? isDark
                  ? 'border-[#F5C451] bg-[#F5C451]/15 text-[#F5C451]'
                  : 'border-amber-600 bg-amber-50 text-amber-800'
                : isDark
                  ? 'border-white/15 bg-[#08090D] text-slate-300 hover:text-white'
                  : 'border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
            title="Customize [VARIABLES] before copying"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
            <span>{hasCustomOverrides ? 'Customized' : 'Customize'}</span>
          </button>
        </div>

        {/* Live Variable Personalizer Drawer */}
        {showVariableEditor && (
          <div
            className={`mb-3.5 p-3.5 rounded-xl border space-y-2.5 text-xs ${
              isDark
                ? 'bg-[#08090D] border-white/15 text-slate-200'
                : 'bg-amber-50/50 border-amber-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold">Personalize Prompt Variables Live</span>
              <button
                type="button"
                onClick={() => setOverrides({})}
                className={`text-xs flex items-center gap-1 font-semibold hover:underline cursor-pointer ${
                  isDark ? 'text-[#F5C451]' : 'text-amber-700'
                }`}
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-medium opacity-80 mb-1">
                  Your Topic / Product
                </label>
                <input
                  type="text"
                  value={overrides.customTopic || ''}
                  onChange={(e) => setOverrides({ ...overrides, customTopic: e.target.value })}
                  placeholder={item.subTopic}
                  className={`w-full px-2.5 py-1.5 rounded-lg border text-xs ${
                    isDark
                      ? 'bg-[#12141C] border-white/15 text-white'
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium opacity-80 mb-1">
                  Target Audience / Niche
                </label>
                <input
                  type="text"
                  value={overrides.targetAudience || ''}
                  onChange={(e) => setOverrides({ ...overrides, targetAudience: e.target.value })}
                  placeholder={item.defaultVariables.targetAudience}
                  className={`w-full px-2.5 py-1.5 rounded-lg border text-xs ${
                    isDark
                      ? 'bg-[#12141C] border-white/15 text-white'
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium opacity-80 mb-1">
                  Primary Goal / Result
                </label>
                <input
                  type="text"
                  value={overrides.primaryGoal || ''}
                  onChange={(e) => setOverrides({ ...overrides, primaryGoal: e.target.value })}
                  placeholder={item.defaultVariables.primaryGoal}
                  className={`w-full px-2.5 py-1.5 rounded-lg border text-xs ${
                    isDark
                      ? 'bg-[#12141C] border-white/15 text-white'
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium opacity-80 mb-1">
                  Tone & Style
                </label>
                <input
                  type="text"
                  value={overrides.toneOrStyle || ''}
                  onChange={(e) => setOverrides({ ...overrides, toneOrStyle: e.target.value })}
                  placeholder={item.defaultVariables.toneOrStyle}
                  className={`w-full px-2.5 py-1.5 rounded-lg border text-xs ${
                    isDark
                      ? 'bg-[#12141C] border-white/15 text-white'
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>
          </div>
        )}

        {/* Directly Scrollable Full Written Prompt Box */}
        <div
          className={`relative rounded-xl border p-3.5 mb-3.5 font-mono text-xs leading-relaxed ${
            isDark
              ? 'bg-[#08090D] border-white/10 text-slate-200'
              : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}
        >
          <pre
            dir={activeLangMeta.dir}
            className={`whitespace-pre-wrap break-words font-mono text-xs custom-scroll pr-1 transition-all ${
              isExpanded
                ? 'max-h-[520px] overflow-y-auto'
                : 'max-h-52 overflow-y-auto'
            }`}
          >
            {fullPromptText}
          </pre>
        </div>
      </div>

      {/* Bottom Action Bar: Expand/Collapse + Download TXT + 1-Click Copy Prompt Button */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            isDark
              ? 'border-white/10 text-slate-300 hover:text-white hover:bg-white/5'
              : 'border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              <span>Compact</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              <span>Full Box</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleDownloadTxt}
          aria-label="Download prompt as text file"
          title="Download Prompt (.TXT)"
          className={`min-h-[44px] min-w-[44px] rounded-xl border flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
            isDark
              ? 'border-white/10 text-slate-300 hover:text-[#F5C451] hover:bg-white/5'
              : 'border-slate-200 text-slate-700 hover:text-amber-700 hover:bg-slate-100'
          }`}
        >
          <Download className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className={`flex-1 min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all whitespace-nowrap shrink-0 cursor-pointer active:scale-[0.98] ${
            copied
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : isDark
                ? 'bg-gradient-to-r from-[#F5C451] to-[#FF9F0A] text-[#08090D] hover:brightness-110 shadow-md shadow-[#F5C451]/10'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:brightness-105 shadow-md shadow-amber-500/20'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 shrink-0" />
              <span>Copied ({activeLangMeta.nativeName})!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 shrink-0" />
              <span>📋 Copy Prompt</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
};
