import React from "react";

interface StarRatingProps {
  rating: number;
  size: number;
}

const Star = ({ filled, size }: { filled: boolean; size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "#facc15" : "none"}
    stroke="#facc15"
    strokeWidth="2"
    style={{ width: size * 4, height: size * 4 }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 
      9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
    />
  </svg>
);

const StarHalf = ({ size }: { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    style={{ width: size * 4, height: size * 4 }}
  >
    <defs>
      <linearGradient id="halfGrad">
        <stop offset="50%" stopColor="#facc15" />
        <stop offset="50%" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 
      9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      fill="url(#halfGrad)"
      stroke="#facc15"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StarRating: React.FC<StarRatingProps> = ({ rating, size }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<Star key={i} filled={true} size={size} />);
    } else if (rating >= i - 0.5) {
      stars.push(<StarHalf key={i} size={size} />);
    } else {
      stars.push(<Star key={i} filled={false} size={size} />);
    }
  }

  return <div className="flex justify-center items-center">{stars}</div>;
};

export default StarRating;
