import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import BreadCrumb from "../../../../../components/breadcrumb";
import { BROWSE } from "../../../../../redux/slices/query";
import { TBLbooks } from "../../../../../templates";
import Modal from "./modal";
const path = [
  {
    path: "Books",
  },
];

export default function Books() {
  const { token, maxPage, theme } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ query }) => query),
    [visibility, setVisibility] = useState(false),
    [books, setBooks] = useState([]),
    [update, setUpdate] = useState({}),
    [isUpdate, setIsUpdate] = useState(false),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      BROWSE({
        entity: "assets/books",
        data: "",
        token,
      })
    );
  }, [dispatch, token]);

  useEffect(() => {
    setBooks(catalogs);
  }, [catalogs]);

  useEffect(() => {
    if (books.length > 0) {
      let totalPages = Math.floor(books.length / maxPage);
      if (books.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [books, page, maxPage]);

  return (
    <>
      <BreadCrumb
        title="Books"
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
        <TBLbooks
          books={books}
          page={page}
          setIsUpdate={setIsUpdate}
          setUpdate={setUpdate}
          setVisibility={setVisibility}
        />
        {visibility && (
          <Modal
            setVisibility={setVisibility}
            visibility={visibility}
            update={update}
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
          />
        )}
      </MDBContainer>
    </>
  );
}
