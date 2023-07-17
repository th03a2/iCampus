import React, { useState, useEffect } from "react";
import { MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../../components/breadcrumb";
import CompanyCards from "./cards";
import { BROWSE as COMPANIES } from "../../../../redux/slices/assets/companies";
import Pager from "../../../../components/pager";

const path = [
  {
    path: "List of Companies",
  },
];

export default function UnsetApply() {
  const { theme, token, maxPage } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ companies }) => companies),
    [companies, setCompanies] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    token && dispatch(COMPANIES(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (!!catalogs.length) {
      setCompanies(catalogs);
    }
  }, [catalogs]);

  useEffect(() => {
    if (!!companies.length) {
      //Pagination
      let totalPages = Math.floor(companies.length / maxPage);
      if (companies.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [companies, page]);

  const handleSearch = (string) => {
    if (string) {
      setCompanies(
        catalogs?.filter((catalog) =>
          String(catalog.name).toLowerCase().startsWith(string.toLowerCase())
        )
      );
    } else {
      setCompanies(catalogs);
    }
  };

  return (
    <>
      <BreadCrumb title="Available Companies" paths={path} />
      <MDBContainer className="py-5 mt-4">
        <MDBRow className="mb-3">
          <MDBCol md={6}>
            <MDBInput
              onChange={(e) => handleSearch(e.target.value)}
              type="search"
              label="Search by Company name"
              contrast={theme.dark}
            />
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <CompanyCards companies={companies} page={page} />
        {/* Modal must be here */}
      </MDBContainer>
    </>
  );
}
