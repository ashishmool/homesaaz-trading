import {
  Cart,
  CustomerReviews,
  Footer,
  Hero,
  ProductCategories,
  Services,
  SpecialOffers,
  Subscribe,
  SuperQuality,
  ScrollToTopButton
} from './sections';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import { useState } from 'react';
import Signin from './sections/Signin';
import Signup from './sections/Signup';
import CategoriesPage from './sections/CategoriesPage.jsx';
import SingleCategory from './components/SingleCategory.jsx';
import { SnackbarProvider } from 'notistack';
import Clients from "./sections/Clients.jsx";
import PopUpScreen from "./components/PopUpScreen.jsx";
import PopUp from "./sections/PopUp.jsx";
import Contact from "./sections/Contact.jsx";
import Catalogue from "./sections/Catalogue.jsx";
import SingleProduct from "./components/SingleProduct.jsx";

const App = () => {
  const [showCart, setShowCart] = useState(false);
  const [searchResults, setSearchResults] = useState([]);  // Added search results state

  function handleShowCart() {
    setShowCart(true);
  }

  function handleHideCart() {
    setShowCart(false);
  }

  return (
      <>
        <SnackbarProvider autoHideDuration={1500} />
        <Router>
          <main className={'scroll-smooth z-40 h-fit overflow-hidden relative'}>
            <div>
              <Navbar setSearchResults={setSearchResults} />
              {/* Keep this instance if you want ProductCategories before Hero */}
            </div>
            <Routes>
              <Route
                  path={'/'}
                  element={
                    <>
                      <Menu />
                      {showCart ? (
                          <Cart />
                      ) : (
                          <section>
                            <div className={`padding-x py-6 lg:py-8 z-10 w-full`} />{' '}
                            {/*<PopUp />*/}
                            <Hero />
                            <ProductCategories searchResults={searchResults} />
                            <ScrollToTopButton />
                            <Clients />
                            <Contact />
                            <Services />
                          </section>
                      )}
                    </>
                  }
              />
              <Route path={'/single_category/:id'} element={<SingleCategory />} />
              <Route path={'/categories'} element={<ProductCategories />} />
              <Route path={'/product/:productId'} element={<SingleProduct />} /> {/* Added route */}
              <Route path={'/login'} element={<Signin />} />
              <Route path={'/register'} element={<Signup />} />
              {/*<Route path={'/products'} element={<CategoriesPage />} />*/}
              <Route path="/catalogue" element={<Catalogue />} />
            </Routes>
            <Footer />
          </main>
        </Router>

      </>
  );
};

export default App;
