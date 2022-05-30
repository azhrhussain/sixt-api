
import { normalizeError, normalizeOfferDataResponse } from "../helper";
import { ERROR_UNAVAILABLE, ERROR_WITH_STATUS } from './../constants';

describe("helper functions", () => {

  //Error with helper text for unhandled errors
  it("Should return an error text", () => {
    //show error message
    let data = { message: "unhandled error" }
    let status = 404;
    const error = normalizeError(data, status);

    expect(error).toBe(data.message);

    //if (status === 200) and message not found
    data = { message: "" }
    status = 200;
    expect(normalizeError(data, status)).toBe(ERROR_UNAVAILABLE);

    //error with status code
    data = { message: "" }
    status = 500;
    const errorText = ERROR_WITH_STATUS.replace(':status', status.toString())
    expect(normalizeError(data, status)).toBe(errorText);

    //fallback error message
    expect(normalizeError({}, 0)).toBe(ERROR_UNAVAILABLE);
  });
  // normalizeOfferDataResponse
  it('Should return normalizeOfferDataResponse', () => {

    const mockUserData = {
      offers: [
        {
          id: "SDMR",
          carGroupInfo: {
            bodyStyleKey: "Limousine",
            modelExample: {
              name: "Audi",
              imageUrl: "//fileadmin/files/global/user_upload/fleet/png/350x200/audi-a3-limousine-4d-blau-2020.png"
            },
          },
          prices: {
            totalPrice: {
              amount: {
                value: 200,
                display: "200",
                currency: "EUR"
              },
            }
          }
        },
        {
          id: "SDMR1",
          carGroupInfo: {
            bodyStyleKey: "Limousine",
            modelExample: {
              name: "Audi 1",
              imageUrl: "//fileadmin/files/global/user_upload/fleet/png/350x200/audi-a3-limousine-4d-blau-2020.png"
            },
          },
          prices: {
            totalPrice: {
              amount: {
                value: 200,
                display: "200",
                currency: "EUR"
              }
            }
          }
        }

      ]
    };

    const expectData = [
      {
        id: "SDMR",
        image: "//fileadmin/files/global/user_upload/fleet/png/350x200/audi-a3-limousine-4d-blau-2020.png",
        name: "Audi",
        currency: "EUR",
        price: 200
      },
      {
        id: "SDMR1",
        image: "//fileadmin/files/global/user_upload/fleet/png/350x200/audi-a3-limousine-4d-blau-2020.png",
        name: "Audi 1",
        currency: "EUR",
        price: 200
      }
    ];

    // return offersList;
    expect(normalizeOfferDataResponse(mockUserData)).toStrictEqual(expectData);
    expect(normalizeOfferDataResponse(mockUserData)).toEqual(expectData);
  });

});