import React, { useEffect, useRef } from 'react';
import { default as MasonryEffect } from 'masonry-layout';
import lozad from 'lozad';

type MasonryProps = {
  lazyLoad?: boolean,
  children: React.ReactNode[]
}

export default function Masonry({ lazyLoad = false, children }: MasonryProps) {

  const refGrid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refGrid && refGrid.current) {
      const masonry = new MasonryEffect(refGrid.current, {
        itemSelector: '.masonry-grid-item',
        columnWidth: '.masonry-grid-sizer'
      });

      // Lazy loading images
      if (lazyLoad) {
        const imgs = refGrid.current.querySelectorAll('.img-lozad>img');

        const observer = lozad(imgs, {
          loaded: function(img: HTMLImageElement) {
            img.addEventListener('load', () => {
              img.closest('.img-lozad')?.classList.add('img-lozad-loaded');
              
              if (masonry.layout) {
                masonry.layout();
              }
            }, { once: true });
          }
        });
        observer.observe();
      }
    }
  }, [children, refGrid, lazyLoad]);


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