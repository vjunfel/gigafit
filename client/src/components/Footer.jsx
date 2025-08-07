import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-light pt-5 pb-3">
      <Container>
        <Row className="text-center text-md-start">
          <Col md={4} className="mb-4">
            <h5 className="text-uppercase fw-bold">GigaFit</h5>
            <p>Your journey to a better you starts here.</p>
          </Col>

          <Col md={4} className="mb-4">
            <h6 className="text-uppercase">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/about" className="text-light text-decoration-none">About</Link></li>
              <li><Link to="/register" className="text-light text-decoration-none">Register</Link></li>
            </ul>
          </Col>

          <Col md={4} className="mb-4">
            <h6 className="text-uppercase">Follow Us</h6>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <Link to="#" className="text-light fs-4"><i className="bi bi-facebook"></i></Link>
              <Link to="#" className="text-light fs-4"><i className="bi bi-instagram"></i></Link>
              <Link to="#" className="text-light fs-4"><i className="bi bi-twitter"></i></Link>
              <Link to="#" className="text-light fs-4"><i className="bi bi-youtube"></i></Link>
            </div>
          </Col>
        </Row>

        <hr className="border-light" />
        <p className="text-center mb-0">&copy; {new Date().getFullYear()} GigaFit. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
