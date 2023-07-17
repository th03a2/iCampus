import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import { BROWSE, SOCKET } from "../../../../../redux/slices/query";
import BreadCrumb from "../../../../../components/breadcrumb";
import Modal from "./modal";
import { TBLtemperature } from "../../../../../templates";
import io from "socket.io-client";
// Railway update
const socket = io("http://localhost:5000");
// const socket = io("https://pinoyimd.up.railway.app/");

const path = [
  {
    path: "Vouchers",
  },
];

export function Temperature() {
  const { token, maxPage, onDuty, theme } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ query }) => query),
    [visibility, setVisibility] = useState(false),
    [temperatures, setTemperatures] = useState([]),
    [update, setUpdate] = useState({}),
    [isUpdate, setIsUpdate] = useState(false),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    onDuty._id &&
      dispatch(
        BROWSE({
          entity: "monitorings/temperatures",
          branchId: onDuty._id,
          token,
        })
      );
  }, [onDuty, dispatch, token]);

  useEffect(() => {
    setTemperatures(catalogs);
  }, [catalogs]);

  useEffect(() => {
    socket.on("send_user", (data) => {
      dispatch(SOCKET(data));
    });
    return () => {
      socket.off("send_user");
    };
  }, [dispatch]);

  //Pagination
  useEffect(() => {
    if (temperatures.length > 0) {
      let totalPages = Math.floor(temperatures.length / maxPage);
      if (temperatures.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [temperatures, page]);

  return (
    <>
      <BreadCrumb
        title="Temperatrure"
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
              label="Search by Name"
              contrast={theme.dark}
            />
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
      </MDBContainer>
      <TBLtemperature
        temperature={temperatures}
        page={page}
        visibility={visibility}
        setVisibility={setVisibility}
        setUpdate={setUpdate}
        setIsUpdate={setIsUpdate}
      />
      <Modal
        visibility={visibility}
        setVisibility={setVisibility}
        update={update}
        setUpdate={setUpdate}
        setIsUpdate={setIsUpdate}
        isUpdate={isUpdate}
      />
    </>
  );
}
