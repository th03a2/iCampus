import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "./../../../../components/pager";
import BreadCrumb from "./../../../../components/breadcrumb";
import { BROWSE } from "./../../../../redux/slices/assets/schedulers";
import { TBLschedulers } from "./../../../../templates";
import Modal from "./modal";

const path = [
  {
    path: "Schedulers",
  },
];

export default function Schedulers() {
  const { onDuty, token, maxPage, theme } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ query }) => query),
    [visibility, setVisibility] = useState(false),
    [schedulers, setSchedulers] = useState([]),
    [schedule, setSchedule] = useState({}),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    if (onDuty._id) {
      dispatch(
        BROWSE({
          data: {}, //branch: onDuty._id
          token,
        })
      );
    }
  }, [dispatch, token, onDuty]);

  useEffect(() => {
    if (onDuty._id) {
      setSchedulers(catalogs);
    }
  }, [catalogs]);

  useEffect(() => {
    if (schedulers.length > 0) {
      let totalPages = Math.floor(schedulers.length / maxPage);
      if (schedulers.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [schedulers, page, maxPage]);

  const handleVisible = model => {
    setVisibility(!visibility);
    setSchedule(model);
  };
  return (
    <>
      <BreadCrumb
        title="Schedule List"
        platform="Commerce"
        button={true}
        tooltip="Generate Schedule"
        handler={setVisibility}
        paths={path}
      />
      <MDBContainer className="py-5 mt-5">
        <MDBRow className="mb-3">
          <MDBCol md={6}>
            <MDBInput
              // onChange={e => handleSearch(e.target.value)}
              type="search"
              label="Search by Professor"
              contrast={theme.dark}
            />
          </MDBCol>
          <Pager
            setPage={setPage}
            total={totalPages}
            page={page}
            handleVisible={handleVisible}
          />
        </MDBRow>
        <TBLschedulers page={page} />
        <Modal
          visibility={visibility}
          setVisibility={setVisibility}
          schedule={schedule}
        />
      </MDBContainer>
    </>
  );
}
