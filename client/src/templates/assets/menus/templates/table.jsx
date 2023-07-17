import React, { useEffect, useState } from "react";
import { currencyFormatter } from "../../../../components/utilities";
import { Services } from "../../../../fakeDb";

export default function TableCard({ item, index, willInclude }) {
  const [title, setTitle] = useState("");
  // [srp, setSrp] = useState(0);

  useEffect(() => {
    if (item._id) {
      var str = "";

      Services.whereIn(item.packages).map(
        (service, index) =>
          (str += `${service.abbreviation || service.name}${
            item.packages.length - 1 !== index ? ", " : ""
          }`)
      );

      // setSrp(item?.opd);
      setTitle(str);
    }
  }, [item]);

  const countMeIn = e => {
    const { name, checked } = e.target;
    willInclude(name, checked);
  };
  return (
    <tr title={`Services: ${title}`}>
      <div className="row">
        <input
          type="checkbox"
          checked={item?.willInclude}
          name={item.name}
          onChange={countMeIn}
        />
      </div>
      <td>
        <p className="fw-normal mb-1">{item.name}</p>
      </td>
      <td>
        <p className="fw-normal mb-1">{item.abbreviation}</p>
      </td>
      <td>
        <p className="fw-normal text-center mb-1">
          {currencyFormatter(item.opd)}
        </p>
      </td>
      <td>
        <p className="fw-normal text-center mb-1">
          {currencyFormatter(item.cw)}
        </p>
      </td>
      <td>
        <p className="fw-normal text-center mb-1">
          {currencyFormatter(item.pw)}
        </p>
      </td>
    </tr>
  );
}
