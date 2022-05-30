import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup
} from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import Offers from "../index";
import { ERROR_UNAVAILABLE, LOADING_DEFAULT_TEXTS } from "../../../utils/constants";

//api
import { fetchOfferListApi } from "../redux/services";
import fetchMock from "jest-fetch-mock";
import { FETCH_OFFERS } from "../constants";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
afterEach(cleanup);
let offers = {
  isLoading: false,
  error: "",
  offers: [] as {
    id: string;
    name: string;
    image: string;
    price: number;
    currency: string;
  }[],
};
let store = mockStore({
  offers: offers,
});

const mockFetchOffersList = jest.fn();

const generateData = (count: number) => {
  const records = [];

  for (let i = 1; i <= count; i += 1) {
    records.push({
      id: `id-${i}`,
      name: `azhr-${i}`,
      image: `img-${i}`,
      price: i,
      currency: `EUR`,
    });
  }

  return records;
};
describe("test cases for fetchOffersListApi call", () => {
  beforeEach(() => {
    fetchMock.enableMocks();
    fetchMock.resetMocks();
  });

  const mocData = generateData(1);

  it("fetchOffersListApi should return data", async () => {
    let url = FETCH_OFFERS;

    fetchMock.mockResponseOnce(JSON.stringify(mocData));
    const response = await fetchOfferListApi();
    const data = await response.json();

    expect(fetchMock.mock.calls[0][0]).toEqual(url);
    expect(data).toEqual(mocData);
  });

  it("Show loader", async () => {
    offers = { ...offers, isLoading: true };
    store = mockStore({ offers: offers });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Offers />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getByText(LOADING_DEFAULT_TEXTS)).toBeInTheDocument();
  });

  it("Show error if error occurred", () => {
    offers = { ...offers, isLoading: false, error: "some error" };
    store = mockStore({ offers: offers });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Offers />
        </Provider>
      </BrowserRouter>
    );
    const error = screen.getByText(offers.error);
    expect(error).toBeInTheDocument();
  });
  it(`Show ${ERROR_UNAVAILABLE} if offers list empty`, () => {
    offers = { ...offers, isLoading: false, offers: [], error: "" };
    store = mockStore({ offers: offers });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Offers />
        </Provider>
      </BrowserRouter>
    );
    const error = screen.getByText(ERROR_UNAVAILABLE);
    expect(error).toBeInTheDocument();
  });
  it("Load more button in document", () => {
    offers = { ...offers, isLoading: false, offers: [] };
    store = mockStore({ offers: offers });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Offers />
        </Provider>
      </BrowserRouter>
    );
    waitFor(() => expect(screen.getByTestId("btn-loadmore")).toBeInTheDocument());
  });

  it("Load more button should work if offers greater then 8", () => {
    offers = { ...offers, isLoading: false, offers: generateData(10) };
    store = mockStore({ offers: offers });
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Offers />
        </Provider>
      </BrowserRouter>
    );
    waitFor(() => expect(screen.getByTestId("btn-loadmore")).toBeInTheDocument());
    const loadMoreBtn = getByTestId("btn-loadmore");
    fireEvent.click(loadMoreBtn);
  });
  it("Display offers list", async () => {
    const dataCount = 2;
    offers = {
      ...offers,
      isLoading: false,
      offers: generateData(dataCount),
    };
    store = mockStore({ offers: offers });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Offers />
        </Provider>
      </BrowserRouter>
    );
    
    // // find headings
    const cards = screen.getAllByRole("heading");
    expect(cards).toHaveLength(dataCount);
  });
});
