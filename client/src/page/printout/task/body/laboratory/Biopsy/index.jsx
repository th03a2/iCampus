import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import Overview from "./overview";

const index = () => {
  const { cluster } = useSelector(({ subQuery }) => subQuery);

  return (
    <div
      style={{
        marginBottom: cluster?.services?.length < 4 ? "10%" : null,
      }}
    >
      Biopsy
    </div>
  );
};

export default index;
