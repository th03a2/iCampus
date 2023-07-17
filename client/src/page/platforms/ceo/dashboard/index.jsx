import React from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import BreadCrumb from "../../../../components/breadcrumb";
import DashboardStatistics from "../../../../widgets/statistics";
import DashboardSales from "../../../../widgets/progress/sales";
import DashboardCompleted from "../../../../widgets/progress/completed";
import DashboardDaily from "../../../../widgets/progress/daily";

const Owner = () => {
  const { theme } = useSelector(({ auth }) => auth);

  return (
    <>
      <BreadCrumb title="Owner" />
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
            title="Purchase Orders"
            texts={["Approved", "Pending", "Dennied"]}
          />
        </MDBRow>
        <MDBRow>
          <DashboardSales />
          <DashboardCompleted theme={theme} />
          <DashboardDaily />
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default Owner;
