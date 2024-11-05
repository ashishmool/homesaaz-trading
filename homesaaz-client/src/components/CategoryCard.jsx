import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

const CategoryCard = ({ categoryId, imgURL, brand, description, category }) => {


  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/single_category/${id}`);
  };

  return (
    <div
      id={categoryId}
      className="relative flex flex-col w-full max-sm:w-full hover:scale-105 duration-300 ease-in-out rounded-lg p-4 shadow-lg dark:bg-slate-800 justify-center items-center"
    >
      <img
        src={imgURL}
        alt={`${brand}-product`}
        height={282}
        className="rounded-lg text-center cursor-pointer"
        onClick={() => handleClick(categoryId)}
      />

      <div className="mt-4 flex items-center">
        <p className="font-montserrat sm:text-lg leading-normal text-slate-gray dark:text-gray-300">{category}</p>
      </div>


      <div className="flex justify-between items-center">
        <p className="mt-2 sm:text-sm leading-normal font-semibold font-montserrat text-coral-red">
          {description}
        </p>

      </div>
      {/*<div*/}
      {/*    className="mt-2 text-sm sm:text-2sm leading-normal font-semibold font-palanquin cursor-pointer"*/}
      {/*    onClick={() => handleClick(categoryId)}*/}
      {/*>*/}
      {/*  {brand}*/}
      {/*</div>*/}
    </div>
  );
};

const TickMark = () => {
  return (
    <>
      <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fill="rgb(255 100 82 )"
        fillRule="evenodd"
        clipRule="evenodd"
      >
        <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm7 7.457l-9.005 9.565-4.995-5.865.761-.649 4.271 5.016 8.24-8.752.728.685z" />
      </svg>
      &nbsp; Added to Cart
    </>
  );
};

export default CategoryCard;
