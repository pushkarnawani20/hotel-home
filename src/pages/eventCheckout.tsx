import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Multiselect } from 'multiselect-react-dropdown';
import PageTitle from '../components/PageTitle/page-title';
import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';
import Loader from '../components/Loader/Loader';
import TextInput from '../components/TextInput/text-input';
import TextArea from '../components/TextArea/text-area';
import Button from '../components/Button/button';
import '../components/HotelServicesBox/hotel-services-box.css';
import { eventTimes, options } from '../lib/constant/constant';
import { withoutAuthCheckout } from '../lib/store/actions/cart';
import { setPageLoadding } from '../lib/store/actions/hotels';
import { ApplicationState } from '../lib/appTypes/types';

const eventsInitialState = {
  serviceName: '',
  eventDate: '',
  numAdults: '',
  venueAddress: '',
  eventTime: '',
  serviceType: '',
  name: '',
  phone: '',
  email: '',
  comments: '',
};

const EventCheckout: React.FC = () => {
  const {
    hotels: { isLoading },
  } = useSelector((state: ApplicationState) => state);
  const dispatch = useDispatch();
  const { propCode } = useParams();
  const history = useHistory();
  const [state, setState] = useState(eventsInitialState);
  const [selectedValues] = useState([]);
  const [decorationRequired, setDecorationRequired] = React.useState(true);

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = event.target;
    setState(currentState => ({ ...currentState, [name]: value }));
  };

  const onRemoveAndSelect = (selectedList: typeof options) => {
    const val = selectedList?.reduce((acc, item) => {
      return `${acc + item.name},`;
    }, '');
    setState(currentState => ({ ...currentState, serviceType: val }));
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const {
      serviceName,
      eventDate,
      eventTime,
      numAdults,
      venueAddress,
      name,
      phone,
      email,
      serviceType,
      comments,
    } = state;
    const payLoad = {
      propCode,
      serviceName,
      serviceType,
      eventDate,
      eventTime,
      numAdults,
      venueAddress,
      decorationRequired,
      user: {
        name,
        phone,
        email,
        comments,
      },
    };
    dispatch(setPageLoadding(true));
    dispatch(withoutAuthCheckout(payLoad, propCode, history));
  };

  return (
    <>
      <PageTitle pageName="details for event" />
      <Header />
      <div className="flex max-w-full justify-center">
        <form
          onSubmit={handleOnSubmit}
          className="form z-10 bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-2 relative w-3/5"
        >
          <div
            className="icon bg-blue-600 text-white w-6 h-6 absolute flex items-center justify-center p-5"
            style={{ left: '-40px' }}
          >
            <i className="fa fa-volume-control-phone text-2xl transform -rotate-45" />
          </div>
          <h3 className="text-2xl text-gray-900 font-semibold">
            Let us call you!
          </h3>
          <p className="text-gray-600">
            To Help You Choose Best For Your Special Day.
          </p>
          <p className="mt-5">
            <strong className="uppercase tracking-wide text-md font-semibold block">
              Event Details
            </strong>
            <span className="text-xs font-light text-red-600">
              * This entire section is required.
            </span>
          </p>
          <ul className="cartForm">
            <li>
              <TextInput
                name="serviceName"
                label="Name Your Event"
                value={state.serviceName}
                type="text"
                onChange={handleOnChange}
                required
              />
            </li>
            <li className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="eventTypeSelect"
              >
                Type of Event
              </label>
              <Multiselect
                className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-4"
                options={options}
                selectedValues={selectedValues}
                selectionLimit="4"
                id="serviceType"
                name="serviceType"
                displayValue="name"
                onSelect={onRemoveAndSelect}
                onRemove={onRemoveAndSelect}
              />
            </li>
            <li>
              <TextInput
                name="eventDate"
                label="Event Date"
                value={state.eventDate}
                type="date"
                onChange={handleOnChange}
                required
              />
            </li>
            <li className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="eventTime"
              >
                Event Time
              </label>
              <select
                name="eventTime"
                id="eventTime"
                className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-3 pb-3"
                value={state.eventTime}
                onChange={handleOnChange}
                required
              >
                <option value="select">Select Time</option>
                {eventTimes.map(time => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </li>
            <li>
              <TextInput
                name="numAdults"
                label="Number of Guest you are expecting"
                value={state.numAdults}
                type="number"
                onChange={handleOnChange}
                required
              />
            </li>
            <li>
              <TextArea
                name="venueAddress"
                onChange={handleOnChange}
                label="Venue for your Event"
                value={state.venueAddress}
                maxLength={150}
                rows={2}
                cols={15}
              />
            </li>
            <li>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="timeselect"
              >
                Do You Require Decoration
              </label>
              <label htmlFor="radioyes">
                <input
                  type="radio"
                  value="Yes"
                  id="radioyes"
                  onClick={() => setDecorationRequired(true)}
                  checked={decorationRequired}
                />
                <span className="pl-1">Yes</span>
              </label>
              <label htmlFor="radiono" className="ml-2">
                <input
                  type="radio"
                  value="No"
                  id="radiono"
                  onClick={() => setDecorationRequired(false)}
                  checked={!decorationRequired}
                />
                <span className="pl-1">No</span>
              </label>
            </li>
          </ul>
          <p className="mt-5">
            <strong className="uppercase tracking-wide text-md font-semibold block">
              Personal Details
            </strong>
            <span className="text-xs font-light text-red-600">
              * This entire section is required.
            </span>
          </p>
          <ul className="cartForm">
            <li>
              <TextInput
                name="name"
                label="Name"
                value={state.name}
                type="text"
                onChange={handleOnChange}
                required
              />
            </li>
            <li>
              <TextInput
                name="phone"
                label="Phone Number"
                value={state.phone}
                type="number"
                onChange={handleOnChange}
                required
              />
            </li>
            <li>
              <TextInput
                name="email"
                label="Email"
                value={state.email}
                type="email"
                onChange={handleOnChange}
                required
              />
            </li>
            <li>
              <TextArea
                name="comments"
                onChange={handleOnChange}
                label="Special Requirements or Description"
                value={state.comments}
                maxLength={150}
                rows={2}
                cols={20}
              />
            </li>
          </ul>
          <Button
            type="submit"
            buttonStyle="mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold p-3"
            buttonSize="w-full"
          >
            Submit your Request
          </Button>
        </form>
      </div>
      {isLoading && <Loader />}
      <Footer />
    </>
  );
};

export default EventCheckout;
