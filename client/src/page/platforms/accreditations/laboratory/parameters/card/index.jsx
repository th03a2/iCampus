import React from "react";

export default function TableCard({ key, parameter, showHandler }) {
  const { id, name, indicators } = parameter;
  return (
    <tr
      key={key}
      onClick={() => {
        showHandler(indicators);
      }}
    >
      <td>
        <p className="fw-bold mb-1">{id}</p>
      </td>
      <td>
        <p className="fw-bold mb-1">{name}</p>
      </td>
      <td>
        <p className="fw-bold mb-1">{indicators.length}</p>
      </td>
    </tr>
  );
}
