import React from "react";

const index = ({ deal, index, handleResult, cluster }) => {
  const { id, result, service, units, lo, hi, warn, pvLo, pvHi } = deal;
  const color = pvHi
    ? result >= pvHi
      ? "red"
      : pvLo
      ? result >= pvLo
        ? "orange"
        : warn
        ? result >= warn
          ? "blue"
          : null
        : null
      : null
    : null;

  const title = `warning: ${warn}, pv-lo: ${pvLo}, pv-hi: ${pvHi}`;
  const middleware = e => {
    const { id, value } = e.target;
    if (id === "40") {
      let _services = cluster.services;
      const chole = _services.find(service => service.id === 38).result;
      const vldl = _services.find(service => service.id === 39).result / 5;
      let hdl = _services.find(service => service.id === 40);
      hdl.result = Number.parseFloat(value);
      let ldl = _services.find(service => service.id === 41);
      ldl.result = chole - (vldl + parseFloat(value));
      let _vldl = _services.find(service => service.id === 42);
      _vldl.result = vldl;
      // Chole:HDL
      let CHR = _services.find(service => service.id === 43);
      const _chr = chole / value;
      CHR.result = _chr.toFixed(2);
      const services = _services.map(service =>
        service.id === 40
          ? hdl
          : service.id === 41
          ? ldl
          : service.id === 42
          ? _vldl
          : service.id === 43
          ? CHR
          : service
      );
    } else {
      handleResult(e);
    }
  };
  const reference = lo === 0 ? `< ${hi}` : `${lo} - ${hi}`;

  return (
    <tr key={`result - ${index}`}>
      <td>{++index}</td>
      <td>{service?.fullname}</td>
      <td>
        <input
          className="form-control"
          style={{ color, fontWeight: "bold" }}
          id={id}
          type="number"
          value={result}
          onChange={middleware}
        />
      </td>
      <td title={title}>{reference}</td>
      <td>{units}</td>
    </tr>
  );
};

export default index;
