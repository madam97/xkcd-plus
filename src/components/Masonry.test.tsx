import React from 'react';
import { render, screen } from '@testing-library/react';
import Masonry from './Masonry';

let container: HTMLElement;
const itemCount = 3;

beforeEach(() => {
  const children: React.ReactNode[] = [];
  for (let i = 0; i < itemCount; ++i) {
    children.push(<div key={i}>item</div>);
  }

  render(<Masonry>{children}</Masonry>);

  container = screen.getByTestId('masonry-grid');
});

describe('Masonry component', () => {

  test('renders container, grid and gutter sizers then add necessary classes to them', () => {
    expect( container.classList.contains('masonry-grid') ).toBe(true);
    expect( container.children[0].classList.contains('masonry-grid-sizer') ).toBe(true);
    expect( container.children[1].classList.contains('masonry-gutter-sizer') ).toBe(true);
  });

  test('renders items then add necessary class to them', () => {
    expect( container.children.length ).toBe(2 + itemCount);

    for (let i = 0; i < itemCount; ++i) {
      expect( container.children[2 + i].classList.contains('masonry-grid-item') ).toBe(true);
    }
  });

});