import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useStorage from "../hooks/useStorage";
import { useState } from "react";
import { storage } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import db from "../firebase/config";
import { doc, setDoc, addDoc, collection, updateDoc } from "firebase/firestore";
import projDB from "../firebase/config";
import { timestamp } from "../firebase/config";

let num = 0;
function EditEventForm(evIn) {
  const props = evIn.event;
  const [createdAt, setCreatedAt] = useState(props.createdAt);
  const [date, setDate] = useState(props.date);
  const [docId, setdocId] = useState(props.docId);
  const [host, setHost] = useState(props.host);
  const [img, setImg] = useState(props.img);
  const [location, setLocation] = useState(props.location);
  const [time, setTime] = useState(props.time);
  const [title, setTitle] = useState(props.title);
  const [desc, setDesc] = useState(props.desc);
  const [capacity, setCapacity] = useState(99999999999999);
  const [inviteOnlyCheckbox, setInviteOnlyCheckbox] = useState(false);
  const [participantList, setParticipantList] = useState("");

  function sendAllInfo() {
    addToDatabase();
    handleUpload();
  }

  let sendInfo = {
    createdAt: createdAt,

    date: date,

    desc: desc,

    docId: docId,

    host: host,

    img: "https://brand.gatech.edu/sites/default/files/inline-images/GTVertical_RGB.png",

    location: location,

    time: time,

    title: title,

    participantList: participantList,

    inviteOnly: inviteOnlyCheckbox,

    capacity: capacity,
  };

  const [file, setFile] = useState("");

  // progress
  const [percent, setPercent] = useState(0);

  // Handle file upload event and update state
  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  async function addToDatabase(e) {
    e.preventDefault();
    let noWSpace = date.replace(/\s/g, "");
    let noWSpace1 = desc.replace(/\s/g, "");
    // let noWSpace2 = docId.replace(/\s/g, "");
    let noWSpace3 = host.replace(/\s/g, "");
    let noWSpace4 = location.replace(/\s/g, "");
    let noWSpace5 = time.replace(/\s/g, "");
    let noWSpace6 = title.replace(/\s/g, "");

    if (noWSpace.length === 0) {
      alert("Please enter valid informration.");
      return;
    }
    if (noWSpace1.length === 0) {
      alert("Please enter valid informration.");
      return;
    }

    if (noWSpace3.length === 0) {
      alert("Please enter valid informration.");
      return;
    }
    if (noWSpace4.length === 0) {
      alert("Please enter valid informration.");
      return;
    }
    if (noWSpace5.length === 0) {
      alert("Please enter valid informration.");
      return;
    }
    if (noWSpace6.length === 0) {
      alert("Please enter valid informration.");
      return;
    }

    const docRefId = await doc(collection(projDB, "events"), props.docId);
    //const docRef = await addDoc(collection(projDB, "events"), sendInfo);
    //const docNeededId = docRef.id;
    //const deleteEventRef = doc(projDB, "events", docRefId);
    //sendInfo.docId = docNeededId;
    //const setting = await setDoc(deleteEventRef, sendInfo);
    const final = await updateDoc(docRefId, sendInfo);
    alert("The information has been successfully updated!");
  }
  function removePeople(removeList, original) {
    for (let i = 0; i < removeList.length; i++) {
      let arrIndex = original.indexOf(removeList[i]);

      if (arrIndex != -1) {
        original.splice(arrIndex, 1);
      }
    }
  }
  const handleUpload = () => {
    addToDatabase();
    if (!file) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/files/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
        });
      }
    );
  };
  return (
    <Form style={{ maxWidth: "30%" }}>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Event Title</Form.Label>
        <Form.Control
          value={title}
          onChange={(e) => {
            e.preventDefault();
            setTitle(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          value={desc}
          onChange={(e) => {
            e.preventDefault();
            setDesc(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Street Address</Form.Label>
        <Form.Control
          value={location}
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
          value={host}
          onChange={(e) => {
            e.preventDefault();
            setHost(e.target.value);
          }}
        />
      </Form.Group> */}

      <Form.Group className="mb-3">
        <Form.Label>Time</Form.Label>
        <Form.Control
          value={time}
          onChange={(e) => {
            e.preventDefault();
            setTime(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control
          value={date}
          onChange={(e) => {
            e.preventDefault();
            setDate(e.target.value);
          }}
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={addToDatabase}>
        Submit
      </Button>
    </Form>
  );
}
export default EditEventForm;
