import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBInputGroup,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
// import { Statement } from "../../../../../../fakeDb";
import levels from "../../../../../fakeDb/json/levels";
import { SAVE, UPDATE } from "../../../../../redux/slices/query";
import AdviserModal from "../adviser";
import { nameFormatter } from "../../../../../components/utilities";

export default function Modal({
  visibility,
  setVisibility,
  update,
  setIsUpdate,
  isUpdate,
  batchs,
}) {
  const { theme, token, auth } = useSelector(({ auth }) => auth);
  const [strands, setStrands] = useState([]);
  const [look, setLook] = useState(false);
  const [isDone, setIsDone] = useState(false); //para malaman kung nakapag pick naba siya ng adviser
  const [fullName, setFullname] = useState({ fname: "", mname: "", lname: "" });
  const [form, setForm] = useState({
    name: "",
    accumulate: "",
    levelId: "",
    specification: "",
    batchId: "",
    adiviser: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUpdate) {
      setForm(update);
    }
  }, [isUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUpdate) {
      dispatch(
        UPDATE({
          entity: "assets/Sections",
          data: {
            ...form,
          },
          id: form._id,
          token,
        })
      );
    } else {
      dispatch(
        SAVE({
          entity: "assets/Sections",
          data: form,
          // user: auth._id,
          token,
        })
      );
    }
    setVisibility(false);
  };

  const handleClose = () => {
    setVisibility(false);
    setIsUpdate(false);
    setForm({
      name: "",
      accumulate: "",
    });
  };

  useEffect(() => {
    if (form.levelId) {
      const filterSections = levels.find(
        (level) => level.id === Number(form.levelId)
      );
      const exist = !!Object.entries(filterSections).find(
        ([key]) => key === "subjects"
      );
      if (!exist) {
        const newArray = [...filterSections.strand];
        setStrands(newArray);
      } else {
        setStrands([]);
      }
    }
  }, [form.levelId]);

  const handleAdviserName = () => {
    if (isDone) return fullName;
    if (isUpdate) return form.adviser?.fullName;
  };
  return (
    <MDBModal show={visibility} setShow={setVisibility} staticBackdrop>
      <MDBModalDialog size="lg">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>
              <MDBIcon
                fas
                icon="chalkboard-teacher"
                color="warning"
                style={{ paddingRight: "20px" }}
              />{" "}
              Sections
            </MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={handleClose} />
          </MDBModalHeader>
          <form onSubmit={handleSubmit}>
            <MDBModalBody className={`${theme.bg} ${theme.text} gui-viewer`}>
              <MDBRow>
                <MDBCol md={6}>
                  <MDBInputGroup textBefore="Name">
                    <input
                      type="text"
                      className="form-control"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </MDBInputGroup>
                </MDBCol>
                <MDBCol md={6}>
                  <MDBInputGroup textBefore="Accumulate">
                    <input
                      type="text"
                      className="form-control"
                      value={form.accumulate}
                      onChange={(e) =>
                        setForm({ ...form, accumulate: e.target.value })
                      }
                    />
                  </MDBInputGroup>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-3">
                <MDBCol md={6}>
                  <MDBInputGroup textBefore="Adviser">
                    <input
                      type="text"
                      className="form-control"
                      value={
                        !isDone && !isUpdate
                          ? ""
                          : nameFormatter(handleAdviserName())
                      }
                      onClick={() => setLook(true)}
                    />
                  </MDBInputGroup>
                </MDBCol>
                <MDBCol md={6}>
                  <MDBInputGroup textBefore="Batch">
                    <select
                      className="form-control"
                      value={form.batchId}
                      onChange={(e) =>
                        setForm({ ...form, batchId: e.target.value })
                      }
                    >
                      <option value={""} />
                      {batchs
                        .filter((data) => data.status !== "done")
                        .map((data) => (
                          <option value={data._id}>
                            {"SY-" +
                              data.SY +
                              " " +
                              data.semester +
                              " semester"}
                          </option>
                        ))}
                    </select>
                  </MDBInputGroup>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-3">
                <MDBCol md={6}>
                  <MDBInputGroup textBefore="Grade level">
                    <select
                      className="form-control"
                      value={form.levelId}
                      onChange={(e) =>
                        setForm({ ...form, levelId: e.target.value })
                      }
                    >
                      <option value={""} />
                      {levels.map((level) => (
                        <option value={level.id}>{level.description}</option>
                      ))}
                    </select>
                  </MDBInputGroup>
                </MDBCol>
                {strands.length > 0 && (
                  <MDBCol md={6}>
                    <MDBInputGroup textBefore="Strand">
                      <select
                        className="form-control"
                        value={form.specification}
                        onChange={(e) =>
                          setForm({ ...form, specification: e.target.value })
                        }
                      >
                        <option value="" />
                        {strands.map((data) => (
                          <option value={data.sps}>
                            {data.specifications}
                          </option>
                        ))}
                      </select>
                    </MDBInputGroup>
                  </MDBCol>
                )}
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn type="submit">Submit</MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModalContent>
      </MDBModalDialog>
      {look && (
        <AdviserModal
          look={look}
          setLook={setLook}
          setFullname={setFullname}
          fullName={fullName}
          form={form}
          setForm={setForm}
          setIsDone={setIsDone}
        />
      )}
    </MDBModal>
  );
}
