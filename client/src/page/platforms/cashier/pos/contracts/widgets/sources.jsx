import { useEffect, useState } from "react";
import { MDBInputGroup } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { SOURCE } from "../../../../../../redux/slices/commerce/pos";
import { LIST } from "../../../../../../redux/slices/query";

export function Source() {
  const { theme, onDuty, token } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ query }) => query),
    { subcon, source } = useSelector(({ pos }) => pos),
    [cluster, setCluster] = useState([]),
    dispatch = useDispatch();

  useEffect(() => {
    onDuty?._id && dispatch(LIST({ entity: "assets/sources", token }));
  }, [onDuty]);

  useEffect(() => {
    if (onDuty._id) {
      setCluster(
        catalogs?.filter(catalog =>
          source === "hmo"
            ? catalog.contract === "hmo"
            : catalog.contract !== "hmo"
        )
      );
    }
  }, [source, catalogs, onDuty]);

  const handleSubcon = value => dispatch(SOURCE(value));

  return (
    <MDBInputGroup textBefore={<span className={theme.text}>Source :</span>}>
      <select
        className={`form-control ${theme.bg} ${theme.text}`}
        onChange={e => handleSubcon(e.target.value)}
        value={subcon}
      >
        <option></option>
        {cluster.map((vendor, index) => (
          <option key={`privilege-${index}`} value={index}>
            {vendor?.name} / {vendor?.subName}
          </option>
        ))}
      </select>
    </MDBInputGroup>
  );
}
