// MiscCards.tsx
'use client';
import { useState, useEffect, ReactElement, useRef } from 'react';

interface MiscCardProps {
  opacity: number;
}

const MiscCard = ({ opacity }: MiscCardProps): ReactElement => (
  <div className={`text-primary_text font-raleway flex flex-col rounded-md bg-dark_gray w-full p-[10px] gap-y-[5px]`} 
       style={{ opacity }}>
    <h1 className='text-s'>Item Name</h1>
    <p className='text-[10px]'>Brand/Store</p>
    <p className='text-[10px]'>Describe it!</p>
  </div>
);

const useCardCount = (): number => {
  const [cardCount, setCardCount] = useState<number>(9);

  useEffect(() => {
    const calculateCardCount = (): void => {
      const screenHeight = window.innerHeight;
      const cardHeight = 100;
      const visibleCards = Math.floor(screenHeight / cardHeight);
      setCardCount(visibleCards + 4);
    };

    calculateCardCount();
    window.addEventListener('resize', calculateCardCount);
    return () => window.removeEventListener('resize', calculateCardCount);
  }, []);

  return cardCount;
};

export default function MiscCards(): ReactElement {
    const cardCount = useCardCount();
    const containerRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.scrollHeight;
        const middlePosition = (containerHeight - window.innerHeight) / 2;
        containerRef.current.scrollTop = middlePosition;
      }
    }, [cardCount]); // Re-run when cardCount changes
  
    const generateCards = (count: number): ReactElement[] => {
      const cards: ReactElement[] = [];
      const midPoint = Math.floor(count / 2);
      
      for (let i = 0; i < count; i++) {
        const distanceFromMiddle = Math.abs(i - midPoint);
        const maxDistance = midPoint;
        const opacity = 1 - (distanceFromMiddle / maxDistance * 0.6);
        
        cards.push(
          <MiscCard key={i} opacity={opacity} />
        );
      }
      return cards;
    };
  
    return (
      <div className='hidden md:flex flex-col bg-washed_gray w-[434px] max-w-[434px] h-screen overflow-hidden'>
        <div 
          ref={containerRef}
          className='flex flex-col gap-y-[26px] px-[20px] h-full overflow-y-auto scroll-smooth scrollbar-hide'
        >
          {generateCards(cardCount)}
        </div>
      </div>
    );
  }