import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Slider from 'react-slick';
import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';
import PageTitle from '../components/PageTitle/page-title';
import ImageSlider from '../components/ImageSlider/image-slider';
import HotelInfo from '../components/HotelInfo/hotel-info';
import HotelServicesBox from '../components/HotelServicesBox/Hotel-services-box';
import Card from '../components/Card/card';
import Rating from '../components/Rating/rating';
import { ApplicationState } from '../lib/appTypes/types';
import { getBestServicesFromList } from '../utils/hotesUtils';
import hotelMock from '../assets/mock/hotels.mock.json';
import { useWithHotels } from '../lib/hooks/withHotels';
import { addToCart } from '../lib/store/actions/cart';
import { setSelectedService } from '../lib/store/actions/hotels';

const settings = {
  dots: true,
  infinite: true,
  arrows: false,
  autoplay: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};
const Hotels = () => {
  const { selectedHotel } = useSelector(
    (state: ApplicationState) => state.hotels,
  );
  const [state, setState] = useState<any>([]);
  const history = useHistory();
  const { propCode } = useParams();
  const { hasHotel } = useWithHotels(propCode);
  const dispatch = useDispatch();
  useEffect(() => {
    if (hasHotel) {
      history.push('/home');
    }
  }, [hasHotel]);
  useEffect(() => {
    const bestLaundrys = getBestServicesFromList(selectedHotel.laundry).slice(
      0,
      3,
    );
    const bestSpas = getBestServicesFromList(selectedHotel?.spa).slice(0, 3);
    const bestChefs = getBestServicesFromList(selectedHotel?.chefs).slice(0, 3);
    const bestResurants = getBestServicesFromList(
      selectedHotel?.restaurants,
    ).slice(0, 3);
    const array = [
      ...bestLaundrys,
      ...bestSpas,
      ...bestChefs,
      ...bestResurants,
    ];
    setState([...state, ...array]);
  }, [selectedHotel?.laundry?.length, selectedHotel?.spa?.length]);

  const onCardClick = (serviceId: string, serviceType: string) => {
    let url = `/hotels/${propCode}`;
    if (serviceType === 'restaurant') {
      url = `${url}/restaurants/mealMenu`;
      dispatch(setSelectedService(serviceId));
    } else {
      url = `${url}/checkout`;
      const cartItems = selectedHotel[serviceType]?.filter(
        (item: any) => item._id === serviceId,
      );
      dispatch(setSelectedService(serviceType));
      dispatch(addToCart(cartItems));
    }
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
      <PageTitle pageName="welcome to hotelname | home" />
      <Header />
      <section className="hotelImagesSlide">
        <ImageSlider images={selectedHotel?.hotelImage} />
      </section>
      <HotelInfo
        hotelName={selectedHotel?.hotelName}
        hotelDescription={selectedHotel.hotelDescription}
      />
      <div className="p-12 best_service_section">
        <h3 className="text-black text-center pb-16 font-bold text-lg uppercase">
          <span>Bestsellers</span>
        </h3>
        <Slider {...settings}>
          {state &&
            state?.map((service: any, index: number) => {
              const serviceType = service.image?.split('/')[0];
              return (
                <Card
                  key={index}
                  onCardClick={() => onCardClick(service?._id, serviceType)}
                  {...service}
                />
              );
            })}
        </Slider>
      </div>
      <div className="p-12 service_section">
        <h3 className="text-black text-center pb-16 font-bold text-lg uppercase">
          <span>choose a service @home</span>
        </h3>
        {hotelMock &&
          hotelMock?.data[propCode]?.map((list: any, idx: number) => (
            <HotelServicesBox
              key={idx}
              {...list}
              pagelink={`/hotels/${propCode}/${list?.pagelink}`}
              isFullWidth={false}
            />
          ))}
      </div>
      <div className="bg-white pt-10 pb-10 pl-64 pr-64 address_section">
        <ul className="flex flex-row items-center">
          <li className="flex flex-col flex-1 relative">
            <strong>REVIEWS</strong>
            <span>
              Based on 5,051 reviews &nbsp;
              <Rating numberOfStars={5} currentRating={selectedHotel?.rating} />
            </span>
          </li>
          <li className="flex flex-col flex-1 relative pr-4">
            <strong>ADDRESS</strong>
            <span>
              <i className="fa fa-map-marker" aria-hidden="true" />
              {selectedHotel?.hotelAddress}
            </span>
          </li>
          <li className="flex flex-col flex-1 relative">
            <strong>CALL US</strong>
            <span>
              <i className="fa fa-volume-control-phone" aria-hidden="true" />
              +1-954-764-2233
            </span>
          </li>
          <li className="flex flex-col flex-1 relative">
            <strong>ARRIVAL TIME</strong>
            <span>
              <i className="fa fa-clock-o" aria-hidden="true" />
              {selectedHotel?.openingHours}
            </span>
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Hotels;
