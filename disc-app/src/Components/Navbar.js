import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/NavBar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router";
import "./Dashboard.css";
// import Dropdown from 'react-bootstrap/Dropdown';

function NavBar() {
  const navigate = useNavigate();
  const navigateToAddPage = () => {
    navigate("/AddPage");
  };
  const navigateToDashboard = () => {
    navigate("/Dashboard");
  };
  const myeventNavigate = () => {
    navigate("/MyEvents");
  };
  const navigateToMap = () => {
    navigate("/Map");
  };

  return (
    <Navbar className="top">
      <Container>
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={navigateToDashboard}
        >
          Campus Discovery Service
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Events" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={navigateToAddPage}>
                Add Event
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item onClick={navigateToDashboard}>
                {" "}
                Find Events{" "}
              </NavDropdown.Item>
            </NavDropdown>

            {/* <NavDropdown title="Meetups" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.2">
                {" "}
                Add Meetup{" "}
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item href="#action/3.4">
                {" "}
                Find Meetup{" "}
              </NavDropdown.Item>
            </NavDropdown> */}
            <Nav.Link onClick={() => myeventNavigate()}>My Events</Nav.Link>
            <Nav.Link onClick={navigateToMap}>Event Map</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
