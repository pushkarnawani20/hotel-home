import React from 'react';
import { Link } from 'react-router-dom';
import { Hotels } from '../../lib/appTypes/types';
import Rating from '../Rating/rating';

const SearchResult: React.FC<Hotels> = (props: Hotels) => {
  const {
    hotelImage,
    propCode,
    hotelName,
    hotelCity,
    hotelCountry,
    rating,
    openingHours,
  } = props;

  return (
    <article
      className="search-result-main relative flex flex-col justify-start mb-2 pb-2"
      key={`searchResult:${propCode}`}
    >
      <div className="thumbnail relative">
        <Link to={`/hotels/${propCode}`}>
          <img
            // eslint-disable-next-line import/no-dynamic-require
            src={`${require(`../../assets/images/${hotelImage}`)}`}
            alt=""
          />
        </Link>
      </div>
      <div className="search-details flex flex-col justify-end pl-4 pb-4 pt-6 -mt-2 mb-5">
        <h2 className="font-bold">{hotelName}</h2>
        <p>{`${hotelCity},${hotelCountry}`}</p>
        <Rating currentRating={rating} numberOfStars={5} />
        <p>
          <span>Opening Hours: </span>
          <span className="mr-1">{openingHours}</span>
          <i className="fa fa-clock-o" />
        </p>
      </div>
    </article>
  );
};

export default SearchResult;
