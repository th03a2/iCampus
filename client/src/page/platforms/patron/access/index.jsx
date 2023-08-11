import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../components/pager";
import BreadCrumb from "../../../../components/breadcrumb";
import { BROWSE } from "../../../../redux/slices/assets/persons/personnels";
import { TBLemployee } from "../../../../templates/assets";
import Modal from "../../../../templates/assets/file201/employee/modal";
const path = [
  {
    path: "Employee",
  },
];

export default function Access() {
  const { token, maxPage, theme, onDuty } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ query }) => query),
    [visibility, setVisibility] = useState(false),
    [branchId, setBranchId] = useState(""),
    [fullName, setFullname] = useState(""),
    [userId, setUserId] = useState(""),
    [petitions, setPetitions] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      BROWSE({
        branch: onDuty._id,
        token,
      })
    );
  }, [dispatch, token]);

  useEffect(() => {
    setPetitions(catalogs);
  }, [catalogs]);

  const handleAccess = (modal, branchId, userId, fullName) => {
    setVisibility(modal);
    setBranchId(branchId);
    setUserId(userId);
    setFullname(fullName);
  };
  useEffect(() => {
    if (petitions.length > 0) {
      let totalPages = Math.floor(petitions.length / maxPage);
      if (petitions.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [petitions, page, maxPage]);

  return (
    <>
      <BreadCrumb
        title="Employee"
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
              label="Search by Grade level"
              contrast={theme.dark}
            />
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <TBLemployee
          petitions={petitions}
          page={page}
          handleAccess={handleAccess}
          setVisibility={setVisibility}
        />
        {visibility ? (
          <Modal
            setVisibility={setVisibility}
            visibility={visibility}
            branchId={branchId}
            userId={userId}
            fullName={fullName}
          />
        ) : (
          ""
        )}
      </MDBContainer>
    </>
  );
}
