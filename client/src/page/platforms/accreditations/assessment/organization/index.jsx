import React, { useState, useEffect } from "react";
import { MDBContainer, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import BreadCrumb from "../../../../../components/accreditations/breadcrumb";
import { Views } from "../../../../../components/accreditations/views";

export function Organization() {
  const [file, setFile] = useState({
    isImage: true,
    value: null,
    preview: null,
  });

  return (
    <>
      <BreadCrumb title="Organization" parameter={1} setFile={setFile} />
      <MDBContainer className="py-5 mt-4">
        <MDBCard>
          <MDBCardBody>
            <Views file={file} />
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
}
