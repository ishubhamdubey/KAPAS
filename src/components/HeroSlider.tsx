import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Slide = {
  image: string;
  fit?: 'contain' | 'cover';
  scaleClass?: string; // Tailwind scale utilities, e.g., 'scale-110 md:scale-[1.15]'
  bgClass?: string; // Container background, e.g., 'bg-white' (no longer used)
  positionClass?: string; // Object position, e.g., 'object-center'
  linkTo?: string; // route to navigate when clicked, e.g., '/category/frock'
  // title?: string;
  // subtitle?: string;
};

const slides: Slide[] = [
  {
    // title: 'New Festive Collection Out Now!',
    // subtitle: 'Trendy, Comfy, and Elegant — Just Like You',
  image: encodeURI('images/heroslider1.jpg'),
    fit: 'contain',
    scaleClass: 'scale-100 md:scale-[1.0]',
    bgClass: 'bg-[#F2EFFA]',
    positionClass: 'object-center',
  linkTo: '/category/long_kurti',

  },
  {
    // title: 'Embrace Traditional Elegance',
    // subtitle: 'Handpicked Designs for Every Occasion',
  image: encodeURI('images/heroslider2.jpg'),
    fit: 'cover',
    scaleClass: 'scale-[0.90] md:scale-[1.0]',
    // Nudge focus upward (show more top). Lower than 50% moves crop window up.
    positionClass: 'object-[50%_40%] md:object-[50%_35%]',
  linkTo: '/category/backless',

  },
  {
    // title: 'Express Your Style',
    // subtitle: 'Premium Fabrics, Timeless Designs',
  image: encodeURI('images/heroslider3.jpg'),
    fit: 'contain',
    scaleClass: 'scale-105 md:scale-[1.0]',
    bgClass: 'bg-[#F2EFFA]',
    positionClass: 'object-center',
    linkTo: '/category/short_kurti',
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // const scrollToNewArrivals = () => {
  //   const element = document.getElementById('new-arrivals');
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };

  return (
    <section id="hero" className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className={`w-full h-full relative ${slide.bgClass ?? ''}`}>
            {slide.linkTo ? (
              <Link to={slide.linkTo} className="absolute inset-0 block cursor-pointer" aria-label="Browse related products">
                <img
                  src={slide.image}
                  alt="Hero slide"
                  className={`w-full h-full ${
                    slide.fit === 'contain' ? 'object-contain' : 'object-cover'
                  } ${slide.positionClass ?? 'object-center'} ${slide.scaleClass ?? ''} transition-transform duration-500`}
                />
              </Link>
            ) : (
              <img
                src={slide.image}
                alt="Hero slide"
                className={`absolute inset-0 w-full h-full ${
                  slide.fit === 'contain' ? 'object-contain' : 'object-cover'
                } ${slide.positionClass ?? 'object-center'} ${slide.scaleClass ?? ''} transition-transform duration-500`}
              />
            )}
            {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}
            {/*
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4 max-w-4xl">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-2xl mb-8 animate-fade-in-delay">
                  {slide.subtitle}
                </p>
                <button
                  onClick={scrollToNewArrivals}
                  className="bg-[#ff6b81] hover:bg-[#ff8fa3] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                >
                  Shop Now
                </button>
              </div>
            </div>
            */}
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-3 rounded-full transition-all z-10"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-3 rounded-full transition-all z-10"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
