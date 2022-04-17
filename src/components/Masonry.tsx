import React, { useCallback, useEffect, useRef } from 'react';
import { default as MasonryEffect } from 'masonry-layout';

type MasonryProps = {
  listenLazyLoad?: boolean,
  children: React.ReactNode[]
}

export default function Masonry({ listenLazyLoad = false, children }: MasonryProps) {

  const refGrid = useRef<HTMLDivElement>(null);

  /**
   * Start the masonry effect, and if needed after lazy loading changed the layout of the masonry grid
   */
  const runMasonry = useCallback(() => {
    if (refGrid && refGrid.current) {
      const masonry = new MasonryEffect(refGrid.current, {
        itemSelector: '.masonry-grid-item',
        columnWidth: '.masonry-grid-sizer'
      });

      if (listenLazyLoad) {
        const imgs = refGrid.current.querySelectorAll('.img-lozad>img');

        imgs.forEach(img => {
          img.addEventListener('lazyload', () => {
            if (masonry.layout) {
              masonry.layout();
            }
          }, { once: true });
        });
      }
    }
  }, [refGrid, listenLazyLoad]);

  useEffect(() => {
    runMasonry();
  }, [runMasonry]);


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