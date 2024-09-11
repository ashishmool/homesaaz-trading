import { useParams } from 'react-router-dom';
import { products } from '../constants'; // Assuming you have the products array in constants.
import SingleProductCard from './SingleProductCard.jsx';

const SingleProduct = () => {
    const { productId } = useParams(); // This will get the productId from the URL.

    // Find the product by productId from the products array
    const product = products.find((p) => p.productId === parseInt(productId));

    return (
        <div className="flex justify-center mt-20">
            {product ? (
                <SingleProductCard
                    productId={product.productId}
                    imgURL={product.imgURL}
                    name={product.name}
                    price={product.price}
                />
            ) : (
                <p>Product not found</p> // Fallback in case the productId is invalid
            )}
        </div>
    );
};

export default SingleProduct;
