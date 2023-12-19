import patients from "../../data/patients";
import { OmitSsnPatientEntry } from "../types";

const getPatients = (): OmitSsnPatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default { getPatients };