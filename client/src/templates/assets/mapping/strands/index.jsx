import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
  MDBContainer,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

import { paginationHandler } from "../../../../components/utilities";
import { Body } from "./Body";
export function TBLstrands({ strands, page }) {
  const { maxPage } = useSelector(({ auth }) => auth),
    [activeIndex, setActiveIndex] = useState(null);

  const toggleShow = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <>
      <MDBContainer>
        <MDBCard>
          <MDBCardBody>
            <div className="row bg-light text-dark font-weight-bold mb-3">
              <div className="col-2">#</div>
              <div className="col-5">Name </div>
              <div className="col-5">Major</div>
            </div>
            {strands?.length > 0 ? (
              paginationHandler(strands, page, maxPage).map((strand, index) => (
                <div className="row mb-3" key={index}>
                  <div className="col-2">{1 + index}</div>
                  <div className="col">{strand.name}</div>
                  <div className="col">
                    <MDBBtn
                      onClick={() => toggleShow(index)}
                      size="sm"
                      className="shadow-0 ms-3"
                    >
                      <MDBIcon
                        icon={`caret-${
                          activeIndex === index ? "down" : "left"
                        }`}
                        color="white"
                      />
                    </MDBBtn>
                  </div>
                  {activeIndex === index && (
                    <div className="w-100">
                      <div className="row mt-3">
                        <div className="col">
                          <Body
                            strands={strand.major}
                            setActiveIndex={setActiveIndex}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <MDBTypography>No strands</MDBTypography>
            )}
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
}
