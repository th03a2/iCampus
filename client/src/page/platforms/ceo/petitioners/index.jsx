import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../../components/breadcrumb";
import { MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import Pager from "../../../../components/pager";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  BROWSE,
  RECORDINJECT,
  UPDATE,
} from "../../../../redux/slices/assets/persons/personnels";
import { UPDATE as IMPROVE } from "../../../../redux/slices/assets/persons/users";
import { UPDATE as REFORM } from "../../../../redux/slices/assets/branches";
import { REVERT, SAVE } from "../../../../redux/slices/notifications";
import PetitionTable from "./table/";
import { nameFormatter, socket } from "../../../../components/utilities";

const path = [
    {
      path: "Petitions",
    },
  ],
  availableRoles = [
    { role: "manager", name: "Manager" },
    { role: "doctor", name: "Physician" },
    { role: "medtech", name: "Medical Technologist" },
    { role: "tech", name: "Medical Technician" },
    { role: "phlebotomist", name: "Phlebotomist" },
    { role: "cashier", name: "Cashier" },
  ];

export default function Petitioners() {
  const { token, theme, maxPage } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ petitions }) => petitions),
    { record, didSubmit } = useSelector(({ notifications }) => notifications),
    [petitions, setPetitions] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    if (didSubmit) {
      socket.emit("sendNotification", { roomId: record.userId, form: record });
      dispatch(REVERT());
    }
  }, [record, didSubmit]);

  useEffect(() => {
    dispatch(
      BROWSE({
        data: { id: "636d37e0187c30ab0f611ce0", status: "petition" },
        token,
      })
    );
    socket.on("insertPetition", (record) => dispatch(RECORDINJECT(record)));

    return () => {
      socket.off("insertPetition");
    };
  }, []);

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

  const handleAction = (
    name,
    id,
    status,
    userId,
    roles,
    companyId,
    companyName,
    branchId,
    branchName,
    position
  ) =>
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      html: `<u>${name}</u>'s request will be ${status}`,
      showCancelButton: true,
      confirmButtonText: "Yes, continue!",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(UPDATE({ id, token, data: { status } }));
        socket.emit("sendPetition", { roomId: userId, status, position });
        var details = "",
          icon = "";

        if (status === "approved") {
          const selectedRole = availableRoles.find(
            (role) => role.role === position
          );

          details = `Promoted to ${selectedRole.name} of ${String(
            companyName
          ).toUpperCase()}, ${String(branchName).toUpperCase()}!`;
          icon = "medal";
          var newArr = roles.filter((role) => role?.name !== "Patron");
          newArr.push({
            companyId,
            companyName,
            branchId,
            branchName,
            role: selectedRole.role,
            name: selectedRole.name,
          });
          dispatch(IMPROVE({ id: userId, token, data: { roles: newArr } }));
          if (position === "manager") {
            dispatch(
              REFORM({ id: branchId, token, data: { managerId: userId } })
            );
          }
        } else {
          details = `Request at ${String(companyName).toUpperCase()}, ${String(
            branchName
          ).toUpperCase()} has been denied!`;
          icon = "heart-broken";
        }

        const form = {
          details,
          icon,
          userId,
        };
        dispatch(SAVE({ form, token }));
      }
    });

  const handleSearch = (string) => {
    if (string) {
      setPetitions(
        catalogs.filter((catalog) =>
          nameFormatter(catalog.userId?.fullName)
            .toLowerCase()
            .startsWith(string.toLowerCase())
        )
      );
    } else {
      setPetitions(catalogs);
    }
  };

  return (
    <>
      <BreadCrumb title="Petitions" paths={path} />
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
        <PetitionTable
          petitions={petitions}
          page={page}
          handleAction={handleAction}
        />
      </MDBContainer>
    </>
  );
}
