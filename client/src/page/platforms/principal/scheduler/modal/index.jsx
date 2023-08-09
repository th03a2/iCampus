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
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
// import { Statement } from "../../../../../fakeDb";
import { LIST } from "../../../../../redux/slices/assets/sections";
import { SAVE, UPDATE } from "../../../../../redux/slices/assets/schedulers";
import {
  timeSelectors,
  weekSelectors,
} from "../../../../../components/utilities";
import Level from "../../../../../fakeDb/json/levels";
import Subject from "../../../../../fakeDb/json/subjects";
export default function Modal({ visibility, setVisibility, schedule }) {
  const { theme, token, onDuty, auth } = useSelector(({ auth }) => auth),
    { list } = useSelector(({ sections }) => sections),
    [form, setForm] = useState({}),
    [startAt, setStartAt] = useState(),
    [endAt, setEndAt] = useState(),
    [sections, setSections] = useState([]),
    dispatch = useDispatch();

  useEffect(() => {
    if (schedule._id) {
      setForm(schedule);
      const time = schedule.program;
      console.log(time);
      // setStartAt(schedule.program);
      // setEndAt(schedule.program);
    }
  }, [schedule]);
  useEffect(() => {
    if (onDuty._id) {
      dispatch(LIST({ data: { batchId: onDuty._id }, token }));
    }
  }, [schedule]);

  useEffect(() => {
    if (!form.level) {
      console.log(
        "sectin",
        list.filter(s => s.levelId == Number(form.level))
      );
      setSections(list.filter(s => s.levelId == Number(form.level)));
    }
  }, [form, list]);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "level") {
      console.log(
        "sectin",
        list.filter(s => s.levelId == Number(form.level))
      );
      setSections(list.filter(s => s.levelId == Number(form.level)));
    }
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleSubmit = e => {
    e.preventDefault();

    const data = {
      // batch: onDuty._id,
      user: auth._id,
      prof: form.prof,
      level: Number(form.level),
      subject: Number(form.subject),
      section: form.section,
      room: form.room,
      program: {
        ...form.program,
        [form.week]: `${form.startAt}-${form.endAt}`,
      },
    };
    console.log(data);
    if (schedule._id) {
      dispatch(
        UPDATE({
          form: data,
          id: form?._id,
          token,
        })
      );
    } else {
      dispatch(
        SAVE({
          form: data,
          token,
        })
      );
    }
    setVisibility(false);
  };
  const handleClose = () => setVisibility(false);
  return (
    <MDBModal show={visibility} setShow={setVisibility} staticBackdrop>
      <MDBModalDialog size="xl">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Schedule</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={handleClose} />
          </MDBModalHeader>
          <MDBModalBody className={`${theme.bg} ${theme.text} gui-viewer`}>
            <form onSubmit={handleSubmit}>
              <MDBRow>
                <MDBCol md={6}>
                  <MDBInputGroup textBefore="Prof" className="me-3 ">
                    <select
                      className="browser-default custom-select form-control"
                      onChange={handleChange}
                      name="week"
                      value={form?.prof}
                    >
                      <option></option>
                      {/* {weekSelectors
                        // .filter((m, index) => !book.includes(index) && m)
                        .map(available => {
                          return (
                            <option value={available.index}>
                              {available.name}
                            </option>
                          );
                        })} */}
                    </select>
                  </MDBInputGroup>
                </MDBCol>
                <MDBCol md={6}>
                  <MDBInputGroup textAfter="Room">
                    <input
                      type="text"
                      className="form-control"
                      name="room"
                      value={form?.room}
                      onChange={handleChange}
                      required
                    />
                  </MDBInputGroup>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-4">
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Grade Level" className="me-3 ">
                    <select
                      className="browser-default custom-select form-control"
                      onChange={handleChange}
                      name="level"
                      value={form?.level}
                    >
                      <option></option>
                      {Level.filter(m => m.category == onDuty.category).map(
                        l => {
                          return <option value={l.id}>{l.description}</option>;
                        }
                      )}
                    </select>
                  </MDBInputGroup>
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInputGroup textAfter="Section" className="me-3 ">
                    <select
                      className="browser-default custom-select form-control"
                      onChange={handleChange}
                      name="section"
                      value={form?.section}
                    >
                      <option></option>
                      {sections.map(section => {
                        return (
                          <option value={section._id}>{section.name}</option>
                        );
                      })}
                    </select>
                  </MDBInputGroup>
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Subjects" className="me-3 ">
                    <select
                      className="browser-default custom-select form-control"
                      onChange={handleChange}
                      name="subject"
                      value={form?.subject}
                    >
                      <option></option>
                      {Subject
                        // .filter(sub => sub.id !== data?.subject)
                        .map(s => {
                          return <option value={s.id}>{s.name}</option>;
                        })}
                    </select>
                  </MDBInputGroup>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-4">
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Week" className="me-3 ">
                    <select
                      className="browser-default custom-select form-control"
                      onChange={handleChange}
                      name="week"
                      value={form?.week}
                    >
                      <option></option>
                      {weekSelectors
                        // .filter(
                        //   week => week.index !== Object.keys(schedule?.program)
                        // )
                        .map(available => {
                          return (
                            <option value={available.index}>
                              {available.name}
                            </option>
                          );
                        })}
                    </select>
                  </MDBInputGroup>
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Class Start" className="me-3">
                    <select
                      className="browser-default custom-select form-control"
                      onChange={handleChange}
                      name="startAt"
                      value={form?.startAt}
                      required
                    >
                      <option></option>
                      {timeSelectors
                        // .filter(
                        //   week => week.index !== schedule?.program
                        // )
                        .map(available => {
                          return (
                            <option value={available.index}>
                              {available.time}
                            </option>
                          );
                        })}
                    </select>
                  </MDBInputGroup>
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInputGroup textAfter="Class End" className="me-3">
                    <select
                      className="browser-default custom-select form-control"
                      onChange={handleChange}
                      name="endAt"
                      value={form?.endAt}
                      required
                    >
                      <option></option>
                      {timeSelectors
                        // .filter((m, index) => !book.includes(index) && m)
                        .map(available => {
                          return (
                            <option value={available.index}>
                              {available.time}
                            </option>
                          );
                        })}
                    </select>
                  </MDBInputGroup>
                </MDBCol>
              </MDBRow>
              <MDBContainer className="d-flex justify-content-end mt-4">
                <MDBBtn type="submit">
                  {schedule._id ? "Update" : "Submit"}
                </MDBBtn>
              </MDBContainer>
            </form>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
