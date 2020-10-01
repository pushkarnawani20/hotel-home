import React from 'react';
import './rating.css';

interface RatingProps {
  numberOfStars: number;
  currentRating: number;
}

const Rating: React.FC<RatingProps> = ({ numberOfStars, currentRating }) => {
  return (
    <div className="inline-block">
      {[...Array(numberOfStars)].map((n, i) => {
        return (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className={i < currentRating ? 'star selected' : 'star'}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
