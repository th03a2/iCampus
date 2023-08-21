import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBTypography,
  MDBBtn,
} from "mdb-react-ui-kit";
import Pager from "../../../../components/pager";
import BreadCrumb from "../../../../components/breadcrumb";
import { BROWSE } from "../../../../redux/slices/query";
import { TBLschools } from "../../../../templates";
import Modal from "./modal";
const path = [
  {
    path: "Employ",
  },
];

export default function Employ() {
  const { token, maxPage, theme } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ query }) => query),
    [visibility, setVisibility] = useState(false),
    [schools, setSchools] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      BROWSE({
        entity: "assets/branches",
        data: "",
        token,
      })
    );
  }, [dispatch, token]);

  useEffect(() => {
    setSchools(catalogs);
  }, [catalogs]);

  useEffect(() => {
    if (schools.length > 0) {
      let totalPages = Math.floor(schools.length / maxPage);
      if (schools.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [schools, page, maxPage]);

  return (
    <>
      <BreadCrumb
        title="Apply"
        button={false}
        handler={setVisibility}
        visibility={visibility}
        paths={path}
      />
      <MDBContainer className="py-5 mt-5">
        <MDBTypography className="text-center display-6">
          <strong> Are you sure you want to continue your contractual?</strong>
          <MDBBtn onClick={() => setVisibility(true)}>Yes</MDBBtn>
        </MDBTypography>
        {visibility && (
          <Modal visibility={visibility} setVisibility={setVisibility} />
        )}
      </MDBContainer>
    </>
  );
}
