import { useParams } from 'react-router-dom';
import { products, categories } from '../constants'; // Assuming you have products and categories in constants.
import SingleProductCard from './SingleProductCard.jsx';

const SingleProduct = () => {
    const { productId } = useParams(); // Get productId from the URL.

    // Find the product by productId from the products array.
    const product = products.find((p) => p.productId === parseInt(productId));

    // Find the corresponding category by categoryId from the categories array.
    const category = product ? categories.find((c) => c.categoryId === product.categoryId) : null;

    return (

        <div className="flex justify-center mt-20">
            {product ? (
                <SingleProductCard
                    productId={product.productId}
                    imgURL={category?.imgURL} // Use category's imgURL for the product image
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    description={product.description}
                    dimensions={product.dimensions}
                    color={product.color}
                    category={category ? category.category : 'Unknown Category'} // Display the category name
                />
            ) : (
                <p>Product not found</p> // Fallback if productId is invalid.
            )}
        </div>
    );
};

export default SingleProduct;
