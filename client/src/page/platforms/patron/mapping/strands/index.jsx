import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import BreadCrumb from "../../../../../components/breadcrumb";
import { BROWSE } from "../../../../../redux/slices/query";
import { TBLstrands } from "../../../../../templates";

const path = [
  {
    path: "Strands",
  },
];

export default function Sections() {
  const { token, maxPage, theme } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ query }) => query),
    [visibility, setVisibility] = useState(false),
    [strands, setStrands] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      BROWSE({
        entity: "assets/Strands",
        data: "",
        token,
      })
    );
  }, [dispatch, token]);

  useEffect(() => {
    setStrands(catalogs);
  }, [catalogs]);

  useEffect(() => {
    if (strands.length > 0) {
      let totalPages = Math.floor(strands.length / maxPage);
      if (strands.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [strands, page, maxPage]);

  return (
    <>
      <BreadCrumb
        title="Strands"
        button={true}
        handler={setVisibility}
        visibility={visibility}
        paths={path}
      />
      <MDBContainer className="py-5 mt-5">
        <MDBRow className="mb-3">
          <MDBCol md={6}>
            <MDBInput
              // onChange={e => handleSearch(e.target.value)}
              type="search"
              label="Search by Grade level"
              contrast={theme.dark}
            />
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <TBLstrands strands={strands} page={page} />
      </MDBContainer>
    </>
  );
}
