import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../components/PageTitle/page-title';
import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';
import ImageBox from '../components/ImageBox/image-box';
import ServiceCard from '../components/ServiceCard/service-crad';
import { ApplicationState } from '../lib/appTypes/types';
import { addToCart } from '../lib/store/actions/cart';
import { setSelectedService } from '../lib/store/actions/hotels';

const Laundry = () => {
  const { laundry } = useSelector(
    (state: ApplicationState) => state.hotels.selectedHotel,
  );
  const dispatch = useDispatch();
  const { propCode } = useParams();
  const history = useHistory();

  const addToCartHandler = serviceId => {
    const url = `/hotels/${propCode}/checkout`;
    const cartItems = laundry?.filter(item => item._id === serviceId);
    dispatch(addToCart(cartItems));
    dispatch(setSelectedService('laundry'));
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
      <PageTitle pageName="Laundry" />
      <Header />
      <ImageBox
        imagesPath="laundry/laundry_bg.jpg"
        heading="Laundry @ home"
        para1="Have you noticed that if you leave the laundry in the hamper long
          enough, it's ready to wear again?"
        bannerClass="bg-teal-800"
      />
      <div className="px-10 py-12 service_section">
        <h3 className="text-black text-center pb-16 font-bold text-lg uppercase">
          <span>Book a laundry service @home</span>
        </h3>
        <div>
          <ul className="flex flex-row flex-wrap">
            {laundry?.map((laundryItem: any, index: number) => {
              return (
                <li key={index} className="px-2 w-1/3 mb-6">
                  <ServiceCard
                    {...laundryItem}
                    serviceType="laundry"
                    onCardClick={() => addToCartHandler(laundryItem._id)}
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

export default Laundry;
