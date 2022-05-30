import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from 'redux';
import { Col, Row } from 'styled-bootstrap-grid';

import { fetchOffers } from "./redux/actions";
import { IOffersState } from "./types";
import { IRootState } from "../../utils/types";

import OfferCard from '../../components/OfferCard';
import Button from '../../components/Button';
import Loader from '../../components/LoaderCard';
import ErrorCard from '../../components/ErrorCard';
import { ERROR_UNAVAILABLE } from '../../utils/constants';


const Offers = (): JSX.Element => {
    const dispatch: Dispatch<any> = useDispatch();
    const offersData = useSelector<IRootState>((state) => state.offers) as IOffersState;
    const { isLoading, offers, error } = offersData;
    const [loadMore, setLoadMore] = useState(8);

    useEffect(() => {
        dispatch(fetchOffers());
    }, []);


    return (
        <>
            {isLoading ? (
                <Loader data-testid="loader" />
            ) : (
                <Row data-testid="offers-list-container">
                    {offers.slice(0, loadMore).map((offer: any) => {
                        return (
                            <OfferCard
                                data-testid="offer-list-card"
                                key={offer.id}
                                {...offer}
                            />
                        )
                    })}
                </Row>)}
            {!isLoading && !error && !offers.length &&(<ErrorCard
                    data-testid="offer-list-nodata"
                    size="2"
                    errorText={ERROR_UNAVAILABLE}
                />)}
            {loadMore < offers.length && (
                <Row justifyContent="center" alignItems='center'>
                    <Col md={3}>
                        <Button data-testid="btn-loadmore" primary
                            onClick={() => {
                                setLoadMore(loadMore + 8);
                            }}
                        >
                            Load more
                        </Button>
                    </Col>
                </Row>
            )}

            {!isLoading && error ? (
                <ErrorCard
                    data-testid="offer-list-error"
                    size="2"
                    errorText={error}
                />
            ) : null}


        </>
    );
}

export default Offers;