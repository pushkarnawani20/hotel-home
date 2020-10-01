import React from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../lib/appTypes/types';

interface InputProps {
  onCardCloseIconClick: any;
}

const Cart: React.FC<InputProps> = ({
  onCardCloseIconClick,
}): React.ReactElement => {
  const { CartItems } = useSelector((state: ApplicationState) => state.carts);
  const totalAmount: number = CartItems?.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
  return (
    <>
      <ul>
        {CartItems?.map((item, index) => {
          return (
            <li key={index} className="relative cartList mb-2">
              <button
                type="button"
                className="absolute right-0 top-0"
                onClick={onCardCloseIconClick}
                id={item._id}
              >
                X
              </button>
              <div className="max-w-sm w-full lg:max-w-full flex">
                <figure>
                  <img
                    // eslint-disable-next-line import/no-dynamic-require
                    src={`${require(`../../assets/images/${item.image}`)}`}
                    alt=""
                  />
                </figure>
                <div className="px-2 flex-1 flex flex-col">
                  <p>{`Item - ${item.name}`}</p>

                  {item.price ? (
                    <p>{`Price - ${item.price} INR`}</p>
                  ) : (
                    <p>{`Experience - ${item.experience} years`}</p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {totalAmount && totalAmount > 0 ? (
        <div className="my-1">
          <p className="flex flex-row justify-between font-bold">
            <span>Total -</span>
            <span>{`${totalAmount} INR`}</span>
          </p>
        </div>
      ) : null}
    </>
  );
};

export default Cart;
