import React from 'react';
import { Flex, Spin } from 'antd';

type LoadingProps = {
    tip?: string;
}

const contentStyle: React.CSSProperties = {
    padding: 50,
    borderRadius: 4,
};

const Loader: React.FC<LoadingProps> = ({ tip = "" }) => {
    const content = <div data-testid="loading-content" style={contentStyle}></div>;

    return (
        <span data-testid="spin-loader">
        <Flex gap="small" vertical>
            <Spin tip={tip} size="large" >
                {tip ? content : ''}
            </Spin>
        </Flex>
            </span>
    );
};

export default Loader;
