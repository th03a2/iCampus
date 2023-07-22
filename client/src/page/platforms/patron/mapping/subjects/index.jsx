import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import BreadCrumb from "../../../../../components/breadcrumb";
import { BROWSE } from "../../../../../redux/slices/query";
import { TBLsubjects } from "../../../../../templates";
import Modal from "./modal";

const path = [
  {
    path: "Subjects",
  },
];

export default function Subjects() {
  const { token, maxPage, theme } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ query }) => query),
    [visibility, setVisibility] = useState(false),
    [subjects, setSubjects] = useState([]),
    [update, setUpdate] = useState({}),
    [isUpdate, setIsUpdate] = useState(false),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      BROWSE({
        entity: "assets/subjects",
        data: "",
        token,
      })
    );
  }, [dispatch, token]);

  useEffect(() => {
    setSubjects(catalogs);
  }, [catalogs]);

  useEffect(() => {
    if (subjects.length > 0) {
      let totalPages = Math.floor(subjects.length / maxPage);
      if (subjects.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [subjects, page, maxPage]);

  return (
    <>
      <BreadCrumb
        title="Subjects"
        button={true}
        handler={setVisibility}
        visibility={visibility}
        paths={path}
      />
      <MDBContainer className="py-5 mt-5">
        <MDBRow className="mb-3">
          <MDBCol md={6}>
            <MDBInput
              // onChange={e => handleSearch(e.target.value)}
              type="search"
              label="Search by Sections"
              contrast={theme.dark}
            />
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <TBLsubjects
          subjects={subjects}
          page={page}
          setVisibility={setVisibility}
          setUpdate={setUpdate}
          setIsUpdate={setIsUpdate}
        />
        {visibility && (
          <Modal
            setVisibility={setVisibility}
            visibility={visibility}
            update={update}
            setIsUpdate={setIsUpdate}
            isUpdate={isUpdate}
          />
        )}
      </MDBContainer>
    </>
  );
}
