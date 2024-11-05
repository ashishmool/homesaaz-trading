import { categories, products } from '../constants/index.js';
import SingleProductCard from './SingleProductCard.jsx';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Breadcrumbs from './Breadcrumbs.jsx'; // Import the Breadcrumbs component

const SingleCategory = () => {
    const currentURL = useLocation();
    const urlString = currentURL.pathname;
    const parts = urlString.split('/');
    const urlCategoryId = parseInt(parts[parts.length - 1]);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [categoryImages, setCategoryImages] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top

        // Find the category based on the category ID
        const category = categories.find(cat => cat.categoryId === urlCategoryId);
        setCategoryName(category ? category.category : 'Unknown Category');

        // Filter products by categoryId
        const filteredProducts = products.filter(
            (product) => product.categoryId === urlCategoryId
        );
        setCategoryProducts(filteredProducts);

        // Collect all category images
        const images = [];
        for (let i = 1; i <= 10; i++) { // Assuming a maximum of 10 images for each category
            const imageKey = `categoryImage${i}`;
            if (category && category[imageKey]) {
                images.push(category[imageKey]);
            } else {
                break; // Exit loop if no more images exist
            }
        }
        setCategoryImages(images);
    }, [urlCategoryId]);

    return (
        <section className="padding">
            <div className="max-container max-sm:mt-12">

                <div className="flex flex-col justify-center items-center gap-5">
                    <h2 className="text-4xl font-palanquin font-bold text-center mt-24 mb-4">
                        Products in <span className="text-coral-red">{categoryName}</span>
                    </h2>
                    <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray dark:text-gray-400 text-center">
                        Explore our selection tailored just for you.
                    </p>
                </div>

                {/* Breadcrumbs */}
                <Breadcrumbs categoryName={categoryName} /> {/* Pass categoryName to Breadcrumbs */}

                <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4">
                    {categoryProducts.map((product) => (
                        <SingleProductCard key={product.productId} {...product} />
                    ))}
                </div>
            </div>

            {/* Uncomment if you want to show similar products */}
            {/*<div className="flex justify-center align-center mt-12 bg-pale-blue dark:bg-slate-700">*/}
            {/*    <div className="m-12 mb-20 max-container max-sm:mt-12">*/}
            {/*        <h2 className="text-2xl font-palanquin font-bold dark:text-slate-200">*/}
            {/*            Similar Products You Might Enjoy*/}
            {/*        </h2>*/}
            {/*        <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4">*/}
            {/*            {categoryProducts.map((product) => (*/}
            {/*                <CategoryCard key={product.productId} {...product} />*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/* Image Gallery Section */}
            {categoryImages.length > 0 && (
                <div className="mt-16">
                    <h1 className="text-3xl text-coral-red font-palanquin font-bold text-center mb-8">{categoryName} Gallery</h1>
                    <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4">
                        {categoryImages.map((image, index) => (
                            <div key={index} className="overflow-hidden">
                                <img src={image} alt={`Category Image ${index + 1}`} className="w-full h-auto object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default SingleCategory;
