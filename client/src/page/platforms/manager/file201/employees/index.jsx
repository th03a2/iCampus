import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import BreadCrumb from "../../../../../components/breadcrumb";
import {
  BROWSE,
  UPDATE,
} from "../../../../../redux/slices/assets/persons/personnels";
import { nameFormatter } from "../../../../../components/utilities";
import { TBLemployee } from "../../../../../templates/assets";
import Modal from "../../../../../templates/assets/file201/employee/modal";
import Swal from "sweetalert2";

const path = [
  {
    path: "Employees",
  },
];

export function Employees() {
  const { token, maxPage, onDuty, theme } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ personnels }) => personnels),
    [visibility, setVisibility] = useState(false),
    [petitions, setPetitions] = useState([]),
    [page, setPage] = useState(1),
    [branchId, setBranchId] = useState(null),
    [userId, setUserId] = useState(null),
    [fullName, setFullname] = useState(null),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    if (onDuty.companyId) {
      dispatch(BROWSE({ branch: onDuty._id, token }));
    }
  }, [onDuty, dispatch, token]);

  useEffect(() => {
    setPetitions(catalogs);
  }, [catalogs]);

  useEffect(() => {
    if (petitions.length > 0) {
      //Pagination
      let totalPages = Math.floor(petitions.length / maxPage);
      if (petitions.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [petitions, page, maxPage]);

  const handleStatus = (data) => {
    Swal.fire({
      icon: "info",
      title: "Are you sure?",
      html: `You won't be able to revert this!`,
      showCancelButton: true,
      confirmButtonText: "Yes, continue!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          UPDATE({
            entity: "assets/persons/heads",
            data,
            id: data.id,
            token,
          })
        );
      }
    });
  };

  const handleSearch = (string) => {
    if (string) {
      const petitions = catalogs.filter((petition) =>
        nameFormatter(petition.user.fullName)
          .toLowerCase()
          .startsWith(string.toLowerCase())
      );
      setPetitions(petitions);
    } else {
      setPetitions(catalogs);
    }
  };

  const handleAccess = (modal, branchId, userId, fullName) => {
    setVisibility(modal);
    setBranchId(branchId);
    setUserId(userId);
    setFullname(fullName);
  };
  return (
    <>
      <BreadCrumb title="Employees" paths={path} button={false} />
      <MDBContainer className="py-5 mt-4">
        <MDBRow className="mb-3">
          <MDBCol md={6}>
            <MDBInput
              onChange={(e) => handleSearch(e.target.value)}
              type="search"
              label="Search by Fullname"
              contrast={theme.dark}
            />
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <TBLemployee
          petitions={petitions}
          page={page}
          handleStatus={handleStatus}
          handleAccess={handleAccess}
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
