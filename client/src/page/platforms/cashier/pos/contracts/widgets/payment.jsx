import { MDBInputGroup } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { PAYMENT } from "../../../../../../redux/slices/commerce/pos";
import { payments } from "./../../../../../../components/utilities";

export function Payments() {
  const { theme } = useSelector(({ auth }) => auth),
    { payment, category, privilege } = useSelector(({ pos }) => pos),
    dispatch = useDispatch();

  const handlePayment = value => dispatch(PAYMENT(value));

  return (
    <MDBInputGroup
      className="w-50"
      textBefore={<span className={theme.text}>Payment :</span>}
    >
      <select
        className={`form-control ${theme.bg} ${theme.text} text-capitalize`}
        onChange={e => handlePayment(e.target.value)}
        value={payment}
      >
        {payments[category]?.map((payment, index) => (
          <option
            key={`payment-${index}`}
            value={payment}
            className="text-capitalize"
          >
            {payment}
          </option>
        ))}
        {privilege === 4 && <option value="free">FREE</option>}
      </select>
    </MDBInputGroup>
  );
}
