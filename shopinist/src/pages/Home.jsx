import Carousel from 'react-bootstrap/Carousel';


function Home() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://static.zara.net/photos///contents/mkt/spots/ss23-north-man-shoes/subhome-xmedia-08//w/1366/IMAGE-landscape-fill-79c1f378-6cf9-4158-8c27-ed9f9e3f3fc3-default_0.jpg?ts=1677244882231"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://static.zara.net/photos///contents/mkt/spots/ss23-north-man-new/subhome-xmedia-08-2//w/1366/IMAGE-landscape-fill-24f2378d-dd57-49df-8962-1730b956e6e3-default_0.jpg?ts=1677239531402"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://static.zara.net/photos///contents/mkt/spots/ss23-north-woman-blazers/subhome-xmedia-08//w/1366/IMAGE-landscape-fill-e40c3eab-567e-415c-ab62-f0ea824f25fe-default_0.jpg?ts=1677086345832"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Home;