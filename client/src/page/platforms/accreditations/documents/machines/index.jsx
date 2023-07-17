import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import BreadCrumb from "../../../../../components/breadcrumb";
import { MACHINES } from "../../../../../redux/slices/assets/file201/procurements";
import { TBLmachines } from "../../../../../templates/Responsibilities";

const path = [
  {
    path: "Machines",
  },
];

export function Machines() {
  const { token, onDuty, maxPage } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ procurements }) => procurements),
    // [visibility, setVisibility] = useState(false),
    [machines, setMachines] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    if (onDuty._id) {
      dispatch(MACHINES({ data: onDuty._id, token }));
    }
  }, [onDuty, dispatch]);

  useEffect(() => {
    setMachines(catalogs);
  }, [catalogs]);

  useEffect(() => {
    if (machines.length > 0) {
      let totalPages = Math.floor(machines.length / maxPage);
      if (machines.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [machines, page]);
  return (
    <>
      <BreadCrumb title="Machines" paths={path} button={false} />
      <MDBContainer className="py-5 mt-4">
        <MDBRow className="mb-3">
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <TBLmachines
          machines={machines}
          page={page}
          // handleStatus={handleStatus}
        />
      </MDBContainer>
    </>
  );
}
