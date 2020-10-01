import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import PageTitle from '../components/PageTitle/page-title';
import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';
import Loader from '../components/Loader/Loader';
import TextInput from '../components/TextInput/text-input';
import TextArea from '../components/TextArea/text-area';
import Cart from '../components/Cart/cart';
import { ApplicationState } from '../lib/appTypes/types';
import Button from '../components/Button/button';
import { authCheckoutData, removeFromCart } from '../lib/store/actions/cart';
import { cardItemsTransformer } from '../utils/paymentUtils';
import { setPageLoadding } from '../lib/store/actions/hotels';

const userInitialState = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  address: '',
  pinCode: '',
};
const checkOutstate = {
  cardholderName: '',
  lastName: '',
  cardNumber: '',
  expirationDate: '',
  cvv: '',
};

const Checkout = () => {
  const { users, hotels, carts } = useSelector(
    (state: ApplicationState) => state,
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const { propCode } = useParams();
  const [userState, setUserState] = useState(userInitialState);
  const [userPayment, setUserPayment] = useState(checkOutstate);

  useEffect(() => {
    if (users.token !== '') {
      const newUser = {
        firstName: users?.fullName?.split(' ')[0] || '',
        lastName: users?.fullName?.split(' ')[1] || '',
        phoneNumber: users?.phoneNumber || '',
        email: users?.email || '',
        address: users?.address || '',
        pinCode: users?.pinCode || '',
      };
      setUserState(currentState => ({ ...currentState, ...newUser }));
    }
  }, [users.token]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setUserState(currentState => ({ ...currentState, [name]: value }));
  };

  const handlePaymentOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { name, value } = event.target;
    setUserPayment(currentState => ({ ...currentState, [name]: value }));
  };

  const handleOnCartSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault();
    const { selectedService } = hotels;
    const serviceName = carts?.CartItems[0].name;
    const amount = carts?.CartItems?.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
    const { id, token, address } = users;
    const items = cardItemsTransformer(carts?.CartItems);

    const payLoad = {
      propCode,
      serviceName,
      items,
      amount: selectedService === 'chef' ? 0 : amount,
      serviceType: selectedService,
      userId: id,
      user: {
        shippingAddress: address,
        paymentInfo: {
          cardNo: userPayment.cardNumber,
          cardType: userPayment.cvv,
          cardHolderName: userPayment.cardholderName,
          validUpTo: userPayment.expirationDate,
        },
      },
    };
    dispatch(setPageLoadding(true));
    dispatch(authCheckoutData(payLoad, token, history));
  };
  const handleOnCartCloseIconClick = evt => {
    const serviceId = evt.target.id;
    dispatch(removeFromCart(serviceId));
  };
  const { isLoading } = hotels;

  return (
    <>
      <PageTitle pageName="Order Now" />
      <Header />
      <div className="px-10 py-6 chekout_section">
        <form className="flex flex-row flex-wrap" onSubmit={handleOnCartSubmit}>
          <div className="w-2/3 p-10 bg-white rounded shadow-xl">
            <p className="text-gray-800 font-bold mb-4">Customer information</p>
            <ul className="cartForm">
              <li>
                <TextInput
                  name="firstName"
                  label="First Name"
                  value={userState.firstName}
                  type="text"
                  onChange={handleOnChange}
                  required
                />
              </li>
              <li>
                <TextInput
                  name="lastName"
                  label="Last Name"
                  value={userState.lastName}
                  type="text"
                  onChange={handleOnChange}
                  required
                />
              </li>
              <li>
                <TextInput
                  name="phoneNumber"
                  label="Phone Number"
                  value={userState.phoneNumber}
                  type="text"
                  onChange={handleOnChange}
                  required
                />
              </li>
              <li>
                <TextInput
                  name="email"
                  label="Email"
                  value={userState.email}
                  type="email"
                  onChange={handleOnChange}
                  required
                />
              </li>
              <li>
                <TextInput
                  name="pinCode"
                  label="Pin Code"
                  value={userState.pinCode}
                  type="text"
                  onChange={handleOnChange}
                  required
                />
              </li>
              <li>
                <TextArea
                  name="address"
                  onChange={handleOnChange}
                  label="Address"
                  value={userState.address}
                  maxLength={150}
                  rows={2}
                  cols={20}
                />
              </li>
            </ul>
            {hotels.selectedService !== 'chef' && (
              <>
                <p className="text-gray-800 font-bold mb-4">Card information</p>
                <ul className="cartForm">
                  <li>
                    <TextInput
                      name="cardholderName"
                      label="Cardholder's Name"
                      value={userPayment.cardholderName}
                      type="text"
                      onChange={handlePaymentOnChange}
                      required
                    />
                  </li>
                  <li>
                    <TextInput
                      name="cardNumber"
                      label="Card Number"
                      value={userPayment.cardNumber}
                      type="number"
                      onChange={handlePaymentOnChange}
                      required
                    />
                  </li>
                  <li>
                    <TextInput
                      name="expirationDate"
                      label="Expiration Date"
                      value={userPayment.expirationDate}
                      type="month"
                      onChange={handlePaymentOnChange}
                      required
                    />
                  </li>
                  <li>
                    <TextInput
                      name="cvv"
                      label="CVV"
                      value={userPayment.cvv}
                      type="number"
                      onChange={handlePaymentOnChange}
                      required
                    />
                  </li>
                </ul>
              </>
            )}
          </div>
          <div className="px-4 w-1/3">
            <div className="p-10 bg-white rounded shadow-xl ">
              <Cart onCardCloseIconClick={handleOnCartCloseIconClick} />
              {carts?.CartItems && carts?.CartItems.length > 0 ? (
                <Button
                  type="submit"
                  buttonStyle="bg-blue-500 text-white font-semibold py-2 px-4 border border-blue-500 hover:border-transparent"
                  buttonSize="w-full"
                >
                  {hotels.selectedService === 'chef' ? 'Book Now' : 'Checkout'}
                </Button>
              ) : (
                <div>
                  <p>
                    <span>Your cart is empty. To book a service </span>
                    <Link
                      to={`/hotels/${propCode}/`}
                      className="underline capitalize"
                    >
                      click here.
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
      {isLoading && <Loader />}
      <Footer />
    </>
  );
};

export default Checkout;
