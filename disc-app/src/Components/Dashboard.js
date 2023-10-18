// import Button from "react-bootstrap/esm/Button";
import NavBar from "./Navbar";
import Button from "react-bootstrap/Button";
// import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { projDB } from "../firebase/config.js";
import { doc, updateDoc, collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Event from "./Event";
import "./Dashboard.css";
import Form from "react-bootstrap/Form";

const Dashboard = (props) => {
  //let hostToFilter = props.hostToFilter
  // let setHostToFilter = props.setHostToFilter
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

  const [sortByDate, setSortByDate] = useState(false);
  // const [toFilter, setToFilter] = useState(false);
  const [sortByLocation, setSortByLocation] = useState(false);
  const [sortByHost, setSortByHost] = useState(false);
  // const [hostToFilter, setHostToFilter] = useState("");
  // const [dateToFilter, setDateToFilter] = useState("");
  // const [locationToFilter, setLocationToFilter] = useState("");
  const [filterText, setFilterText] = useState("Show Filters");
  const [filterDisplay, setFilterDisplay] = useState(false);
  const eventsRef = projDB.collection("events");
  const query = eventsRef.orderBy("createdAt"); // remove this in case we need to disimulate
  // const query2 = eventsRef.orderBy("date");
  // const query3 = eventsRef.orderBy("location");
  // const query4 = eventsRef.orderBy("host");
  let [events] = useCollectionData(query, { idField: "id" });
  // let [events] = useCollectionData(query, { idField: "id" });
  // let [events] = useCollectionData(query, { idField: "id" });

  const [pNum, setPNum] = useState(1);
  let evCopy = useCollectionData(query, { idField: "id" });
  const [pageArr, setPageArr] = useState([]);
  const [fBaseRef, setFBaseRef] = useState(null);
  const [fBaseInfo, setFBaseInfo] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([
    ...useCollectionData(query, { idField: "id" }),
  ]);
  const [renderDiv, setRenderDiv] = useState(0);

  let isFirstTime = true;

  useEffect(() => {
    if (isFirstTime) {
      console.log(
        props.toFilter,
        " location: ",
        props.locationToFilter,
        " date: ",
        props.dateToFilter,
        " host: ",
        props.hostToFilter
      );
      // isFirstTime = false;
      // setToFilter(props.toFilter);
      // setHostToFilter(props.hostToFilter);
      // setLocationToFilter(props.locationToFilter);
      // setDateToFilter(props.dateToFilter);
    }
  }, []);

  const displayFilters = (e) => {
    // e.preventDefault();
    if (filterText === "Show Filters") {
      setFilterText("Hide Filters");
      setFilterDisplay(true);
    } else {
      setFilterText("Show Filters");
      setFilterDisplay(false);
    }
  };

  useEffect(() => {
    if (!events) {
      return;
    }
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
    const insideFunc = async () => {
      if (fBaseRef != null && fBaseInfo != null) {
        const docRefId = await doc(collection(projDB, "events"), fBaseRef);
        const final = await updateDoc(docRefId, fBaseInfo);
      }
    };
    insideFunc();
  }, [fBaseRef, fBaseInfo]);

  function applyFilters() {
    // let result = [...events];
    events = evCopy[0];

    if (props.hostToFilter) {
      // result = result.filter((event) => event.host === hostToFilter);
      // setFilteredEvents(filteredEvents => filteredEvents.filter((el) => el.host === hostToFilter));
      events = events.filter((el) => el.host === props.hostToFilter);
    }
    if (props.dateToFilter) {
      events = events.filter((el) => el.data === props.dateToFilter);
      // result = result.filter((event) => event.date === dateToFilter);
    }
    if (props.locationToFilter) {
      events = events.filter((el) => el.location === props.locationToFilter);
      // result = result.filter((event) => event.location === locationToFilter);
    }
    setRenderDiv(renderDiv + 1);
  }

  function stringToDate(string) {
    let splittedString = string.split("/");
    let day = parseInt(splittedString[0]);
    let month = parseInt(splittedString[1]) - 1;
    let year = parseInt(splittedString[2]);
    return new Date(year, month, day, 0, 0, 0, 0);
  }

  const sortTheDate = (fa, fb) => {
    if (fa > fb) {
      return 1;
    }
    if (fb > fa) {
      return -1;
    }
    return 0;
  };

  function sortBy() {
    let resultCopy = [...filteredEvents];

    if (sortByDate) {
      resultCopy.sort((event) => stringToDate(event.date));
    } else if (sortByLocation) {
      resultCopy.sort((event) => event.location);
    } else if (sortByHost) {
      // const query = eventsRef.orderBy("host");
      resultCopy.sort((event) => event.host);
    }
  }
  return (
    <div>
      <NavBar />
      <Button
        onClick={() => {
          displayFilters();
        }}
        style={{ marginTop: "5px", marginLeft: "5px" }}
      >
        {filterText}
      </Button>
      <Form
        style={{
          maxWidth: "20%",
          display: filterDisplay === false ? "none" : "",
          marginTop: "5px",
          marginLeft: "5px",
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Location to Filter</Form.Label>
          <Form.Control
            value={props.locationToFilter}
            onChange={(e) => {
              e.preventDefault();
              props.setLocationToFilter(e.target.value);
            }}
            placeholder="Event Location!"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Date to Filter</Form.Label>
          <Form.Control
            value={props.dateToFilter}
            onChange={(e) => {
              e.preventDefault();
              props.setDateToFilter(e.target.value);
            }}
            placeholder="Event Date!"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Host to Filter</Form.Label>
          <Form.Control
            value={props.hostToFilter}
            onChange={(e) => {
              e.preventDefault();
              props.setHostToFilter(e.target.value);
            }}
            placeholder="Event Host!"
          />
        </Form.Group>
        <Form.Group>
          <Form.Check
            label="Sort By Date"
            value={sortByDate}
            type="checkbox"
            onClick={(e) => {
              // e.preventDefault();
              setSortByDate(!sortByDate);
            }}
          />
          <Form.Check
            label="Sort By Location"
            value={sortByLocation}
            type="checkbox"
            onClick={(e) => {
              // e.preventDefault();
              setSortByLocation(!sortByLocation);
            }}
          />
          <Form.Check
            label="Sort By Host"
            value={sortByHost}
            type="checkbox"
            onClick={(e) => {
              // e.preventDefault();
              setSortByHost(!sortByHost);
            }}
          />
        </Form.Group>
        <Button
          style={{ marginTop: "5px" }}
          variant="primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            applyFilters();
            sortBy();
            props.setToFilter(!props.toFilter);
            // if (!currToFilter) {
            //   props.setLocationToFilter(props.locationToFilter);
            //   props.setHostToFilter(props.hostToFilter);
            //   props.setDateToFilter(props.dateToFilter);
            // }
          }}
        >
          {props.toFilter ? "Undo Filter" : "Filter"}
        </Button>
      </Form>
      <div className="mid">
        {events &&
          events
            .sort((a, b) => {
              let fa = stringToDate(a.date),
                fb = stringToDate(b.date);
              if (sortByHost) {
                fa = a.host.toUpperCase();
                fb = b.host.toUpperCase();
              } else if (sortByLocation) {
                fa = a.location.toUpperCase();
                fb = b.location.toUpperCase();
              } else if (sortByDate) {
                return sortTheDate(fa, fb);
              } else {
                return 0;
              }

              if (fa < fb) {
                return -1;
              }
              if (fa > fb) {
                return 1;
              }
              return 0;
            })
            .slice(10 * (pNum - 1), 10 * (pNum - 1) + 10)
            .map((ev, index) => {
              if (!props.toFilter) {
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
              }
              if (
                props.hostToFilter.length !== 0 &&
                ev.host !== props.hostToFilter
              ) {
                return <span key={index}></span>;
              }
              if (
                props.dateToFilter.length !== 0 &&
                ev.date !== props.dateToFilter
              ) {
                return <span key={index}></span>;
              }
              if (
                props.locationToFilter.length !== 0 &&
                ev.location !== props.locationToFilter
              ) {
                return <span key={index}></span>;
              }
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

export default Dashboard;
