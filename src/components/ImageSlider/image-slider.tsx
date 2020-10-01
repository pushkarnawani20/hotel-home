/* eslint-disable import/no-dynamic-require */
import React from 'react';
import Slider from 'react-slick';

interface Props {
  images: Array<string>;
}
const settings = {
  dots: true,
  infinite: true,
  arrows: false,
  autoplay: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const ImageSlider: React.FC<Props> = ({ images }) => {
  if (!images?.length) {
    return null;
  }

  return (
    <>
      <Slider {...settings}>
        {images &&
          images?.map((singleImage, index) => (
            <img
              // eslint-disable-next-line prefer-template
              src={require('../../assets/images/' + singleImage)}
              alt={`slider-${index}`}
              className="img-responsive"
              key={index}
            />
          ))}
      </Slider>
    </>
  );
};

export default ImageSlider;
