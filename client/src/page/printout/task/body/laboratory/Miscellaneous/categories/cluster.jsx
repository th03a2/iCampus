import React from "react";
import { MDBCol, MDBContainer } from "mdb-react-ui-kit";
import { Services } from "../../../../../../../fakeDb";

export default function Cluster() {
  const { results } = JSON.parse(localStorage.getItem(`task-printout`));
  const test = [68, 69, 70, 97, 131];
  const services = Object.keys(results)
    .filter(key => test.includes(Number(key)))
    .map(key => Services.find(key));

  console.log(results);
  // HIV : 68
  // Syphilis |RPR :69
  // HBsAg :70
  // HCV : 97
  // HAV :131

  return (
    <MDBContainer className="pl-5">
      <MDBCol>
        <h6>Results:</h6>
        <MDBContainer>
          {services
            // .filter(service => service)
            .map((service, i) => (
              <MDBCol size="11" className="offset-1" key={`cluster-${i}`}>
                {service?.name || service?.abbreviation}:&nbsp;
                <b
                  style={{
                    color: results[service?.id] ? "red" : "black",
                  }}
                >
                  {results[service?.id] ? "REACTIVE" : "NON-REACTIVE"}
                </b>
              </MDBCol>
            ))}
        </MDBContainer>
      </MDBCol>
    </MDBContainer>
  );
}
