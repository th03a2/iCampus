import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { handleTimer } from "../../utilities";

export default function TableCard({ item }) {
  const { attendances } = useSelector(({ auth }) => auth),
    [logs, setLogs] = useState([]),
    [total, setTotal] = useState(0),
    [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (item) {
      if (new Date().toDateString() === item.toDateString()) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  }, [item]);

  useEffect(() => {
    if (attendances.length > 0) {
      const newArr = attendances.filter(
        (catalog) =>
          new Date(catalog.createdAt).toDateString() === item.toDateString()
      );

      setLogs(newArr);

      setTotal(
        newArr.reduce(
          (total, item) => {
            var ans = 0;

            if (item.out) {
              ans =
                new Date(`09-08-2000, ${item.out}`) -
                new Date(`09-08-2000, ${item.in}`);
            }

            return total + ans;
          },

          0
        )
      );
    }
  }, [item, attendances]);

  return (
    <tr className={`text-center ${isActive && "table-active"}`}>
      <td title={item.toDateString()}>{item.getDate()}</td>
      {["in", "out"].map((time, tIndex) => (
        <td title={`time-${time}`} key={`${time}-${tIndex}`}>
          {logs?.map((attendance, index) =>
            attendance[time] ? (
              <p key={`${time}-${index}`} className="mb-0">
                {attendance[time]}
              </p>
            ) : (
              "-"
            )
          )}
        </td>
      ))}
      <td title="Accumulated time">{handleTimer(total)}</td>
    </tr>
  );
}
