import React, { useEffect, useState } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

const Index = ({ index, fk, value, service, packageHandler }) => {
  const { theme } = useSelector(({ auth }) => auth);
  const [color, setColor] = useState("");
  const [title, setTitle] = useState("");
  const [reference, setReference] = useState("");

  useEffect(() => {
    if (service?.reference) {
      const { lo, hi, warn, pvLo, pvHi } = service?.reference;

      setColor(
        pvHi
          ? value >= pvHi
            ? "red"
            : pvLo
            ? value >= pvLo
              ? "orange"
              : warn
              ? value >= warn
                ? "blue"
                : null
              : null
            : null
          : null
      );

      setTitle(`warning: ${warn}, pv-lo: ${pvLo}, pv-hi: ${pvHi}`);

      setReference(lo === 0 ? `< ${hi}` : `${lo} - ${hi}`);
    }
  }, [service, value]);
  return (
    <tr className="text-center" key={`serology-${fk}`}>
      <td>{++index}</td>
      <td title={service?.name}>{service?.abbreviation}</td>
      <td>
        <MDBInput
          id={fk}
          style={{ color, fontWeight: "bold" }}
          className="text-center"
          type="number"
          contrast={theme.dark}
          value={value}
          onChange={packageHandler}
          // disabled={!service?.reference?._id}
        />
      </td>
      {service?.reference?._id ? (
        <>
          <td title={title}>{reference}</td>
          <td>{service?.reference?.units}</td>
        </>
      ) : (
        <td title={title} colSpan={2}>
          <b>No reference found</b> ,<br /> please inform the admin first
        </td>
      )}
    </tr>
  );
};

export default Index;
