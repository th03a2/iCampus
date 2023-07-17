import { ENDPOINT } from "../components/utilities";

export function Banner() {
  const supplier = JSON.parse(localStorage.getItem(`task-printout`))?.branchId;
  const company = supplier?.companyName;
  const branch = supplier?.name;

  return (
    <img
      src={`${ENDPOINT}/public/credentials/${company}/${branch}/banner.jpg`}
      height="85px"
      width="100%"
      alt="company Header"
    />
  );
}
