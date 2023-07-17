import { MDBInputGroup } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { PRIVILEGES } from "../../../../../../redux/slices/commerce/pos";
import { getAge, privileges } from "./../../../../../../components/utilities";
import { useEffect, useState } from "react";

export function Privileges() {
  const { theme } = useSelector(({ auth }) => auth),
    { privilege, patron } = useSelector(({ pos }) => pos),
    [personalizedPrivileges, setPersonalizedPrivileges] = useState([]),
    dispatch = useDispatch();

  useEffect(() => {
    if (getAge(patron.dob) >= 60) {
      setPersonalizedPrivileges(privileges);
    } else {
      setPersonalizedPrivileges(
        privileges.filter((privilege) => privilege !== "Senior Citizen")
      );
    }
  }, [patron]);
  const handlePrivilege = (value) => dispatch(PRIVILEGES(value));

  return (
    <MDBInputGroup textBefore={<span className={theme.text}>Privileges</span>}>
      <select
        className={`form-control ${theme.bg} ${theme.text}`}
        onChange={(e) => handlePrivilege(Number(e.target.value))}
        disabled={patron.privilege ? true : false}
        value={privilege}
      >
        {personalizedPrivileges.map((privilege, index) => (
          <option key={`privilege-${index}`} value={index}>
            {privilege}
          </option>
        ))}
      </select>
    </MDBInputGroup>
  );
}
