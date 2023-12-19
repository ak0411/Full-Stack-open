import diagnosisEntries from "../../data/diagnosisEntries";
import { DiagnosisEntry } from "../types";

const getDiagnoses = (): DiagnosisEntry[] => {
  return diagnosisEntries;
};

export default { getDiagnoses };