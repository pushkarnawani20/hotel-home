import React from 'react';
import './hotel-services-box.css';
import { Link } from 'react-router-dom';

interface ServicesBoxProps {
  imageAlign: number;
  contentAlign: number;
  heading: string;
  imageUrl: string;
  pagelink: string;
  description: string;
  btnText: string;
  isFullWidth: boolean;
}

const HotelServicesBox: React.FC<ServicesBoxProps> = ({
  imageAlign,
  contentAlign,
  heading,
  imageUrl,
  pagelink,
  description,
  btnText,
  isFullWidth,
}) => {
  return (
    <div
      className={`flex flex-row items-stretch ${
        isFullWidth ? 'w-full' : 'max-w-6xl mx-auto'
      }`}
    >
      <div
        className={`service_img order-${imageAlign}`}
        style={{
          // eslint-disable-next-line import/no-dynamic-require
          backgroundImage: `url(${require(`../../assets/images/${imageUrl}`)})`,
        }}
      />
      <div
        className={`flex-1 p-16 text-center service_disc order-${contentAlign}`}
      >
        <h3 className="text-black font-bold text-lg uppercase pb-20 relative">
          {heading}
        </h3>
        <p className="tracking-wide font-thin mb-10">{description}</p>
        <Link
          className="btn py-4 pl-10 pr-10 border border-black inline-block"
          to={pagelink}
        >
          {btnText}
        </Link>
      </div>
    </div>
  );
};

export default HotelServicesBox;
