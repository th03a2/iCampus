import React, { useState, useEffect } from "react";
import { MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import BreadCrumb from "../../../../../components/breadcrumb";
import Pager from "../../../../../components/pager";
import { useDispatch, useSelector } from "react-redux";
import { nameFormatter } from "../../../../../components/utilities";
import HeadsModal from "./modal";
import { TBLheads } from "../../../../../templates";
import { BROWSE } from "../../../../../redux/slices/query";

const path = [
  {
    path: "Staff",
  },
];

export const Heads = () => {
  const { theme, token, maxPage, onDuty } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ query }) => query),
    [heads, setHeads] = useState([]),
    [model, setModel] = useState([]),
    [visibility, setVisibility] = useState(false),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    onDuty._id &&
      dispatch(
        BROWSE({
          entity: "assets/persons/heads",
          data: { branch: onDuty?._id },
          token,
        })
      );
  }, [onDuty, dispatch, token]);

  //Pagination
  useEffect(() => {
    if (catalogs.length > 0) {
      let totalPages = Math.floor(catalogs.length / maxPage);
      if (catalogs.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);
      page > totalPages && setPage(totalPages);
      setHeads(catalogs);
    }
  }, [catalogs, maxPage, page]);

  const handleToggle = model => {
    setModel(model);
    setVisibility(!visibility);
  };

  const handleSearch = string => {
    if (string) {
      const heads = catalogs.filter(head =>
        nameFormatter(head.user.fullName)
          .toLowerCase()
          .startsWith(string.toLowerCase())
      );
      setHeads(heads);
    } else {
      setHeads(catalogs);
    }
  };

  return (
    <>
      <BreadCrumb
        title="Department Heads"
        paths={path}
        handler={setVisibility}
        button={true}
        tooltip="Create New Heads"
      />
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
        <TBLheads heads={heads} page={page} handleToggle={handleToggle} />
      </MDBContainer>
      <HeadsModal
        visibility={visibility}
        setVisibility={setVisibility}
        model={model}
      />
    </>
  );
};
