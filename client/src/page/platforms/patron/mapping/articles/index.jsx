import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import BreadCrumb from "../../../../../components/breadcrumb";
import { BROWSE } from "../../../../../redux/slices/query";
import { TBLarticles } from "../../../../../templates";

const path = [
  {
    path: "Articles",
  },
];

export default function Articles() {
  const { token, maxPage, theme, onDuty } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ query }) => query),
    [visibility, setVisibility] = useState(false),
    [articles, setArticles] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();
  console.log(onDuty);
  useEffect(() => {
    dispatch(
      BROWSE({
        entity: "assets/articles",
        data: "",
        token,
      })
    );
  }, [dispatch, token]);

  useEffect(() => {
    setArticles(catalogs);
  }, [catalogs]);

  useEffect(() => {
    if (articles.length > 0) {
      let totalPages = Math.floor(articles.length / maxPage);
      if (articles.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [articles, page, maxPage]);

  return (
    <>
      <BreadCrumb
        title="Articles"
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
        <TBLarticles articles={articles} page={page} />
      </MDBContainer>
    </>
  );
}
