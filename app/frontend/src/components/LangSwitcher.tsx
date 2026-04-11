import { useLang } from '../lib/LangContext';
import { type Lang, LANG_LABELS } from '../lib/i18n';

const LANGS: Lang[] = ['en', 'si', 'ta'];

export default function LangSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language selector">
      {LANGS.map((l, i) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className="text-[11px] tracking-wider uppercase px-2 py-1 transition-all duration-300 cursor-pointer"
          style={{
            color: lang === l ? 'var(--obsidian)' : 'var(--pewter)',
            background: lang === l ? 'var(--gold)' : 'transparent',
            border: lang === l ? '1px solid var(--gold)' : '1px solid rgba(212,175,55,0.25)',
            borderRight: i < LANGS.length - 1 ? 'none' : undefined,
            fontFamily: l === 'si' ? 'Noto Sans Sinhala, sans-serif'
                       : l === 'ta' ? 'Noto Sans Tamil, sans-serif'
                       : 'Josefin Sans, sans-serif',
          }}
        >
          {LANG_LABELS[l]}
        </button>
      ))}
    </div>
  );
}
