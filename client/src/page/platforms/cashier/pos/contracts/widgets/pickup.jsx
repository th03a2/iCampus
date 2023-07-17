import { MDBSwitch } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { ISPICKUP } from "../../../../../../redux/slices/commerce/pos";

export function Pickup() {
  const { isPickup } = useSelector(({ pos }) => pos),
    dispatch = useDispatch();

  const handlePickup = (value) => dispatch(ISPICKUP(value));

  return (
    <MDBSwitch
      onChange={() => handlePickup(!isPickup)}
      checked={isPickup}
      id="isPickup"
      label={isPickup ? "Pickup" : "Deliver"}
    />
  );
}
