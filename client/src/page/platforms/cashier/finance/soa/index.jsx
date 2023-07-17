import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import { BROWSE } from "../../../../../redux/slices/query";
import BreadCrumb from "../../../../../components/breadcrumb";
import Modal from "./modal";

const path = [
  {
    path: "SOA",
  },
];

export function Soa() {
  const { token, maxPage, onDuty, theme } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ branches }) => branches),
    [visibility, setVisibility] = useState(false),
    [branches, setBranches] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    [loading, setLoading] = useState(false),
    dispatch = useDispatch();
  useEffect(() => {
    onDuty._id && dispatch(BROWSE({ entity: "", branchId: onDuty._id, token }));
  }, [onDuty, dispatch, token]);

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
        title="SOA"
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
      <Modal visibility={visibility} setVisibility={setVisibility} />
    </>
  );
}
