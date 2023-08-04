import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBTabsContent,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBIcon,
  MDBContainer,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import Basic from "./components/basic";
import Parents from "./components/parents";
import Guardian from "./components/guardian";
import Siblings from "./components/siblings";
import Credentials from "./components/credentials";
import Personnel from "./components/personnel";
import { toast } from "react-toastify";

export default function Modal({ visibility, setVisibility, information }) {
  const { theme, auth } = useSelector(({ auth }) => auth);

  const [activeItem, setActiveItem] = useState("basic"),
    [schoolInfo, setSchoolInfo] = useState({
      levelId: 0,
      units: "",
      specifications: "null",
    });

  const [levels, setLevels] = useState([]);
  const [category, setCategory] = useState("");

  const [link, setLink] = useState({
    basic: true,
    personnel: true,
    guardian: true,
    parents: true,
    siblings: true,
    credentials: true,
    approved: false,
  });

  const [guardian, setGuardian] = useState({
    studentId: auth._id,
    fname: "",
    mname: "",
    lname: "",
    suffix: "",
    isMale: "",
    phone: "",
    street: "",
    brgy: "",
    occupation: "",
    muni: "",
    province: "",
    relationShip: "",
  });

  const tabs = [
    {
      title: "School",
      key: "basic",
    },
    {
      title: "Personnal",
      key: "personnel",
    },
    {
      title: "Guardian",
      key: "guardian",
    },
    {
      title: "Parents",
      key: "parents",
    },
    {
      title: "Siblings",
      key: "siblings",
    },
    {
      title: "Credentials",
      key: "credentials",
    },
  ];

  const handleActiveContent = (activeItem) => {
    switch (activeItem) {
      case "guardian":
        return (
          <Guardian
            guardian={guardian}
            setGuardian={setGuardian}
            setActiveItem={setActiveItem}
            link={link}
            setLink={setLink}
            information={information}
          />
        );

      case "parents":
        return (
          <Parents
            setActiveItem={setActiveItem}
            link={link}
            setLink={setLink}
            information={information}
          />
        );

      case "siblings":
        return (
          <Siblings
            information={information}
            setActiveItem={setActiveItem}
            link={link}
            setLink={setLink}
          />
        );

      case "credentials":
        return (
          <Credentials
            setActiveItem={setActiveItem}
            link={link}
            setLink={setLink}
            information={information}
          />
        );

      case "personnel":
        return (
          <Personnel
            information={information}
            setActiveItem={setActiveItem}
            link={link}
            setLink={setLink}
          />
        );

      default:
        return (
          <Basic
            levels={levels}
            setLevels={setLevels}
            schoolInfo={schoolInfo}
            setSchoolInfo={setSchoolInfo}
            setActiveItem={setActiveItem}
            link={link}
            setLink={setLink}
            setCategory={setCategory}
            category={category}
            information={information}
          />
        );
    }
  };
  const handleClose = () => {
    setVisibility(false);
  };

  return (
    <MDBModal show={visibility} setShow={setVisibility} staticBackdrop>
      <MDBModalDialog size="fullscreen">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>
              <MDBIcon
                fas
                icon="info-circle"
                style={{ width: "30px" }}
                color="warning"
              />
              <strong>Information</strong>
            </MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={handleClose} />
          </MDBModalHeader>
          <MDBModalBody className={`${theme.bg} ${theme.text} gui-viewer `}>
            {/* <MDBCard className="h-100">
              <MDBCardBody> */}
            <MDBContainer className="shadow-4">
              <MDBTabs justify fill>
                {tabs.map((tab, index) => (
                  <MDBTabsItem key={`registration-${index}`}>
                    <MDBTabsLink
                      onClick={() => {
                        if (link[tab.key]) {
                          setActiveItem(tab.key);
                        } else {
                          toast.warn("Complete the previous tab first.");
                        }
                      }}
                      active={activeItem === tab.key}
                    >
                      {tab.title}
                    </MDBTabsLink>
                  </MDBTabsItem>
                ))}
              </MDBTabs>
              <MDBTabsContent activeItem={activeItem}>
                {handleActiveContent(activeItem)}
              </MDBTabsContent>
            </MDBContainer>
            {/* </MDBCardBody>
            </MDBCard> */}
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
