import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="text-white d-flex align-items-center"
      style={{
        height: "calc(100% - 72px)",
        backgroundImage: "url('https://www.shutterstock.com/image-illustration/gym-weights-under-strong-dramatic-600nw-472696720.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container className="text-center">
        <h1 className="display-3 fw-bold">Transform Your Body</h1>
        <p className="lead fs-4 mt-3 mb-4">
          Join our fitness community and achieve your health goals with expert
          guidance.
        </p>
        <div>
          <Link to="/register">
            <Button variant="primary" size="lg" className="me-3">Get Started</Button>
          </Link>
          <Link to="/about">
            <Button variant="outline-light" size="lg">Learn More</Button>
          </Link> 
        </div>
      </Container>
    </div>
  );
};

export default Hero;
