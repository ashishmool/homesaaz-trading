import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMenuContext, useMenuCloseContext } from '../contexts/MenuContext';
import { categories, categoryMenuGroups, navLinks } from '../constants';
import { scrollToId } from '../helpers/scroll';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Menu = () => {
  const showMenu = useMenuContext();
  const closeMenu = useMenuCloseContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  useEffect(() => {
    if (!showMenu) setCategoriesOpen(false);
  }, [showMenu]);

  useEffect(() => {
    document.body.style.overflow = showMenu ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showMenu]);

  const goToHash = (hash) => {
    closeMenu();
    if (location.pathname === '/') {
      requestAnimationFrame(() => scrollToId(hash));
      return;
    }
    navigate(`/#${hash}`);
  };

  const groups = categoryMenuGroups
    .map((group) => ({
      ...group,
      items: group.ids
        .map((id) => categories.find((c) => c.categoryId === id))
        .filter(Boolean)
    }))
    .filter((g) => g.items.length > 0);

  return (
    <aside
      className={`fixed inset-0 z-[60] transition duration-brand ease-brand ${
        showMenu ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
      }`}
      aria-hidden={!showMenu}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-brand ${
          showMenu ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Close menu"
        onClick={closeMenu}
      />

      <div
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-soft transition-transform duration-brand ease-brand dark:bg-surface-dark ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-4 dark:border-white/10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">Menu</p>
          <button type="button" className="btn-ghost" aria-label="Close menu" onClick={closeMenu}>
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navLinks.map((item) => {
              if (item.type === 'mega') {
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-brand px-3 py-3 text-left text-base font-medium text-ink transition hover:bg-surface-muted dark:text-white dark:hover:bg-white/5"
                      aria-expanded={categoriesOpen}
                      onClick={() => setCategoriesOpen((v) => !v)}
                    >
                      Products
                      <ChevronDownIcon
                        className={`h-4 w-4 transition ${categoriesOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-brand ease-brand ${
                        categoriesOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="space-y-4 px-2 pb-4 pt-1">
                          <button
                            type="button"
                            className="w-full rounded-brand bg-brand px-3 py-2.5 text-sm font-semibold text-white"
                            onClick={() => goToHash('products')}
                          >
                            Browse all products
                          </button>
                          {groups.map((group) => (
                            <div key={group.title}>
                              <p className="mb-2 px-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                                {group.title}
                              </p>
                              <ul className="space-y-0.5">
                                {group.items.map((cat) => (
                                  <li key={cat.categoryId}>
                                    <Link
                                      to={`/single_category/${cat.categoryId}`}
                                      className="block rounded-brand px-3 py-2 text-sm text-ink-muted hover:bg-surface-muted hover:text-ink dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
                                      onClick={closeMenu}
                                    >
                                      {cat.category}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              }

              if (item.type === 'hash') {
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-brand px-3 py-3 text-left text-base font-medium text-ink transition hover:bg-surface-muted dark:text-white dark:hover:bg-white/5"
                      onClick={() => goToHash(item.hash)}
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
                    className="flex w-full items-center justify-between rounded-brand px-3 py-3 text-base font-medium text-ink transition hover:bg-surface-muted dark:text-white dark:hover:bg-white/5"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-black/[0.06] p-4 dark:border-white/10">
          <Link
            to="/catalogue"
            className="btn-primary w-full"
            onClick={closeMenu}
          >
            Downloads & catalogues
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Menu;
