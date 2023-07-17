import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { update } from "../../../../../../../../../redux/sqlbuilder";

const Index = ({
  is_protected = false,
  model,
  gender,
  form,
  source,
  referral,
}) => {
  const [packages, setPackages] = useState({});
  const [signatories, setSignatories] = useState([]);
  const [remarks, setRemarks] = useState("");
  const { onDuty, auth, token } = useSelector(({ auth }) => auth);

  useEffect(() => {
    const _signatories = JSON.parse(localStorage.getItem(`signatories`));
    const performer = _signatories["Bacteriology"];
    const pathologist = _signatories["patho"];
    setSignatories([performer, pathologist, auth?._id]);
    setPackages(model?.packages);
    model?.remarks && setRemarks(model.remarks);
  }, [model, onDuty]);
  const saveHandler = async hasDone => {
    let params = {
      packages,
      remarks,
      signatories,
      hasDone,
    };

    let task = await update(
      `results/laboratory/${form}`,
      params,
      model._id,
      token
    );

    if (task && hasDone) {
      task.referral = referral;
      task.source = source;
      localStorage.setItem(`task-printout`, JSON.stringify(task));
      window.open(
        `/result/${form}/printout`,
        "Result",
        "top=100px,width=500px,height=650px"
      );
    }
  };
  return (
    <div>
      <span>{form}</span>
      <span>{gender}</span>
      <span>{remarks}</span>
      <button onClick={() => saveHandler} />
    </div>
  );
};

export default Index;
