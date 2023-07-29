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
  const { maxPage, token, onDuty } = useSelector(({ auth }) => auth);
  const { catalogs } = useSelector(({ levels }) => levels);
  const [sections, setSections] = useState([]);
  const [content, setContent] = useState({});
  const [visibility, setVisibility] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

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

  return (
    <>
      <BreadCrumb title="Levels" paths={path} />
      <MDBContainer className="py-5 mt-5">
        <Pager setPage={setPage} total={totalPages} page={page} />
        <MDBCard className="mt-2">
          <MDBCardBody>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Abbreviation</th>
                    <th>Stage</th>
                    <th>Sections</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {levels?.length > 0 ? (
                    paginationHandler(levels, page, maxPage).map(
                      (level, index) => (
                        <React.Fragment key={index}>
                          <tr
                            onClick={() => toggleShow(index)}
                            className="cursor-pointer"
                          >
                            <td>{1 + index}</td>
                            <td>{level.description}</td>
                            <td>{level.name}</td>
                            <td>{level.stage}</td>
                            <td>
                              <MDBIcon
                                icon={`caret-${
                                  activeIndex === index ? "down" : "left"
                                }`}
                                color="primary"
                                className="ml-3"
                              />
                            </td>
                            <td></td>
                          </tr>
                          {activeIndex === index && (
                            <tr>
                              <td colSpan="6">
                                <Body
                                  levelId={level.id}
                                  department={sections}
                                  setActiveIndex={setActiveIndex}
                                  setVisibility={setVisibility}
                                  setContent={setContent}
                                />
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      )
                    )
                  ) : (
                    <tr>
                      <td colSpan="6">
                        <MDBTypography>No levels</MDBTypography>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
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
