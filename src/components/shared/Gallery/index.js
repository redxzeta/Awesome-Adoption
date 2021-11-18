import React, { useState } from "react";
// import PropTypes from "prop-types";
import "./gallery.css";
import Carousel from "react-bootstrap/Carousel";
// import { ReactComponent as LeftArrow } from "../../../images/arrow-left.svg";
// import { ReactComponent as RightArrow } from "../../../images/arrow-right.svg";

const Gallery = ({ data, titled }) => {
  const [index] = useState(0);
  // const [count, setCount] = useState(0);

  // const loadImage = (position) => {
  //   const length = data.length;
  //   setCount(position);
  //   setIndex(((position % length) + length) % length);
  // };

  return (
    <Carousel>
      {data.map((item) => (
        <Carousel.Item key={index} className="image">
          <img
            className="d-block w-100"
            src={data[index].src}
            alt={data[index].title}
            z
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

// const Thumbnail = ({ data, currentIndex, onClick }) => (
//   <div className="gallery-slider__thumbnails">
//     {data.map((item, index) => (
//       <div
//         key={index}
//         className={`item ${currentIndex === index && "active"}`}
//         onClick={() => onClick(index)}
//       >
//         <img src={item.src} alt={item.title} />
//       </div>
//     ))}
//   </div>
// );

// const DataType = PropTypes.shape({
//   title: PropTypes.string,
//   src: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
// });

// Gallery.propTypes = { data: PropTypes.arrayOf(DataType).isRequired };
// Thumbnail.propTypes = {
//   data: PropTypes.arrayOf(DataType).isRequired,
//   currentIndex: PropTypes.number.isRequired,
//   onClick: PropTypes.func.isRequired,
// };

export default Gallery;
