import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
} from "mdb-react-ui-kit";
import io from "socket.io-client";
import { nameFormatter } from "../../utilities";
import Modal from "./viewMessage";
const socket = io("http://localhost:5000");
const Cart = () => {
  const { theme, auth } = useSelector(({ auth }) => auth);
  const [visibility, setVisibility] = useState(false);
  const [messages, setMessages] = useState([]);
  const [schoolMessage, setSchoolMessage] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date()); // Current date and time

  useEffect(() => {
    const _messages = localStorage.getItem("messages");
    const fakeDb = JSON.parse(_messages) || [];
    const existing = fakeDb.findIndex((data) => data.id === auth._id);

    const sortMessages =
      existing > -1
        ? fakeDb[existing]?.message.sort((a, b) => b.id - a.id)
        : [];

    setMessages(sortMessages);
  }, [auth._id, visibility]);

  const handleSeen = (data) => {
    setVisibility(true);
    setSchoolMessage(data);

    if (!data.isSeen) {
      const _messages = localStorage.getItem("messages");
      const fakeDb = JSON.parse(_messages) || [];
      const existing = fakeDb.findIndex((datas) => datas.id === auth._id);

      const newArray = [...fakeDb[existing].message];
      const index = newArray.findIndex((message) => message.id === data.id);
      if (index > -1) {
        newArray[index].isSeen = true;
        fakeDb[existing].message = newArray;
        socket.emit("enrollment_desicion", fakeDb[existing]);
        localStorage.setItem("messages", JSON.stringify(fakeDb));
      }
    }
  };

  const handleMessages = (data) => {
    switch (data.status) {
      case "approved":
        return (
          <strong>
            Congratulations Your journey with us promises new friendships,
            exciting opportunities..
          </strong>
        );

      case "onprogress":
        return `Dear ${nameFormatter(
          auth.fullName
        )}, we are pleased to inform you that your enrollment..`;
      default:
        return <strong>{data.issues.title}</strong>;
    }
  };

  const handleDateAndTime = (startDate) => {
    const timeDifference = currentTime - new Date(startDate);
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const days = Math.floor(hours / 24);
    const week = Math.floor(days / 7);

    return { minutes, hours, days, week };
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date()); // Update the current time every second
    }, 1000);

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, []);

  const handleTimeAgo = ({ minutes, hours, days, week }) => {
    // mins,hours,days,week
    if (hours === 0) {
      return " " + minutes + " m";
    } else if (days !== 0 && hours !== 0) {
      return " " + days + " d";
    } else if (week !== 0 && days !== 0) {
      return " " + week + " w";
    } else {
      return " " + hours + " h";
    }
  };
  return (
    <MDBContainer className="">
      <div
        className="table-container"
        style={{ maxHeight: "600px", overflowY: "auto" }}
      >
        <MDBTable align="middle" hover responsive color={theme.color}>
          <caption>List of messages</caption>
          <caption className="caption-top">
            Total of <b>{messages?.length}</b> Message(s)
          </caption>
          <MDBTableHead>
            <tr>
              <th>#</th>
              <th>Messages</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {messages.map((data, key) => {
              const date = handleDateAndTime(data.date);
              return (
                <tr key={key}>
                  <td>{1 + key}</td>
                  {data.isSeen === false ? (
                    <td
                      className="cursor-pointer"
                      onClick={() => handleSeen(data)}
                    >
                      <h5>
                        <strong>{data.email}</strong>
                      </h5>
                      <strong>{handleMessages(data)}</strong>
                      {handleTimeAgo(date)}
                    </td>
                  ) : (
                    <td
                      className="cursor-pointer"
                      onClick={() => handleSeen(data)}
                    >
                      <h6>
                        <strong>{data.email}</strong>
                      </h6>
                      {handleMessages(data)}
                      {handleTimeAgo(date)}
                    </td>
                  )}
                </tr>
              );
            })}
          </MDBTableBody>
        </MDBTable>
        <Modal
          setVisibiliy={setVisibility}
          visibility={visibility}
          schoolMessage={schoolMessage}
        />
      </div>
    </MDBContainer>
  );
};

export default Cart;
