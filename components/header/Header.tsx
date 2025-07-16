import SearchBar from '../ui/SearchBar';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import type { ServiceCategory } from '../../types/service';
import { useState, useEffect } from 'react';

interface HeaderProps {
  onSearch: (term: string, category?: ServiceCategory, city?: string) => void;
  search : Boolean;
  showCity?: boolean;
}

export default function Header({ onSearch, search, showCity = false }: HeaderProps) {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { locale } = router;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (locale) {
      localStorage.setItem('lang', locale);
    }
  }, [locale]);

  const switchLanguage = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    localStorage.setItem('lang', nextLocale);
    router.push(router.asPath, router.asPath, { locale: nextLocale });
  };

  return (
    <header className="site-header">
      <div className="site-title">{t('title')}</div>
      <button
        className="menu-toggle"
        aria-label="Toggle navigation menu"
        onClick={() => setMenuOpen((open) => !open)}
        style={locale === 'en' ? {right:'0'} : {left:'0'}}
      >
        <span className="menu-icon">&#9776;</span>
      </button>
      <nav className={`site-nav${menuOpen ? ' open' : ''}`}>
        <ul className="nav-list">
          <li className="nav-item">
            <a href="/" className="nav-link" onClick={() => setMenuOpen(false)}>{t('nav_home')}</a>
          </li>
          <li className="nav-item">
            <a href="/about/about" className="nav-link" onClick={() => setMenuOpen(false)}>{t('nav_about')}</a>
          </li>
          <li className="nav-item">
            <a href="/contact/contact" className="nav-link" onClick={() => setMenuOpen(false)}>{t('nav_contact')}</a>
          </li>
        </ul>
      </nav>
      <div className="header-search">
        {
          search && <SearchBar onSearch={onSearch} showCity={showCity} />
        }
      </div>
      <button className="language-switch-btn" onClick={switchLanguage}>
        {t('switch_language')}
      </button>
    </header>
  );
}
