import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { headerLogo, homesaazLogo } from '../assets/images';
import { navLinks } from '../constants';
import ThemeSwitch from './ThemeSwitch';
import MegaMenu from './MegaMenu';
import { useMenuUpdateContext } from '../contexts/MenuContext';
import { Bars3Icon, ArrowDownTrayIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { scrollToId } from '../helpers/scroll';

const Navbar = () => {
  const toggleShowMenu = useMenuUpdateContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
  }, [location.pathname, location.hash]);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };

  const scheduleCloseMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 160);
  };

  const goToHash = (hash) => {
    setMegaOpen(false);
    if (location.pathname === '/') {
      scrollToId(hash);
      if (window.location.hash !== `#${hash}`) {
        window.history.replaceState(null, '', `/#${hash}`);
      }
      return;
    }
    navigate(`/#${hash}`);
  };

  const isActive = (item) => {
    if (item.type === 'route' && item.href === '/') {
      return location.pathname === '/' && !location.hash;
    }
    if (item.hash) {
      return (
        location.hash === `#${item.hash}` ||
        (item.hash === 'products' && location.pathname === '/products')
      );
    }
    return location.pathname === item.href;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-brand ease-brand ${
        scrolled || megaOpen
          ? 'border-b border-black/[0.06] bg-white/90 shadow-nav backdrop-blur-xl dark:border-white/10 dark:bg-surface-dark/90'
          : 'border-b border-transparent bg-white/70 backdrop-blur-md dark:bg-surface-dark/70'
      }`}
    >
      <nav
        className="relative mx-auto flex h-nav max-w-wide items-center justify-between gap-4 px-[var(--gutter)]"
        aria-label="Primary"
        onMouseLeave={scheduleCloseMega}
      >
        <Link to="/" className="relative z-10 shrink-0" onClick={() => setMegaOpen(false)}>
          <img src={headerLogo} className="hidden h-8 w-auto lg:block" alt="Homesaaz" />
          <img src={homesaazLogo} className="h-10 w-auto lg:hidden" alt="Homesaaz" />
        </Link>

        <ul className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 lg:flex">
          {navLinks.map((item) => {
            if (item.type === 'mega') {
              return (
                <li key={item.label} onMouseEnter={openMega}>
                  <button
                    type="button"
                    className={`nav-link ${megaOpen || isActive(item) ? 'is-active' : ''}`}
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    onClick={() => {
                      if (item.hash) goToHash(item.hash);
                      else setMegaOpen((v) => !v);
                    }}
                    onFocus={openMega}
                  >
                    {item.label}
                    <ChevronDownIcon
                      className={`h-3.5 w-3.5 transition duration-brand ${megaOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                </li>
              );
            }

            if (item.type === 'hash') {
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    className={`nav-link ${isActive(item) ? 'is-active' : ''}`}
                    aria-current={isActive(item) ? 'page' : undefined}
                    onClick={() => goToHash(item.hash)}
                    onMouseEnter={scheduleCloseMega}
                  >
                    {item.label}
                  </button>
                </li>
              );
            }

            return (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={`nav-link ${isActive(item) ? 'is-active' : ''}`}
                  aria-current={isActive(item) ? 'page' : undefined}
                  onMouseEnter={scheduleCloseMega}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="relative z-10 flex items-center gap-1.5 sm:gap-2">
          <Link
            to="/catalogue"
            className="btn-ghost sm:h-auto sm:w-auto sm:gap-2 sm:rounded-brand sm:border sm:border-black/10 sm:px-3 sm:py-2 sm:hover:border-brand dark:sm:border-white/15"
            aria-label="Downloads"
            title="Downloads"
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
            <span className="hidden text-xs font-semibold tracking-wide sm:inline">Downloads</span>
          </Link>

          <ThemeSwitch />

          <button
            type="button"
            className="btn-ghost lg:hidden"
            aria-label="Open menu"
            onClick={toggleShowMenu}
          >
            <Bars3Icon className="h-5 w-5" />
          </button>

          {megaOpen && (
            <button
              type="button"
              className="btn-ghost hidden lg:inline-flex"
              aria-label="Close products menu"
              onClick={() => setMegaOpen(false)}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        <MegaMenu
          open={megaOpen}
          onClose={() => setMegaOpen(false)}
          onNavigateProducts={() => goToHash('products')}
        />
      </nav>
    </header>
  );
};

export default Navbar;
