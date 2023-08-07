import React, { useState, useEffect } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBBtnGroup,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { BROWSE } from "../../../redux/slices/query";
import { DESTROY } from "../../../redux/slices/assets/schedulers";
import { paginationHandler } from "../../../components/utilities";
import Swal from "sweetalert2";
import Level from "./../../../fakeDb/json/levels";
import Subject from "./../../../fakeDb/json/subjects";

export function TBLschedulers({ page, handleVisible }) {
  const { onDuty, theme, maxPage, token } = useSelector(({ auth }) => auth),
    { sched } = useSelector(({ schedulers }) => schedulers),
    { catalogs } = useSelector(({ query }) => query),
    [schedules, setSchedules] = useState([]),
    [sections, setSections] = useState([]),
    dispatch = useDispatch(),
    options = { year: "numeric", month: "long", day: "numeric" };

  useEffect(() => {
    if (onDuty._id) {
      dispatch(
        BROWSE({
          entity: "assets/sections",
          data: "",
          token,
        })
      );
    }
    setSchedules(sched);
  }, [dispatch, onDuty, sched]);
  useEffect(() => {
    if (onDuty._id) {
      setSections(catalogs);
    }
  }, [onDuty, catalogs]);

  const handleDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(
          DESTROY({
            entity: "assets/schedules",
            id,
            token,
          })
        );
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of Grade schedules</caption>
      <caption className="caption-top">
        Total of <b>{schedules?.length}</b> Grade data(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th scope="col">Grade / Section </th>
          <th scope="col">Prof </th>
          <th scope="col">Room </th>
          <th scope="col">Subject </th>
          <th scope="col">Class Start </th>
          <th scope="col">Class End </th>
          <th>Action</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {schedules?.length > 0 ? (
          paginationHandler(schedules, page, maxPage).map((data, index) => {
            let lvl = Level.find(lvl => lvl.id == data?.level);
            let sub = Subject.find(sub => sub.id == data?.subject);
            let sec = sections.find(sec => sec._id == data?.section);
            return (
              <tr key={`temperature-${index}`}>
                <td>{1 + index}</td>
                <td>{`${lvl?.description} / ${sec?.name}`}</td>
                <td>{data.prof}</td>
                <td>{data.room}</td>
                <td>{sub?.name}</td>
                <td>{data.startAt}</td>
                <td>{data.endAt}</td>
                <td>
                  <MDBBtnGroup>
                    <MDBBtn
                      color="danger"
                      onClick={() => handleDelete(data._id)}
                    >
                      <MDBIcon fas icon="trash" />
                    </MDBBtn>
                    <MDBBtn onClick={() => handleVisible(data)}>
                      <MDBIcon fas icon="pencil-alt" />
                    </MDBBtn>
                  </MDBBtnGroup>
                </td>
              </tr>
            );
          })
        ) : (
          <tr className="text-center">
            <td colSpan={3}>No Batch.</td>
          </tr>
        )}
      </MDBTableBody>
    </MDBTable>
  );
}
