import React, { useState, useEffect } from "react";
import { MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../../components/breadcrumb";
import CompanyCards from "./cards";
import { BROWSE } from "../../../../redux/slices/assets/companies";
import {
  FIND,
  RECORDSTATUS,
} from "../../../../redux/slices/assets/persons/personnels";
import { socket } from "../../../../components/utilities";

const path = [
  {
    path: "List of Companies",
  },
];

export default function UnsetRepresent() {
  const { theme, token, auth } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ companies }) => companies),
    [companies, setCompanies] = useState([]),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(BROWSE(token));
    socket.on("receivePetition", data => {
      if (data.status === "denied") {
        dispatch(RECORDSTATUS(data.status));
      } else {
        window.location.href = "/platform/owner/dashboard";
      }
    });
  }, [catalogs, token, dispatch]);

  useEffect(() => {
    if (auth._id) {
      dispatch(FIND({ token, id: auth._id }));
    }
  }, [auth, token, dispatch]);

  useEffect(() => {
    if (catalogs.length > 0) {
      setCompanies(catalogs?.filter(catalog => !catalog.ownerId));
    }
  }, [catalogs]);

  const handleSearch = string => {
    if (string) {
      setCompanies(
        catalogs?.filter(catalog =>
          String(catalog.name).toLowerCase().startsWith(string.toLowerCase())
        )
      );
    } else {
      setCompanies(catalogs);
    }
  };

  return (
    <>
      <BreadCrumb title="Available Companies" paths={path} />
      <MDBContainer className="py-5 mt-4">
        <MDBRow className="mb-3">
          <MDBCol md={6}>
            <MDBInput
              onChange={e => handleSearch(e.target.value)}
              type="search"
              label="Search by Name"
              contrast={theme.dark}
            />
          </MDBCol>
        </MDBRow>
        <CompanyCards companies={companies} />
      </MDBContainer>
    </>
  );
}
