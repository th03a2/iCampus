import React, { useEffect } from "react";
import {
  MDBCol,
  MDBRow,
  MDBTypography,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardSubTitle,
} from "mdb-react-ui-kit";
import CompanyCard from "./card";
import { useDispatch, useSelector } from "react-redux";
import {
  adminRoom,
  PresetUser,
  socket,
} from "../../../../../components/utilities";
import { REVERT } from "../../../../../redux/slices/assets/persons/personnels";

export default function CompanyCards({ companies }) {
  const { theme } = useSelector(({ auth }) => auth),
    { record, didSubmit } = useSelector(({ petitions }) => petitions),
    dispatch = useDispatch();

  useEffect(() => {
    if (didSubmit) {
      socket.emit("pushPetition", { adminRoom, record });
      dispatch(REVERT());
    }
  }, [didSubmit, record, dispatch]);

  const handleNote = (status) => {
    let color = "",
      message = "";
    switch (status) {
      case "approved":
        color = "success";
        message = "Please logout and login again to refresh your account.";
        break;

      case "denied":
        color = "warning";
        message = "You can always send another one.";
        break;

      default:
        color = "primary";
        message = "We still need admins approval.";
        break;
    }
    return (
      <MDBTypography note noteColor={color} className="text-center">
        <strong className="text-capitalize">{status} request: </strong>
        {message}
      </MDBTypography>
    );
  };

  return (
    <>
      {record._id ? (
        handleNote(record.status)
      ) : (
        <MDBTypography note noteColor="info" className="text-center">
          <strong>Instructions: </strong>
          Click a card to send a request form.
        </MDBTypography>
      )}
      <MDBRow>
        {companies.length > 0 ? (
          companies.map((company) => (
            <CompanyCard key={company._id} company={company} />
          ))
        ) : (
          <MDBCol size={4} className="mb-4">
            <MDBCard className={`${theme.bg} ${theme.text}`}>
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={PresetUser}
                  className="mb-3 img-thumbnail bg-transparent"
                  style={{ height: 200, width: "auto" }}
                />
                <MDBCardTitle>No available companies</MDBCardTitle>
                <MDBCardSubTitle>The list is simply empty.</MDBCardSubTitle>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        )}
      </MDBRow>
    </>
  );
}
