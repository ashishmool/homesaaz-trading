import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ categoryId, imgURL, brand, category }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/single_category/${id}`);
  };

  return (
    <div
      id={categoryId}
      className="relative flex w-full flex-col items-center justify-center rounded-lg p-4 shadow-lg transition duration-300 ease-in-out hover:scale-105 dark:bg-slate-800 max-sm:w-full"
    >
      <img
        src={imgURL}
        alt={`${brand || category}-product`}
        height={282}
        className="cursor-pointer rounded-lg text-center"
        onClick={() => handleClick(categoryId)}
      />

      <div className="mt-4 flex items-center">
        <p className="font-montserrat leading-normal text-slate-gray dark:text-gray-300 sm:text-lg">
          {category}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
