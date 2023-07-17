import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../../components/breadcrumb";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import BranchesModal from "./modal";
import BranchTable from "./table";
import { CLUSTER, REVERT } from "../../../../redux/slices/assets/branches";
import Pager from "../../../../components/pager";

const path = [
  {
    path: "Registered Branches",
  },
];

export default function Branches() {
  const { token, maxPage, onDuty, theme } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ branches }) => branches),
    [visibility, setVisibility] = useState(false),
    [branches, setBranches] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    if (onDuty.companyId) {
      dispatch(CLUSTER({ id: onDuty.companyId, token }));
      dispatch(REVERT());
    }
  }, [onDuty]);

  useEffect(() => {
    setBranches(catalogs);
  }, [catalogs]);

  useEffect(() => {
    if (branches.length > 0) {
      //Pagination
      let totalPages = Math.floor(branches.length / maxPage);
      if (branches.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [branches, page]);

  const handleSearch = (string) => {
    if (string) {
      setBranches(
        catalogs.filter((catalog) =>
          String(catalog.name).toLowerCase().startsWith(string.toLowerCase())
        )
      );
    } else {
      setBranches(catalogs);
    }
  };

  return (
    <>
      <BreadCrumb
        title="Registered Branches"
        button={true}
        setVisibility={setVisibility}
        visibility={visibility}
        paths={path}
      />
      <MDBContainer className="py-5 mt-4">
        <MDBRow className="mb-3">
          <MDBCol md={6}>
            <MDBInput
              onChange={(e) => handleSearch(e.target.value)}
              type="search"
              label="Search by Name"
              contrast={theme.dark}
            />
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <BranchTable branches={branches} page={page} />
        <BranchesModal visibility={visibility} setVisibility={setVisibility} />
      </MDBContainer>
    </>
  );
}
