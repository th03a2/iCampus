import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import { BROWSE } from "../../../../../redux/slices/procurments/purchase";
import { REQUEST } from "../../../../../redux/slices/query";
import BreadCrumb from "../../../../../components/breadcrumb";
import { TBLreceived } from "../../../../../templates";

const path = [
  {
    path: "Request",
  },
];

export function Received() {
  const { token, maxPage, onDuty, theme, auth, access } = useSelector(
      ({ auth }) => auth
    ),
    { catalogs } = useSelector(({ purchase }) => purchase),
    [received, setReceived] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();
  useEffect(() => {
    if (access.length > -1) {
      if (access === "manager" || access === "medtech" || access === "owner") {
        dispatch(
          REQUEST({
            entity: "procurments/purchase",
            data: "",
            token,
          })
        );
      } else {
        onDuty._id &&
          dispatch(
            BROWSE({
              entity: "procurments/purchase",
              data: auth._id,
              token,
            })
          );
      }
    }
  }, [onDuty._id, dispatch, token, auth._id, access]);

  useEffect(() => {
    setReceived(catalogs);
  }, [catalogs]);

  //Pagination
  useEffect(() => {
    if (received.length > 0) {
      let totalPages = Math.floor(received.length / maxPage);
      if (received.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [received, page, maxPage]);

  const handleSearch = (keys) => {
    if (keys) {
      setReceived(
        catalogs.filter((service) =>
          Object.values(service).some((val) =>
            String(val).toLowerCase().includes(keys)
          )
        )
      );
      setPage(1);
    } else {
      setReceived(catalogs);
    }
  };

  return (
    <>
      <BreadCrumb title="Received" paths={path} />
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
        <TBLreceived received={received && received} page={page} />
      </MDBContainer>
    </>
  );
}
