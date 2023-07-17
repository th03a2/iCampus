import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Index = ({ is_protected = false, model, gender, form }) => {
  const [packages, setPackages] = useState({});
  const [signatories, setSignatories] = useState([]);
  const [remarks, setRemarks] = useState("");
  const { theme, token, onDuty, auth } = useSelector(({ auth }) => auth);

  useEffect(() => {
    const _signatories = JSON.parse(localStorage.getItem(`signatories`));
    const performer = _signatories["Compatibility"];
    const pathologist = _signatories["patho"];
    setSignatories([performer, pathologist, auth?._id]);
    setPackages(model?.packages);
    model?.remarks && setRemarks(model.remarks);
  }, [model, onDuty]);

  return <div>Compatibility (X-matching)</div>;
};

export default Index;
