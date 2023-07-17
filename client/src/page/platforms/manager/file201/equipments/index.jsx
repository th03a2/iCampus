import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import { MACHINES } from "../../../../../redux/slices/assets/file201/procurements";
import BreadCrumb from "../../../../../components/breadcrumb";
import { TBLequipments } from "../../../../../templates";

const path = [
  {
    path: "Bills",
  },
];

export function Equipments() {
  const { token, maxPage, onDuty, theme } = useSelector(({ auth }) => auth),
    { catalogs, loading } = useSelector(({ procurements }) => procurements),
    [machines, setMachines] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();
  useEffect(() => {
    onDuty._id &&
      dispatch(
        MACHINES({
          data: {
            branch: onDuty._id,
            key: "",
          },
          token,
        })
      );
  }, [onDuty, dispatch, token]);

  useEffect(() => {
    setMachines(catalogs);
  }, [catalogs]);
  //Pagination
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
      <BreadCrumb title="Equipments" paths={path} />
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
        <TBLequipments machines={machines} page={page} />
      </MDBContainer>
    </>
  );
}
