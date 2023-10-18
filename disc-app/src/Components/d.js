

// import Button from "react-bootstrap/esm/Button";
import NavBar from "./Navbar";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import {projDB} from "../firebase/config.js";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Event from "./Event";
const Dashboard = (props) => {
  const navigate = useNavigate();
  let num = 0;

  useEffect(() => {
    if (num !== 0) {
      return;
    }
    // if (!props.loggedIn) {
    //   alert("Please login");
    //   let path = `/Login`;
    //   navigate(path);
    //   num++;
    // }
  });
  const eventsRef = projDB.collection('events');
  const query = eventsRef.orderBy('createdAt');

  const [events] = useCollectionData(query, {idField: 'id'});
  return (
    <div>
      <NavBar />
    {events && events.map((ev, index) => <Event key = {index} fId = {ev.docId} eventIn = {ev} />)}
    </div>
  );
};

export default Dashboard;

