import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useNavigate } from "react-router";

const Login = (props) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Student");
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* LOGIN PAGE DEBUGGING */}
      <Form style={{ maxWidth: "20%" }}>
        <Form.Group className="mb-3">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => {
              e.preventDefault();
              setName(e.target.value);
            }}
          />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              e.preventDefault();
              setPassword(e.target.value);
            }}
          />
        </Form.Group> */}
        <Form.Group className="mb-3" controlId="formBasicRole">
          <Form.Label>Role</Form.Label>
          <Form.Select
            value={role}
            onChange={(e) => {
              e.preventDefault();
              setRole(e.target.value);
            }}
          >
            <option>Student</option>
            <option>Teacher</option>
            <option>Organizer</option>
            <option>Administrator</option>
          </Form.Select>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            const nameNoWhitespace = name.replace(/\s/g, "");
            props.setHostName(name);
            setName("");
            if (role === "Administrator") {
              props.setModerator(true);
            }
            setRole("Student");
            if (nameNoWhitespace.length === 0) {
              alert("Invalid input. Enter appropriate name.");
              return;
            }
            props.setLoggedIn(true);
            let path = `/Dashboard`;
            navigate(path);
            // Call backend using he apprioriate values from here.
          }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
