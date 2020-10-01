import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import PageTitle from '../components/PageTitle/page-title';
import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';
import ImageBox from '../components/ImageBox/image-box';
import ServiceCard from '../components/ServiceCard/service-crad';
import { ApplicationState, RestaurantsType } from '../lib/appTypes/types';
import { addToCart, removeFromCart } from '../lib/store/actions/cart';
import Button from '../components/Button/button';

const Meals = () => {
  const {
    hotels: {
      selectedHotel: { restaurants },
      selectedService,
    },
    carts,
  } = useSelector((state: ApplicationState) => state);
  const dispatch = useDispatch();
  const { propCode } = useParams();
  const history = useHistory();
  const [state, setState] = useState<RestaurantsType[]>([]);
  useEffect(() => {
    const singleRestaurant = restaurants?.filter(
      res => res._id === selectedService,
    );
    setState([...state, ...singleRestaurant]);
  }, [restaurants?.length, selectedService]);

  const addToCartHandler = (serviceId: string) => {
    const cartItems = state[0]?.meals?.filter(item => item._id === serviceId);
    dispatch(addToCart(cartItems));
  };

  const handleOnCartCloseIconClick = (serviceId: string) => {
    dispatch(removeFromCart(serviceId));
  };
  const onOrderNowClick = () => {
    const url = `/hotels/${propCode}/checkout`;
    history.push(url);
  };

  useEffect(() => {
    const elem = document.getElementById('logo') as HTMLElement;
    if (elem) {
      elem.scrollIntoView({ block: 'end' });
    }
  }, [0]);

  return (
    <>
      <PageTitle pageName="Get a Meals" />
      <Header />
      {state[0]?.image && (
        <ImageBox
          imagesPath={state[0]?.image}
          heading={state[0]?.name}
          para1={state[0]?.description}
          bannerClass="bg-blue-700"
          type={state[0]?.type}
          rating={state[0]?.rating}
        />
      )}

      <div className="px-10 py-12 mealMenu flex flex-col items-center justify-center">
        <h3 className="text-black text-center pt-6 mb-16 font-bold text-lg uppercase">
          Food Menu
        </h3>
        <div className="flex flex-row flex-wrap">
          <div className="w-9/12">
            <ul className="flex flex-row flex-wrap meal_cart mb-4">
              {state[0] &&
                state[0]?.meals?.map((meal: any, index: number) => {
                  const isSelected =
                    carts.CartItems.find(setId => setId._id === meal._id) ||
                    false;
                  return (
                    <li
                      key={index}
                      className={`px-2 w-1/3 mb-6 ${
                        isSelected ? 'selectd' : ''
                      }`}
                    >
                      <ServiceCard
                        {...meal}
                        serviceType="restaurant"
                        // eslint-disable-next-line no-alert
                        onCardClick={() => addToCartHandler(meal._id)}
                      />
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="w-3/12">
            {carts?.CartItems && carts?.CartItems.length > 0 && (
              <div className="mx-2 bg-white rounded shadow-xl">
                <h4 className="text-black text-center mb-4 font-bold text-sm uppercase">
                  Cart Items
                </h4>
                <ul>
                  {carts?.CartItems?.map((item, index) => {
                    return (
                      <li key={index} className="relative cartList mb-2">
                        <button
                          type="button"
                          className="absolute top-0"
                          style={{ right: '8px' }}
                          onClick={() => handleOnCartCloseIconClick(item._id)}
                        >
                          X
                        </button>
                        <div className="max-w-sm w-full lg:max-w-full flex">
                          <div className="px-4 flex-1 flex flex-col">
                            <p>
                              <strong>Item- </strong>
                              <span>{item.name}</span>
                            </p>
                            <p>
                              <strong>Price- </strong>
                              <span>{`${item.price} INR`}</span>
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <Button
                  type="submit"
                  buttonStyle="bg-blue-500 text-white font-semibold py-2 px-4 border border-blue-500 hover:border-transparent"
                  buttonSize="w-full"
                  onClick={onOrderNowClick}
                >
                  Order Now
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Meals;
