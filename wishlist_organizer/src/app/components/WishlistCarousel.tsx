'use client'

import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

type WishlistItem = {
  id: string;
  name: string;
  description?: string | null;
  link?: string | null;
  image_url?: string | null;
  price?: number | null;
};

type PropType = {
  items: WishlistItem[];
  shelfTitle: string;
  options?: EmblaOptionsType;
}

const WishlistCarousel: React.FC<PropType> = ({ items, shelfTitle, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    align: 'start',
    containScroll: 'trimSnaps',
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  
  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    const handleResize = () => {
      emblaApi.reInit();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [emblaApi, onSelect]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!emblaApi) return;
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        scrollPrev();
        break;
      case 'ArrowRight':
        e.preventDefault();
        scrollNext();
        break;
      case 'Home':
        e.preventDefault();
        emblaApi.scrollTo(0);
        break;
      case 'End':
        e.preventDefault();
        emblaApi.scrollTo(scrollSnaps.length - 1);
        break;
    }
  }, [emblaApi, scrollPrev, scrollNext, scrollSnaps]);

  if (!items || items.length === 0) {
    return (
      <div className="py-4">
        <p className="text-secondary_text">This wishlist is empty.</p>
      </div>
    );
  }

  const startItem = selectedIndex + 1;

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${shelfTitle}, carousel`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {items.map((item) => (
            <div className="flex-grow-0 flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 pl-4" key={item.id}>
              <div className="bg-midnight_blue p-4 rounded-lg h-full flex flex-col">
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={item.image_url || '/placeholder.webp'}
                    alt={item.name}
                    layout="fill"
                    objectFit="contain"
                    className="rounded"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-medium text-primary_text flex-grow">{item.name}</h3>
                {item.price && (
                  <p className="text-sm text-secondary_text">${item.price.toFixed(2)}</p>
                )}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bone hover:underline mt-2 text-sm rounded-md bg-slate_gray/50 p-2 w-fit"
                    tabIndex={-1} // Items inside are not tabbable individually
                  >
                    View Item
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between gap-4 mt-4">
        <button
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
          className="w-10 h-10 rounded-full bg-washed_gray/50 hover:bg-washed_gray/80 disabled:opacity-50 transition flex items-center justify-center text-white"
          aria-label={`Previous items in ${shelfTitle}`}
        >
          <ChevronLeft size={24} />
        </button>

        <div className="text-sm text-white" aria-live="polite">
          Item {startItem} of {items.length}
        </div>
        
        <button
          onClick={scrollNext}
          disabled={nextBtnDisabled}
          className="w-10 h-10 rounded-full bg-washed_gray/50 hover:bg-washed_gray/80 disabled:opacity-50 transition flex items-center justify-center text-white"
          aria-label={`Next items in ${shelfTitle}`}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default WishlistCarousel;
