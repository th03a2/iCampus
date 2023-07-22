import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
  MDBContainer,
  MDBTypography,
  MDBBtnGroup,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { paginationHandler } from "../../../../components/utilities";
import { Body } from "./Body";
import { DESTROY } from "../../../../redux/slices/query";

export function TBLspecializations({
  specializations,
  page,
  setVisibility,
  setIsUpdate,
  setUpdate,
}) {
  const { maxPage, token } = useSelector(({ auth }) => auth);
  const [activeIndex, setActiveIndex] = useState(null);
  const dispatch = useDispatch();

  const toggleShow = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  const handleUpdate = (specialization) => {
    setVisibility(true);
    setUpdate(specialization);
    setIsUpdate(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          DESTROY({
            entity: "assets/specializations",
            id,
            token,
          })
        );
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <>
      <MDBContainer>
        <MDBCard>
          <MDBCardBody>
            <div className="row bg-light text-dark font-weight-bold mb-3">
              <div className="col-1">#</div>
              <div className="col-3">Name</div>
              <div className="col-2">Acronym</div>
              <div className="col-2">Activity</div>
              <div className="col-2">Action</div>
            </div>
            {specializations?.length > 0 ? (
              paginationHandler(specializations, page, maxPage).map(
                (specialization, index) => (
                  <div className="row mb-3" key={index}>
                    <div className="col-1">{1 + index}</div>
                    <div className="col-3">{specialization.name}</div>
                    <div className="col-2">{specialization.acronym}</div>
                    <div className="col-2">
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
                    <div className="col-2">
                      <MDBBtnGroup>
                        <MDBBtn
                          color="danger"
                          onClick={() => handleDelete(specialization._id)}
                        >
                          <MDBIcon fas icon="trash" />
                        </MDBBtn>
                        <MDBBtn onClick={() => handleUpdate(specialization)}>
                          <MDBIcon fas icon="pencil-alt" />
                        </MDBBtn>
                      </MDBBtnGroup>
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
