import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import BreadCrumb from "../../../../../components/breadcrumb";
import { BROWSE } from "../../../../../redux/slices/query";
import { TBLpending } from "../../../../../templates";
import Modal from "./modal";

const path = [
  {
    path: "Enrollees",
  },
];

export default function Pending() {
  const { token, maxPage, theme } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ query }) => query),
    [visibility, setVisibility] = useState(false),
    [enrollees, setEnrollees] = useState([]),
    [information, setInformation] = useState({}),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();
  console.log(information);
  useEffect(() => {
    dispatch(
      BROWSE({
        entity: "assets/enrollment",
        data: "",
        token,
      })
    );
  }, [dispatch, token]);

  useEffect(() => {
    setEnrollees(catalogs);
  }, [catalogs]);

  useEffect(() => {
    if (enrollees.length > 0) {
      let totalPages = Math.floor(enrollees.length / maxPage);
      if (enrollees.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [enrollees, page, maxPage]);

  return (
    <>
      <BreadCrumb
        title="Enrollees"
        button={false}
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
              label="Search by Grade level"
              contrast={theme.dark}
            />
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <TBLpending
          enrollees={enrollees}
          page={page}
          setInformation={setInformation}
          setVisibility={setVisibility}
        />
        {visibility && (
          <Modal
            visibility={visibility}
            setVisibility={setVisibility}
            information={information}
          />
        )}
      </MDBContainer>
    </>
  );
}
