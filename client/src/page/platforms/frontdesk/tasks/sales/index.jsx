import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../../../components/breadcrumb";
import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBBtnGroup,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { BROWSE } from "../../../../../redux/slices/commerce/sales";
import Inhouse from "./category/inhouse";
import Sendout from "./category/sendout";
import Subcon from "./category/subcontract";
import { nameFormatter } from "../../../../../components/utilities";

const path = [
  {
    path: "Daily Task",
  },
];

export const Categories = ({ setTab, tab }) => {
  return (
    <div className="text-center mb-3">
      <MDBBtnGroup>
        <MDBBtn color="info" outline={tab === 1} onClick={() => setTab(1)}>
          In House
        </MDBBtn>
        <MDBBtn color="secondary" outline={tab === 3} onClick={() => setTab(3)}>
          Insourcing
        </MDBBtn>
        <MDBBtn color="primary" outline={tab === 2} onClick={() => setTab(2)}>
          Send Out
        </MDBBtn>
      </MDBBtnGroup>
    </div>
  );
};

export function Sales() {
  const { theme, token, onDuty } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ sales }) => sales),
    [sales, setSales] = useState([]),
    [tab, setTab] = useState(1),
    [activeIndex, setActiveIndex] = useState(0),
    dispatch = useDispatch();

  useEffect(() => {
    if (onDuty._id) {
      dispatch(
        BROWSE({
          token,
          data: {
            branchId: onDuty._id,
            date: new Date().toDateString(),
          },
        })
      );
    }
  }, [onDuty, token, dispatch]);

  const handleSearch = (string) => {
    var _sales = [...catalogs];
    var sorted = _sales.sort((a, b) => {
      const first = a.renderedAt ? true : false,
        second = b.renderedAt ? true : false;
      return Number(first) - Number(second);
    });

    setActiveIndex(0);
    // var sorted = _sales.sort(
    //   (a, b) => Number(a.hasResult) - Number(b.hasResult)
    // );

    if (string) {
      setSales(
        sorted.filter((sale) =>
          String(nameFormatter(sale.customerId?.fullName, false))
            .toLowerCase()
            .startsWith(string.toLowerCase())
        )
      );
    } else {
      setSales(sorted);
    }
  };

  return (
    <>
      <BreadCrumb title="Sales" platform="Commerce" paths={path} />
      <MDBContainer className="py-5 mt-4">
        <MDBRow className="mb-3">
          <MDBCol md={6}>
            <MDBInput
              onChange={(e) => handleSearch(e.target.value)}
              type="search"
              className="mb-2"
              label="Search by Patient"
              contrast={theme.dark}
            />
          </MDBCol>
        </MDBRow>
        <Categories setTab={setTab} tab={tab} />
        {tab === 1 && (
          <Inhouse activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        )}
        {tab === 2 && (
          <Sendout activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        )}
        {tab === 3 && (
          <Subcon activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        )}
      </MDBContainer>
    </>
  );
}
