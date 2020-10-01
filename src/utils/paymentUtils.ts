import { CommonServiceType } from '../lib/appTypes/types';

const cardItemsTransformer = (items: CommonServiceType[]) => {
  const serachHotels =
    items &&
    items.map((item: CommonServiceType) => {
      return {
        ItemName: item.name,
        Description: item.description,
        Price: item.price,
      };
    });
  return serachHotels;
};

export { cardItemsTransformer };
