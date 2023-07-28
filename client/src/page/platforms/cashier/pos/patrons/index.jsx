import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../../../components/breadcrumb";
import Pager from "../../../../../components/pager";
import PatientTable from "./table";
import { PARENTS } from "../../../../../redux/slices/assets/persons/users";
import { PATRON } from "../../../../../redux/slices/commerce/pos";
import RegistrationModal from "./modal";
import Contract from "../contracts";
import ContractHistory from "./history";
import { Services } from "../../../../../fakeDb";

const path = [
  {
    path: "Patrons",
  },
];

const PatientList = () => {
  const { token, maxPage, onDuty, theme } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ users }) => users),
    [visibility, setVisibility] = useState(false),
    [willTransact, setWillTransact] = useState(false),
    [viewHistory, setViewHistory] = useState(false),
    [users, setUsers] = useState([]),
    [model, setModel] = useState({}),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    [search, setSearch] = useState(""),
    dispatch = useDispatch();

  useEffect(() => {
    if (onDuty._id) {
      dispatch(PARENTS({ query: { lname: "A", fname: "A" }, token }));
    }
  }, [onDuty]);

  useEffect(() => {
    setUsers(catalogs);
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
      const que = string.split(",");
      const query = {
        lname: que[0].toUpperCase(),
        fname: que[1]?.trim()?.toUpperCase(),
      };
      dispatch(PARENTS({ query, token }));
    }
  };

  const handleAction = (user, action = "create") => {
    dispatch(PATRON(user));
    action === "create" ? setWillTransact(true) : setViewHistory(true);
  };
  const handleVisible = model => {
    setVisibility(!visibility);
    setModel(model);
  };
  return (
    <>
      <BreadCrumb
        title="Patrons List"
        platform="Commerce"
        button={true}
        tooltip="Register a Patient"
        handler={setVisibility}
        paths={path}
      />
      <MDBContainer className="py-5 mt-4">
        <MDBRow className="mb-3">
          <MDBCol md={6}>
            <MDBInput
              onChange={e => handleSearch(e.target.value)}
              value={search}
              type="search"
              label="Search by Fullname (Family, Given name)"
              contrast={theme.dark}
            />
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <PatientTable
          users={users}
          page={page}
          handleAction={handleAction}
          handleVisible={handleVisible}
        />
        <RegistrationModal
          setSearch={setSearch}
          search={search}
          visibility={visibility}
          setVisibility={setVisibility}
          handleAction={handleAction}
          model={model}
        />
        <Contract visibility={willTransact} setVisibility={setWillTransact} />
        <ContractHistory
          visibility={viewHistory}
          setVisibility={setViewHistory}
        />
      </MDBContainer>
    </>
  );
};

export default PatientList;
