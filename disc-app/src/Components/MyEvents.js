// import Button from "react-bootstrap/esm/Button";
import NavBar from "./Navbar";
// import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { projDB } from "../firebase/config.js";
import { doc, updateDoc, collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Event from "./Event";
import "./Dashboard.css";
const MyEvents = (props) => {
  // const navigate = useNavigate();
  // let num = 0;

  // useEffect(() => {
  //   if (num !== 0) {
  //     return;
  //   }
  //   // if (!props.loggedIn) {
  //   //   alert("Please login");
  //   //   let path = `/Login`;
  //   //   navigate(path);
  //   //   num++;
  //   // }
  // });

  const eventsRef = projDB.collection("events");
  const query = eventsRef.orderBy("createdAt"); // remove this in case we need to disimulate
  const [pNum, setPNum] = useState(1);
  const [events] = useCollectionData(query, { idField: "id" });
  //const events = firestore.collections()
  // const querySnapshot = await getDocs(collection(projDB, "events"));
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });
  //  const events =[];
  //  const snapShot = await projDB.collection("events").get();
  //  snapShot.docs.map(docu => events.push(docu.data));
  const [pageArr, setPageArr] = useState([]);
  const [fBaseRef, setFBaseRef] = useState(null);
  const [fBaseInfo, setFBaseInfo] = useState(null);
  const [conflicts, setConflicts] = useState([]);
  useEffect(() => {
    if (!events) {
      return;
    }
    //    console.log(events);
    let numPages = Math.floor(events.length / 10);
    if (events.length % 10 !== 0) {
      numPages++;
    }
    setPageArr(pageArr.filter((a) => a === -1));
    let incr = 1;
    let newPgs = [];
    while (incr <= numPages) {
      newPgs.push(incr);
      incr++;
    }
    setPageArr(newPgs);
  }, [events]);

  useEffect(() => {
    if (!events) {
      return;
    }
    let filter1 = filterByParticipantAttendance(events);
    let filter2 = filterByParticipantAttendance(events);
    for (let index = 0; index < filter1.length; index++) {
      let ev = filter1[index];
      for (let i = index + 1; i < filter2.length; i++) {
        if (ev.date === filter2[i].date && ev.time === filter2[i].time) {
          let conflicted = [ev, filter2[i]];
          setConflicts((conflicts) => [...conflicts, conflicted]);
        }
      }
    }
  }, [events]);

  useEffect(() => {
    const insideFunc = async () => {
      if (fBaseRef != null && fBaseInfo != null) {
        const docRefId = await doc(collection(projDB, "events"), fBaseRef);
        const final = await updateDoc(docRefId, fBaseInfo);
      }
    };
    insideFunc();
  }, [fBaseRef, fBaseInfo]);
  function filterByParticipantAttendance(events) {
    let eventsWithPerson = events.filter((event) =>
      event.attendingList.includes(props.hostName)
    );
    return eventsWithPerson;
  }
  //console.log(props.hostName);
  return (
    <div>
      <NavBar />
      <div className="mid">
        {events &&
          filterByParticipantAttendance(events)
            .slice(10 * (pNum - 1), 10 * (pNum - 1) + 10)
            .map((ev, index) => {
              return (
                <Event
                  key={index}
                  fId={ev.docId}
                  eventIn={ev}
                  moderator={props.moderator}
                  hostName={props.hostName}
                  fBaseRef={fBaseRef}
                  setFBaseRef={setFBaseRef}
                  fBaseInfo={fBaseInfo}
                  setFBaseInfo={setFBaseInfo}
                />
              );
            })}
      </div>
      <div>
        {conflicts &&
          conflicts.map((conflict, index) => {
            if (!conflict || conflict.length === 0) {
              return <span key={index}></span>;
            }
            return (
              <div
                style={{ display: "flex", flexDirection: "row" }}
                key={index}
              >
                <span style={{ fontWeight: "bold" }} key={index}>
                  Conflict between:
                </span>
                <br />
                <div>
                  <Event
                    key={index}
                    fId={conflict[0].docId}
                    eventIn={conflict[0]}
                    moderator={props.moderator}
                    hostName={props.hostName}
                    fBaseRef={fBaseRef}
                    setFBaseRef={setFBaseRef}
                    fBaseInfo={fBaseInfo}
                    setFBaseInfo={setFBaseInfo}
                  />
                </div>

                <div>
                  <Event
                    key={index}
                    fId={conflict[1].docId}
                    eventIn={conflict[1]}
                    moderator={props.moderator}
                    hostName={props.hostName}
                    fBaseRef={fBaseRef}
                    setFBaseRef={setFBaseRef}
                    fBaseInfo={fBaseInfo}
                    setFBaseInfo={setFBaseInfo}
                  />
                </div>
                {/* <div>{conflict[0]}</div>
                <div>{conflict[1]}</div> */}
              </div>
            );
          })}
      </div>
      <br />
      {pageArr &&
        pageArr.map((pg) => (
          <button
            style={{
              marginLeft: "4px",
              marginRight: "4px",
              marginBottom: "10px",
              backgroundColor: pg === pNum ? "#1792aa" : "white",
            }}
            key={pg}
            onClick={(e) => {
              e.preventDefault();
              setPNum(pg);
            }}
          >
            {pg}
          </button>
        ))}
    </div>
  );
};

export default MyEvents;
