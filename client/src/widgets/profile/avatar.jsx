import { ENDPOINT } from "../../components/utilities";
import female from "../../assets/images/female.jpg";
import male from "../../assets/images/male.jpg";

export default function Avatar({email,gender}) {
  return (
    <img
      src={`${ENDPOINT}/public/patron/${email}/profile.jpg`}
      height="80px"
      width="60%"
      alt="Profile"
      className="rounded-circle"
      onError={e => (e.target.src = gender?male:female)}    
    />
  );
}
