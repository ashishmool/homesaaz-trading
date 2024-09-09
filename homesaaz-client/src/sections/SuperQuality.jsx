import {shoe8, springtekRollaway1} from '../assets/images';
import Button from '../components/Button';

const SuperQuality = () => {
  return (
    <section className="padding">
      <div id="about-us" className="max-container max-sm:mt-12 flex justify-between  max-lg:flex-col gap-10 w-full">
        <div className="flex flex-1 flex-col">
          <h2 className="font-palanquin text-4xl capitalize font-bold lg:max-w-lg">
            We Provide You{' '}
            <span className="text-coral-red">
              Super <br /> Quality{' '}
            </span>
            Hospitality Products
          </h2>
          <p className="mt-4 lg:max-w-lg info-text dark:text-gray-400">
            Ensuring premium comfort and durability, out products are designed to elevate your
            experience, providing you with unmatched quality, innovation, and a touch of elegance in the hospitality industry.
          </p>
          <p className="mt-6 lg:max-w-lg info-text dark:text-gray-400">
            Our dedication to detail and excellence ensures your satisfaction
          </p>
          <div className="mt-11">
            <Button>View Details</Button>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <img
            src={springtekRollaway1}
            alt="shoe"
            width={570}
            height={522}
            className="object-contain drop-shadow-xl hover:skew-y-3 duration-500 ease-in-out"
          />
        </div>
      </div>
    </section>
  );
};

export default SuperQuality;
