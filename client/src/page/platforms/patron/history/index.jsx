import React, { useState, useEffect } from "react";
import { MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../../components/breadcrumb";
import CompanyTables from "./cards";
import { APPLICATION } from "../../../../redux/slices/assets/persons/personnels";
import Pager from "../../../../components/pager";

const path = [
  {
    path: "List of Companies",
  },
];

export default function UnsetApply() {
  const { theme, token, maxPage, auth } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ personnels }) => personnels),
    [history, setHistory] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    auth._id && dispatch(APPLICATION({ data: { _id: auth._id } }));
  }, [dispatch, auth]);

  useEffect(() => {
    setHistory(catalogs);
  }, [catalogs]);
  console.log(history);

  useEffect(() => {
    if (!!history.length) {
      //Pagination
      let totalPages = Math.floor(history.length / maxPage);
      if (history.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [history, page]);

  const handleSearch = (string) => {
    if (string) {
      setHistory(
        catalogs?.filter((catalog) =>
          String(catalog.name).toLowerCase().startsWith(string.toLowerCase())
        )
      );
    } else {
      setHistory(catalogs);
    }
  };
  console.log(history);

  return (
    <>
      <BreadCrumb title="Applied Companies" paths={path} />
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
        <CompanyTables history={history} page={page} />
        {/* Modal must be here */}
      </MDBContainer>
    </>
  );
}
