import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../../../components/breadcrumb";
import { MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import { useDispatch, useSelector } from "react-redux";
import {
  BROWSE,
  // REVERSE,
} from "./../../../../../redux/slices/assets/procurements";
import EquipmentsTable from "./table";
import EquipmentsModal from "./modal";

const path = [
  {
    path: "procurements",
  },
];
export default function Procurements() {
  const { token, theme, onDuty, maxPage } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ procurements }) => procurements),
    [visibility, setVisibility] = useState(false),
    [equipment, setEquipments] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(BROWSE(token));
    // dispatch(REVERSE());
  }, []);

  useEffect(() => {
    setEquipments(catalogs);
  }, [catalogs, maxPage, page]);

  //Pagination
  useEffect(() => {
    if (equipment?.length > 0) {
      let totalPages = Math.floor(equipment?.length / maxPage);
      if (equipment?.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [equipment, page]);

  const handleSearch = keys => {
    keys &&
      setEquipments(
        catalogs.filter(catalog =>
          String(catalog.brand).toLowerCase().startsWith(keys.toLowerCase())
        )
      );

    !keys && setEquipments(catalogs);
  };
  return (
    <>
      <BreadCrumb
        title="Equipments"
        visibility={visibility}
        setVisibility={setVisibility}
        platform="Maintenance"
        button={true}
        paths={path}
      />
      <MDBContainer className="py-5 mt-4">
        <MDBRow className="mb-3">
          <MDBCol md={6}>
            <MDBInput
              onChange={e => handleSearch(e.target.value)}
              type="search"
              label="Search by Name"
              contrast={theme.dark}
            />
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <EquipmentsTable equipments={equipment} page={page} />
        <EquipmentsModal
          visibility={visibility}
          setVisibility={setVisibility}
        />
      </MDBContainer>
    </>
  );
}
