import React, { useState, useEffect } from "react";
import { MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import { useSelector } from "react-redux";
import { Services } from "../../../../../fakeDb";
import ServicesTable from "./table";

export default function BranchServices({ addHandler, packages }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth),
    [services, setServices] = useState(Services.collection),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1);

  //Pagination
  useEffect(() => {
    if (services.length > 0) {
      let totalPages = Math.floor(services.length / maxPage);
      if (services.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [services, page, maxPage]);

  const handleSearch = string => {
    if (string) {
      setServices(
        Services.whereNotIn(packages).filter(service =>
          Object.values(service).some(val =>
            String(val).toLowerCase().includes(string)
          )
        )
      );
    } else {
      setServices(Services);
    }
  };

  return (
    <MDBContainer>
      <MDBRow className="mb-3">
        <MDBCol md={6}>
          <MDBInput
            onChange={e => handleSearch(e.target.value)}
            type="search"
            label="Search by Key word"
            contrast={theme.dark}
          />
        </MDBCol>
        <Pager setPage={setPage} total={totalPages} page={page} />
      </MDBRow>
      <ServicesTable
        packages={packages}
        services={services}
        page={page}
        addHandler={addHandler}
      />
    </MDBContainer>
  );
}
