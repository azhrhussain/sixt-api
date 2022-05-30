import React from "react";
import { Col } from "styled-bootstrap-grid";
import Card from "../../components/Card";
import PlaceHolderImage from "../../assets/images/car-placeholder.png";
import { IOffers } from "../../modules/Offers/types";

const OfferCard = (props: IOffers): JSX.Element => {
    const { id, name, image, price,currency } = props;
    return (
        <Col key={id} alignSelf="stretch" md={6} lg={4} xl={3}>
            <Card>
                <Card.Container>
                    <Card.Header>{name}</Card.Header>
                    <Card.Content>
                        <Card.Thumbnail
                            src={image}
                            alt={name}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = PlaceHolderImage;
                            }}
                        />
                        <Card.Price>
                            {currency === "EUR" ? "€" : currency} {price}
                        </Card.Price>
                    </Card.Content>
                </Card.Container>
            </Card>
        </Col>
    );
};
export default OfferCard;