import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar, { IProps } from './navbar';
import { NextRouter, useRouter } from 'next/router';

jest.mock('next/router');

const DEFAULT_PROPS: IProps = {
    dark: false,
    onThemeChanged: jest.fn(),
};

const mockRouter: NextRouter = {
    basePath: '',
    pathname: '/',
    route: '/',
    asPath: '/',
    query: {},
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
    },
    isFallback: false,
} as any;

const mockedUseRouter: jest.Mock = useRouter as any;
mockedUseRouter.mockImplementation(() => mockRouter);

const renderComponent = (props = {}) => {
    return {
        ...render(<Navbar {...DEFAULT_PROPS} {...props} />),
        props: {
            ...DEFAULT_PROPS,
            ...props,
        },
    };
};

test('Search value correctly submitted', async () => {
    renderComponent();

    const search = screen.getByRole('search');

    userEvent.type(search, 't');
    userEvent.type(search, 'e');
    userEvent.type(search, 's');
    userEvent.type(search, 't');
    userEvent.type(search, '{enter}');
    await waitFor(() => {
        expect(mockRouter.push).toBeCalled();
        expect(mockRouter.push).toBeCalledTimes(1);
        expect(mockRouter.push).lastCalledWith('/?s=test');
    });
});

test('Theme changed fires on toggle', async () => {
    renderComponent();
    userEvent.click(screen.getByRole('switch'));
    await waitFor(() => {
        expect(DEFAULT_PROPS.onThemeChanged).toBeCalled();
        expect(DEFAULT_PROPS.onThemeChanged).toBeCalledTimes(1);
    });
});
