import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBInput,
  MDBIcon,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInputGroup,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
// import { Statement } from "../../../../../../fakeDb";
import levels from "../../../../../fakeDb/json/levels";
import { SAVE, UPDATE } from "../../../../../redux/slices/query";

export default function Modal({
  visibility,
  setVisibility,
  update,
  setIsUpdate,
  isUpdate,
  batchs,
}) {
  const { theme, token, auth, onDuty } = useSelector(({ auth }) => auth);
  const [strands, setStrands] = useState([]);
  const [form, setForm] = useState({
    name: "",
    accumulate: "",
    levelId: "",
    specifications: "",
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
            user: auth._id,
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
                      value={form.adiviser}
                      onChange={(e) =>
                        setForm({ ...form, adiviser: e.target.value })
                      }
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
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        // setBatchId(
                        //   // para makuha kung anong batchId ba yung napili
                        //   e.target.options[e.target.selectedIndex].getAttribute(
                        //     "data-id"
                        //   )
                        // );
                        // setBranchId(
                        //   e.target.options[e.target.selectedIndex].getAttribute(
                        //     "data-branchId"
                        //   )
                        // );
                        setForm({ ...form, levelId: selectedValue });
                      }}
                    >
                      <option value={""} />
                      {levels.map((level) => (
                        <option value={level.id}>{level.description}</option>
                      ))}
                    </select>
                  </MDBInputGroup>
                </MDBCol>
                <MDBCol md={6}>
                  <MDBInputGroup textBefore="Strand">
                    <input
                      type="text"
                      className="form-control"
                      value={form.adiviser}
                      onChange={(e) =>
                        setForm({ ...form, adiviser: e.target.value })
                      }
                    />
                  </MDBInputGroup>
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn type="submit">Submit</MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
