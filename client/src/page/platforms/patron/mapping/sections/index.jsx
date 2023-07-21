import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import BreadCrumb from "../../../../../components/breadcrumb";
import { BROWSE } from "../../../../../redux/slices/query";
import { TBLsections } from "../../../../../templates";
import Modal from "./modal";
const path = [
  {
    path: "Sections",
  },
];

export default function Sections() {
  const { token, maxPage, theme } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ query }) => query),
    [visibility, setVisibility] = useState(false),
    [sections, setSections] = useState([]),
    [update, setUpdate] = useState({}),
    [isUpdate, setIsUpdate] = useState(false),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      BROWSE({
        entity: "assets/Sections",
        data: "",
        token,
      })
    );
  }, [dispatch, token]);

  useEffect(() => {
    setSections(catalogs);
  }, [catalogs]);

  useEffect(() => {
    if (sections.length > 0) {
      let totalPages = Math.floor(sections.length / maxPage);
      if (sections.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [sections, page, maxPage]);

  return (
    <>
      <BreadCrumb
        title="Sections"
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
              label="Search by Sections"
              contrast={theme.dark}
            />
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <TBLsections
          sections={sections}
          page={page}
          setIsUpdate={setIsUpdate}
          setUpdate={setUpdate}
          setVisibility={setVisibility}
        />
        {visibility && (
          <Modal
            setVisibility={setVisibility}
            visibility={visibility}
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
            update={update}
          />
        )}
      </MDBContainer>
    </>
  );
}
