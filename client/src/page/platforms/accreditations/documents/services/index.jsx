import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import BreadCrumb from "../../../../../components/breadcrumb";
import { OFFERS } from "../../../../../redux/slices/commerce/menus";
import { TBLservices } from "../../../../../templates/Responsibilities";

const path = [
  {
    path: "Services",
  },
];

export function Services() {
  const { token, onDuty, maxPage } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ menus }) => menus),
    // [visibility, setVisibility] = useState(false),
    [services, setServices] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    if (onDuty._id) {
      dispatch(OFFERS({ data: { branchId: onDuty._id }, token }));
    }
  }, [onDuty, dispatch, token]);

  useEffect(() => {
    setServices(catalogs);
  }, [catalogs]);

  useEffect(() => {
    if (services.length > 0) {
      let totalPages = Math.floor(services.length / maxPage);
      if (services.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [services, page, maxPage]);

  return (
    <>
      <BreadCrumb title="Services Offers" paths={path} button={false} />
      <MDBContainer className="py-5 mt-4">
        <MDBRow className="mb-3">
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <TBLservices
          services={services}
          page={page}
          // handleStatus={handleStatus}
        />
      </MDBContainer>
    </>
  );
}
