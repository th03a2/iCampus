import { MDBInputGroup } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { CATEGORY } from "../../../../../../redux/slices/commerce/pos";
import { categories } from "../../../../../../components/utilities";

export function Category() {
  const { category } = useSelector(({ pos }) => pos),
    { theme } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();

  const handleSource = (value) => dispatch(CATEGORY(value));

  return (
    <MDBInputGroup textBefore={<span className={theme.text}>Category :</span>}>
      <select
        className={`form-control ${theme.bg} ${theme.text}`}
        onChange={(e) => handleSource(e.target.value)}
        value={category}
      >
        {categories.map(({ action, value }, index) => (
          <option key={`source-${index}`} value={action}>
            {value}
          </option>
        ))}
      </select>
    </MDBInputGroup>
  );
}
