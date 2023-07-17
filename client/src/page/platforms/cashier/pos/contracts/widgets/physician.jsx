import { useEffect } from "react";
import { MDBInputGroup } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { PHYSICIAN } from "../../../../../../redux/slices/commerce/pos";
import { LIST } from "../../../../../../redux/slices/assets/persons/physician";
import { nameFormatter } from "./../../../../../../components/utilities";
export function Physicians() {
  const { theme, onDuty, token } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ physicians }) => physicians),
    { physician } = useSelector(({ pos }) => pos),
    dispatch = useDispatch();

  useEffect(() => {
    onDuty?._id && dispatch(LIST({ data: { branch: onDuty._id }, token }));
  }, [onDuty]);

  const handleDoctors = value => dispatch(PHYSICIAN(value));

  return (
    <MDBInputGroup textBefore={<span className={theme.text}>Physician</span>}>
      <select
        className={`form-control ${theme.bg} ${theme.text}`}
        onChange={e => handleDoctors(e.target.value)}
        value={physician}
      >
        <option value="" />
        {catalogs?.map(doctor => (
          <option key={`doctor-${doctor._id}`} value={doctor._id}>
            {nameFormatter(doctor?.user?.fullName)}
          </option>
        ))}
      </select>
    </MDBInputGroup>
  );
}
