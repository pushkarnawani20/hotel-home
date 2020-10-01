import React from 'react';
import Rating from '../Rating/rating';
import Button from '../Button/button';
import { CommonServiceType } from '../../lib/appTypes/types';

interface CardProps extends CommonServiceType {
  onCardClick?: any;
  serviceName?: string;
}

const Card: React.FC<CardProps> = ({
  image,
  description,
  price,
  rating,
  name,
  serviceName,
  type,
  experience,
  onCardClick,
}) => {
  return (
    <>
      <div className="card">
        <div
          className="card_image relative"
          style={{
            // eslint-disable-next-line import/no-dynamic-require
            backgroundImage: `url(${require(`../../assets/images/${image}`)})`,
          }}
        />
        <div className="px-6 py-4 card-content">
          <h3 className="text-black text-center pb-4 font-bold text-sm uppercase">
            {name}
          </h3>
          <p className="tracking-wide font-thin mb-8 ellipsisClass">
            {description}
          </p>
          <div className="flex flex-row justify-between mb-6 capitalize">
            {price && (
              <p>
                <span>Price:- </span>
                <strong>{`${price} INR`}</strong>
              </p>
            )}
            {experience && (
              <p>
                <span>Experience:- </span>
                <strong>{`${experience} years`}</strong>
              </p>
            )}
            {serviceName === 'restaurant' && type && (
              <p>
                <span>Type:- </span>
                <strong>{`${type}`}</strong>
              </p>
            )}
            <Rating numberOfStars={5} currentRating={rating} />
          </div>
          <Button
            type="button"
            buttonSize="w-full"
            buttonStyle="border border-black inline-block py-4 px-4"
            onClick={onCardClick}
            btnClass="cta-button"
          >
            {serviceName === 'restaurant' ? 'Select Now' : 'Book now'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Card;
