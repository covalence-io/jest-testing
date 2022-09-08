import React from 'react';
import { render, screen } from '@testing-library/react';
import List, { IProps } from './list';

const DEFAULT_PROPS: IProps = {
    posts: [],
};

const renderComponent = (props = {}) => {
    return {
        ...render(<List {...DEFAULT_PROPS} {...props} />),
        props: {
            ...DEFAULT_PROPS,
            ...props,
        },
    };
};

test('No posts are rendered with empty array', () => {
    renderComponent();
    expect(screen.getByTestId('none')).toBeInTheDocument();
});

test('No posts are rendered with null', () => {
    renderComponent({ posts: null });
    expect(screen.getByTestId('none')).toBeInTheDocument();
});

test('Posts are rendered correctly', () => {
    renderComponent({
        posts: [{
            kind: 't3',
            data: {
                id: 'p9382j',
            },
        }, {
            kind: 't3',
            data: {
                id: 'p9382r',
            },
        }, {
            kind: 't3',
            data: {
                id: 'p9382a',
            },
        }],
    });

    const list = screen.getByTestId('list')
    expect(list).toBeInTheDocument();
    expect(list.children).toHaveLength(3);
});