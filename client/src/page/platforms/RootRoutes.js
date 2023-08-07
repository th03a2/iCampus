import AdminRoutes from "./administrator/routes";
import BillingRoutes from "./billing/routes";
import CarpenterRoutes from "./carpenter/routes";
import CashierRoutes from "./cashier/routes";
import ClinicalRoutes from "./clinical/routes";
import DieticiaRoutes from "./dietician/routes";
import FrontdeskRoutes from "./frontdesk/routes";
import HrRoutes from "./hr/routes";
import LaboratoryRoutes from "./laboratory/routes";
import ManagerRoutes from "./manager/routes";
import CeoRoutes from "./ceo/routes";
import PatronRoutes from "./patron/routes";
import PharmacyRoutes from "./pharmacy/routes";
import ProcurementRoutes from "./procurement/routes";
import PrincipalRoutes from "./principal/routes";
import RadiologyRoutes from "./radiology/routes";
import SocialRoutes from "./social/routes";
import TherapistRoutes from "./therapist/routes";
import Accreditations from "./accreditations/routes";
import Auditors from "./auditors/routes";
import PrintoutRoutes from "../printout/routes";

// export { Admin, Manager, Cashier };
const RootRoutes = [
  AdminRoutes,
  Accreditations,
  Auditors,
  BillingRoutes,
  CarpenterRoutes,
  CashierRoutes,
  ClinicalRoutes,
  DieticiaRoutes,
  FrontdeskRoutes,
  HrRoutes,
  LaboratoryRoutes,
  ManagerRoutes,
  PrincipalRoutes,
  CeoRoutes,
  PatronRoutes,
  PharmacyRoutes,
  ProcurementRoutes,
  RadiologyRoutes,
  SocialRoutes,
  TherapistRoutes,
  PrintoutRoutes,
  // BlankRoutes,
];
export default RootRoutes;
