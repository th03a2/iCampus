import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./css/index.css";
import Table from "./table";
import { MDBIcon } from "mdb-react-ui-kit";

import {
  paginationHandler,
  nameFormatter,
} from "../../../components/utilities";

//   const dispatch = useDispatch();
export function TBLemployees({ personnels, page }) {
  const [employees, setEmployees] = useState([]);
  const { maxPage } = useSelector(({ auth }) => auth);

  useEffect(() => {
    const newUsers = personnels.map(data => data);
    setEmployees(newUsers);
  }, [personnels]);

  const handlePrc = prc => {
    if (typeof prc === "object") {
      return (
        <>
          <td className="text-nowrap">{prc?.id || ""}</td>
          <td className="text-nowrap">{prc?.from || ""}</td>
          <td className="text-nowrap">{prc?.to || ""}</td>
        </>
      );
    } else {
      return (
        <>
          <td className="text-nowrap">{""}</td>
          <td className="text-nowrap">{""}</td>
          <td className="text-nowrap">{""}</td>
        </>
      );
    }
  };

  const handleStatus = status => {
    switch (status.toLowerCase()) {
      case "permanent":
        return (
          <>
            <td>
              <MDBIcon fas icon="check" />
            </td>
            <td>{""}</td>
            <td>{""}</td>
          </>
        );
      case "contractual":
        return (
          <>
            <td>{""}</td>
            <td>
              <MDBIcon fas icon="check" />
            </td>
            <td>{""}</td>
          </>
        );
      default:
        return (
          <>
            <td>{""}</td>
            <td>{""}</td>
            <td>{status}</td>
          </>
        );
    }
  };

  return (
    <>
      <Table
        paginationHandler={paginationHandler}
        maxPage={maxPage}
        employees={employees}
        nameFormatter={nameFormatter}
        handleStatus={handleStatus}
        handlePrc={handlePrc}
        page={page}
      />
    </>
  );
}
