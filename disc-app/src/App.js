import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Welcome from "./Components/Welcome";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapObject from "./Components/Map";
import { useState, useEffect } from "react";
import AddPage from "./Components/AddPage";
import MyEvents from "./Components/MyEvents";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [moderator, setModerator] = useState(false);
  const [hostName, setHostName] = useState("");
  const [hostToFilter, setHostToFilter] = useState("");
  const [dateToFilter, setDateToFilter] = useState("");
  const [locationToFilter, setLocationToFilter] = useState("");
  const [toFilter, setToFilter] = useState(false);

  // useEffect(() => {
  //   console.log(
  //     "location: ",
  //     locationToFilter,
  //     " date: ",
  //     dateToFilter,
  //     " host: ",
  //     hostToFilter
  //   );
  // }, [locationToFilter, dateToFilter, hostToFilter]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome loggedIn={loggedIn} />} />
        <Route path="/Welcome" element={<Welcome loggedIn={loggedIn} />} />
        <Route
          path="/Login"
          element={
            <Login
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              setModerator={setModerator}
              setHostName={setHostName}
            />
          }
        />
        <Route
          path="/Dashboard"
          element={
            <Dashboard
              loggedIn={loggedIn}
              moderator={moderator}
              hostName={hostName}
              hostToFilter={hostToFilter}
              dateToFilter={dateToFilter}
              locationToFilter={locationToFilter}
              toFilter={toFilter}
              setHostToFilter={setHostToFilter}
              setDateToFilter={setDateToFilter}
              setLocationToFilter={setLocationToFilter}
              setToFilter={setToFilter}
            />
          }
        />
        <Route
          path="/Signup"
          element={<Signup loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="/AddPage"
          element={<AddPage hostName={hostName} loggedIn={loggedIn} />}
        />
        <Route
          path="/MyEvents"
          element={<MyEvents hostName={hostName} loggedIn={loggedIn} />}
        />
        <Route
          path="/Map"
          element={
            <MapObject
              hostToFilter={hostToFilter}
              dateToFilter={dateToFilter}
              locationToFilter={locationToFilter}
              toFilter={toFilter}
            />
          }
          // Pass in the filter information to the map here.
        />
      </Routes>
    </Router>
  );
}

export default App;
