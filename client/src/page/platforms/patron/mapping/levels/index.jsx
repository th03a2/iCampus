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
  const { maxPage, token, onDuty } = useSelector(({ auth }) => auth),
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
  const toggleShow = index => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <>
      <BreadCrumb title="Levels" paths={path} />
      <MDBContainer className="py-5 mt-5 bg-white">
        <Pager setPage={setPage} total={totalPages} page={page} />

        {/* {levels?.length > 0 ? (
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
                    icon={`caret-${activeIndex === index ? "down" : "left"}`}
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
                        levelId={level.id}
                        department={sections}
                        setActiveIndex={setActiveIndex}
                        setVisibility={setVisibility}
                        setContent={setContent}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <MDBTypography>No levels</MDBTypography>
        )} */}
        {levels.length &&
          paginationHandler(levels, page, maxPage).map(
            (level, index) => "sample"
            // <Cluster
            //   key={`collapse-${level.id}`}
            //   level={level}
            //   page={page}
            //   index={index + 1}
            //   activeIndex={activeIndex}
            //   setActiveIndex={setActiveIndex}
            // />
          )}
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
