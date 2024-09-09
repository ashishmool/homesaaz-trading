/** @format */

import Button from '../components/Button';
import { arrowRight } from '../assets/icons';
import { shoes, statistics } from '../constants';
import { hotelRoom1 } from '../assets/images';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const formatNumber = (number) => {
  if (number < 1000) {
    return number;
  } else {
    return Math.floor(number / 1000) + 'k';
  }
};

const Hero = () => {
  const [hotelRoomImg, setHotelRoomImg] = useState(hotelRoom1);
  const navigate = useNavigate();

  const [animatedStatistics, setAnimatedStatistics] = useState({
    brands: 0,
    shops: 0,
    customers: 0
  });

  useEffect(() => {
    const animationDuration = 2500;
    const targetStatistics = {
      brands: 30,
      shops: 500,
      customers: 250000
    };

    const stepDuration = animationDuration / 100;

    const updateStatistics = (currentStep) => {
      if (currentStep >= 100) {
        setAnimatedStatistics(targetStatistics);
      } else {
        setTimeout(() => {
          const percentage = (currentStep + 1) / 100;
          setAnimatedStatistics({
            brands: Math.floor(percentage * targetStatistics.brands),
            shops: Math.floor(percentage * targetStatistics.shops),
            customers: Math.floor(percentage * targetStatistics.customers)
          });
          updateStatistics(currentStep + 1);
        }, stepDuration);
      }
    };

    updateStatistics(0);
  }, []);

  return (
      <section className="xl:padding-l wide:padding-r padding-b pt-0 relative z-0">
        {/* Added pt-32 for spacing and z-0 for positioning */}
        <div id="home" className="w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container relative z-10">
          {/* z-10 ensures this section stays above the background, but under the navbar */}
          <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x pt-32">
            {/* Increased pt-32 for more spacing below the navbar */}
            <h1 className="mt-5 font-palanquin text-8xl max-sm:text-[72px] max-sm:leading-[110px] font-bold">
        <span className="block xl:whitespace-nowrap relative z-10 pr-10 xl:pl-6 dark:xl:bg-slate-gray duration-400 rounded-lg">
          We Supply
        </span>
              <span className="block text-coral-red mt-6 xl:mt-0">Hotels' Needs</span>
            </h1>
            <p className="font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-14 sm:max-w-sm dark:text-gray-400">
              At Homesaaz, we provide everything you need, from bedding and linens to towels, bathrobes, flooring, curtains, fabrics, and upholstery. We cover it all with care and style.
            </p>
            <Button icon={arrowRight} onClick={() => navigate('/#products')}>
              Explore Product Range
            </Button>
            <div className="flex md:justify-start flex-wrap items-start w-full mt-20 gap-16 justify-center">
              {statistics.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-4xl font-palanquin font-bold">
                      {formatNumber(animatedStatistics[stat.label.toLowerCase()])}+
                    </p>
                    <p className="leading-7 font-montserrat text-slate-gray dark:text-gray-400">{stat.label}</p>
                  </div>
              ))}
            </div>
          </div>
          <div className="relative flex flex-1 justify-center items-center h-[1050px] max-h-[850px] bg-primary bg-hero bg-cover bg-center">
            <img
                src={hotelRoomImg}
                alt="room"
                className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
  );
};

export default Hero;
