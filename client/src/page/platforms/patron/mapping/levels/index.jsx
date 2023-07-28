import React, { useEffect, useState } from "react";
import levels from "../../../../../fakeDb/json/levels";
import { paginationHandler } from "../../../../../components/utilities";
import Pager from "../../../../../components/pager";

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
// import Swal from "sweetalert2";
import BreadCrumb from "../../../../../components/breadcrumb";
import { BROWSE } from "../../../../../redux/slices/assets/levels";
import { Body } from "./Body";
import Modal from "./modal";
const path = [
  {
    path: "Levels",
  },
];
export default function Levels() {
  const { maxPage, token } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ levels }) => levels),
    [sections, setSections] = useState([]),
    [content, setContent] = useState({}),
    [visibility, setVisibility] = useState(false),
    [activeIndex, setActiveIndex] = useState(null),
    [totalPages, setTotalPages] = useState(1),
    [page, setPage] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    if (catalogs.length === 0) {
      dispatch(
        BROWSE({
          token,
        })
      );
    }
  }, [catalogs]);

  useEffect(() => {
    setSections(catalogs);
  }, [catalogs]);

  useEffect(() => {
    if (levels.length > 0) {
      let totalPages = Math.floor(levels.length / maxPage);
      if (levels.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [levels, page, maxPage]);
  const toggleShow = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  const handleSubjects = (level) => {
    setVisibility(true);
    setContent(level);
  };

  return (
    <>
      <BreadCrumb title="Levels" paths={path} />
      <MDBContainer className="py-5 mt-5">
        <MDBCard className="mt-4">
          <Pager setPage={setPage} total={totalPages} page={page} />
          <MDBCardBody>
            <div className="row bg-light text-dark font-weight-bold mb-3">
              <div className="col-1">#</div>
              <div className="col-2">Name</div>
              <div className="col-2">Abbreviation</div>
              <div className="col-2">stage</div>
              <div className="col-2">Sections</div>
              <div className="col-2">Action</div>
            </div>
            {levels?.length > 0 ? (
              paginationHandler(levels, page, maxPage).map((level, index) => (
                <div className="row mb-3" key={index}>
                  <div className="col-1">{1 + index}</div>
                  <div className="col-2">{level.description}</div>
                  <div className="col-2">{level.name}</div>
                  <div className="col-2">{level.stage}</div>
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
                    <MDBBtn type="button" onClick={() => handleSubjects(level)}>
                      Subjects
                    </MDBBtn>
                  </div>

                  <div className="col-2"></div>
                  {activeIndex === index && (
                    <div className="w-100">
                      <div className="row mt-3">
                        <div className="col">
                          <Body
                            levelId={level.id}
                            department={sections}
                            setActiveIndex={setActiveIndex}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <MDBTypography>No levels</MDBTypography>
            )}
          </MDBCardBody>
        </MDBCard>
        {visibility && (
          <Modal
            visibility={visibility}
            setVisibility={setVisibility}
            content={content}
          />
        )}
      </MDBContainer>
    </>
  );
}
