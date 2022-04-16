import React, { useEffect, useRef } from 'react';
import { default as MasonryEffect } from 'masonry-layout';

type MasonryProps = {
  children: React.ReactNode[]
}

export default function Masonry({ children }: MasonryProps) {

  const refGrid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refGrid && refGrid.current) {
      const masonry = new MasonryEffect(refGrid.current, {
        itemSelector: '.masonry-grid-item',
        columnWidth: '.masonry-grid-sizer'
      });
    }
  }, [children, refGrid]);


  // ---------------------------------------

  return (
    <div ref={refGrid} className="masonry-grid">
      <div className="masonry-grid-sizer"></div> 
      <div className="masonry-gutter-sizer"></div>

      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          const className = child.props.className ? child.props.className + ' masonry-grid-item' : 'masonry-grid-item';

          return React.cloneElement(child, { ...child.props, className });
        }

        return child;
      })}
    </div>
  )
}