import {
  Footer,
  Hero,
  ProductCategories,
  Services,
  ScrollToTopButton
} from './sections';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Signin from './sections/Signin';
import Signup from './sections/Signup';
import SingleCategory from './components/SingleCategory.jsx';
import { SnackbarProvider } from 'notistack';
import Clients from './sections/Clients.jsx';
import Contact from './sections/Contact.jsx';
import Catalogue from './sections/Catalogue.jsx';
import SingleProduct from './components/SingleProduct.jsx';
import { SearchProvider } from './contexts/SearchContext';
import AllProducts from './sections/AllProducts';
import ScrollToHash from './components/ScrollToHash';

const App = () => {
  return (
    <>
      <SnackbarProvider autoHideDuration={1500} />
      <SearchProvider>
        <Router>
          <main className="relative z-40 h-fit scroll-smooth overflow-x-hidden">
            <Navbar />
            <Menu />
            <ScrollToHash />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <ProductCategories />
                    <ScrollToTopButton />
                    <Clients />
                    <Contact />
                    <Services />
                  </>
                }
              />
              <Route path="/single_category/:id" element={<SingleCategory />} />
              <Route path="/categories" element={<ProductCategories />} />
              <Route path="/products" element={<AllProducts />} />
              <Route path="/product/:productSlug" element={<SingleProduct />} />
              <Route path="/login" element={<Signin />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/catalogue" element={<Catalogue />} />
            </Routes>
            <Footer />
          </main>
        </Router>
      </SearchProvider>
    </>
  );
};

export default App;
