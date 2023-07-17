import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../components/pager";
import BreadCrumb from "../../../components/breadcrumb";

const path = [
  {
    path: "Blank",
  },
];

export default function Branches() {
  const { token, maxPage, onDuty, theme } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ branches }) => branches),
    [visibility, setVisibility] = useState(false),
    [branches, setBranches] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (onDuty.companyId) {
    }
  }, [onDuty]);

  useEffect(() => {
    setBranches(catalogs);
  }, [catalogs]);

  //Pagination
  useEffect(() => {
    if (branches.length > 0) {
      let totalPages = Math.floor(branches.length / maxPage);
      if (branches.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [branches, page]);

  return (
    <>
      <BreadCrumb
        title="Blank page"
        button={true}
        setVisibility={setVisibility}
        visibility={visibility}
        paths={path}
      />
      <MDBContainer className="py-5 mt-4">
        <MDBRow className="mb-3">
          <MDBCol md={6}>
            <MDBInput
              // onChange={e => handleSearch(e.target.value)}
              type="search"
              label="Search by Name"
              contrast={theme.dark}
            />
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
      </MDBContainer>
    </>
  );
}
