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
export function TBLspecializations({ specializations, page }) {
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
              <div className="col-5">Activity</div>
            </div>
            {specializations?.length > 0 ? (
              paginationHandler(specializations, page, maxPage).map(
                (specialization, index) => (
                  <div className="row mb-3" key={index}>
                    <div className="col-2">{1 + index}</div>
                    <div className="col">{specialization.name}</div>
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
                              specialization={specialization.activity}
                              setActiveIndex={setActiveIndex}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              )
            ) : (
              <MDBTypography>No specializations</MDBTypography>
            )}
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
}
