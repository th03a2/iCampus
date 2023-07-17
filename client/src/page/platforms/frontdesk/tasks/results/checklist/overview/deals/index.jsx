import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import TableCard from "./card";
import { templates } from "../../../../../../../../components/utilities";

export default function CollapseTable({ sale }) {
  const { source, physicianId, customerId, _id, category } = sale;
  let forms = [];
  templates.map(({ components, department }) => {
    if (department === "laboratory") {
      const _newForm = components.filter(
        component => sale[String(component).toLowerCase()]
      );
      forms = [...forms, ..._newForm];
    }
  });

  const body = forms.map((form, index) => {
    const { packages, hasDone } = sale[String(form).toLowerCase()];
    let task = {
      form,
      patron: customerId,
      referral: physicianId?.fullName,
      source,
      packages,
      hasDone,
      category,
    };

    if (form === "Miscellaneous") {
      return sale[String(form).toLowerCase()].map((miscellaneous, i) => {
        task = {
          ...task,
          ...miscellaneous,
          id: miscellaneous._id,
          hasDone: miscellaneous.hasDone || false,
        };

        return (
          <TableCard
            task={task}
            index={`${index + 1}-${i + 1}`}
            key={`${"department"}-${form}-${index} -${i}-task`}
          />
        );
      });
    } else {
      task = { ...task, ...sale[String(form).toLowerCase()], id: _id };
      return (
        <TableCard
          index={index + 1}
          task={task}
          key={`${"department"}-${form}-${index}-task`}
        />
      );
    }
  });

  return (
    <MDBTable align="middle" hover responsive small className="mt-2">
      <MDBTableHead>
        <tr className="text-center">
          <th>#</th>
          <th scope="col">Department</th>
          <th scope="col">Template</th>
          <th scope="col">Services</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>{body}</MDBTableBody>
    </MDBTable>
  );
}
