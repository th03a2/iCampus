import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import BreadCrumb from "../../../../../components/breadcrumb";
import { BROWSE } from "../../../../../redux/slices/assets/employees";
import { TBLpendingEmployees } from "../../../../../templates";
import Modal from "./modal";

const path = [
  {
    path: "Pending",
  },
];

export default function PendingEmployee() {
  const { token, maxPage, theme, onDuty } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ employees }) => employees),
    [visibility, setVisibility] = useState(false),
    [employees, setEmployees] = useState([]),
    [information, setInformation] = useState({}),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    if (onDuty._id) {
      dispatch(
        BROWSE({
          data: { status: "petition", branch: onDuty._id },
          token,
        })
      );
    }
  }, [dispatch, token, onDuty._id]);

  useEffect(() => {
    setEmployees(catalogs);
  }, [catalogs]);

  useEffect(() => {
    if (employees.length > 0) {
      let totalPages = Math.floor(employees.length / maxPage);
      if (employees.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [employees, page, maxPage]);

  return (
    <>
      <BreadCrumb
        title="Pending"
        button={false}
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
              label="Search by fullname "
              contrast={theme.dark}
            />
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <TBLpendingEmployees
          employees={employees}
          page={page}
          setInformation={setInformation}
          setVisibility={setVisibility}
          status="pending"
        />
        {visibility && (
          <Modal
            visibility={visibility}
            setVisibility={setVisibility}
            information={information}
          />
        )}
      </MDBContainer>
    </>
  );
}
