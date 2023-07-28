import React, { useState } from "react";
import {
  paginationHandler,
  nameFormatter,
} from "../../../../components/utilities";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBIcon,
  MDBContainer,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import Body from "./Body";
import levels from "../../../../fakeDb/json/levels";
export function TBLsections({ sections, page }) {
  const { theme, maxPage, token } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch(),
    [activeIndex, setActiveIndex] = useState(null);

  const toggleShow = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  // const handleUpdate = (school) => {
  //   setVisibility(true);
  //   setUpdate(school);
  //   setIsUpdate(true);
  // };
  // const handleDelete = (id) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       dispatch(
  //         DESTROY({
  //           entity: "assets/Sections",
  //           id,
  //           token,
  //         })
  //       );
  //       Swal.fire("Deleted!", "Your file has been deleted.", "success");
  //     }
  //   });
  // };

  return (
    <MDBContainer>
      <MDBCard className="mt-4">
        <MDBCardBody>
          <div className="row bg-light text-dark font-weight-bold mb-3">
            <div className="col-1">#</div>
            <div className="col-2">Name</div>
            <div className="col-2">Accumulate</div>
            <div className="col-3">Adviser</div>
            <div className="col-2">Grade Level</div>
            <div className="col-2">Subjects</div>
          </div>
          {sections?.length > 0 ? (
            paginationHandler(sections, page, maxPage).map((section, index) => {
              const findLevels = levels.find(
                (data) => data.id === section.levelId
              );
              return (
                <div className="row mb-3" key={index}>
                  <div className="col-1">{1 + index}</div>
                  <div className="col-2">{section.name}</div>
                  <div className="col-2">{section.accumulate}</div>
                  <div className="col-3">
                    {nameFormatter(section.adviser?.fullName)}
                  </div>
                  <div className="col-2">{findLevels.description}</div>

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

                  <div className="col-2"></div>
                  {activeIndex === index && (
                    <div className="w-100">
                      <div className="row mt-3">
                        <div className="col">
                          <Body
                            topic={section}
                            setActiveIndex={setActiveIndex}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <MDBTypography>No sections</MDBTypography>
          )}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}
