import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import DetailTable from "./table";
import axios from "axios";

export default function TransactionDetails({ saleId, date, time }) {
  const { theme } = useSelector(({ auth }) => auth),
    [transactions, setTransaction] = useState([]),
    [visibility, setVisibility] = useState(false);

  const handleToggle = () => setVisibility(!visibility);

  useEffect(() => {
    if (saleId) {
      axios
        .get(`commerce/saleitems?key=${saleId}`)
        .then(res => setTransaction(res.data));
    }
  }, [saleId]);

  return (
    <>
      <MDBBtn onClick={handleToggle} title="View transaction items." size="sm">
        <MDBIcon icon="eye" />
      </MDBBtn>
      <MDBModal
        staticBackdrop
        tabIndex="-1"
        show={visibility}
        setShow={setVisibility}
      >
        <MDBModalDialog size="lg" centered>
          <MDBModalContent className={`${theme.bg} ${theme.text}`}>
            <MDBModalHeader>
              <MDBModalTitle>
                {date}, {time}'s details
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={handleToggle}
              />
            </MDBModalHeader>
            <MDBModalBody className="text-start">
              <DetailTable items={transactions} />
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
