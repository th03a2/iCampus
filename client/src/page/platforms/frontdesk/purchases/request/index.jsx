import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import { BROWSE, REQUEST } from "../../../../../redux/slices/query";
import BreadCrumb from "../../../../../components/breadcrumb";
import { TBLrequest } from "../../../../../templates";

const path = [
  {
    path: "Request",
  },
];

export function Request() {
  const { token, maxPage, onDuty, theme, auth } = useSelector(
      ({ auth }) => auth
    ),
    { catalogs } = useSelector(({ query }) => query),
    [products, setProducts] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    if (auth._id) {
      dispatch(
        REQUEST({
          entity: "procurements/purchase",
          data: { branch: onDuty._id, status: "pending" },
          token,
        })
      );
    }
  }, [dispatch, token, auth._id]);

  useEffect(() => {
    setProducts(catalogs);
  }, [catalogs]);

  //Pagination
  useEffect(() => {
    if (products.length > 0) {
      let totalPages = Math.floor(products.length / maxPage);
      if (products.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [products, page, maxPage]);

  const handleSearch = (keys) => {
    if (keys) {
      setProducts(
        catalogs.filter((service) =>
          Object.values(service).some((val) =>
            String(val).toLowerCase().includes(keys)
          )
        )
      );
      setPage(1);
    } else {
      setProducts(catalogs);
    }
  };

  return (
    <>
      <BreadCrumb title="Request" paths={path} />
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
        <TBLrequest products={products} page={page} setProducts={setProducts} />
      </MDBContainer>
    </>
  );
}
