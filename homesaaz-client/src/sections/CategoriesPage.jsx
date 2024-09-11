import { useState } from 'react';
import CategoryCard from '../components/CategoryCard.jsx';
import { categories } from '../constants';
import Navbar from '../components/Navbar';
import Cart from '../sections/Cart';

const CategoriesPage = () => {
  const [showCart, setShowCart] = useState(false);
  function handleShowCart() {
    setShowCart(true);
  }
  function handleHideCart() {
    setShowCart(false);
  }

  return (
    <main className={'scroll-smooth z-40 h-fit overflow-hidden relative'}>
      <Navbar handleClick2={handleHideCart} handleClick={handleShowCart} />
      {showCart ? (
        <Cart />
      ) : (
        <section className="padding mt-8">
          <div id="categories" className="max-container max-sm:mt-12">
            <div className="flex flex-col justify-start gap-5">
              <h2 className="text-4xl font-palanquin font-bold">
                {/*<span className="text-coral-red"> Jordans </span>*/}
              </h2>
            </div>
            <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4">
              {categories.map((product) => (
                <CategoryCard key={product.name} {...product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default CategoriesPage;
