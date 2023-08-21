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
import { useSelector } from "react-redux";
import Parents from "./components/parents";
import Siblings from "./components/siblings";
import Personnel from "./components/personnel";
import { toast } from "react-toastify";

export default function Modal({
  visibility,
  setVisibility,
  information,
  status,
}) {
  const { theme, auth } = useSelector(({ auth }) => auth);

  const [activeItem, setActiveItem] = useState("basic");

  const [link, setLink] = useState({
    personnel: true,
    parents: true,
    siblings: true,
    approved: false,
  });

  const tabs = [
    {
      title: "Personnal",
      key: "personnel",
    },

    {
      title: "Parents",
      key: "parents",
    },
    {
      title: "Siblings",
      key: "siblings",
    },
  ];

  const handleActiveContent = (activeItem) => {
    switch (activeItem) {
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

      default:
        return (
          <Personnel
            information={information}
            setActiveItem={setActiveItem}
            link={link}
            setLink={setLink}
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
