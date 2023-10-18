import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import useStorage from "../hooks/useStorage";
import { useState } from "react";
import { storage } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import db from "../firebase/config";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import projDB from "../firebase/config";
import { timestamp } from "../firebase/config";
// import idCounter from "../App";
import { useNavigate } from "react-router";
import "./Dashboard.css";

// let num = 0;
function EventForm(props) {
  // const [createdAt, setCreatedAt] = useState("");
  const [date, setDate] = useState("");
  // const [docId, setdocId] = useState("");
  const [host, setHost] = useState(props.hostName);
  // const [img, setImg] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [capacity, setCapacity] = useState(99999999999999);
  const [inviteOnlyCheckbox, setInviteOnlyCheckbox] = useState(false);
  const [participantList, setParticipantList] = useState("");
  const navigate = useNavigate();
  // function sendAllInfo() {
  //   addToDatabase();
  //   handleUpload();
  // }

  let sendInfo = {
    createdAt: timestamp.now(),

    date: date,

    desc: desc,

    docId: "",

    host: host,

    img: "https://brand.gatech.edu/sites/default/files/inline-images/GTVertical_RGB.png",

    location: location,

    time: time,

    title: title,

    // participantList: participantList,

    inviteOnly: inviteOnlyCheckbox,

    guestCap: capacity,

    inviteList: [],

    attendingList: [],

    maybeList: [],

    notAttList: [],
  };

  // const [file, setFile] = useState("");

  // progress
  // const [percent, setPercent] = useState(0);

  // Handle file upload event and update state
  // function handleChange(event) {
  //   setFile(event.target.files[0]);
  // }
  async function addToDatabase(e) {
    e.preventDefault();
    let noWSpace = date.replace(/\s/g, "");
    let noWSpace1 = desc.replace(/\s/g, "");
    // let noWSpace3 = host.replace(/\s/g, "");
    let noWSpace4 = location.replace(/\s/g, "");
    let noWSpace5 = time.replace(/\s/g, "");
    let noWSpace6 = title.replace(/\s/g, "");
    let noWSpace7 = toString(capacity).replace(/\s/g, "");
    let alertString = "Please enter valid information.";
    if (noWSpace.length === 0) {
      alert(alertString);
      return;
    }
    if (noWSpace1.length === 0) {
      alert(alertString);
      return;
    }

    if (props.hostName.length === 0) {
      alert("Please Login");
      navigate("/login");
      return;
      //
    }
    if (noWSpace4.length === 0) {
      alert(alertString);
      return;
    }
    if (noWSpace5.length === 0) {
      alert(alertString);
      return;
    }
    if (noWSpace6.length === 0) {
      alert(alertString);
      return;
    }
    if (noWSpace7.length === 0) {
      alert(alertString);
      return;
    }

    if (date.length !== 10) {
      alert("Ensure DD/MM/YYYY format.");
      return;
    }

    let numSlash = 0;
    for (let i = 0; i < date.length; i++) {
      if (
        !["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(date[i])
      ) {
        numSlash++;
      }
    }

    if (numSlash !== 2) {
      alert("Ensure DD/MM/YYYY format.");
      return;
    }

    sendInfo.inviteList = participantList.split(",");
    setDate("");
    setTime("");
    setTitle("");
    setLocation("");
    setHost("");
    setDesc("");
    setInviteOnlyCheckbox(false);
    setCapacity("");
    setParticipantList("");

    const docRef = await addDoc(collection(projDB, "events"), sendInfo);
    const docNeededId = docRef.id;
    const deleteEventRef = doc(projDB, "events", docNeededId);
    sendInfo.docId = docNeededId;
    const setting = await setDoc(deleteEventRef, sendInfo);
    alert("Event successfully created!");
    navigate("/Dashboard");
  }
  // const handleUpload = () => {
  //   addToDatabase();
  //   // if (!file) {
  //   //   alert("Please upload an image first!");
  //   // }

  //   // const storageRef = ref(storage, `/files/${file.name}`);

  //   // progress can be paused and resumed. It also exposes progress updates.
  //   // Receives the storage reference and the file to upload.
  //   // const uploadTask = uploadBytesResumable(storageRef, file);

  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const percent = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );

  //       // update progress
  //       setPercent(percent);
  //     },
  //     (err) => console.log(err),
  //     () => {
  //       // download url
  //       getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //         console.log(url);
  //       });
  //     }
  //   );
  // };
  return (
    <Form className="bop">
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Event Title</Form.Label>
        <Form.Control
          onChange={(e) => {
            e.preventDefault();
            setTitle(e.target.value);
          }}
          placeholder="Event Title!"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          onChange={(e) => {
            e.preventDefault();
            setDesc(e.target.value);
          }}
          placeholder="Event Description!"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Street Address</Form.Label>
        <Form.Control
          onChange={(e) => {
            e.preventDefault();
            setLocation(e.target.value);
          }}
          placeholder="Eg: 770 Atlantic Drive, NW"
        />
      </Form.Group>

      {/* <Form.Group className="mb-3">
        <Form.Label>Host</Form.Label>
        <Form.Control
          onChange={(e) => {
            e.preventDefault();
            setHost(e.target.value);
          }}
          placeholder="Event Host!"
        />
      </Form.Group> */}

      <Form.Group className="mb-3">
        <Form.Label>Time</Form.Label>
        <Form.Control
          onChange={(e) => {
            e.preventDefault();
            setTime(e.target.value);
          }}
          placeholder="2:00 PM"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control
          onChange={(e) => {
            e.preventDefault();

            setDate(e.target.value);
          }}
          placeholder="DD/MM/YYYY"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Guest Capacity</Form.Label>
        <Form.Control
          onChange={(e) => {
            e.preventDefault();
            setCapacity(parseInt(e.target.value));
          }}
        />
      </Form.Group>

      <Form.Group>
        <Form.Check
          label="Invite Only"
          value={inviteOnlyCheckbox}
          type="checkbox"
          onClick={(e) => {
            // e.preventDefault();
            if (!inviteOnlyCheckbox) {
              setParticipantList("");
            }
            setInviteOnlyCheckbox(!inviteOnlyCheckbox);
          }}
        />
      </Form.Group>

      <Form.Group
        style={{
          display: inviteOnlyCheckbox ? "" : "none",
        }}
        className="mb-3"
      >
        <Form.Label>
          Invited Attendees (Comma separated, without spaces)
        </Form.Label>
        <Form.Control
          onChange={(e) => {
            e.preventDefault();
            setParticipantList(e.target.value);
          }}
          placeholder="participant1,participant2....."
          disabled={!inviteOnlyCheckbox}
        />
      </Form.Group>
      {/* <div>
            <input type="file" onChange={handleChange} accept="/image/*" />
            <p>{percent} "% done"</p>
        </div> */}
      <Button
        style={{ marginTop: "5px" }}
        variant="primary"
        type="submit"
        onClick={addToDatabase}
      >
        Submit
      </Button>
    </Form>
  );
}
export default EventForm;
