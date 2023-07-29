import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import { validateContactNumber } from "../../../../../../components/utilities";
import { useDispatch, useSelector } from "react-redux";
import { nameFormatter } from "../../../../../../components/utilities";
import levels from "../../../../../../fakeDb/json/levels";
import field from "../../../../../../fakeDb/json/subjects";

export default function BasicInformation({
  setForm,
  form,
  setActiveItem,
  link,
  setLink,
}) {
  const { auth, token } = useSelector(({ auth }) => auth),
    [topic, setTopic] = useState([]),
    [isStrand, setIsStrand] = useState(false),
    [strands, setStrands] = useState([]);

  useEffect(() => {
    if (form.levelId) {
      const filterLevel = levels.find((data) => data.id === form.levelId);
      const { subjects, strand } = filterLevel;

      if (subjects) {
        const filterSubjects = subjects.map((id) =>
          field.find((data) => data.id === id)
        );
        setTopic([...filterSubjects]);
        setIsStrand(false);
      } else {
        setStrands([...strand]);
        setIsStrand(true);
        setTopic([]);
      }
    } else {
      setTopic([]);
      setIsStrand(false);
    }
  }, [form.levelId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const tabs = { ...link };

    tabs.guardian = true;

    setLink(tabs);
    setActiveItem("guardian");
  };

  const addressFormatter = (address) => {
    if (typeof address === "object") {
      const { province, city, barangay, street } = address;

      return `${barangay},${street},${city},${province}`;
    }
  };
  return (
    <MDBContainer className="mt-4">
      <form onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol md={6}>
            <MDBInput
              type="text"
              label="First name"
              value={nameFormatter(auth.fullName)}
              readOnly
              autoFocus
            />
          </MDBCol>
          <MDBCol md={6}>
            <MDBInput
              type="text"
              label="Gender"
              value={auth.isMale ? "Male" : "Female"}
              readOnly
            />
          </MDBCol>
        </MDBRow>

        <MDBRow className="my-3">
          <MDBCol md={6}>
            <MDBInput
              type="text"
              label="Date Of Birth"
              value={auth.dob}
              readOnly
            />
          </MDBCol>
          <MDBCol md={6}>
            <MDBInput
              type="text"
              label="Place Of Birth"
              value={addressFormatter(auth.address)}
              readOnly
            />
          </MDBCol>
        </MDBRow>

        <MDBRow className="my-3">
          <MDBCol md={6}>
            <select
              className="form-control"
              value={form?.units}
              onChange={(e) => {
                setForm({
                  ...form,
                  units: e.target.value,
                });
              }}
              required
            >
              <option value={""}>Unit</option>
              <option value={"old"}>Old</option>
              <option value={"transferee"}>Transferee</option>
              <option value={"returnee"}>Returnee</option>
            </select>
          </MDBCol>
          <MDBCol md={6}>
            <MDBInput
              type="text"
              label="Mobile (+63) "
              value={form.phone}
              required
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              onKeyDown={validateContactNumber}
              maxLength={10}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md={6}>
            <select
              className="form-control"
              required
              value={form.levelId}
              onChange={(e) =>
                setForm({
                  ...form,
                  levelId: Number(e.target.value),
                })
              }
            >
              <option value={""}> Grade Levels</option>

              {levels.map((level, index) => (
                <option value={level.id} key={index}>
                  {" "}
                  {level.description}
                </option>
              ))}
            </select>
          </MDBCol>
          <MDBCol md={6}>
            {isStrand && (
              <select className="form-control">
                <option value={""}>Strand</option>
                {strands.length > 0 &&
                  strands.map((strand) => (
                    <option>{strand.specifications}</option>
                  ))}
              </select>
            )}
          </MDBCol>
        </MDBRow>
        <h5 className="mt-4 text-center">
          <strong>Subjects</strong>
        </h5>
        <MDBRow className="d-flex justify-content-center">
          <MDBCol md={6}>
            <MDBTable
              align="middle"
              hover
              responsive
              className="table table-hover"
            >
              <MDBTableHead>
                <tr>
                  <th>#</th>
                  <th scope="col">Name </th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {topic.length > 0 &&
                  topic.map((data, index) => (
                    <tr>
                      <td>{index}</td>
                      <td>{data.name}</td>
                    </tr>
                  ))}
              </MDBTableBody>
            </MDBTable>
          </MDBCol>
        </MDBRow>
        <div className="text-end">
          <MDBBtn type="submit">Next</MDBBtn>
        </div>
      </form>
    </MDBContainer>
  );
}
