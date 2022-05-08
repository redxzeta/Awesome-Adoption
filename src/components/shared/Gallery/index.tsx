import Carousel from "react-bootstrap/Carousel";

import "./gallery.css";

type GalleryType = {
  title: string;
  src: string;
};

const Gallery = (props: { data: GalleryType[] }) => {
  const { data } = props;
  return (
    <div className="gallery-slider__main">
      <Carousel interval={1000}>
        {data.map((item) => (
          <Carousel.Item key={item.title}>
            <img className="d-block w-100" src={item.src} alt={item.title} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Gallery;
