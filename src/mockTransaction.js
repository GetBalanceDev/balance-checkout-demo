import faker from "faker";
import _ from "lodash";

const PAYMENT_METHODS = ["creditCard", "bank"];
const PLAN_TYPE = "invoice";
const CURRENCY = "USD";

const mockTransaction = () => {
  const addressLine1 = faker.address.streetAddress();
  const countryCode = faker.address.countryCode();
  const state = faker.address.stateAbbr();
  const address = {
    addressLine1,
    state,
    city: faker.address.cityName(),
    countryCode,
    zipCode: faker.address.zipCodeByState(state)
  };

  const buyer = {
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    businessName: faker.company.companyName(),
    isRegistered: false
  };

  const lines = _.times(_.random(1, 4), () => {
    const lineItems = _.times(_.random(2, 6), () => {
      const productId = _.uniqueId();
      const lineItem = {
        title: productId,
        quantity: _.random(1, 10),
        productId,
        productSku: productId,
        variationId: faker.commerce.color(),
        price: parseInt(faker.commerce.price(100, 2500))
      };
      return lineItem;
    });
    return {
      shippingPrice: parseInt(faker.commerce.price(0, 20)),
      tax: _.random(1, 17),
      lineItems
    };
  });
  // remove nulls
  return JSON.parse(
    JSON.stringify(
      {
        currency: CURRENCY,
        buyer,
        totalDiscount: 30,
        shippingAddress: address,
        lines,
        autoPayouts: true,
        allowedPaymentMethods: _.sampleSize(
          PAYMENT_METHODS,
          _.random(1, PAYMENT_METHODS.length)
        ),
        plan: {
          planType: PLAN_TYPE,
          chargeDate: faker.date.soon(60).toISOString()
        },
        isMarketplaceFixedTake: 5
      },
      (key, value) => {
        return value === null ? undefined : value;
      }
    )
  );
};

export default mockTransaction;
