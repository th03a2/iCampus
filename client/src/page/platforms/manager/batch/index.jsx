import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../components/pager";
import BreadCrumb from "../../../../components/breadcrumb";
import { BROWSE } from "../../../../redux/slices/query";
import { TBLBatchApproval } from "../../../../templates";
// import Modal from "./modal";
const path = [
  {
    path: "Batch",
  },
];

export default function Batch() {
  const { token, maxPage, theme, onDuty } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ query }) => query),
    [visibility, setVisibility] = useState(false),
    [batch, setBatch] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    if (onDuty._id) {
      dispatch(
        BROWSE({
          entity: "assets/batch",
          data: onDuty._id,
          token,
        })
      );
    }
  }, [dispatch, token, onDuty._id]);

  useEffect(() => {
    setBatch(catalogs);
  }, [catalogs]);

  useEffect(() => {
    if (batch.length > 0) {
      let totalPages = Math.floor(batch.length / maxPage);
      if (batch.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [batch, page, maxPage]);

  return (
    <>
      <BreadCrumb
        title="Batch"
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
        <TBLBatchApproval batch={batch} page={page} />
        {/* {visibility && (
          <Modal
            setVisibility={setVisibility}
            visibility={visibility}
            update={update}
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
          />
        )} */}
      </MDBContainer>
    </>
  );
}
