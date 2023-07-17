import React from "react";
import { MDBBadge } from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { INITIALIZED } from "../../../../../../../../../redux/slices/task/forms";
import { templates } from "../../../../../../../../../components/utilities";
import { Services } from "../../../../../../../../../fakeDb";

export default function TableCard({ task, key, index }) {
  const { form, hasDone } = task,
    dispatch = useDispatch();

  const template = templates.find(
    ({ department, components }) => components.includes(task.form) && department
  );
  const _packages = Array.isArray(task?.packages)
    ? task?.packages
    : Object?.keys(task?.packages).map(key => Number(key));
  const services = Services.whereIn(_packages);
  return (
    <tr
      onClick={() => dispatch(INITIALIZED(task))}
      className={`text-capitalize  btn-${hasDone && "warning"}`}
      key={key}
    >
      <td>{index}</td>
      <td>
        <p className="fw-bold mb-1">{template.department}</p>
      </td>
      <td>
        <p className="fw-bold mb-1 text-center">{form}</p>
      </td>
      <td>
        {services.map(({ abbreviation }) => (
          <MDBBadge pill className="ml-5">
            {abbreviation}
          </MDBBadge>
        ))}
      </td>
    </tr>
  );
}
