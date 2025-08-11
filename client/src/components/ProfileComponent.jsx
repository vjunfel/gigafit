import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import avatar from "../assets/default-avatar.webp"

const ProfileComponent = () => {
  const { user } = useAuth();

  return (
    <Container className="pb-5 px-0">
      <Row className="justify-content-center">
        <Col md={12}>
          <Card className="shadow-sm border-1 border-secondary bg-black text-white">
            <Card.Body className="p-4">
              <Row className="d-flex align-items-center justify-content-center">
                <Col md={2} className="text-center mb-md-0">
                  <img
                    src={avatar}
                    alt="User avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                </Col>
                <Col md={10} className="mt-3 d-flex flex-column align-items-start justify-content-center">
                  <p className="">{user.email}</p>
                  <p className="text-secondary">ID: {user.id}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileComponent;
