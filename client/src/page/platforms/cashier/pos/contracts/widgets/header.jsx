import { MDBTypography } from "mdb-react-ui-kit";
import {
  nameFormatter,
  getAge,
} from "./../../../../../../components/utilities";
import { useSelector } from "react-redux";

export function Header() {
  const { patron } = useSelector(({ pos }) => pos);

  return (
    <MDBTypography
      tag="h4"
      className="mb-3 d-flex align-items-end justify-content-between"
    >
      <span>{nameFormatter(patron?.fullName)}</span>
      <small>
        {getAge(patron.dob, true)} - {patron.isMale ? "Male" : "Female"}
      </small>
    </MDBTypography>
  );
}
