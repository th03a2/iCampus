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
  return (
    <MDBContainer className="">
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
          {messages.map((data, key) => (
            <tr key={key}>
              <td>{1 + key}</td>
              {data.isSeen === false ? (
                <td className="cursor-pointer" onClick={() => handleSeen(data)}>
                  <h5>
                    <strong>{data.email}</strong>
                  </h5>
                  <strong>{handleMessages(data)}</strong>
                </td>
              ) : (
                <td className="cursor-pointer" onClick={() => handleSeen(data)}>
                  <h5>{data.email}</h5>
                  {handleMessages(data)}
                </td>
              )}
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      <Modal
        setVisibiliy={setVisibility}
        visibility={visibility}
        schoolMessage={schoolMessage}
      />
    </MDBContainer>
  );
};

export default Cart;
