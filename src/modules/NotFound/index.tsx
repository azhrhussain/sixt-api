import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "styled-bootstrap-grid";
import styled from "styled-components";

const NotFound: React.FC = () => {
  const Content = styled.div`
  text-align:center;
  padding: 1rem;
`;
  return (
    <Container>
      <Row justifyContent="center">
        <Col lg={6}>
          <Content>
            <h1>404 - Not Found!</h1>
            <Link to="/">Go Offer Listing</Link>
          </Content>
        </Col>
      </Row>
    </Container>
  );
}
export default NotFound;
