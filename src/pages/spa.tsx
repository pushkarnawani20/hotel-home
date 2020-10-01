import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../components/PageTitle/page-title';
import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';
import ImageBox from '../components/ImageBox/image-box';
import { ApplicationState } from '../lib/appTypes/types';
import ServiceCard from '../components/ServiceCard/service-crad';
import { addToCart } from '../lib/store/actions/cart';
import { setSelectedService } from '../lib/store/actions/hotels';

const Spa = () => {
  const { spa } = useSelector(
    (state: ApplicationState) => state.hotels.selectedHotel,
  );
  const dispatch = useDispatch();
  const { propCode } = useParams();
  const history = useHistory();

  const addToCartHandler = (serviceId: string) => {
    const url = `/hotels/${propCode}/checkout`;
    const cartItems = spa?.filter((item: any) => item._id === serviceId);
    dispatch(addToCart(cartItems));
    dispatch(setSelectedService('spa'));
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
      <PageTitle pageName="Spa" />
      <Header />
      <ImageBox
        imagesPath="spa/spa_service_bg.jpg"
        heading="Spa @ home"
        para1="Massage Therapists:- Changing lives one appointment at a time."
        bannerClass="bg-yellow-800"
      />
      <div className="px-10 py-12 service_section">
        <h3 className="text-black text-center pb-16 font-bold text-lg uppercase">
          <span>spa healing @home</span>
        </h3>
        <div>
          <ul className="flex flex-row flex-wrap">
            {spa?.map((spaItem: any, index: number) => {
              return (
                <li key={index} className="px-2 w-1/3 mb-6">
                  <ServiceCard
                    {...spaItem}
                    serviceType="spa"
                    onCardClick={() => addToCartHandler(spaItem._id)}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Spa;
