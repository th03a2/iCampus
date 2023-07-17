import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import { BROWSE } from "../../../../../redux/slices/query";
import BreadCrumb from "../../../../../components/breadcrumb";
import { TBLproducts } from "../../../../../templates";
import Modal from "./modal";

const path = [
  {
    path: "Products",
  },
];

export function Products() {
  const { token, maxPage, onDuty, theme } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ query }) => query),
    [visibility, setVisibility] = useState(false),
    [products, setProducts] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    [update, setUpdate] = useState(),
    [isUpdate, setIsUpdate] = useState(false),
    dispatch = useDispatch();
  useEffect(() => {
    onDuty._id &&
      dispatch(
        BROWSE({
          entity: "commerce/merchandise/products",
          data: {
            branch: onDuty._id,
            key: "",
          },
          token,
        })
      );
  }, [onDuty, dispatch, token]);

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

  const handleUpdate = (data) => {
    setIsUpdate(true);
    setUpdate(data);
    setVisibility(true);
  };

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
      <BreadCrumb
        title="Products"
        tooltip="Register new Products"
        button={true}
        paths={path}
        handler={() => setVisibility(!visibility)}
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
        <TBLproducts
          products={products}
          page={page}
          handleUpdate={handleUpdate}
        />
      </MDBContainer>
      <Modal
        visibility={visibility}
        setVisibility={setVisibility}
        token={token}
        onDuty={onDuty}
        update={update}
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
      />
    </>
  );
}
