import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBCardTitle,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import Modal from "./modal";
import { paginationHandler } from "../../../components/utilities";
import image from "../../../assets/images/default.jpg";
export function TBLenrollment({
  schools,
  page,
  setSchoolInformation,
  setVisibility,
}) {
  const { maxPage } = useSelector(({ auth }) => auth);
  const [schoolInfo, setSchoolInfo] = useState({});
  const [look, setLook] = useState(false);

  const handleEnroll = (school) => {
    setVisibility(true);
    setSchoolInformation(school);
  };

  const handleModal = (information) => {
    setSchoolInfo(information);
    setLook(true);
  };

  console.log(schoolInfo);

  return (
    <MDBContainer>
      <MDBRow>
        {schools.length > 0 &&
          paginationHandler(schools, page, maxPage).map((school, index) => (
            <>
              <MDBCol md={4} className="mt-3" key={index}>
                <MDBCard>
                  <MDBCardImage
                    src={image}
                    className="mx-auto rounded img-max img-fluid mb-1"
                    position="top"
                  />
                  <MDBCardBody>
                    <MDBCardTitle className="text-center">
                      <strong>{school.companies[0]?.name}</strong>
                    </MDBCardTitle>
                    <MDBContainer className="d-flex justify-content-between mt-4">
                      <div>
                        <MDBBtn
                          type="button"
                          onClick={() => handleModal(school.companies[0])}
                        >
                          Information
                        </MDBBtn>
                      </div>
                      <div>
                        <MDBBtn
                          color="warning"
                          onClick={() => handleEnroll(school)}
                        >
                          Enroll
                        </MDBBtn>{" "}
                      </div>
                    </MDBContainer>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </>
          ))}
      </MDBRow>
      {look && (
        <Modal
          visibility={look}
          setVisibility={setLook}
          schoolInfo={schoolInfo}
        />
      )}
    </MDBContainer>
  );
}
