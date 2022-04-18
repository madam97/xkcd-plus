import React, { useEffect, useRef } from 'react';
import { default as MasonryEffect } from 'masonry-layout';

/** 
 * MasonryProps
 * @category Component
 */
type MasonryProps = {
  /** If true, after the lazy loading image the masonry layout will update */
  listenLazyLoad?: boolean,
  /** The masonry items */
  children: React.ReactNode[]
}

/**
 * Set masonry effect onto the child items so they will change position depending on the items or the window size, but keep a given gap between each other
 * @category Component
 * @component
 * @param {MasonryProps} props
 * @returns {JSX.Element}
 */
const Masonry = ({ listenLazyLoad = false, children }: MasonryProps): JSX.Element => {

  /** Reference of the masonry grid container */
  const refGrid = useRef<HTMLDivElement>(null);

  /** Start the masonry effect, and if needed after lazy loading changed the layout of the masonry grid */
  useEffect(() => {
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
  }, [children, refGrid, listenLazyLoad]);


  // ---------------------------------------

  return (
    <div ref={refGrid} data-testid="masonry-grid" className="masonry-grid">
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

export default Masonry;