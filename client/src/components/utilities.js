import axios from "axios";
import io from "socket.io-client";
import DefaultUser from "../assets/images/default.jpg";
import ErrorNull from "../assets/images/404.gif";
import ErrorBadRequest from "../assets/images/400.png";
import { Services } from "../fakeDb";

export const PresetUser = DefaultUser;
export const ErrorPage = ErrorNull;
export const ErrorFalse = ErrorBadRequest;

export const BASE = "snapshot";
export const ENDPOINT = "http://localhost:5000";
// export const ENDPOINT = window.location.origin;

export const socket = io.connect(ENDPOINT);
export const adminRoom = "636d37e0187c30ab0f611ce0";

export const register = data =>
  axios
    .post("assets/persons/auth/save", data)
    .then(res => res.data)
    .catch(err => {
      throw new Error(err.response.data.error);
    });

export const handleTimer = mili => {
  const padTo2Digits = num => num.toString().padStart(2, "0");

  if (mili > 0) {
    let seconds = Math.floor(mili / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    hours = hours % 24;

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
      seconds
    )}`;
  } else {
    return "-:-:-";
  }
};

export const miliToHours = mili => {
  let seconds = mili / 1000;
  let minutes = seconds / 60;
  let hours = minutes / 60;

  seconds = seconds % 60;
  minutes = minutes % 60;

  // 👇️ If you don't want to roll hours over, e.g. 24 to 00
  // 👇️ comment (or remove) the line below
  // commenting next line gets you `24:00:00` instead of `00:00:00`
  // or `36:15:31` instead of `12:15:31`, etc.
  hours = hours % 24;

  return hours;
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatCurrency = num => {
  if (num && num > 0) {
    return num.toLocaleString("en-US", { style: "currency", currency: "PHP" });
  } else {
    return "-";
  }
};

export const nameFormatter = fullName => {
  if (typeof fullName === "object") {
    const { fname, mname, lname, suffix } = fullName;
    let middleName = "";
    if (mname) {
      middleName = `${mname
        .split(" ")
        .map(middle => middle.toUpperCase())
        .join("")}`;
    }
    return `${lname}, ${fname} y ${middleName} ${
      suffix ? `(${suffix})` : ""
    }`.replace(/^\s+|\s+$/gm, "");
  } else {
    return "-";
  }
};
export const properNameFormatter = (fullName, isProper = false) => {
  const { fname, lname } = fullName;
  if (isProper) {
    return `${fullName?.title}  ${String(fname).toUpperCase()} 
    ${fullName?.mname && `${fullName.mname.charAt(0)?.toUpperCase()}.`}
     ${String(lname).toUpperCase()} ${fullName?.suffix || ""}`;
  }
  return `${String(fname).toUpperCase()}  ${
    fullName?.mname && `${fullName.mname.charAt(0)?.toUpperCase()}.`
  } ${String(lname).toUpperCase()} ${fullName?.suffix || ""}`;
};

export const genderFormatter = isMale => {
  if (isMale) {
    return "Male";
  } else {
    return "Female";
  }
};

export const fullAddress = (address, complete = true) => {
  if (typeof address === "object") {
    if (complete) {
      return `${address.street} ${address.brgy} ${address.city} ${address.province}, ${address.region}`;
    }
    return `${address.brgy || ""} ${address.city} ${address.province}, ${
      address.region
    }`;
  }
  return "-";
};
export const mobileFormatter = mobile =>
  mobile &&
  `+63 ${mobile.slice(0, 3)}-${mobile.slice(3, 6)}-${mobile.slice(6, 10)}`;
export const roleBadge = id => {
  switch (id) {
    case 18:
      return "secondary";

    case 2:
      return "success";

    default:
      return "primary";
  }
};

export const getAge = dob => {
  if (dob) {
    var ageInMilliseconds = new Date() - new Date(dob);
    const age = Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365);
    const months = Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 30);

    if (age === 0) {
      return `${months} months`;
    } else if (months === 0) {
      const days = Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24);
      return `${days} days`;
    }
    return String(age) + " y/o";
  } else {
    return "-";
  }
};

export const getDevelopment = dob => {
  // [
  //   "Newborn",
  //   "Infant",
  //   "Toddler",
  //   "Child",
  //   "Teen ager",
  //   "Early Adult",
  //   "Young Adult",
  //   "Adult",
  //   "Geriatric",
  // ];
  if (dob) {
    const days = Math.floor((new Date() - new Date(dob)) / 1000 / 60 / 60 / 24);
    if (days < 30) return "Newborn"; //
    else if (days < 365) return "Infant";
    else return "Geriatric";
  } else {
    return "-";
  }
};

export const fullMobile = mobile => {
  if (mobile) {
    return `+63 (${mobile.slice(0, 3)}) ${mobile.slice(3, 6)}-${mobile.slice(
      6,
      10
    )}`;
  } else {
    return "-";
  }
};

export const profileProgress = async auth => {
  if (auth) {
    const { fullName, address, verified, dob, alias, rate, bio } = auth;
    let validate = 0,
      requirements = [];
    const required = {
      Middlename: fullName.mname,
      Street: address.street,
      Barangay: address.barangay,
      City: address.city,
      Province: address.province,
      Region: address.region,
      Alias: alias,
      Birthday: dob,
      Email: verified,
      Rate: rate,
      Biography: bio,
    };

    const newArr = Object.keys(required);

    newArr.map(key => {
      if (required[key]) {
        validate += 1;
      } else {
        requirements.push(key);
      }
      return null;
    });

    return {
      requirements,
      progress: Math.floor((validate / newArr.length) * 100),
    };
  }
};

export const validateContactNumber = e => {
  if (
    (e.keyCode >= 48 && e.keyCode <= 58) ||
    (e.keyCode >= 96 && e.keyCode <= 105) ||
    e.keyCode === 8
  ) {
    return true;
  } else {
    e.preventDefault();
  }
};

export const validateMiddleName = e => {
  if (
    (e.keyCode >= 48 && e.keyCode <= 58) ||
    (e.keyCode >= 96 && e.keyCode <= 105) ||
    e.keyCode === 8
  ) {
    return true;
  } else {
    e.preventDefault();
  }
};

export const arrayEquals = (a, b) =>
  Array.isArray(a.sort()) &&
  Array.isArray(b.sort()) &&
  a.length === b.length &&
  a.every((val, index) => val === b[index]);

export const currencyFormatter = num =>
  num && num > 0
    ? num.toLocaleString("en-US", { style: "currency", currency: "PHP" })
    : "-";

export const privileges = [
  "None",
  "PWD",
  "Senior Citizen",
  "Indigenous",
  "Special Discount",
];

export const memberships = {
  0.95: "Iron (5%)",
  0.9: "Bronze (10%)",
  0.85: "Silver (15%)",
  0.8: "Gold (20%)",
  0.75: "Platinum (25%)",
  0.7: "Diamond (30%)",
  0.65: "Master (35%)",
  0.6: "Grandmaster (40%)",
  0.55: "Epic (45%)",
  0.5: "Legend (50%)",
  0.45: "Mythic (55%)",
  0.4: "Mythical Glory (60%)",
};

export const categories = [
  { action: "walkin", value: "Walkin" },
  { action: "opd", value: "Out Patient Department" },
  { action: "er", value: "Emergency Room" },
  { action: "cw", value: "Charity Ward" },
  { action: "pw", value: "Private Ward" },
  { action: "hmo", value: "Health Maintenance Organization" },
  { action: "subcon", value: "Sub-Contract" },
];

export const payments = {
  walkin: ["cash", "gcash", "cheque"],
  opd: ["cash", "gcash", "cheque"],
  er: ["cash", "gcash", "cheque", "credit"], // Credit: Note Receivable
  cw: ["cash", "gcash", "cheque", "credit"], // credit: [patient, company]
  pw: ["cash", "gcash", "cheque", "credit"],
  hmo: ["credit"], // need SOA
  subcon: ["credit"],
};

export const frequencies = [
  null,
  "Monitoring",
  "As necessary",
  "4 hours",
  "8 hours",
  "12 hours",
  "24 hours",
];

export const preferences = ["gender", "development", "age", "equal"];

export const specimens = [
  "Serum",
  "Plasma",
  "Urine",
  "Stool",
  "Sperm",
  "Phlegm",
  "Tissue",
  "Whole Blood",
];

export const units = [
  null,
  "mg/dl",
  "U/L",
  "ng/ml",
  "IU/L",
  "UIU/ML",
  "pmol/L",
  "nmol/L",
  "g/dl",
];

export const templates = [
  {
    department: "laboratory",
    components: [
      "Analysis",
      "Bacteriology",
      "Biopsy",
      "Chemistry",
      "Coagulation",
      "Compatibility",
      "Hematology",
      "Miscellaneous",
      "Parasitology",
      "PAPs",
      "PBS",
      "Serology",
      "Urinalysis",
      "Drugtest",
    ],
  },
  {
    department: "radiology",
    components: ["ECG", "Ultrasound", "X-ray", "2DEcho"],
  },
  {
    department: "clinic",
    components: ["certicifate", "referral"],
  },
];

export const paginationHandler = (array, page, maxPage) =>
  array.slice((page - 1) * maxPage, maxPage + (page - 1) * maxPage);

export const serviceFormConverter = deals => {
  var _services = deals.map(deal => Services.whereIn(deal.menuId.packages)),
    _forms = [];

  _forms = _services.map(service =>
    service.map(
      ({ department, template }) =>
        templates.find(model => model.department === department).components[
          template
        ]
    )
  );
  var forms = [...new Set(_forms[0])];

  return { forms: Array.from(new Set(forms.map(test => test))), _services };
};

export const onlyUnique = (value, index, array) =>
  array.indexOf(value) === index;

export const harvestTask = deals =>
  Services.whereIn(
    deals.reduce(
      (collections, deal) => collections.concat(deal.menuId.packages),
      []
    )
  ).reduce((collections, service) => {
    let forms = templates.find(
      ({ department }) => department === service.department
    ).components[service.template];

    switch (forms) {
      case "Chemistry":
      case "Serology":
        collections[forms] = {
          ...collections[forms],
          [service.id]: "",
        };
        break;
      default:
        // case "Miscellaneous":
        // case "Hematology":
        collections[forms] = [...(collections[forms] || []), service.id];
    }

    return collections;
  }, {});
export const timeSelectors = [
  {
    index: 0,
    time: "07:00 AM",
  },
  {
    index: 1,
    time: "07:15 AM",
  },
  {
    index: 2,
    time: "07:30 AM",
  },
  {
    index: 3,
    time: "07:45 AM",
  },
  {
    index: 4,
    time: "08:00 AM",
  },
  {
    index: 5,
    time: "08:15 AM",
  },
  {
    index: 6,
    time: "08:30 AM",
  },
  {
    index: 7,
    time: "08:45 AM",
  },
  {
    index: 8,
    time: "09:00 AM",
  },
  {
    index: 9,
    time: "09:15 AM",
  },
  {
    index: 10,
    time: "09:30 AM",
  },
  {
    index: 11,
    time: "09:45 AM",
  },
  {
    index: 12,
    time: "10:00 AM",
  },
  {
    index: 13,
    time: "10:15 AM",
  },
  {
    index: 14,
    time: "10:30 AM",
  },
  {
    index: 15,
    time: "10:45 AM",
  },
  {
    index: 16,
    time: "11:00 PM",
  },
  {
    index: 17,
    time: "11:15 PM",
  },
  {
    index: 18,
    time: "11:30 PM",
  },
  {
    index: 19,
    time: "11:45 PM",
  },
  {
    index: 20,
    time: "12:00 PM",
  },
  {
    index: 21,
    time: "12:15 PM",
  },
  {
    index: 22,
    time: "12:30 PM",
  },
  {
    index: 23,
    time: "12:45 PM",
  },
  {
    index: 24,
    time: "01:00 PM",
  },
  {
    index: 25,
    time: "01:15 PM",
  },
  {
    index: 26,
    time: "01:30 PM",
  },
  {
    index: 27,
    time: "01:45 PM",
  },
  {
    index: 28,
    time: "02:00 PM",
  },
  {
    index: 29,
    time: "02:15 PM",
  },
  {
    index: 30,
    time: "02:30 PM",
  },
  {
    index: 31,
    time: "02:45 PM",
  },
  {
    index: 32,
    time: "03:00 PM",
  },
  {
    index: 33,
    time: "03:15 PM",
  },
  {
    index: 34,
    time: "03:30 PM",
  },
  {
    index: 35,
    time: "03:45 PM",
  },
  {
    index: 36,
    time: "04:00 PM",
  },
  {
    index: 37,
    time: "04:15 PM",
  },
  {
    index: 38,
    time: "04:30 PM",
  },
  {
    index: 39,
    time: "04:45 PM",
  },
  {
    index: 40,
    time: "05:00 PM",
  },
  {
    index: 41,
    time: "05:15 PM",
  },
  {
    index: 42,
    time: "05:30 PM",
  },
  {
    index: 43,
    time: "05:45 PM",
  },
  {
    index: 444,
    time: "06:00 PM",
  },
  {
    index: 45,
    time: "06:15 PM",
  },
  {
    index: 46,
    time: "06:30 PM",
  },
  {
    index: 47,
    time: "06:45 PM",
  },
];
export const weekSelectors = [
  {
    index: 1,
    name: "Monday",
  },
  {
    index: 2,
    name: "Tuesday",
  },
  {
    index: 3,
    name: "Wednesday",
  },
  {
    index: 4,
    name: "Thursday",
  },
  {
    index: 5,
    name: "Friday",
  },
  {
    index: 6,
    name: "Saturday",
  },
  {
    index: 7,
    name: "Sunday",
  },
];
