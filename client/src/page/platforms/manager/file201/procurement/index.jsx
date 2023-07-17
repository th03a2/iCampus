import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import { BROWSE } from "../../../../../redux/slices/query";
import BreadCrumb from "../../../../../components/breadcrumb";
import { TBLprocurements } from "../../../../../templates";
import Modal from "./modal";

const path = [
  {
    path: "Procurements",
  },
];

export function Procurements() {
  const { token, maxPage, onDuty, theme } = useSelector(({ auth }) => auth),
    { catalogs, loading } = useSelector(({ query }) => query),
    [visibility, setVisibility] = useState(false),
    [equipments, setEquipments] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();
  useEffect(() => {
    onDuty._id &&
      dispatch(
        BROWSE({
          entity: "commerce/assets/file201/procurements/machine",
          data: {
            branch: onDuty._id,
            key: "",
          },
          token,
        })
      );
  }, [onDuty, dispatch, token]);

  useEffect(() => {
    setEquipments(catalogs);
  }, [catalogs]);

  //Pagination
  useEffect(() => {
    if (equipments.length > 0) {
      let totalPages = Math.floor(equipments.length / maxPage);
      if (equipments.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [equipments, page]);

  return (
    <>
      <BreadCrumb title="Procurements" tooltip="Register new Bills" />
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
        <TBLprocurements equipments={equipments} page={page} />
      </MDBContainer>
      <Modal visibility={visibility} setVisibility={setVisibility} />
    </>
  );
}
