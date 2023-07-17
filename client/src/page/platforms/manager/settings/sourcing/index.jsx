import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../../../components/breadcrumb";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtnGroup,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import InSourcingTable from "./insource";
import OutSourcingTable from "./outsource";
import SourcingModal from "./modal";
import { BROWSE } from "../../../../../redux/slices/assets/sourcing";
import Pager from "../../../../../components/pager";

const path = [
  {
    path: "Registered Sourcing",
  },
];

const Categories = ({ setTab, tab }) => {
  return (
    <div className="text-center mb-3">
      <MDBBtnGroup>
        <MDBBtn color="secondary" outline={tab === 1} onClick={() => setTab(1)}>
          Insourcing
        </MDBBtn>
        <MDBBtn color="primary" outline={tab === 2} onClick={() => setTab(2)}>
          Outsourcing
        </MDBBtn>
      </MDBBtnGroup>
    </div>
  );
};

export default function Tieup() {
  const { token, maxPage, onDuty, theme } = useSelector(({ auth }) => auth),
    [visibility, setVisibility] = useState(false),
    [page, setPage] = useState(1),
    [tab, setTab] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    if (onDuty._id) {
      dispatch(BROWSE({ query: { branchId: onDuty._id }, token }));
    }
  }, [onDuty]);

  // useEffect(() => {
  //   if (vendors.length > 0) {
  //     //Pagination
  //     let totalPages = Math.floor(vendors.length / maxPage);
  //     if (vendors.length % maxPage > 0) totalPages += 1;
  //     setTotalPages(totalPages);

  //     page > totalPages && setPage(totalPages);
  //   }
  // }, [vendors, page]);

  const handleSearch = string => {
    // if (string) {
    //   setSourcing(
    //     vendors.filter(catalog =>
    //       String(catalog.name).toLowerCase().startsWith(string.toLowerCase())
    //     )
    //   );
    // } else {
    //   setSourcing(vendors);
    // }
  };

  const handleVisibility = () => setVisibility(!visibility);

  return (
    <>
      <BreadCrumb
        title="List of Sourcing"
        handler={handleVisibility}
        button={true}
        setVisibility={setVisibility}
        visibility={visibility}
        paths={path}
      />

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
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <Categories setTab={setTab} tab={tab} />
        {tab === 1 && (
          <InSourcingTable handleVisibility={handleVisibility} page={page} />
        )}
        {tab === 2 && (
          <OutSourcingTable handleVisibility={handleVisibility} page={page} />
        )}

        <SourcingModal visibility={visibility} setVisibility={setVisibility} />
      </MDBContainer>
    </>
  );
}
