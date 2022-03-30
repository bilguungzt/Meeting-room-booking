import React from "react";
import axios from "axios";

const CRUDrooms = () => {
  //STATES
  const [rooms, setRooms] = React.useState([]);
  const [show, setShow] = React.useState(0);
  const [validated, setValidated] = React.useState(0);
  const [selected, setSelected] = React.useState("");
  const [createRoom, setCreateRoom] = React.useState({
    text: "",
    color: "",
    capacity: "",
    type: "",
    id: "",
  });

  ////Generate color for room
  const randomcolor = () => {
    let maxVal = 0xffffff; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`.toString();
  };

  /////GET DATA
  React.useEffect(() => {
    axios.get("http://localhost:5000/roomss").then((allStudents) => {
      setRooms(allStudents.data);
    });
  }, []);

  ///DELETE DATA
  const deleteStudent = (id) => {
    axios.delete(`http://localhost:5000/roomss/${id}`);
    window.location.reload(false);
  };

  //CREATE DATA
  const createStudent = () => {
    axios.post("http://localhost:5000/roomss", createRoom);
    setSelected("");
    window.location.reload(false);
  };
  //VALIDATE

  React.useEffect(() => {
    if (createRoom.text && createRoom.capacity && createRoom.type) {
      const time = Math.random() + Math.random() + Math.random();
      const str = time.toString();
      const slic = str.slice(3, 11);
      const id = parseInt(slic);
      console.log(id);
      setValidated(true);
      setCreateRoom({ ...createRoom, id: id });
    } else {
      setCreateRoom({ ...createRoom, color: randomcolor() });
      setValidated(0);
    }
  }, [createRoom.text, createRoom.capacity, createRoom.type]);

  ///RENDER
  return (
    <>
      <div style={{ display: "grid", justifyContent: "center" }}>
        <h2>Rooms</h2>
        <select
          name="Rooms"
          id="1"
          style={{ width: "100%" }}
          onClick={(e) => {
            setSelected(e.target.value);
          }}
        >
          {rooms?.map((data) => (
            <option value={data._id} key={data._id} style={{ width: "100%" }}>
              {data.text}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            deleteStudent(selected);
          }}
        >
          Delete
        </button>
        <button
          onClick={() => {
            setShow(!show);
          }}
        >
          Add
        </button>
        {/* //CONDITION VIEW */}
        <div style={{ display: `${show ? "grid" : "none"}` }}>
          <label>Name</label>
          <input
            type="text"
            value={createRoom.text}
            onChange={(event) => {
              setCreateRoom({ ...createRoom, text: event.target.value });
            }}
          />
          <label>Type</label>
          <input
            type="text"
            value={createRoom.type}
            onChange={(event) => {
              setCreateRoom({ ...createRoom, type: event.target.value });
            }}
          />{" "}
          <label>Capacity</label>
          <input
            type="number"
            value={createRoom.capacity}
            onChange={(event) => {
              setCreateRoom({ ...createRoom, capacity: event.target.value });
            }}
          />
          <button
            onClick={() => {
              if (validated) {
                createStudent();
              }
            }}
          >
            {validated ? "CREATE ROOM" : "ENTER REQUIRED DATA"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CRUDrooms;
