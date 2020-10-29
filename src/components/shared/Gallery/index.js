import React, { useState } from "react";
import PropTypes from "prop-types";
import "./gallery.css";

import { ReactComponent as LeftArrow } from "../../../images/arrow-left.svg";
import { ReactComponent as RightArrow } from "../../../images/arrow-right.svg";

const Gallery = ({ data, titled }) => {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);

  const loadImage = (position) => {
    const length = data.length;
    setCount(position);
    setIndex(((position % length) + length) % length);
  };

  return (
    <div>
      <div className="gallery-slider__main disableSelection">
        <div className="left-arrow" onClick={() => loadImage(count - 1)}>
          <LeftArrow />
        </div>
        <div className="image">
          <img src={data[index].src} alt={data[index].title} />
        </div>
        <div className="right-arrow" onClick={() => loadImage(count + 1)}>
          <RightArrow />
        </div>
        <div className="gallery-slider__title" hidden={!titled}>
          {data[index].title}
        </div>
        <Thumbnail data={data} currentIndex={index} onClick={loadImage} />
      </div>
    </div>
  );
};

const Thumbnail = ({ data, currentIndex, onClick }) => (
  <div className="gallery-slider__thumbnails">
    {data.map((item, index) => (
      <div
        key={index}
        className={`item ${currentIndex === index && "active"}`}
        onClick={() => onClick(index)}
      >
        <img src={item.src} alt={item.title} />
      </div>
    ))}
  </div>
);

const DataType = PropTypes.shape({
  title: PropTypes.string,
  src: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
});

Gallery.propTypes = { data: PropTypes.arrayOf(DataType).isRequired };
Thumbnail.propTypes = {
  data: PropTypes.arrayOf(DataType).isRequired,
  currentIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Gallery;
