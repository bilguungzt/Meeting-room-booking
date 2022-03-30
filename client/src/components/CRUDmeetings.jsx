import React, { useEffect } from "react";
import axios from "axios";

const CRUDmeetings = () => {
  //STATES
  const [selected, setSelected] = React.useState("");
  const [meetings, setMeetings] = React.useState([]);
  const [show, setShow] = React.useState(0);
  const [rooms, setRooms] = React.useState([]);
  const [validated, setValidated] = React.useState(0);
  const [createMeeting, setCreateMeeting] = React.useState({
    StartTime: "",
    Description: "",
    Subject: "",
    Id: "",
    RoomId: "",
    EndTime: "",
    isReadonly: true,
  });
  const [date, setDate] = React.useState("");
  const [startSelected, setStartSelected] = React.useState("");
  const [endSelected, setEndSelected] = React.useState("");
  //ISO TO LOCAL
  const startTime = new Date(createMeeting.StartTime);
  const greaterDate =
    startTime.setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0);
  //VALIDATOR
  React.useEffect(() => {
    if (
      greaterDate &&
      createMeeting.Description &&
      startSelected &&
      createMeeting.RoomId &&
      createMeeting.Subject &&
      endSelected &&
      date
    ) {
      const time = Math.random() + Math.random() + Math.random();
      const str = time.toString();
      const slic = str.slice(3, 11);
      const id = parseInt(slic);
      setValidated(true);
      setCreateMeeting({ ...createMeeting, Id: id });
    } else {
      setValidated(0);
      // console.log(createMeeting);
    }
  }, [
    createMeeting.Description,
    createMeeting.EndTime,
    createMeeting.RoomId,
    createMeeting.Subject,
    createMeeting.StartTime,
    date,
    greaterDate,
  ]);
  ///DELETE Meeting DATA
  const deleteStudent = (id) => {
    axios.delete(`http://localhost:5000/students/${id}`);
    window.location.reload(false);
  };
  /////GET MEETINGS DATA
  React.useEffect(() => {
    axios.get("http://localhost:5000/students").then((allStudents) => {
      setMeetings(allStudents.data);
    });
  }, []);
  //GET ROOM DATA
  React.useEffect(() => {
    axios.get("http://localhost:5000/roomss").then((allStudents) => {
      setRooms(allStudents.data);
    });
  }, []);
  //CREATE Meeting DATA
  const createStudent = () => {
    axios.post("http://localhost:5000/students", createMeeting);
    window.location.reload(false);
  };
  //FILTER MEETINGS
  let filteredMeetings = meetings?.filter((data) => {
    const startTimeISOString = data.StartTime;
    const startTime = new Date(startTimeISOString);
    // console.log(
    //   startTime.setHours(0, 0, 0, 0),
    //   new Date().setHours(0, 0, 0, 0)
    // );
    const condition =
      startTime.setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0);
    // console.log(condition);
    return condition;
  });
  return (
    <>
      <div style={{ display: "grid", justifyContent: "center" }}>
        <h2>Meetings</h2>
        <select
          name="Meetings"
          id="1"
          style={{ width: "100%" }}
          onClick={(e) => {
            setSelected(e.target.value);
          }}
        >
          {filteredMeetings?.map((data) => (
            <option value={data._id} key={data._id} style={{ width: "100%" }}>
              {data.Subject}
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
        <div
          style={{
            display: `${show ? "grid" : "none"}`,
            justifyContent: "center",
          }}
        >
          <label>Subject</label>
          <input
            type="text"
            value={createMeeting.Subject}
            onChange={(event) => {
              setCreateMeeting({
                ...createMeeting,
                Subject: event.target.value,
              });
            }}
          />
          <label>Description</label>
          <input
            type="text"
            value={createMeeting.Description}
            onChange={(event) => {
              setCreateMeeting({
                ...createMeeting,
                Description: event.target.value,
              });
            }}
          />

          <label htmlFor="">Select Date</label>
          <input
            type="date"
            onChange={(e) => {
              setDate(e.target.value);
              setCreateMeeting({
                ...createMeeting,
                EndTime: `${e.target.value}T${endSelected}`,
              });
              setCreateMeeting({
                ...createMeeting,
                StartTime: `${e.target.value}T${startSelected}`,
              });

              //   console.log(date);
            }}
          />
          <label htmlFor="">Start Time</label>
          <select
            name="Start Time"
            id=""
            onClick={(e) => {
              setStartSelected(e.target.value);

              setCreateMeeting({
                ...createMeeting,
                StartTime: `${date}T${e.target.value}`,
              });
            }}
          >
            <option value="03:00:00.00Z">8:00 AM</option>
            <option value="04:00:00.00Z">9:00 AM</option>
            <option value="05:00:00.00Z">10:00 AM</option>
            <option value="06:00:00.00Z">11:00 AM</option>
            <option value="07:00:00.00Z">12:00 PM</option>
            <option value="08:00:00.00Z">1:00 PM</option>
            <option value="09:00:00.00Z">2:00 PM</option>
            <option value="10:00:00.00Z">3:00 PM</option>
            <option value="11:00:00.00Z">4:00 PM</option>
            <option value="12:00:00.00Z">5:00 PM</option>
            <option value="13:00:00.00Z">6:00 PM</option>
            <option value="14:00:00.00Z">7:00 PM</option>
          </select>
          <label htmlFor="">End Time</label>
          <select
            name="End Time"
            id=""
            onClick={(e) => {
              setEndSelected(e.target.value);

              setCreateMeeting({
                ...createMeeting,
                EndTime: `${date}T${e.target.value}`,
              });
            }}
          >
            <option value="04:00:00.00Z">9:00 AM</option>
            <option value="05:00:00.00Z">10:00 AM</option>
            <option value="06:00:00.00Z">11:00 AM</option>
            <option value="07:00:00.00Z">12:00 PM</option>
            <option value="08:00:00.00Z">1:00 PM</option>
            <option value="09:00:00.00Z">2:00 PM</option>
            <option value="10:00:00.00Z">3:00 PM</option>
            <option value="11:00:00.00Z">4:00 PM</option>
            <option value="12:00:00.00Z">5:00 PM</option>
            <option value="13:00:00.00Z">6:00 PM</option>
            <option value="14:00:00.00Z">7:00 PM</option>
            <option value="15:00:00.00Z">8:00 PM</option>
          </select>
          <label htmlFor="">Select Room</label>
          <select
            name="Rooms"
            id="1"
            style={{ width: "100%" }}
            onClick={(e) => {
              setCreateMeeting({
                ...createMeeting,
                RoomId: e.target.value,
              });
              console.log(createMeeting);
            }}
          >
            {rooms?.map((data) => (
              <option value={data.id} key={data.id} style={{ width: "100%" }}>
                {data.text}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              if (validated) {
                createStudent();
              }
            }}
          >
            {validated ? "Create Meeting" : "Data is invalid or incomplete"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CRUDmeetings;
