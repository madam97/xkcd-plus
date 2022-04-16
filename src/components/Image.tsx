import React, { useEffect, useRef } from 'react';
import lozad from 'lozad';

type ImageProps = {
  src: string, 
  alt: string, 
  title: string,
  inline?: boolean
}

export default function Image({ src, alt, title, inline = false }: ImageProps) {

  const refImg = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (refImg && refImg.current) {
      const observer = lozad(refImg.current, {
        loaded: function(img: HTMLImageElement) {
          img.addEventListener('load', () => {
            img.closest('.img-lozad')?.classList.add('img-lozad-loaded');
          }, { once: true });
        }
      });
      observer.observe();
    }
  }, [refImg]);

  // ---------------------------------------

  return (
    <div className={`img img-lozad ${inline ? 'img-inline' : ''}`}>
      <img ref={refImg} data-src={src} alt={alt} title={title} />
    </div>
  )
}