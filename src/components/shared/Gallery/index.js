import "./gallery.css";
import Carousel from "react-bootstrap/Carousel";

const Gallery = ({ data }) => {
  return (
    <div className="gallery-slider__main">
      <Carousel interval={1000}>
        {data.map((item) => (
          <Carousel.Item key={item.src}>
            <img className="d-block w-100" src={item.src} alt={item.title} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Gallery;
