import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// import firebase from "firebase/compat/app";
// import { doc, deleteDoc } from "firebase/firestore";
import Form from "react-bootstrap/Form";
import { doc, updateDoc, collection } from "firebase/firestore";
import { projDB } from "../firebase/config";
// import EventPopUp from "./EventPopUp";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
// import EditEventPopUp from "./EditEventPopUp";
import EditEventForm from "./EditEventForm";
const Event = (evIn) => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [attStatus, setAttStatus] = useState("Will NOT Attend");

  // useEffect(() => {
  //   const insideFunc = async () => {
  //     if (fBaseRef != null && fBaseInfo != null) {
  //       const updateEventRef = doc(projDB, "events", fBaseRef);
  //       setDoc(updateEventRef, fBaseInfo).then(() => {
  //         setFBaseRef(null);
  //         setFBaseInfo(null);
  //       });
  //     }
  //   };
  //   insideFunc();
  // }, [fBaseRef, fBaseInfo]);

  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
  };
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const handleClose2 = (e) => {
    e.preventDefault();
    setShow2(false);
  };
  const handleShow2 = (e) => {
    e.preventDefault();
    setShow2(true);
  };
  const handleClose3 = (e) => {
    e.preventDefault();
    setShow3(false);
  };
  const handleShow3 = (e) => {
    e.preventDefault();
    setShow3(true);
  };
  const props = evIn.eventIn;

  let attendingList = structuredClone(props.attendingList);
  let inviteList = structuredClone(props.inviteList);
  let maybeList = structuredClone(props.maybeList);
  let notAttList = structuredClone(props.notAttList);

  // console.log(inviteList);

  // props.inviteOnly = false;
  // props.guestCap = 5;
  // props.inviteList = [];
  // props.maybeList = [];
  // props.notAttList = [];
  // // props.inviteList.push(evIn.hostName);
  // props.attendingList = ["Noor", "Isaac", "Srihita", "Anish"];
  let counter = 0;
  useEffect(() => {
    if (counter !== 0) {
      return;
    }
    counter++;
    if (attendingList.includes(evIn.hostName)) {
      setAttStatus("Will Attend");
    } else if (maybeList.includes(evIn.hostName)) {
      setAttStatus("Tentative");
    }
  }, []);

  const deleteUser = async (listName, userName) => {
    if (attendingList.includes(userName)) {
      const index = attendingList.indexOf(userName);
      if (index > -1) {
        // only splice array when item is found
        attendingList.splice(index, 1); // 2nd parameter means remove one item only
      }
    } else if (maybeList.includes(userName)) {
      const index = maybeList.indexOf(userName);
      if (index > -1) {
        // only splice array when item is found
        maybeList.splice(index, 1); // 2nd parameter means remove one item only
      }
    } else if (notAttList.includes(userName)) {
      const index = notAttList.indexOf(userName);
      if (index > -1) {
        // only splice array when item is found
        notAttList.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    let sendInfo = structuredClone(props);

    const docRefId = await doc(collection(projDB, "events"), props.docId);
    // Then aupdate all the lists in firebase.
    sendInfo.attendingList = attendingList;
    sendInfo.maybeList = maybeList;
    sendInfo.notAttList = notAttList;

    await updateDoc(docRefId, sendInfo);

    alert(`User ${userName} successfully removed from ${listName}!`);
  };

  /*
    props format:
    title: str
    host: str
    time: str
    date: str
    location: str
    descr: str
    fId: descr
    img: str
    */
  //  console.log(docId);
  // const db = getFirestore();

  const setRSVP = async () => {
    // Current RSVP status is attStatus]
    // Search for the username in several lists, and if they are there, remove them.
    // Then add them to the list they want to be in.
    // Then update firebase for all the lists.
    console.log(evIn.hostName);

    // Remove the user from the current list they are in
    if (attendingList.includes(evIn.hostName)) {
      const index = attendingList.indexOf(evIn.hostName);
      if (index > -1) {
        // only splice array when item is found
        attendingList.splice(index, 1); // 2nd parameter means remove one item only
      }
    } else if (maybeList.includes(evIn.hostName)) {
      const index = maybeList.indexOf(evIn.hostName);
      if (index > -1) {
        // only splice array when item is found
        maybeList.splice(index, 1); // 2nd parameter means remove one item only
      }
    } else if (notAttList.includes(evIn.hostName)) {
      const index = notAttList.indexOf(evIn.hostName);
      if (index > -1) {
        // only splice array when item is found
        notAttList.splice(index, 1); // 2nd parameter means remove one item only
      }
    }

    // Add the user to the new list they should be a part of.
    if (attStatus === "Will Attend") {
      attendingList.push(evIn.hostName);
    } else if (attStatus === "Tentative") {
      maybeList.push(evIn.hostName);
    } else {
      notAttList.push(evIn.hostName);
    }
    let sendInfo = structuredClone(props);

    const docRefId = await doc(collection(projDB, "events"), props.docId);
    // Then aupdate all the lists in firebase.
    sendInfo.attendingList = attendingList;
    sendInfo.maybeList = maybeList;
    sendInfo.notAttList = notAttList;

    await updateDoc(docRefId, sendInfo);

    alert("RSVP Status Successfully Changed!");
  };

  const deleteEvent = async (e) => {
    e.preventDefault();
    // let identity = props.docId;
    // await deleteDoc(doc(projDB, "events", String(identity)));

    let delRef = projDB.collection("events").where("docId", "==", props.docId);
    // await deleteDoc(delRef.docs[0]);
    delRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs[0].ref.delete();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let descrText = props.desc; // Modify to allow only 20 characters
  if (descrText.length > 30) {
    descrText = descrText.substring(0, 30);
    descrText += " ...";
  }
  const userAuth = evIn.moderator || props.host === evIn.hostName;

  let showRsvp = true;
  if (props.inviteOnly) {
    showRsvp = false;
  }
  if (
    !props.inviteOnly ||
    (props.inviteOnly && inviteList.includes(evIn.hostName))
  ) {
    showRsvp = true;
  }
  if (
    props.guestCap === attendingList.length &&
    !attendingList.includes(evIn.hostName)
  ) {
    showRsvp = false;
  }

  return (
    <div>
      <Card style={{ width: "18rem", height: "40rem", margin: "5pt" }}>
        <Card.Img variant="top" src={props.img} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.host}</Card.Text>
          <Card.Text>{descrText}</Card.Text>
          <Card.Text>
            {props.date} || {props.time}
            <br />
            {props.location}
          </Card.Text>
          {userAuth && <Button onClick={handleShow2}>Edit Event</Button>}
          {userAuth && (
            <Button onClick={deleteEvent} style={{ marginLeft: "5px" }}>
              Delete Event
            </Button>
          )}
          <Button onClick={handleShow} style={{ marginTop: "5px" }}>
            Details
          </Button>
          <Button
            onClick={handleShow3}
            style={{ marginLeft: "5px", marginTop: "5px" }}
          >
            RSVP List
          </Button>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Event Details!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Name: {props.title}</Modal.Body>
        <Modal.Body>Location: {props.location}</Modal.Body>
        <Modal.Body>Date: {props.date}</Modal.Body>
        <Modal.Body>Time: {props.time}</Modal.Body>
        <Modal.Body>Description: {props.desc}</Modal.Body>
        <Modal.Body>Guest capacity: {props.guestCap}</Modal.Body>
        <Modal.Body id="rsvp-div">
          <Form style={{ display: !showRsvp ? "none" : "" }}>
            <Form.Group className="mb-3" controlId="formBasicRole">
              <Form.Label>
                RSVP HERE ({attendingList.length} attending)
              </Form.Label>
              <Form.Select
                value={attStatus}
                onChange={(e) => {
                  e.preventDefault();

                  setAttStatus(e.target.value);
                }}
              >
                <option>Will Attend</option>
                <option>Tentative</option>
                <option>Will NOT Attend</option>
              </Form.Select>
            </Form.Group>
            <Button
              variant="secondary"
              onClick={(e) => {
                // e.preventDefault();
                setRSVP();
              }}
            >
              RSVP
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <EditEventPopUp show = {show} onHide = {handleClose} /> */}

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header>
          <Modal.Title>Edit your Event!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditEventForm event={props} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show3} onHide={handleClose3}>
        <Modal.Header>
          <Modal.Title>RSVP List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Will Attend: {attendingList.length}
          <ol>
            {attendingList &&
              attendingList.map((user, idx) => (
                <li key={idx} userName={user}>
                  {user}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteUser("attending", user);
                    }}
                    style={{
                      backgroundColor: "red",
                      display: !userAuth ? "none" : "",
                    }}
                  >
                    x
                  </button>
                </li>
              ))}
          </ol>
        </Modal.Body>
        <Modal.Body>
          Maybe: {maybeList.length}
          <ol>
            {maybeList &&
              maybeList.map((user, idx) => (
                <li key={idx} userName={user}>
                  {user}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteUser("tentative attendance", user);
                    }}
                    style={{
                      backgroundColor: "red",
                      display: !userAuth ? "none" : "",
                    }}
                  >
                    x
                  </button>
                </li>
              ))}
          </ol>
        </Modal.Body>
        <Modal.Body>
          Won't Attend: {notAttList.length}
          <ol>
            {notAttList &&
              notAttList.map((user, idx) => (
                <li key={idx} userName={user}>
                  {user}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteUser("Non attendance", user);
                    }}
                    style={{
                      backgroundColor: "red",
                      display: !userAuth ? "none" : "",
                    }}
                  >
                    x
                  </button>
                </li>
              ))}
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose3}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Event;
