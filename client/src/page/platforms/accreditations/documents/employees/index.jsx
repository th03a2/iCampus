import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import BreadCrumb from "../../../../../components/breadcrumb";
import { BROWSE } from "../../../../../redux/slices/assets/persons/personnels";
import { TBLemployees } from "../../../../../templates/Responsibilities";

const path = [
  {
    path: "Employees",
  },
];

export function Employees() {
  const { token, onDuty, maxPage } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ personnels }) => personnels),
    [personnels, setPersonels] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    if (onDuty._id) {
      dispatch(
        BROWSE({ endPoint: true, key: "object", branch: onDuty._id, token })
      );
    }
  }, [onDuty, dispatch]);

  useEffect(() => {
    setPersonels(catalogs);
  }, [catalogs]);

  useEffect(() => {
    if (personnels.length > 0) {
      let totalPages = Math.floor(personnels.length / maxPage);
      if (personnels.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [personnels, page]);
  return (
    <>
      <BreadCrumb title="Employees" paths={path} button={false} />
      <MDBContainer className="py-5 mt-4">
        <MDBRow className="mb-3">
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <TBLemployees personnels={personnels} page={page} />
      </MDBContainer>
    </>
  );
}
