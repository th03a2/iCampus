import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import BreadCrumb from "../../../../../components/breadcrumb";
import { BROWSE } from "../../../../../redux/slices/query";
import { TBLlevels } from "../../../../../templates";
import Modal from "./modal";

const path = [
  {
    path: "Levels",
  },
];

export default function Levels() {
  const { token, maxPage, theme } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ query }) => query),
    [visibility, setVisibility] = useState(false),
    [levels, setLevels] = useState([]),
    [update, setUpdate] = useState({}),
    [isUpdate, setIsUpdate] = useState(false),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      BROWSE({
        entity: "assets/levels",
        data: "",
        token,
      })
    );
  }, [dispatch, token]);

  useEffect(() => {
    setLevels(catalogs);
  }, [catalogs]);

  useEffect(() => {
    if (levels.length > 0) {
      let totalPages = Math.floor(levels.length / maxPage);
      if (levels.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [levels, page, maxPage]);

  return (
    <>
      <BreadCrumb
        title="Levels"
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
        <TBLlevels
          levels={levels}
          page={page}
          setUpdate={setUpdate}
          setIsUpdate={setIsUpdate}
          setVisibility={setVisibility}
        />
        {visibility && (
          <Modal
            visibility={visibility}
            setVisibility={setVisibility}
            update={update}
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
          />
        )}
      </MDBContainer>
    </>
  );
}
