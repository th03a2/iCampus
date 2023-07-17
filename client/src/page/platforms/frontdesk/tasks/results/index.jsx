import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../../../components/breadcrumb";
import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { TASK, SEARCH } from "../../../../../redux/slices/commerce/sales";
import { HEADS, PREFERENCES } from "../../../../../redux/slices/task/forms";
import Overview from "./checklist/overview";
import Forms from "./forms";

const path = [
  {
    path: "Daily Task",
  },
];

export function Tasks() {
  const { theme, token, onDuty } = useSelector(({ auth }) => auth),
    { sales } = useSelector(({ sales }) => sales),
    { heads, preferences } = useSelector(({ task }) => task),
    [activeIndex, setActiveIndex] = useState(0),
    dispatch = useDispatch();

  useEffect(() => {
    onDuty._id &&
      dispatch(
        TASK({
          token,
          type: {
            branchId: onDuty._id,
            date: new Date().toDateString(),
          },
        })
      );

    if (heads.length === 0 && onDuty._id) {
      dispatch(
        HEADS({
          token,
          data: { branch: onDuty._id },
        })
      );
    }
    if (preferences.length === 0 && onDuty._id) {
      dispatch(
        PREFERENCES({
          branchId: onDuty._id,
          token,
        })
      );
    }
  }, [heads, preferences, dispatch, onDuty, token]);
  const handleSearch = string => string && dispatch(SEARCH(string));

  return (
    <>
      <BreadCrumb title="Daily Tasks" platform="Commerce" paths={path} />
      <MDBContainer className="py-5 mt-4">
        <MDBRow className="mb-3">
          <MDBCol md={6}>
            <MDBInput
              onChange={e => handleSearch(e.target.value)}
              type="search"
              label="Search by Patients"
              contrast={theme.dark}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol size={12} className="transition-all">
            {!!sales.length ? (
              sales.map((sale, index) => (
                <Overview
                  key={`${sale._id}-task`}
                  sale={sale}
                  index={index + 1}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                />
              ))
            ) : (
              <MDBTypography note noteColor="info">
                <strong>No results: </strong> Havent generated a task yet.
              </MDBTypography>
            )}
          </MDBCol>
        </MDBRow>
        <Forms />
      </MDBContainer>
    </>
  );
}
