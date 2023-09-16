import React from "react";
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
import { useSelector } from "react-redux";
import {
  paginationHandler,
  PresetUser,
} from "../../../../../components/utilities";

export default function CompanyCards({ companies, page }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  return (
    <>
      <MDBTypography note noteColor="info" className="text-center">
        <strong>Instructions: </strong>
        Click a card to send a request form.
      </MDBTypography>

      <MDBRow>
        {companies.length > 0 ? (
          paginationHandler(companies, page, maxPage).map((company) => (
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
