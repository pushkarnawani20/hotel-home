import React from 'react';
import Rating from '../Rating/rating';

interface Props {
  imagesPath: string;
  heading: string;
  para1: string;
  type?: string;
  rating?: number;
  bannerClass: string;
}

const ImageBox: React.FC<Props> = ({
  imagesPath,
  para1,
  heading,
  bannerClass,
  type,
  rating,
}) => {
  return (
    <>
      <div
        className="imageBox"
        style={{
          // eslint-disable-next-line import/no-dynamic-require
          backgroundImage: `url(${require(`../../assets/images/${imagesPath}`)})`,
        }}
      />
      <div
        className={`bannerHead w-full text-center text-white px-20 py-12 ${bannerClass}`}
      >
        <h2 className="font-bold text-3xl mb-3 capitalize">{heading}</h2>
        <p className="mb-3">{para1}</p>
        {rating && <Rating currentRating={rating} numberOfStars={5} />}
        {type && <p className="mt-3 capitalize">{`Hotel type- ${type}`}</p>}
      </div>
    </>
  );
};

export default ImageBox;
