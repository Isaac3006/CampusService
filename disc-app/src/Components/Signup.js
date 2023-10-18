import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const navigate = useNavigate();
  const [emailFiller, setEmailFiller] = useState("Enter GT email address");
  const [compName, setCompName] = useState("");
  let num = 0;
  useEffect(() => {
    if (props.loggedIn) {
      if (num === 0) {
        alert("You are already logged in.");
        let path = `/Dashboard`;
        navigate(path);
      }
      num++;
    }
  });
  const compNameField = (
    <Form.Group className="mb-3">
      <Form.Label>Company Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Company Name"
        value={compName}
        onChange={(e) => {
          e.preventDefault();
          setCompName(e.target.value);
        }}
      />
    </Form.Group>
  );

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {/* LOGIN PAGE DEBUGGING */}
      <Form style={{ maxWidth: "20%" }}>
        <Form.Group className="mb-3" controlId="formBasicRole">
          <Form.Label>Role</Form.Label>
          <Form.Select
            value={role}
            onChange={(e) => {
              e.preventDefault();
              setRole(e.target.value);
              if (e.target.value === "Organizer") {
                setEmailFiller("Enter company email address");
              } else {
                setEmailFiller("Enter GT email address");
                setCompName("");
              }
            }}
          >
            <option>Student</option>
            <option>Teacher</option>
            <option>Organizer</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder={emailFiller}
            value={email}
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
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
        </Form.Group>

        {role === "Organizer" ? compNameField : null}

        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            const emailNoWhitespace = email.replace(/\s/g, "");
            const pswdNoWhitespace = password.replace(/\s/g, "");
            const compNameNoWhitespace = compName.replace(/\s/g, "");
            setEmail("");
            setPassword("");
            setRole("Student");
            setCompName("");
            if (
              emailNoWhitespace.length === 0 ||
              pswdNoWhitespace.length === 0 ||
              (role === "Organizer" && compNameNoWhitespace.length === 0)
            ) {
              if (role === "Organizer") {
                alert(
                  "Invalid input. Enter appropriate email, password, and company name."
                );
              } else {
                alert("Invalid input. Enter appropriate email and password.");
              }
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

export default Signup;
