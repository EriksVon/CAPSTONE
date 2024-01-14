import { Container } from "react-bootstrap";

function NotFound() {
  return (
    <Container style={{ marginTop: 100, marginBottom: 300 }}>
      <h1>404 - Not Found</h1>
      <h5>The page you are looking for doesn't exist</h5>
    </Container>
  );
}

export default NotFound;
