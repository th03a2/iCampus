import React from "react";
import "./App.css";

const H6 = ({ children, className = "mb-0" }) => (
  <h6 className={className}>{children}</h6>
);

export default function App() {
  return (
    <div className="drugtest-container">
      <h6 className="d-flex justify-content-between mx-3">
        <span>VT</span>
        <span>Report ID: DTO-R03</span>
      </h6>
      <div className="mx-3">
        <div className="row mb-3">
          <div className="col-2 text-end px-0">
            <img className="bg-primary" height={150} width={150} />
          </div>
          <div className="col-8 text-center px-0">
            <h5 className="mb-0">DEPARTMENT OF HEALTH</h5>
            <H6>ANALYTICON LABORATORY</H6>
            <H6>
              MABINI ST., COR. QUIMSON ST., BRGY. QUEZON DISTRICT, CABANATUAN
              CITY, NUEVA ECIJA
            </H6>
            <H6 className="mb-1">Phone Number: 09266790233</H6>
            <h5 className="mb-0">DRUG TEST REPORT</h5>
            <H6 className="mb-0 text-start">QL093098</H6>
            <H6 className="text-start mb-0">41</H6>
          </div>
        </div>
        <div className="row">
          <div className="col-7 ps-5">
            <div className="row">
              <div className="col-2 px-0">
                <H6>CCF No: </H6>
                <H6>Name: </H6>
                <H6>Birthdate: </H6>
              </div>
              <div className="col-10 px-0">
                <H6>202307070008</H6>
                <H6>ARNES, JERLONE JADE DE GUZMAN</H6>

                <div className="row">
                  <div className="col-3">
                    <H6>10/30/1998</H6>
                  </div>
                  <div className="col-9">
                    <div className="row">
                      <div className="col-4">
                        <H6>Age:&nbsp;&nbsp;&nbsp;25</H6>
                      </div>
                      <div className="col-6">
                        <H6>Gender:&nbsp;&nbsp;&nbsp;M</H6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-5 d-flex align-items-center">
            <div className="row w-100">
              <div className="col-5 px-0">
                <H6>Transaction Date Time:</H6>
                <H6>Report Date Time:</H6>
              </div>
              <div className="col-7 px-0">
                <H6>7/7/2023 12:07:00PM</H6>
                <H6>7/7/2023 1:56:57PM</H6>
              </div>
            </div>
          </div>
        </div>
        <div className="my-2 ps-4 d-flex align-items-center">
          <H6 className="mb-0 me-4">Test Method :</H6>
          <span>TEST KIT</span>
        </div>
        <div className="row">
          <div className="col-6 ps-5">
            <H6>Purpose</H6>
            <span>Private Employment</span>
          </div>
          <div className="col-6">
            <H6>Requesting Parties</H6>
            <span></span>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col ps-5">
            <H6 className="mb-2">Result</H6>
            <div className="ms-4" style={{ width: "95%" }}>
              <table className="table table-bordered border-dark table-light">
                <thead>
                  <tr>
                    <th className="p-0">Drug/Metabloite</th>
                    <th className="p-0">Result</th>
                    <th className="p-0">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-0">METHAMPHETAMINE</td>
                    <td className="p-0">NEGATIVE</td>
                    <td className="p-0">PASSED</td>
                  </tr>
                  <tr>
                    <td className="p-0">TETRAHYDROCOANNABINOL</td>
                    <td className="p-0">NEGATIVE</td>
                    <td className="p-0">PASSED</td>
                  </tr>
                </tbody>
              </table>
              <div className="row text-center">
                <div className="col-6">
                  <H6 className="mb-3">Test Conducted By</H6>
                  <H6>
                    95
                    <span className="px-5 border-bottom border-dark ms-1">
                      APRIL SHARMAYNE D. RAMOS
                    </span>
                  </H6>
                  <H6>Analyst</H6>
                </div>
                <div className="col-6">
                  <H6 className="mb-3">Approved By</H6>
                  <H6>
                    <span className="px-5 border-bottom border-dark ms-1">
                      DR. JUANITA TUCAY LACUESTA
                    </span>
                    29
                  </H6>
                  <H6>Head of Laboratory</H6>
                </div>
              </div>
            </div>
            <H6 className="mt-3">
              Valid Within 12 Month/s from Transaction Date
            </H6>
            <H6 className="text-center w-75">
              This is a DOH-DDB IDTOMIS generated report
            </H6>
          </div>
        </div>
      </div>
    </div>
  );
}
