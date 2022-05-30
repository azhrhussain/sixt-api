import React from 'react';
import App from '../routing/Root';
import SiteContainer from '../components/SiteContainer';
import { createGlobalStyle } from 'styled-components';
import { Colors } from "../utils/layout";
import Header from './header';
import { Container } from 'styled-bootstrap-grid';

const GlobalStyle = createGlobalStyle`
@import url("https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap");
  body {
    background-color: ${Colors.bodyBg};
    font-family: "Roboto", sans-serif;
  }
`;
const MainLayout: React.FC = () => (
  <>
    <GlobalStyle />
    <Container>
      <Header />
      <SiteContainer>
        <App />
      </SiteContainer>
    </Container>
  </>
);

export default MainLayout;