import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../../../components/pager";
import BreadCrumb from "../../../../../../components/breadcrumb";
import { BROWSE } from "../../../../../../redux/slices/task/preferences";
import { ServicesCollapsable } from "../../../../../../templates";
import { Services } from "../../../../../../fakeDb";

const path = [
  {
    path: "Services",
  },
];

export default function Index() {
  const { maxPage, theme, onDuty, token } = useSelector(({ auth }) => auth),
    [visibility, setVisibility] = useState(false),
    [services, setServices] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    if (onDuty._id) {
      dispatch(BROWSE({ branchId: onDuty._id, token }));
      setServices(Services.collection);
    }
  }, [onDuty, token, dispatch]);

  //Pagination
  useEffect(() => {
    if (services.length > 0) {
      let totalPages = Math.floor(services.length / maxPage);
      if (services.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [services, page, maxPage]);

  const searchHandler = string => {
    if (string) {
      setServices(
        Services.collection.filter(
          ({ name, abbreviation }) =>
            name?.toLowerCase().startsWith(string.toLowerCase()) ||
            abbreviation?.toLowerCase().startsWith(string.toLowerCase())
        )
      );
    } else {
      setServices(Services.collection);
    }
  };

  return (
    <>
      <BreadCrumb
        title="Services"
        button={false}
        setVisibility={setVisibility}
        visibility={visibility}
        paths={path}
      />
      <MDBContainer className="py-5 mt-4">
        <MDBRow className="mb-3">
          <MDBCol md={6}>
            <MDBInput
              onChange={e => searchHandler(e.target.value)}
              type="search"
              label="Search by Title | Abbreviation"
              contrast={theme.dark}
            />
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <ServicesCollapsable services={services} page={page} />
      </MDBContainer>
    </>
  );
}
