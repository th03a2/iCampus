import React from "react";
import { MDBRow, MDBCol, MDBTable, MDBTableBody } from "mdb-react-ui-kit";
import CellCount from "./container/cellcount/index.jsx";
import DiffCount from "./container/diffcount/index.jsx";
import RCI from "./container/rci/index.jsx";

// const Seconds = ["00", "15", "30", "45"];

const Hematology = () => {
  const { troupe } = JSON.parse(localStorage.getItem(`task-printout`));

  return (
    <div
      style={{
        minHeight: "280px",
      }}
    >
      <MDBRow>
        <MDBCol size="4" className="px-0">
          <CellCount />
        </MDBCol>
        <MDBCol size="4" className="px-0">
          <DiffCount />
        </MDBCol>
        <MDBCol size="4" className="ps-0">
          <RCI />
          <MDBTable responsive hover bordered>
            <MDBTableBody>
              <tr key={`result-3`}>
                <td className="py-0 px-2">Bleeding Time</td>
                <td className="py-0 px-2">
                  {/* {bt && `${bt[0]}', ${Seconds[bt[1]]}"`} */}
                </td>
                <td className="py-0 px-2"> 2-4 mins </td>
              </tr>
              <tr key={`result-4`}>
                <td className="py-0 px-2">Clotting Time</td>
                <td className="py-0 px-2">
                  {/* {ct && `${ct[0]}', ${Seconds[ct[1]]}"`} */}
                </td>
                <td className="py-0 px-2"> 2-4 mins </td>
              </tr>
              <tr key={`result-5`}>
                <td className="py-0 px-2">Reticulocytes</td>
                <td
                  className={`py-0 px-2 text-${troupe?.esr > 15 && "danger"}`}
                >
                  {troupe?.retic}
                </td>
                <td className="py-0 px-2">0.5-1.5%</td>
              </tr>
              <tr key={`result-6`}>
                <td className="py-0 px-2">ESR</td>
                <td
                  className={`py-0 px-2 text-${troupe?.esr > 15 && "danger"}`}
                >
                  {troupe?.esr}{" "}
                </td>
                <td className="py-0 px-2">0-15 mm/hr</td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Hematology;
