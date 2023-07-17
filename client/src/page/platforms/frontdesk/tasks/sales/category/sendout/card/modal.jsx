import React from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import Menus from "../../../../patients/pos/menus";

const source = "walkin";

export default function TrackingNumber({
  visibility,
  setVisibility,
  branchId,
}) {
  const { theme } = useSelector(({ auth }) => auth);

  const handleToggle = () => setVisibility(!visibility);

  const handleTransfer = item => {
    console.log(item);
  };

  return (
    <MDBModal
      staticBackdrop
      tabIndex="-1"
      show={visibility}
      setShow={setVisibility}
    >
      <MDBModalDialog size="lg">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Menu</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={handleToggle} />
          </MDBModalHeader>
          <MDBModalBody className="text-start">
            <Menus
              source={source}
              handleTransfer={handleTransfer}
              branchId={branchId}
              usage="generateTicket"
            />
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
