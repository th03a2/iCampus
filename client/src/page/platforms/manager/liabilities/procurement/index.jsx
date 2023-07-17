import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../../../components/breadcrumb";
import { MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import { useDispatch, useSelector } from "react-redux";
import {
  BROWSE,
  // REVERSE,
} from "../../../../../redux/slices/assets/procurements";
import MachinesTable from "./table";
import MachinesModal from "./modal";

const path = [
  {
    path: "Machines",
  },
];
export default function Machines() {
  const { token, theme, onDuty, maxPage } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ machines }) => machines),
    [visibility, setVisibility] = useState(false),
    [temperature, setMachines] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(BROWSE(token));
    // dispatch(REVERSE());
  }, []);

  useEffect(() => {
    setMachines(catalogs);
  }, [catalogs, maxPage, page]);

  useEffect(() => {
    if (temperature?.length > 0) {
      //Pagination
      let totalPages = Math.floor(temperature?.length / maxPage);
      if (temperature?.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      if (page > totalPages) {
        setPage(totalPages);
      }
    }
  }, [temperature, page]);
  const handleSearch = string => {
    if (string) {
      setMachines();
      catalogs.filter(catalog =>
        String(catalog.name).toLowerCase().startsWith(string.toLowerCase())
      );
    } else {
      setMachines(catalogs);
    }
  };
  return (
    <>
      <BreadCrumb
        title="Machines"
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
        <MachinesTable machines={temperature} page={page} />
        <MachinesModal visibility={visibility} setVisibility={setVisibility} />
      </MDBContainer>
    </>
  );
}
