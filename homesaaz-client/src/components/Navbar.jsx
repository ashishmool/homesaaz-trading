import { useState, useEffect } from 'react';
import { headerLogo, homesaazLogo } from '../assets/images';
import { navLinks, products } from '../constants';
import ThemeSwitch from './ThemeSwitch';
import { useMenuUpdateContext } from '../contexts/MenuContext';
import { MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/20/solid';
import useScroll from '../../helpers/useScroll';

const Navbar = ({ handleClick, handleClick2, setSearchResults }) => {
  const toggleShowMenu = useMenuUpdateContext();
  const [isScrollingUp, isScrollingDown] = useScroll();
  const [searchQuery, setSearchQuery] = useState('');

  // Use useEffect to log products when the component mounts
  useEffect(() => {
    console.log("Product List test::: ", products);
  }, []); // Runs only once when the component mounts

  // Handle search query changes
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter products based on search query
    const filteredProducts = products.filter((product) =>
        product.category.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
    );

    // Update search results in parent (App or ProductCategories)
    setSearchResults(filteredProducts);

    // Scroll to the #products section
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
                        className="font-montserrat leading-normal text-lg text-slate-gray dark:text-slate-100 hoverUnderline dark:mix-blend-difference"
                    >
                      {item.label}
                    </a>
                  </button>
                </li>
            ))}
          </ul>
          <div className="flex items-center justify-center gap-x-2">
            <div className="flex items-center justify-center sm:bg-transparent sm:p-2 rounded-3xl overflow-hidden sm:border dark:border-gray-500">
              <MagnifyingGlassIcon className="mr-3 h-6 w-6 transition duration-300 cursor-pointer text-slate-gray dark:text-coral-red" />
              <input
                  placeholder="Search"
                  type="text"
                  className="bg-transparent hidden sm:block text-slate-gray outline-0 focus:outline-0 placeholder:font-semibold dark:placeholder-slate-400"
                  value={searchQuery}
                  onChange={handleSearchChange}
              />
            </div>
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
