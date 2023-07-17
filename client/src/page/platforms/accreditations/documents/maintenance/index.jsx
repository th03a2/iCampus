import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import BreadCrumb from "../../../../../components/breadcrumb";
import { TBLmaintenance } from "../../../../../templates/Responsibilities";
import { BROWSE } from "../../../../../redux/slices/responsibilities/maintenance";

const path = [
  {
    path: "Maintenance",
  },
];

export function Maintenance() {
  const { token, onDuty, maxPage } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ maintenance }) => maintenance),
    // [visibility, setVisibility] = useState(false),
    [maintenance, setMaintenance] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    if (onDuty._id) {
      dispatch(BROWSE({ data: { branchId: onDuty._id }, token }));
    }
  }, [onDuty, dispatch, token]);

  useEffect(() => {
    setMaintenance(catalogs);
  }, [catalogs]);

  useEffect(() => {
    if (maintenance.length > 0) {
      let totalPages = Math.floor(maintenance.length / maxPage);
      if (maintenance.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [maintenance, page, maxPage]);

  console.log(maintenance);

  return (
    <>
      <BreadCrumb title="Preventive Maintenance" paths={path} button={false} />
      <MDBContainer className="py-5 mt-4">
        <MDBRow className="mb-3">
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <TBLmaintenance
          maintenance={maintenance}
          page={page}
          // handleStatus={handleStatus}
        />
      </MDBContainer>
    </>
  );
}
