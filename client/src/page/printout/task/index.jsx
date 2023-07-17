import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bodySwitcher } from "./bodySwitcher";
import { Banner } from "../../../widgets";
import Headers from "./headers";
import Footer from "./footer";
import { MDBTypography } from "mdb-react-ui-kit";

export default function TaskPrint() {
  const { form } = useParams();
  const [deal, setdeal] = useState({});

  useEffect(() => {
    const _deal = JSON.parse(localStorage.getItem(`task-printout`));
    _deal && setdeal(_deal);
  }, [form]);

  let Body = bodySwitcher(form);
  console.log("deal", deal);
  return (
    <div
      style={{
        maxWidth: "850px",
        width: "850px",
        maxHeight: "624px",
        height: "624px",
      }}
      className="position-relative"
      onClick={window.print}
    >
      <Banner />
      <Headers />
      <div style={{ marginLeft: "10px", marginRight: "10px" }}>
        <Body form={form} />
        {/* <br /> */}
        <div
          className="w-100 text-start px-2 "
          style={{
            position: "fixed",
          }}
        >
          <MDBTypography
            style={{ fontSize: "15px", borderBottom: "solid #3f6fad" }}
          >
            Remarks:<strong>{deal.remarks}</strong>
          </MDBTypography>
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
}
