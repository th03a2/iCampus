import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";
import Chart from "react-apexcharts";
import { months } from "../../components/utilities";
import { useDispatch, useSelector } from "react-redux";
import { YEARLY } from "../../redux/slices/statistics";

const DashboardSales = () => {
  const { theme, token, onDuty } = useSelector(({ auth }) => auth),
    { sales } = useSelector(({ statistics }) => statistics),
    [average, setAverage] = useState(0),
    [monthly, setMonthly] = useState(0),
    [categories, setCategories] = useState([]),
    [monthlyIncrease, setMonthlyIncrease] = useState(false),
    [data, setData] = useState([]),
    newDate = new Date(),
    dispatch = useDispatch();

  useEffect(() => {
    if (onDuty._id) {
      dispatch(
        YEARLY({
          token,
          data: {
            branchId: onDuty._id,
            year: newDate.getFullYear(),
          },
        })
      );
    }
  }, [onDuty, token, dispatch]);
  useEffect(() => {
    if (sales.length > 0) {
      const currentMonth = new Date().getMonth();

      // sortings
      const months = Array.from(
        new Set(sales.map((sale) => new Date(sale.createdAt).getMonth()))
      ).sort((a, b) => a - b);
      const items = months.map((month) =>
        sales.filter((sale) => new Date(sale.createdAt).getMonth() === month)
      );

      // average per month
      const gross = items?.map((item) =>
        item.reduce((total, _item) => total + _item.amount, 0)
      );
      setAverage(
        gross.reduce((total, _gross) => total + _gross, 0) / items.length
      );

      // find the current month
      const index = months.findIndex((e) => e === currentMonth);
      const collections = items[index];

      // set total of current month
      setMonthly(gross[index]);
      // check if sale increased
      setMonthlyIncrease(gross[index] > gross[index - 1]);

      // collected data to output in graph
      const categories = Array.from(
        new Set(
          collections?.map((collection) =>
            new Date(collection.createdAt).getDate()
          )
        )
      );
      const data = categories.map((category) =>
        collections
          .filter(
            (collection) =>
              new Date(collection.createdAt).getDate() === category
          )
          .reduce((total, e) => total + e.amount, 0)
      );

      setCategories(categories);
      setData(data);
      //   sales.length &&
      //     setAverage(sales.reduce((total, sale) => total + sale.amount, 0));
      // }, [sales]);
      // useEffect(() => {
      //   if (sales.length) {
      //     const _monthly = sales.filter((sale) => {
      //       let saleDate = new Date(sale["createdAt"]);
      //       return saleDate >= newDate.startDate && saleDate <= newDate.endDate;
      //     });
      //     setMonthly(_monthly.reduce((total, sale) => total + sale.amount, 0));
    }
  }, [sales]);

  return (
    <MDBCol md={4}>
      <MDBCard className="bg-transparent">
        <MDBCardHeader className={`${theme.bg} ${theme.text} border-0`}>
          <h5 className="font-weight-bold mb-0">Sales Overview</h5>
          <small className="d-block text-muted">Monthly sales statistics</small>
        </MDBCardHeader>
        <MDBCardBody className={`${theme.bg} ${theme.text} pt-0`}>
          <MDBRow>
            <MDBCol md={6} className="my-2">
              <small className="d-block text-muted">Monthly Average Sale</small>
              <span className="font-weight-bold">
                &#8369;{Number(Number(average).toFixed(2)).toLocaleString()}
                <MDBIcon fas icon="caret-up" color="success" />
              </span>
            </MDBCol>
            <MDBCol md={6} className="my-2">
              <small className="d-block text-muted">Commission</small>
              <span className="font-weight-bold">
                &#8369;600 <MDBIcon fas icon="caret-down" color="danger" />
              </span>
            </MDBCol>
            <MDBCol md={6} className="my-1">
              <small className="d-block text-muted">
                {months[newDate.getMonth()]}, {newDate.getFullYear()} Sales
              </small>
              <span className="font-weight-bold">
                &#8369;{monthly}{" "}
                <MDBIcon
                  fas
                  icon={`caret-${monthlyIncrease ? "up" : "down"}`}
                  color={monthlyIncrease ? "success" : "danger"}
                />
              </span>
            </MDBCol>
            <MDBCol md={6} className="my-1">
              <small className="d-block text-muted">Expenses</small>
              <span className="font-weight-bold">
                &#8369;3,600 <MDBIcon fas icon="caret-down" color="danger" />
              </span>
            </MDBCol>
          </MDBRow>
          <Chart
            options={{
              chart: {
                id: "dashboard-sales",
              },
              xaxis: {
                categories,
              },
            }}
            series={[
              {
                name: "Cash",
                data,
              },
            ]}
            type="line"
            width="100%"
          />
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default DashboardSales;
