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
import { DESTROY } from "../../../../redux/slices/query";
import { paginationHandler } from "../../../../components/utilities";
import { Body } from "./Body";
export function TBLstrands({
  strands,
  page,
  setIsUpdate,
  setVisibility,
  setUpdate,
}) {
  const { maxPage, token } = useSelector(({ auth }) => auth),
    [activeIndex, setActiveIndex] = useState(null),
    dispatch = useDispatch();

  const toggleShow = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  const handleUpdate = (strand) => {
    setVisibility(true);
    setUpdate(strand);
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
            entity: "assets/Strands",
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
              <div className="col-2">#</div>
              <div className="col-4">Name </div>
              <div className="col-3">Major</div>
              <div className="col-2">Action</div>
            </div>
            {strands?.length > 0 ? (
              paginationHandler(strands, page, maxPage).map((strand, index) => (
                <div className="row mb-3" key={index}>
                  <div className="col-2">{1 + index}</div>
                  <div className="col">{strand.name}</div>
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
                  <div className="col">
                    <MDBBtnGroup>
                      <MDBBtn
                        color="danger"
                        onClick={() => handleDelete(strand._id)}
                      >
                        <MDBIcon fas icon="trash" />
                      </MDBBtn>
                      <MDBBtn onClick={() => handleUpdate(strand)}>
                        <MDBIcon fas icon="pencil-alt" />
                      </MDBBtn>
                    </MDBBtnGroup>
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
