import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCol,
  MDBBtnGroup,
} from "mdb-react-ui-kit";
import Overview from "./overview";
import { update } from "../../../../../../../../../redux/sqlbuilder";

const Index = ({ is_protected, model, form }) => {
  const [services, setServices] = useState(null);
  const { theme, token, onDuty, auth } = useSelector(({ auth }) => auth);

  useEffect(() => {
    setServices(model?.services);
  }, [model]);

  return (
    <>
      <MDBCard className="gui-viewer" style={{ minHeight: 500 }}>
        <MDBCardHeader className="py-0">
          <h2>{form?.toLocaleUpperCase()}</h2>
        </MDBCardHeader>
        <MDBCardBody>
          <MDBTable>
            <MDBTableHead>
              <tr className="text-center">
                <th rowSpan={2} width="5%">
                  #
                </th>
                <th rowSpan={2} width="55%">
                  Services
                </th>
                <th rowSpan={2} width="15%">
                  Results
                </th>
                <th colSpan={2} width="25%">
                  Conventional Unit
                </th>
              </tr>
              <tr>
                <th>Reference</th>
                <th>Units</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {services?.map((deal, index) => (
                <Overview deal={deal} index={index} />
              ))}
            </MDBTableBody>
          </MDBTable>
        </MDBCardBody>
      </MDBCard>
    </>
  );
};

export default Index;
