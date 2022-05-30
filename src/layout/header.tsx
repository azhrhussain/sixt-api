import React from 'react';
import styled from "styled-components";
import { Colors } from '../utils/layout';

const Header: React.FC = () => {
    const Title = styled.h1`
        font-size: 1.5em;
        text-align: center;
        color: inherit;
    `;
    const Header = styled.header`
        background-color: ${Colors.primary};
        color: ${Colors.textPrimary};
        padding: 1rem;
    `;
    return (
        <Header>
            <Title>Offers List</Title>
        </Header>
    );
}
export default Header;