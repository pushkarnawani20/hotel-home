import React, { useState } from 'react';
import Rating from '../Rating/rating';
import Button from '../Button/button';
import { CommonServiceType } from '../../lib/appTypes/types';

interface SingleIteamProps extends CommonServiceType {
  onCardClick?: any;
  serviceType: string;
}

const ServiceCard: React.FC<SingleIteamProps> = props => {
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const { image, onCardClick, serviceType } = props;
  const Benifit = serviceType === 'spa' ? props?.benefits?.join(',') : '';
  const Includes = serviceType === 'spa' ? props?.includes?.join(',') : '';
  const CookingStyle =
    serviceType === 'chef' ? props?.cookingStyle?.join(',') : '';
  const SignatureDishes =
    serviceType === 'chef' ? props?.signatureDishes?.join(',') : '';

  const readMoreClickHandler = () => {
    setExpanded(!isExpanded);
  };
  return (
    <>
      <div className="card bg-white service_card">
        <div
          className="card_image relative"
          style={{
            // eslint-disable-next-line import/no-dynamic-require
            backgroundImage: `url(${require(`../../assets/images/${image}`)})`,
          }}
        />
        <div className="px-6 py-4 card-content">
          <h3 className="text-black text-center mb-4 font-bold text-sm uppercase">
            {props?.name}
          </h3>
          <div className="pb-4">
            <p
              className={`tracking-wide font-thin mb-8 ${
                isExpanded ? '' : 'ellipsisClass'
              }`}
            >
              {props?.description}
            </p>
            {serviceType !== 'laundry' ? (
              <Button
                type="button"
                onClick={readMoreClickHandler}
                buttonStyle="underline"
                buttonSize="text-blue-500"
                btnClass="read-more-cta"
              >
                {isExpanded ? 'Read Less' : 'Read More'}
              </Button>
            ) : null}
          </div>

          {Benifit && (
            <p className="font-thin text-sm mb-2">
              <strong className="font-bold">Benefit In- </strong>
              {Benifit}
            </p>
          )}

          {Includes && (
            <p className="font-thin text-sm mb-2">
              <strong className="font-bold">Includes- </strong>
              {Includes}
            </p>
          )}
          {CookingStyle && (
            <p className="font-thin text-sm mb-2">
              <strong className="font-bold">Cooking Style- </strong>
              {CookingStyle}
            </p>
          )}
          {SignatureDishes && (
            <p className="font-thin text-sm mb-2">
              <strong className="font-bold">Signature Dishes- </strong>
              {SignatureDishes}
            </p>
          )}
          <div className="flex flex-row justify-between mb-6 capitalize">
            {props?.price && (
              <p>
                <span>Price- </span>
                <strong>{`${props?.price} INR`}</strong>
              </p>
            )}
            {props?.experience && (
              <p>
                <span>Experience- </span>
                <strong>{`${props?.experience} years`}</strong>
              </p>
            )}
            {serviceType === 'restaurant' && props?.type && (
              <p>
                <span>Type- </span>
                <strong>{`${props?.type}`}</strong>
              </p>
            )}
            <Rating numberOfStars={5} currentRating={props?.rating} />
          </div>
          <Button
            type="button"
            buttonSize="w-full"
            buttonStyle="border border-black inline-block py-4 px-4"
            onClick={onCardClick}
            btnClass="cta-button"
          >
            {serviceType === 'restaurant' ? 'Select Now' : 'Book now'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ServiceCard;
