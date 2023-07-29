import React from "react";
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
import { paginationHandler } from "../../../components/utilities";
import image from "../../../assets/images/default.jpg";
export function TBLenrollment({ schools, page, setSchoolId, setVisibility }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  const handleEnroll = (id) => {
    setVisibility(true);
    setSchoolId(id);
  };

  const addressFormatter = (address) => {
    if (typeof address === "object") {
      const { province, city, barangay, street } = address;

      return `${barangay},${street},${city},${province}`;
    }
  };

  return (
    <MDBContainer>
      <MDBRow>
        {schools.length > 0 &&
          paginationHandler(schools, page, maxPage).map((school) => (
            <>
              <MDBCol md={4} className="mt-3">
                <MDBCard>
                  <MDBCardImage
                    src={image}
                    className="mx-auto rounded img-max img-fluid mb-1"
                    position="top"
                  />
                  <MDBCardBody>
                    <MDBCardTitle className="text-center">
                      <strong> General Tinio National High School</strong>
                    </MDBCardTitle>
                    <MDBContainer className="d-flex justify-content-between mt-4">
                      <div>
                        <MDBBtn>Information</MDBBtn>{" "}
                      </div>
                      <div>
                        <MDBBtn
                          color="warning"
                          onClick={() => handleEnroll(school._id)}
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
    </MDBContainer>

    // <MDBTable align="middle" hover responsive color={theme.color}>
    //   <caption>List of Grade schools</caption>
    //   <caption className="caption-top">
    //     Total of <b>{schools?.length}</b> Grade school(s)
    //   </caption>
    //   <MDBTableHead>
    //     <tr>
    //       <th>#</th>
    //       <th scope="col">Name </th>
    //       <th scope="col">Category </th>
    //       <th scope="col">Address </th>
    //       <th scope="col">Action </th>
    //     </tr>
    //   </MDBTableHead>
    //   <MDBTableBody>
    //     {schools?.length > 0 ? (
    //       paginationHandler(schools, page, maxPage).map((school, index) => (
    //         <tr key={`temperature-${index}`}>
    //           <td>{1 + index}</td>
    //           <td>{school.schoolId?.name}</td>
    //           <td>{school.schoolId?.category}</td>
    //           <td>{addressFormatter(school.schoolId?.address)}</td>
    //           <td>
    //             <MDBBtnGroup>
    //               <MDBBtn
    //                 color="danger"
    //                 onClick={() => handleEnroll(school._id)}
    //               >
    //                 Enroll
    //               </MDBBtn>
    //             </MDBBtnGroup>
    //           </td>
    //         </tr>
    //       ))
    //     ) : (
    //       <tr className="text-center">
    //         <td colSpan={3}>No Staff accounts.</td>
    //       </tr>
    //     )}
    //   </MDBTableBody>
    // </MDBTable>
  );
}
