import React, { useEffect, useState } from "react";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import {
  nameFormatter,
  getAge,
  properNameFormatter,
} from "../../../components/utilities";
import { formColors } from "../../../assets/references";

export default function Index() {
  const [deal, setdeal] = useState({});
  const [patron, setPatron] = useState({});
  const [referral, setReferral] = useState(null);
  const [source, setSource] = useState(null);
  const [category, setCategory] = useState(null);
  const { form } = useParams();

  useEffect(() => {
    const _deal = JSON.parse(localStorage.getItem(`task-printout`));
    if (_deal) {
      setdeal(_deal);
      setPatron(_deal.customerId);
      setReferral(_deal?.referral);
      setSource(_deal?.source);
      setCategory(_deal?.category);
    }
  }, [form]);

  return (
    <div className="text-start px-2 my-1">
      <MDBRow>
        <MDBCol size={7} className="fw-bold" style={{ fontSize: "17px" }}>
          <u> {nameFormatter(patron?.fullName, false)}</u>
        </MDBCol>
        <MDBCol
          size={5}
          style={{ fontSize: "12px" }}
          className="d-flex align-items-center"
        >
          {new Date(deal.updatedAt).toDateString()},&nbsp;
          {new Date(deal.updatedAt).toLocaleTimeString()}
        </MDBCol>
        <MDBCol size={7} style={{ fontSize: "12px" }}>
          {getAge(deal.customerId?.dob, true)} |&nbsp;
          {patron.isMale ? "MALE" : "FEMALE"}
          {/* | {String(source).toUpperCase()} */}
        </MDBCol>
        <MDBCol size={5} style={{ fontSize: "12px" }}>
          Source: <b>{source && `${source.companyName} |${source.name}`}</b>
        </MDBCol>
        <MDBCol size={7} style={{ fontSize: "12px" }}>
          Category: {String(category).toUpperCase()}
        </MDBCol>
        <MDBCol size={5} style={{ fontSize: "12px" }}>
          Referral: {referral && <u>{properNameFormatter(referral, true)}</u>}
        </MDBCol>
      </MDBRow>
      <div style={{ marginLeft: "0.1%", marginRight: "0.1%" }}>
        <h4
          style={{
            letterSpacing: 30,
            textAlign: "center",
          }}
          className={`alert-${formColors(
            form
          )} mb-1 text-dark fw-bold d-block text-uppercase`}
        >
          {form}
        </h4>
      </div>
    </div>
  );
}
