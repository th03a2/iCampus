import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../../../components/breadcrumb";
import Pager from "../../../../../components/pager";
import PatientTable from "./table";
import { PARENTS } from "../../../../../redux/slices/assets/persons/users";
import { nameFormatter } from "../../../../../components/utilities";
import PatientModal from "./modal";
import Pos from "./pos";
import PatientTransactionHistory from "./history";

const path = [
  {
    path: "Patrons",
  },
];

export const Patients = () => {
  const { token, maxPage, onDuty, theme } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ users }) => users),
    [visibility, setVisibility] = useState(false),
    [willTransact, setWillTransact] = useState(false),
    [viewHistory, setViewHistory] = useState(false),
    [users, setUsers] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    [search, setSearch] = useState(""),
    [user, setUser] = useState({}),
    dispatch = useDispatch();
  useEffect(() => {
    if (onDuty._id) {
      dispatch(PARENTS(token));
    }
  }, [onDuty]);

  useEffect(() => {
    if (catalogs.length > 0) {
      setUsers(catalogs);
    }
  }, [catalogs]);

  useEffect(() => {
    if (users.length > 0) {
      //Pagination
      let totalPages = Math.floor(users.length / maxPage);
      if (users.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [users, page]);

  const handleSearch = string => {
    setSearch(string);
    if (string) {
      setUsers(
        catalogs?.filter(catalog =>
          String(nameFormatter(catalog.fullName))
            .toLowerCase()
            .startsWith(string.toLowerCase())
        )
      );
    } else {
      setUsers(catalogs);
    }
  };

  const handleAction = (user, action = "create") => {
    setUser(user);
    if (action === "create") {
      setWillTransact(true);
    } else {
      setViewHistory(true);
    }
  };

  return (
    <>
      <BreadCrumb
        title="Patrons List"
        platform="Commerce"
        button={true}
        visibility={visibility}
        setVisibility={setVisibility}
        paths={path}
      />
      <MDBContainer className="py-5 mt-4">
        <MDBRow className="mb-3">
          <MDBCol md={6}>
            <MDBInput
              onChange={e => handleSearch(e.target.value)}
              value={search}
              type="search"
              label="Search by Fullname"
              contrast={theme.dark}
            />
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <PatientTable users={users} page={page} handleAction={handleAction} />
        <PatientModal
          setSearch={setSearch}
          search={search}
          visibility={visibility}
          setVisibility={setVisibility}
          handleAction={handleAction}
        />
        <Pos
          user={user}
          visibility={willTransact}
          setVisibility={setWillTransact}
        />
        <PatientTransactionHistory
          user={user}
          visibility={viewHistory}
          setVisibility={setViewHistory}
        />
      </MDBContainer>
    </>
  );
};
