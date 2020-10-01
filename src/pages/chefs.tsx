import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../components/PageTitle/page-title';
import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';
import ImageBox from '../components/ImageBox/image-box';
import ServiceCard from '../components/ServiceCard/service-crad';
import { addToCart } from '../lib/store/actions/cart';
import { ApplicationState } from '../lib/appTypes/types';
import { setSelectedService } from '../lib/store/actions/hotels';

const Chefs = () => {
  const { chefs } = useSelector(
    (state: ApplicationState) => state.hotels.selectedHotel,
  );
  const dispatch = useDispatch();
  const { propCode } = useParams();
  const history = useHistory();

  const addToCartHandler = (serviceId: string) => {
    const url = `/hotels/${propCode}/checkout`;
    const cartItems = chefs?.filter((item: any) => item._id === serviceId);
    dispatch(addToCart(cartItems));
    dispatch(setSelectedService('chef'));
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
      <PageTitle pageName="Chef" />
      <Header />
      <ImageBox
        imagesPath="chefs/chef_service_bg.jpg"
        heading="Chef @ home"
        para1="Chefs don't make mistakes; they make new dishes. Book a chef now."
        bannerClass="bg-indigo-900"
      />
      <div className="px-10 py-12 service_section">
        <h3 className="text-black text-center pb-16 font-bold text-lg uppercase">
          <span>Cater your next event with our in-house chefs</span>
        </h3>
        <div>
          <ul className="flex flex-row flex-wrap">
            {chefs?.map((chefItem: any, index: number) => {
              return (
                <li key={index} className="px-2 w-1/3 mb-6">
                  <ServiceCard
                    {...chefItem}
                    serviceType="chef"
                    onCardClick={() => addToCartHandler(chefItem._id)}
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

export default Chefs;
