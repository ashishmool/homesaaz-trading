/** @format */

import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { hotelRoom1, hotelRoom2 } from '../assets/images';
import { categories } from '../constants';
import { scrollToId } from '../helpers/scroll';
import Button from '../components/Button';

const slides = [
  {
    id: 'hospitality',
    image: hotelRoom1,
    kicker: 'Hospitality supply',
    title: 'We supply hotels’ needs',
    description:
      'Bedding, linens, towels, bathrobes, flooring, curtains, and fabrics — curated for Nepal’s hospitality industry.',
    primary: { label: 'Explore products', action: 'products' },
    secondary: { label: 'View catalogue', action: 'catalogue' }
  },
  {
    id: 'flooring',
    image: hotelRoom2,
    kicker: 'Flooring & interiors',
    title: 'Surfaces that elevate every space',
    description:
      'SPC and laminate flooring, carpets, and rugs — durable finishes designed for high-traffic commercial environments.',
    primary: { label: 'Browse flooring', action: 'flooring' },
    secondary: { label: 'All products', action: 'products' }
  },
  {
    id: 'brands',
    image: categories.find((c) => c.categoryId === 110)?.imgURL || hotelRoom1,
    kicker: 'Trusted partners',
    title: 'Premium brands. One partner.',
    description:
      'From King Koil to Garware and beyond — quality products backed by local support and reliable delivery.',
    primary: { label: 'See partners', action: 'about' },
    secondary: { label: 'Contact support', action: 'contact' }
  }
];

const Hero = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = slides[index];

  const go = useCallback((next) => {
    setIndex((i) => (next + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return undefined;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;
    const id = setInterval(() => go(index + 1), 6500);
    return () => clearInterval(id);
  }, [go, index, paused]);

  const handleAction = (action) => {
    if (action === 'catalogue') {
      navigate('/catalogue');
      return;
    }
    if (action === 'flooring') {
      navigate('/single_category/110');
      return;
    }
    if (action === 'products') {
      scrollToId('products');
      return;
    }
    if (action === 'about') {
      scrollToId('about');
      return;
    }
    if (action === 'contact') {
      scrollToId('contact-us');
    }
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-surface-muted dark:bg-surface-dark"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative min-h-[min(78vh,640px)] w-full lg:min-h-[min(72vh,620px)]">
        {slides.map((item, i) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-brand ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={i !== index}
          >
            <img
              src={item.image}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/55 to-ink/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/20" />
          </div>
        ))}

        <div className="relative z-10 mx-auto flex min-h-[min(78vh,640px)] max-w-wide flex-col justify-end px-[var(--gutter)] pb-14 pt-28 lg:min-h-[min(72vh,620px)] lg:justify-center lg:pb-20 lg:pt-24">
          <div className="max-w-xl animate-fade-up text-white" key={slide.id}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              {slide.kicker}
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {slide.title}
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
              {slide.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button onClick={() => handleAction(slide.primary.action)} className="inline-flex items-center gap-2">
                {slide.primary.label}
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button variant="onDark" onClick={() => handleAction(slide.secondary.action)}>
                {slide.secondary.label}
              </Button>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between gap-4 lg:mt-14">
            <div className="flex items-center gap-2" role="tablist" aria-label="Hero slides">
              {slides.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 overflow-hidden rounded-full transition-all duration-brand ${
                    i === index ? 'w-10 bg-white' : 'w-5 bg-white/35 hover:bg-white/60'
                  }`}
                  onClick={() => setIndex(i)}
                >
                  {i === index && !paused && (
                    <span className="block h-full origin-left animate-[progress_6.5s_linear] bg-brand" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-brand border border-white/25 text-white transition hover:border-white hover:bg-white/10"
                aria-label="Previous slide"
                onClick={() => go(index - 1)}
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-brand border border-white/25 text-white transition hover:border-white hover:bg-white/10"
                aria-label="Next slide"
                onClick={() => go(index + 1)}
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
