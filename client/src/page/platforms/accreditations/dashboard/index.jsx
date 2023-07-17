import React from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import BreadCrumb from "../../../../components/breadcrumb";
import DashboardStatistics from "../../../../widgets/statistics";
import DashboardSales from "../../../../widgets/progress/sales";
import DashboardCompleted from "../../../../widgets/progress/completed";
import DashboardDaily from "../../../../widgets/progress/daily";

const Accreditation = () => {
  const { theme } = useSelector(({ auth }) => auth);

  return (
    <>
      <BreadCrumb title="DOH Accreditations" />

      <MDBContainer className="py-5">
        <MDBRow>
          <DashboardStatistics
            color="danger"
            icon="shopping-basket"
            title="Mission"
            texts={["Company missions"]}
          />
          <DashboardStatistics
            color="primary"
            icon="hotel"
            title="Vision"
            texts={["Company vision"]}
          />
          <DashboardStatistics
            color="success"
            icon="chart-bar"
            title="Objectives"
            texts={["Company objectives"]}
          />
        </MDBRow>
        <MDBRow>
          <DashboardSales theme={theme} />
          <DashboardCompleted theme={theme} />
          <DashboardDaily theme={theme} />
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default Accreditation;
