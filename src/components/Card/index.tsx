import React from "react";
import styled from "styled-components";
import { Colors, spacing } from "../../utils/layout";

const CardBody = styled.div`
  margin: ${spacing(3)}px 0;
  height: 100%;
  
`;

const Header = styled.h3`
  font-weight: 500;
  font-size: 1rem;
  background-color: ${Colors.bodyBg};
  padding: 0.5rem;
  margin: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${spacing(2)}px;
`;
const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;
const Container = styled.div`
  border: 1px solid ${Colors.borderPrimary};
  transition: box-shadow 0.3s ease-in-out;
  background-color: white;
  text-align: center;
  cursor: pointer;
  padding: ${spacing(3)}px;
  height: calc(100% - 30px);
  margin: 15px 0;
  &:hover {
    box-shadow: 0 0 7px 1px rgb(0 0 0 / 10%);
  }
`;

const Thumbnail = styled.img`
  max-width: 100%;
  margin: 1rem auto;
`;
interface CardProps {
  children: any;
}
const Card = ({ children, ...rest }: CardProps): JSX.Element => {
  return <CardBody {...rest}>{children}</CardBody>;
};
Card.Container = Container;
Card.Header = Header;
Card.Content = Content;
Card.Price = Price;
Card.Thumbnail = Thumbnail;

export default Card;
