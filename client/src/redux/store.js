import { configureStore } from "@reduxjs/toolkit";
import areas from "./slices/accreditations/areas";
import auth from "./slices/assets/persons/auth";
import users from "./slices/assets/persons/users";
import attendances from "./slices/assets/persons/attendances";
import surnames from "./slices/assets/persons/surnames";
import personnels from "./slices/assets/persons/personnels";
import petitions from "./slices/assets/persons/petition";
import physicians from "./slices/assets/persons/physician";
import task from "./slices/task/forms";
import companies from "./slices/assets/companies";
import branches from "./slices/assets/branches";
import menus from "./slices/commerce/menus";
import sales from "./slices/commerce/sales";
import pos from "./slices/commerce/pos";
import temperatures from "./slices/monitoring/temperatures";
import preferences from "./slices/task/preferences";
import procurements from "./slices/assets/file201/procurements";
import heads from "./slices/assets/signatories";
import query from "./slices/query";
import subquery from "./slices/subquery";
import sourcing from "./slices/assets/sourcing";
import statistics from "./slices/statistics";
import qc from "./slices/responsibilities/qc";
import access from "./slices/responsibilities/access";
import maintenance from "./slices/responsibilities/maintenance";
import purchase from "./slices/procurments/purchase";
import enrollment from "./slices/assets/enrollment";
export const store = configureStore({
  reducer: {
    areas,
    auth,
    users,
    menus,
    sales,
    pos,
    temperatures,
    procurements,
    preferences,
    attendances,
    surnames,
    task,
    companies,
    branches,
    personnels,
    petitions,
    physicians,
    heads,
    query,
    subquery,
    sourcing,
    statistics,
    qc,
    access,
    maintenance,
    purchase,
    enrollment,
  },
});
