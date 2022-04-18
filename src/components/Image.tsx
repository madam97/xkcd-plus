import React, { useEffect, useRef } from 'react';
import lozad from 'lozad';
import IImage from '../interfaces/IImage';

const eventLazyload = new Event('lazyload');

/** 
 * ImageProps
 * @category Component
 */
type ImageProps = {
  /** The image's data to be displayed */
  img: IImage,
  /** If true, the image appears as an inline block element */
  inline?: boolean
}

/**
 * Displays the given image by using lazy loading the file.
 * @category Component
 * @component
 * @param {ImageProps} props
 * @returns {JSX.Element}
 */
const Image = ({ img, inline = false }: ImageProps): JSX.Element => {

  /** Reference of the img element */
  const refImg = useRef<HTMLImageElement>(null);

  /** Runs the lazy loading */
  useEffect(() => {
    if (refImg && refImg.current) {
      const observer = lozad(refImg.current, {
        loaded: function(imgEl: HTMLImageElement) {
          imgEl.addEventListener('load', () => {
            imgEl.closest('.img-lozad')?.classList.add('img-lozad-loaded');

            imgEl.dispatchEvent(eventLazyload);
          }, { once: true });
        }
      });
      observer.observe();
    }
  }, [refImg]);

  // ---------------------------------------

  return (
    <div className={`img img-lozad ${inline ? 'img-inline' : ''}`}>
      <img ref={refImg} data-src={img.src} alt={img.alt} title={img.title} />
    </div>
  )
}

export default Image;