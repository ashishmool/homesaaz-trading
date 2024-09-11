import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { star } from '../assets/icons'; // Assuming the star icon is in assets/icons

const SingleProductCard = ({ productId, imgURL, name, price, rating = 4.5, description }) => {
  const addToCart = () => {
    // Check if there is already a cart in local storage
    const existingCart = localStorage.getItem('cart');

    // Parse the existing cart or create an empty object if it doesn't exist
    const cart = existingCart ? JSON.parse(existingCart) : {};

    // If the product already exists, increase quantity
    if (cart[productId] && cart[productId].quantity > 0) {
      cart[productId].quantity++;
    } else {
      cart[productId] = { name, price, imgURL, quantity: 1 };
    }

    // Store the updated cart back in local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart successfully');
  };

  return (
      <div
          id={productId}
          className="relative flex flex-row flex-wrap justify-between w-full max-sm:w-full rounded-lg p-4 shadow-lg dark:bg-slate-800 gap-10"
      >
        {/* Product Image */}
        <div className="flex justify-center w-full mt-6">
          <img src={imgURL} alt={`${name}-product`} height={282} className="rounded-lg text-center" />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center w-full">
          {/* Rating */}
          <div className="mt-4 flex items-center">
            <img src={star} alt="rating" height={24} width={24} className="mr-2" />
            <p className="font-montserrat sm:text-lg leading-normal text-slate-gray dark:text-gray-300">{rating}</p>
          </div>

          {/* Product Name */}
          <h3 className="mt-2 text-xl sm:text-2xl leading-normal font-semibold font-palanquin">{name}</h3>

          {/* Product Price */}
          <div className="flex justify-between items-center">
            <p className="mt-2 sm:text-xl leading-normal font-semibold font-montserrat text-coral-red">
              ${price.toFixed(2)}
            </p>
            {/* Add to Cart Button */}
            <ShoppingCartIcon
                onClick={addToCart}
                className="h-8 w-8 md:h-10 md:w-10 transition duration-300 cursor-pointer text-slate-gray dark:text-coral-red hover:scale-125"
            />
          </div>

          {/* Product Description */}
          <p className="mt-4 text-sm leading-normal text-slate-gray dark:text-gray-300">{description}</p>

          {/* Buy Now Button */}
          <button className="buy-now-button mt-10 font-semibold font-montserrat">Buy Now</button>
        </div>
      </div>
  );
};

export default SingleProductCard;
