import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import { headerLogo, homesaazLogo } from '../assets/images';
import { navLinks, categories } from '../constants';
import ThemeSwitch from './ThemeSwitch';
import { useMenuUpdateContext } from '../contexts/MenuContext';
import { Bars3Icon, ArrowDownTrayIcon } from '@heroicons/react/20/solid';
import useScroll from '../../helpers/useScroll';
import SearchBar from './SearchBar';

const Navbar = ({ handleClick, handleClick2, setSearchResults }) => {
  const toggleShowMenu = useMenuUpdateContext();
  const [isScrollingUp, isScrollingDown] = useScroll();

  // Use useEffect to log products when the component mounts
  useEffect(() => {
    console.log("Product List test::: ", categories);
  }, []); // Runs only once when the component mounts

  return (
      <header className={`dark:bg-[#1C1C1C] bg-white padding-x py-6 lg:py-6 z-10 w-full shadow-2xl fixed top-0 left-0 right-0 transition-transform duration-700`}>
        <nav className="flex justify-between items-center max-container">
          <a href="/">
            <img src={headerLogo} className="hidden lg:block" alt="logo" width="200" height="29" />
            <img src={homesaazLogo} className="lg:hidden h-[50px]" alt="logo" />
          </a>
          <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
            {navLinks.map((item) => (
                <li key={item.label}>
                  <button onClick={handleClick2}>
                    <a
                        href={item.href}
                        className="font-montserrat leading-normal text-md text-slate-gray dark:text-slate-100 hoverUnderline dark:mix-blend-difference"
                    >
                      {item.label}
                    </a>
                  </button>
                </li>
            ))}
          </ul>
          {/* eCatalogue Button */}
          <Link to="/catalogue" className="flex items-center text-coral-red font-semibold hover:underline">
            <ArrowDownTrayIcon className="h-5 w-5 ml-2 mr-8" /> {/* Added space with `ml-2` */}
          </Link>

          <div className="flex items-center justify-center gap-x-4">
            {/* <div className="hidden lg:block w-80">
              <SearchBar showFilterToggle={false} />
            </div> */}
            <ThemeSwitch handleClick={handleClick} />

            <div className="lg:hidden dark:invert cursor-pointer" onClick={toggleShowMenu}>
              <Bars3Icon height={25} width={25} className="dark:text-coral-red" />
            </div>
          </div>
        </nav>
      </header>
  );
};

export default Navbar;
