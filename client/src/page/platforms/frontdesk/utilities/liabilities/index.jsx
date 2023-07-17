import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import { BROWSE } from "../../../../../redux/slices/query";
import BreadCrumb from "../../../../../components/breadcrumb";
import { TBLliabilities } from "../../../../../templates";
import Modal from "./modal";

const path = [
  {
    path: "Bills",
  },
];

export function Liabilities() {
  const { token, maxPage, onDuty, theme } = useSelector(({ auth }) => auth),
    { catalogs, loading } = useSelector(({ query }) => query),
    [visibility, setVisibility] = useState(false),
    [bills, setBills] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();
  useEffect(() => {
    onDuty._id &&
      dispatch(
        BROWSE({
          entity: "finance/liabilities",
          data: {
            branch: onDuty._id,
            key: "",
          },
          token,
        })
      );
  }, [onDuty, dispatch, token]);

  useEffect(() => {
    setBills(catalogs);
  }, [catalogs]);

  //Pagination
  useEffect(() => {
    if (bills.length > 0) {
      let totalPages = Math.floor(bills.length / maxPage);
      if (bills.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [bills, page]);

  return (
    <>
      <BreadCrumb
        title="Bills"
        tooltip="Register new Bills"
        button={true}
        paths={path}
        handler={() => setVisibility(!visibility)}
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
        <TBLliabilities bills={bills} page={page} />
      </MDBContainer>
      <Modal visibility={visibility} setVisibility={setVisibility} />
    </>
  );
}
