import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from './Footer';

describe('<Footer/>', () => {
  test('should renders <Foote/>r component correctly', () => {
    render(<Footer />);

    const logo = screen.getByAltText('Footer Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'JET-Logo-White-Primary-Hor-RGB 1.png');

    expect(screen.getByText('Cookie statement')).toBeInTheDocument();

    expect(screen.getByText('© 2024 Takeaway.com')).toBeInTheDocument();
  });
});
