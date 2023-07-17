import React from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import BreadCrumb from "../../../../components/breadcrumb";
import DashboardStatistics from "../../../../widgets/statistics";
import DashboardSales from "../../../../widgets/progress/sales";
import DashboardCompleted from "../../../../widgets/progress/completed";
import DashboardDaily from "../../../../widgets/progress/daily";

const Auditor = () => {
  const { theme } = useSelector(({ auth }) => auth);

  return (
    <>
      <BreadCrumb title="Auditors" />

      <MDBContainer className="py-5">
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
            title="Services"
            texts={["Census", "Pending", "Outsource"]}
          />
          <DashboardStatistics
            color="success"
            icon="chart-bar"
            title="Utilities"
            texts={["Water bill", "Electric bill", "etc."]}
          />
        </MDBRow>
        <MDBRow>
          <DashboardSales theme={theme} />
          <DashboardCompleted theme={theme} />
          <DashboardDaily theme={theme} />
        </MDBRow>
      </MDBContainer>
      <MDBContainer fluid className="bg-secondary">
        Cashier Dashboard (widgets)
        <ul>
          <li>Task Status</li>
          <li>List of Daily Patrons</li>
          <li>Appoinment on Physician</li>
          <li>DTR (on duty staff)</li>
        </ul>
      </MDBContainer>
    </>
  );
};

export default Auditor;
