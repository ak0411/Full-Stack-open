import patientEntries from "../../data/patientEntries";
import { NewPatientEntry, OmitSsnPatientEntry, PatientEntry } from "../types";
import { v1 as uuid } from 'uuid';

const getPatients = (): OmitSsnPatientEntry[] => {
  return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};

export default { getPatients, addPatient };