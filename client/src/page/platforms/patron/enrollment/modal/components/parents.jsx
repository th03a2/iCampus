import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";
import { validateContactNumber } from "../../../../../../components/utilities";

export default function Parents({
  parents,
  setParents,
  setActiveItem,
  link,
  setLink,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const tabs = { ...link };

    tabs.siblings = true;

    setLink(tabs);
    setActiveItem("siblings");
  };

  return (
    <MDBContainer className="mt-4">
      <form onSubmit={handleSubmit}>
        <div className="text-center">
          <strong className="text-center">Father</strong>
        </div>
        <MDBRow className="mt-3">
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="First Name"
              value={parents.father?.fname}
              required
              onChange={(e) => {
                setParents({
                  ...parents,
                  father: {
                    ...parents.father,
                    fname: e.target.value,
                  },
                });
              }}
            />
          </MDBCol>
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Middle Name(Optional)"
              value={parents.father?.mname}
              onChange={(e) => {
                setParents({
                  ...parents,
                  father: {
                    ...parents.father,
                    mname: e.target.value,
                  },
                });
              }}
            />
          </MDBCol>
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Last Name"
              value={parents.father?.lname}
              required
              onChange={(e) => {
                setParents({
                  ...parents,
                  father: {
                    ...parents.father,
                    lname: e.target.value,
                  },
                });
              }}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-2">
          <MDBCol md={4}>
            <select
              className="form-control"
              value={parents.father?.isMale}
              required
              onChange={(e) => {
                setParents({
                  ...parents,
                  father: {
                    ...parents.father,
                    isMale: e.target.value,
                  },
                });
              }}
            >
              <option value={""}>Gender</option>
              <option value={true}>Male</option>
              <option value={false}>Female</option>
            </select>
          </MDBCol>
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Mobile (+63) (Optional)"
              value={parents.father.phone}
              onChange={(e) => {
                setParents({
                  ...parents,
                  father: {
                    ...parents.father,
                    phone: e.target.value,
                  },
                });
              }}
              required
              onKeyDown={validateContactNumber}
              maxLength={10}
            />
          </MDBCol>
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Province"
              value={parents.father?.province}
              onChange={(e) => {
                setParents({
                  ...parents,
                  father: {
                    ...parents.father,
                    province: e.target.value,
                  },
                });
              }}
              required
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-2">
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Municipality"
              value={parents.father?.muni}
              onChange={(e) => {
                setParents({
                  ...parents,
                  father: {
                    ...parents.father,
                    muni: e.target.value,
                  },
                });
              }}
              required
            />
          </MDBCol>
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Barangay"
              value={parents.father?.brgy}
              onChange={(e) => {
                setParents({
                  ...parents,
                  father: {
                    ...parents.father,
                    brgy: e.target.value,
                  },
                });
              }}
              required
            />
          </MDBCol>
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Street"
              value={parents.father?.street}
              onChange={(e) => {
                setParents({
                  ...parents,
                  father: {
                    ...parents.father,
                    street: e.target.value,
                  },
                });
              }}
              required
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-2">
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Relationship"
              value={parents.father?.relationship}
              onChange={(e) => {
                setParents({
                  ...parents,
                  father: {
                    ...parents.father,
                    relationship: e.target.value,
                  },
                });
              }}
              required
            />
          </MDBCol>
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Suffix"
              value={parents.father?.suffix}
              onChange={(e) => {
                setParents({
                  ...parents,
                  father: {
                    ...parents.father,
                    suffix: e.target.value,
                  },
                });
              }}
            />
          </MDBCol>
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Occupation"
              value={parents.father?.occupation}
              required
              onChange={(e) => {
                setParents({
                  ...parents,
                  father: {
                    ...parents.father,
                    occupation: e.target.value,
                  },
                });
              }}
            />
          </MDBCol>
        </MDBRow>
        <div className="text-center mt-4">
          <strong className="text-center">Mother</strong>
        </div>
        <MDBRow className="mt-3">
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="First Name"
              value={parents.mother?.fname}
              required
              onChange={(e) => {
                setParents({
                  ...parents,
                  mother: {
                    ...parents.mother,
                    fname: e.target.value,
                  },
                });
              }}
            />
          </MDBCol>
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Middle Name(Optional)"
              value={parents.mother?.mname}
              onChange={(e) => {
                setParents({
                  ...parents,
                  mother: {
                    ...parents.mother,
                    mname: e.target.value,
                  },
                });
              }}
            />
          </MDBCol>
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Last Name"
              value={parents.mother?.lname}
              onChange={(e) => {
                setParents({
                  ...parents,
                  mother: {
                    ...parents.mother,
                    lname: e.target.value,
                  },
                });
              }}
              required
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-2">
          <MDBCol md={4}>
            <select
              className="form-control"
              value={parents.mother?.isMale}
              onChange={(e) => {
                setParents({
                  ...parents,
                  mother: {
                    ...parents.mother,
                    isMale: e.target.value,
                  },
                });
              }}
              required
            >
              <option value={""}>Gender</option>
              <option value={true}>Male</option>
              <option value={false}>Female</option>
            </select>
          </MDBCol>
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Mobile (+63) (Optional)"
              value={parents.mother.phone}
              onChange={(e) => {
                setParents({
                  ...parents,
                  mother: {
                    ...parents.mother,
                    phone: e.target.value,
                  },
                });
              }}
              onKeyDown={validateContactNumber}
              maxLength={10}
              required
            />
          </MDBCol>
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Province"
              value={parents.mother?.province}
              onChange={(e) => {
                setParents({
                  ...parents,
                  mother: {
                    ...parents.mother,
                    province: e.target.value,
                  },
                });
              }}
              required
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-2">
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Municipality"
              value={parents.mother?.muni}
              onChange={(e) => {
                setParents({
                  ...parents,
                  mother: {
                    ...parents.mother,
                    muni: e.target.value,
                  },
                });
              }}
              required
            />
          </MDBCol>
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Barangay"
              value={parents.mother?.brgy}
              onChange={(e) => {
                setParents({
                  ...parents,
                  mother: {
                    ...parents.mother,
                    brgy: e.target.value,
                  },
                });
              }}
              required
            />
          </MDBCol>
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Street"
              value={parents.mother?.street}
              onChange={(e) => {
                setParents({
                  ...parents,
                  mother: {
                    ...parents.mother,
                    street: e.target.value,
                  },
                });
              }}
              required
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-2">
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Relationship"
              value={parents.mother?.relationship}
              onChange={(e) => {
                setParents({
                  ...parents,
                  mother: {
                    ...parents.mother,
                    relationship: e.target.value,
                  },
                });
              }}
              required
            />
          </MDBCol>
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Suffix"
              value={parents.mother?.suffix}
              onChange={(e) => {
                setParents({
                  ...parents,
                  mother: {
                    ...parents.mother,
                    suffix: e.target.value,
                  },
                });
              }}
            />
          </MDBCol>
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Occupation"
              value={parents.mother?.occupation}
              required
              onChange={(e) => {
                setParents({
                  ...parents,
                  mother: {
                    ...parents.mother,
                    occupation: e.target.value,
                  },
                });
              }}
            />
          </MDBCol>
        </MDBRow>
        <div className="d-flex justify-content-between mt-4">
          <MDBBtn
            onClick={() => setActiveItem("guardian")}
            type="button"
            color="light"
            className="shadow-0"
          >
            Previous
          </MDBBtn>
          <MDBBtn type="submit">Next</MDBBtn>
        </div>
      </form>
    </MDBContainer>
  );
}
