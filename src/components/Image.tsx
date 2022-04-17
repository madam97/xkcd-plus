import React, { useEffect, useRef } from 'react';
import lozad from 'lozad';
import IImage from '../interfaces/IImage';

const eventLazyload = new Event('lazyload');

type ImageProps = {
  img: IImage,
  inline?: boolean
}

export default function Image({ img, inline = false }: ImageProps) {

  const refImg = useRef<HTMLImageElement>(null);

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