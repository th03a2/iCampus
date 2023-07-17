import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import BreadCrumb from "../../../../../components/breadcrumb";
import {
  PETITION,
  UPDATE,
} from "../../../../../redux/slices/assets/persons/personnels";
import { nameFormatter } from "../../../../../components/utilities";
import { TBLpetitioners } from "../../../../../templates";
import Swal from "sweetalert2";

const path = [
  {
    path: "Petitioners",
  },
];

export function Petitioners() {
  const { token, maxPage, onDuty, theme } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ personnels }) => personnels),
    [visibility, setVisibility] = useState(false),
    [petitions, setPetitions] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();
  useEffect(() => {
    if (onDuty.companyId) {
      dispatch(PETITION({ branch: onDuty._id, token }));
    }
  }, [onDuty]);

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
  }, [petitions, page]);

  const handleStatus = data => {
    Swal.fire({
      icon: "info",
      title: "Are you sure?",
      html: `You won't be able to revert this!`,
      showCancelButton: true,
      confirmButtonText: "Yes, continue!",
    }).then(result => {
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

    // dispatch(UPDATE());
  };

  const handleSearch = string => {
    if (string) {
      const petitions = catalogs.filter(petition =>
        nameFormatter(petition.user.fullName)
          .toLowerCase()
          .startsWith(string.toLowerCase())
      );
      setPetitions(petitions);
    } else {
      setPetitions(catalogs);
    }
  };
  return (
    <>
      <BreadCrumb title="Petitioners" paths={path} button={false} />
      <MDBContainer className="py-5 mt-4">
        <MDBRow className="mb-3">
          <MDBCol md={6}>
            <MDBInput
              onChange={e => handleSearch(e.target.value)}
              type="search"
              label="Search by Fullname"
              contrast={theme.dark}
            />
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <TBLpetitioners
          petitions={petitions}
          page={page}
          handleStatus={handleStatus}
        />
      </MDBContainer>
    </>
  );
}
