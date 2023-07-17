import React from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import BreadCrumb from "../../../../components/breadcrumb";
import DashboardStatistics from "../../../../widgets/statistics";
import Sales from "../../../../widgets/progress/sales";
import DashboardCompleted from "../../../../widgets/progress/completed";
import Registers from "../../../../widgets/progress/daily";

const Manager = () => {
  const { theme } = useSelector(({ auth }) => auth);
  // auth, onDuty
  return (
    <>
      <BreadCrumb title="Manager" />

      <MDBContainer fluid className="py-5">
        <MDBRow>
          <DashboardStatistics
            color="danger"
            icon="shopping-basket"
            title="Sales"
            texts={["Laboratory", "Radiology"]}
          />
          <DashboardStatistics
            color="primary"
            icon="hotel"
            title="Expenses"
            texts={["Utilities", "Cash Advance"]}
          />
          <DashboardStatistics
            color="success"
            icon="chart-bar"
            title="Census"
            texts={["Patient", "Services"]}
          />
        </MDBRow>
        <MDBRow>
          <Sales theme={theme} />
          <DashboardCompleted theme={theme} />
          <Registers theme={theme} />
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default Manager;
