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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
          repudiandae animi rem maiores. Et cumque, cupiditate quisquam dolores
          facere nobis libero expedita? Excepturi delectus consectetur
          asperiores consequatur voluptatem non? Deserunt.
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
          repudiandae animi rem maiores. Et cumque, cupiditate quisquam dolores
          facere nobis libero expedita? Excepturi delectus consectetur
          asperiores consequatur voluptatem non? Deserunt.
        </p>

        <div className="mb-3 d-flex justify-content-center">
          <MDBCheckbox
            id="agreement"
            label="I agree to the Terms and Conditions"
            required
          />
        </div>

        <div className="d-flex justify-content-between">
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
      </form>
    </MDBContainer>
  );
}
