import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import { MARKET } from "../../../../../redux/slices/query";

import { CRDitems } from "../../../../../templates";
import BreadCrumb from "../../../../../components/breadcrumb";

const path = [
  {
    path: "items",
  },
];

export function Items() {
  const { token, maxPage, onDuty, theme } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ query }) => query),
    [items, setItems] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    onDuty._id &&
      dispatch(
        MARKET({
          entity: "commerce/merchandise/products",
          token,
        })
      );
  }, [onDuty, dispatch, token]);

  useEffect(() => {
    setItems(catalogs);
  }, [catalogs]);

  //Pagination
  useEffect(() => {
    if (items.length > 0) {
      let totalPages = Math.floor(items.length / maxPage);
      if (items.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [items, page, maxPage]);

  const handleSearch = (keys) => {
    if (keys) {
      setItems(
        catalogs.filter((service) =>
          Object.values(service).some((val) =>
            String(val).toLowerCase().includes(keys)
          )
        )
      );
      setPage(1);
    } else {
      setItems(catalogs);
    }
  };

  return (
    <>
      <BreadCrumb title="Products" paths={path} />
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
        <CRDitems items={items} page={page} />
      </MDBContainer>
    </>
  );
}
