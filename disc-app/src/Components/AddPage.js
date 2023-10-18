import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AddEventForm from "./AddEventForm";
import NavBar from "./Navbar";
function AddEditPage(props) {
  return (
    <div>
      <NavBar />
      <AddEventForm hostName={props.hostName} />
    </div>
  );
}

export default AddEditPage;
