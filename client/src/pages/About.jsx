import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="py-5 bg-black text-white">
      <Container>
        {/* Header Section */}
        <Row className="mb-5 text-center">
          <Col>
            <h1 className="fw-bold display-5">About <span className="text-primary">Gigafit</span></h1>
            <p className="lead mt-3">
              Your ultimate destination for fitness, transformation, and community.
            </p>
          </Col>
        </Row>

        {/* Content Section */}
        <Row className="align-items-center">
          <Col md={6}>
            <img
              src="https://cdn.prod.website-files.com/66aa8fe9dc4db68f448a978f/6818f011e43717594eb60ea5_afp-device-multi-product-iphone-16-three-up-vertical-comp.webp"
              alt="Gigafit gym"
              className="img-fluid rounded shadow"
            />
          </Col>
          <Col md={6} className="mt-4 mt-md-0">
            <h3 className="fw-bold mb-3">Empowering Every Body</h3>
            <p>
              At <strong>Gigafit</strong>, we believe fitness should be accessible, inclusive, and tailored to your lifestyle.
              Whether you're just starting out or you're a seasoned athlete, our gyms, trainers, and tools are built to help
              you reach your goals.
            </p>
            <p>
              With state-of-the-art equipment, 24/7 access, personal training, and a strong community, Gigafit gives you more
              than just a gym — we give you a movement.
            </p>
            <Link to="/register">
              <Button variant="primary" size="lg" className="mt-3">Join the Gigafit Movement</Button>
            </Link>
          </Col>
        </Row>

        {/* Stats or Mission */}
        <Row className="text-center mt-5">
          <Col md={4}>
            <h2 className="fw-bold text-primary">500+</h2>
            <p>Global Locations</p>
          </Col>
          <Col md={4}>
            <h2 className="fw-bold text-primary">24/7</h2>
            <p>Gym Access</p>
          </Col>
          <Col md={4}>
            <h2 className="fw-bold text-primary">100%</h2>
            <p>Commitment to You</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
