import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import BreadCrumb from "../../../../../components/breadcrumb";
import { BROWSE } from "../../../../../redux/slices/query";
import { TBLspecializations } from "../../../../../templates";
import Modal from "./modal";
const path = [
  {
    path: "Specializations",
  },
];

export default function Specializations() {
  const { token, maxPage, theme } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ query }) => query),
    [update, setUpdate] = useState({}),
    [isUpdate, setIsUpdate] = useState(false),
    [visibility, setVisibility] = useState(false),
    [specializations, setSpecializations] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      BROWSE({
        entity: "assets/specializations",
        data: "",
        token,
      })
    );
  }, [dispatch, token]);

  useEffect(() => {
    setSpecializations(catalogs);
  }, [catalogs]);

  useEffect(() => {
    if (specializations.length > 0) {
      let totalPages = Math.floor(specializations.length / maxPage);
      if (specializations.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [specializations, page, maxPage]);

  return (
    <>
      <BreadCrumb
        title="Specializations"
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
        <TBLspecializations
          specializations={specializations}
          page={page}
          setVisibility={setVisibility}
          setIsUpdate={setIsUpdate}
          setUpdate={setUpdate}
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
