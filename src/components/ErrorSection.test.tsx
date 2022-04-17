import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ErrorSection from './ErrorSection';

describe('ErrorSection component', () => {

  test('renders message', () => {
    render(<ErrorSection msg="error message" />);
  
    const msg = screen.getByText(/error message/i);
    expect(msg).toBeInTheDocument();
  });

  test('renders main title and subtitle', () => {
    render(<ErrorSection title="error main title" subtitle="error subtitle" msg="error message" />);
  
    const title = screen.getByText(/error main title/i);
    expect(title).toBeInTheDocument();

    const subtitle = screen.getByText(/error subtitle/i);
    expect(subtitle).toBeInTheDocument();
  });

  test('renders child element', () => {
    render(<ErrorSection msg="error message"><p>the child</p></ErrorSection>);
  
    const child = screen.getByText(/the child/i);
    expect(child).toBeInTheDocument();
  });

  test('renders more child elements', () => {
    render(<ErrorSection msg="error message"><p>a child</p><p>a child</p><p>a child</p></ErrorSection>);
  
    const children = screen.getAllByText(/a child/i);
    expect(children.length).toBe(3);
  });

})