import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import BreadCrumb from "../../../../../components/breadcrumb";
import { BROWSE } from "../../../../../redux/slices/task/preferences";
import { Services } from "../../../../../fakeDb";
import { ServicesCollapsable } from "../../../../../templates";

const path = [
  {
    path: "Services",
  },
];

export default function Index() {
  const { token, maxPage, theme, onDuty } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ preferences }) => preferences),
    dispatch = useDispatch(),
    [visibility, setVisibility] = useState(false),
    [services, setServices] = useState([]),
    [cluster, setCluster] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (onDuty._id) {
      dispatch(
        BROWSE({
          token,
          params: { branchId: onDuty._id },
        })
      );
    }
  }, [onDuty, dispatch, token]);

  useEffect(() => {
    let _services = Services.collection.map(service => {
      const reference = catalogs.filter(
        ({ serviceId }) => serviceId === service.id
      );
      service.reference = reference;
      return service;
    });
    setServices(_services);
    setCluster(_services);
  }, [catalogs]);

  //Pagination
  useEffect(() => {
    if (cluster.length > 0) {
      let totalPages = Math.floor(cluster.length / maxPage);
      cluster.length % maxPage > 0 && totalPages++;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [cluster, page, maxPage]);

  const searchHandler = string => {
    if (string) {
      setCluster(
        services.filter(
          ({ name, abbreviation }) =>
            name?.toLowerCase().startsWith(string.toLowerCase()) ||
            abbreviation?.toLowerCase().startsWith(string.toLowerCase())
        )
      );
    } else {
      setCluster(catalogs);
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
        <ServicesCollapsable services={cluster} page={page} />
      </MDBContainer>
    </>
  );
}
