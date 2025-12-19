
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const languages = [
        { code: 'en', name: 'English', flag: '🇮🇳' },
        { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
        { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
        { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    ];

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('preferred-language', lng);
    };

    return (
        <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded text-sm hover:bg-slate-50 transition-colors">
                <i className="fa-solid fa-language text-slate-600"></i>
                <span className="font-bold text-xs uppercase text-slate-700">
                    {languages.find(l => l.code === i18n.language)?.name || 'English'}
                </span>
                <i className="fa-solid fa-chevron-down text-xs text-slate-400"></i>
            </button>

            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="p-2">
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-3 py-1 mb-1">
                        Select Language
                    </div>
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded text-left hover:bg-slate-50 transition-colors ${i18n.language === lang.code ? 'bg-slate-100 font-bold' : ''
                                }`}
                        >
                            <span className="text-lg">{lang.flag}</span>
                            <span className="text-sm">{lang.name}</span>
                            {i18n.language === lang.code && (
                                <i className="fa-solid fa-check text-green-600 ml-auto text-xs"></i>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LanguageSwitcher;
