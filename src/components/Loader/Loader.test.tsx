import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Loader from './Loader';

describe('<Loader/>', () => {
    it('should render <Loader/> component with default tip', () => {
        render(<Loader />);

        const spin = screen.getByTestId('spin-loader');
        expect(spin).toBeInTheDocument();

        const content = screen.queryByTestId('loading-content');
        expect(content).not.toBeInTheDocument();
    });

    it('should renders <Loader/> component with a tip', () => {
        const tip = "Loading... Please wait.";
        render(<Loader tip={tip} />);

        const spin = screen.getByTestId('spin-loader');
        expect(spin).toBeInTheDocument();
        expect(screen.getByText(tip)).toBeInTheDocument();

        const content = screen.getByTestId('loading-content');
        expect(content).toBeInTheDocument();
    });
});
