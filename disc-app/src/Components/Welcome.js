import Button from "react-bootstrap/esm/Button";
// import { BrowserRouter as Router, Link } from "react-router-dom";
import { useNavigate } from "react-router";
import "./Welcome.css";
const Welcome = (props) => {
  const navigate = useNavigate();

  const routeChange = () => {
    let path = `/Login`;
    navigate(path);
  };

  return (
    <div>
      <div className="header"></div>
      <div className="title">Welcome To GT Campus Discovery!</div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="description">
          On this website, you will not only be able to register for any
          upcoming events across campus, but you will also be able to create and
          organise events, while also inviting your friends to do the same! Sign
          up now to meet new people and explore different events around campus!
        </div>
      </div>
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Router>
          <Link to="/Login"> */}
        <Button
          as="a"
          variant="success"
          style={{ maxWidth: "20%", marginTop: "1.5%" }}
          onClick={(e) => {
            e.preventDefault();
            routeChange();
          }}
        >
          Login!
        </Button>{" "}
        {/* </Link>
      </Router> */}
      </div>
    </div>
  );
};

export default Welcome;
