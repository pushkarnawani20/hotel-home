import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../components/PageTitle/page-title';
import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';
import HotelServicesBox from '../components/HotelServicesBox/Hotel-services-box';
import eventMock from '../assets/mock/event.mock.json';
import ImageBox from '../components/ImageBox/image-box';

const Events = () => {
  const { propCode } = useParams();
  useEffect(() => {
    const elem = document.getElementById('logo') as HTMLElement;
    if (elem) {
      elem.scrollIntoView({ block: 'end' });
    }
  }, [0]);
  return (
    <>
      <PageTitle pageName="events" />
      <Header />
      <ImageBox
        imagesPath="events/event-main.jpg"
        heading="Choose Events to Make Your Special Day Even More Special"
        para1="Our passion is your perfect Event, So sit back while we create the experience of a lifetime. Because in your dreams, every detail matters. Your occasion deserves our careful planning."
        bannerClass="bg-blue-900"
      />
      <div className="service_section">
        <h3 className="text-black text-center pt-10 pb-16 font-bold text-lg uppercase">
          <span>Book a customisable event package</span>
        </h3>
        {eventMock &&
          eventMock?.data.events?.map((list: any, idx: number) => (
            <HotelServicesBox
              key={idx}
              {...list}
              pagelink={`/hotels/${propCode}/${list?.pagelink}`}
              isFullWidth
            />
          ))}
      </div>
      <Footer />
    </>
  );
};

export default Events;
