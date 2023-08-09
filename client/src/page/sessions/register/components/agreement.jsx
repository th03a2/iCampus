import React from "react";
import { MDBContainer, MDBBtn, MDBCheckbox } from "mdb-react-ui-kit";

export default function Agreement({ form, setForm, setActiveItem }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    setForm({ ...form, agreed: true });
  };

  return (
    <MDBContainer className="mt-4">
      <form onSubmit={handleSubmit}>
        <p>
          By clicking this consent form, I (as "Data Subject") grant my free,
          voluntary, and unconditional consent to the collection and processing
          of all Personal data and account or transaction information or records
          (collectively, the "Information") relating to me disclosed or
          transmitted by me in person or by my authorized agent or
          representative to the information database system of the Smart Campus
          Application and/or any of its authorized agent(s) or representative(s)
          as Information controller, by whatever means in accordance with
          Republic Act (R.A.) 10173, otherwise known as the "Data Privacy Act of
          2012," of the Republic of the Philippines, including its Implementing
          Rules and Regulations (IRR) as well as all other guidelines and
          issuances by the National Privacy Commission (NPC)
        </p>

        <div className="mb-3 d-flex justify-content-center">
          <MDBCheckbox
            id="agreement"
            label="I agreed to return conditions to Smart Campus for using my information. "
            required
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            position: "absolute",
            bottom: "23px",
            left: "10px",
            right: "25px",
          }}
        >
          <MDBBtn
            onClick={() => setActiveItem("credentials")}
            type="button"
            color="light"
            className="shadow-0"
          >
            Previous
          </MDBBtn>
          <MDBBtn type="submit" color="success">
            finish
          </MDBBtn>
        </div>

        {/* <div className="d-flex justify-content-between mt-4">
          <MDBBtn
            onClick={() => setActiveItem("credentials")}
            type="button"
            color="light"
            className="shadow-0"
          >
            Previous
          </MDBBtn>
          <MDBBtn type="submit" color="success">
            finish
          </MDBBtn>
        </div> */}
      </form>
    </MDBContainer>
  );
}
