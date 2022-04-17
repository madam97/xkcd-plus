import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Image from './Image';

describe('Image component', () => {

  test('renders successfully', () => {
    render(<Image img={{ src: "/public/logo512.png", alt: "Website logo", title: "Website logo" }} />);
  
    const imgContainer = screen.getByAltText<HTMLImageElement>('Website logo').parentElement;
    expect(imgContainer).toBeInTheDocument();
  });

  test('has loaded class after lazy loading', () => {
    render(<Image img={{ src: "/public/logo512.png", alt: "Website logo", title: "Website logo" }} />);
  
    const img = screen.getByAltText<HTMLImageElement>('Website logo');

    fireEvent.load(img);

    expect(img.parentElement).toHaveClass('img-lozad-loaded');
  });

  test('should have inline class', () => {
    render(<Image img={{ src: "/public/logo512.png", alt: "Website logo", title: "Website logo" }} inline={true} />);
  
    const imgContainer = screen.getByAltText<HTMLImageElement>('Website logo').parentElement;
  
    expect(imgContainer).toHaveClass('img-inline');
  });

})