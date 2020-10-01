import React from 'react';
import './hotel-info.css';

interface HotelInfoProps {
  hotelName: string;
  hotelDescription: string;
}

const HotelInfo: React.FC<HotelInfoProps> = ({
  hotelName,
  hotelDescription,
}) => {
  return (
    <div className="flex flex-row items-stretch p-10 hotelInfo">
      <div className="about_img" />
      <div className="flex-1 p-16 text-center about_hotel_dis">
        <h2 className="text-black font-bold text-lg uppercase pb-6 relative">{`welcome to ${hotelName}`}</h2>
        <p className="tracking-wide font-thin">{hotelDescription}</p>
      </div>
    </div>
  );
};

export default HotelInfo;
