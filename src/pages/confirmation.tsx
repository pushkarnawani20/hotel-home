import React from 'react';
import { useSelector } from 'react-redux';
import PageTitle from '../components/PageTitle/page-title';
import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';

import { ApplicationState } from '../lib/appTypes/types';

const Confirmation = () => {
  const { selectedHotel } = useSelector(
    (state: ApplicationState) => state.hotels,
  );
  return (
    <>
      <PageTitle pageName="Confirmation" />
      <Header />
      <div className="confirmation w-full bg-white py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="flex-col flex">
            <span>
              <i className="fa fa fa-check" aria-hidden="true" />
            </span>
            <span className="font-bold mt-4 mb-2">Congratulations!!</span>
          </h2>
          <h3 className="font-bold my-4">Your order is confirmed.</h3>
          <p>
            Thank you for being a customer of
            <strong>{` ${selectedHotel.hotelName}. `}</strong>
            We sincerely appreciate your business and hope you come back soon!
          </p>
          <p className="mb-12">
            We will send you a confirmation email with your order details
            shortly.
          </p>
          <a href="/" className="underline">
            order another service
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Confirmation;
