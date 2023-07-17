import { ENDPOINT } from "../../components/utilities";
import SignatureDefault from "../../assets/images/signatureDefault.png"

export default function Signatory({email}) {
  return (
    <img
      src={`${ENDPOINT}/public/patron/${email}/signature.png`}
      height="85px"
      width="100%"
      alt="E-Signature"
      onError={()=>SignatureDefault}
    />
  );
}
