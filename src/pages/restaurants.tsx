import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Slider from 'react-slick';
import PageTitle from '../components/PageTitle/page-title';
import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';
import ImageBox from '../components/ImageBox/image-box';
import ServiceCard from '../components/ServiceCard/service-crad';
import Card from '../components/Card/card';
import { ApplicationState, RestaurantsType } from '../lib/appTypes/types';
import { getBestServicesFromList } from '../utils/hotesUtils';
import { setSelectedService } from '../lib/store/actions/hotels';

const settings = {
  dots: true,
  infinite: true,
  arrows: false,
  autoplay: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const Restaurants = () => {
  const { restaurants } = useSelector(
    (state: ApplicationState) => state.hotels.selectedHotel,
  );
  const dispatch = useDispatch();
  const { propCode } = useParams();
  const history = useHistory();
  const [state, setState] = useState<RestaurantsType[]>([]);
  useEffect(() => {
    const bestRestaurants = getBestServicesFromList(restaurants);
    setState([...state, ...bestRestaurants]);
  }, [restaurants?.length]);

  const onCardClickHandler = (serviceId: string) => {
    const url = `/hotels/${propCode}/restaurants/mealMenu`;
    dispatch(setSelectedService(serviceId));
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
      <PageTitle pageName="Choose a Restaurant" />
      <Header />
      <ImageBox
        imagesPath="restaurant/restuarant_service_bg.jpg"
        heading="Get food services from best restaurants."
        para1="A restaurant is a fantasy-a kind of living fantasy in which diners are the most important members of the cast."
        bannerClass="bg-blue-900"
      />
      <div className="px-10 py-12 service_section">
        <h3 className="text-black text-center pb-16 font-bold text-lg uppercase">
          <span>Bestseller Restaurants</span>
        </h3>
        <div className="best_service_section">
          <Slider {...settings}>
            {state &&
              state?.map((service: any, index: number) => {
                return (
                  <Card
                    key={index}
                    {...service}
                    serviceName="restaurant"
                    onCardClick={() => onCardClickHandler(service?._id)}
                  />
                );
              })}
          </Slider>
        </div>
      </div>
      <div className="px-10 py-6 service_section">
        <h3 className="text-black text-center pb-10 font-bold text-lg uppercase">
          <span>Choose a restaurant of your choice</span>
        </h3>
        <ul className="flex flex-row flex-wrap">
          {restaurants?.map((restaurant: any, index: number) => {
            return (
              <li key={index} className="px-2 w-1/3 mb-6">
                <ServiceCard
                  {...restaurant}
                  serviceType="restaurant"
                  // eslint-disable-next-line no-alert
                  onCardClick={() => onCardClickHandler(restaurant?._id)}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Restaurants;
