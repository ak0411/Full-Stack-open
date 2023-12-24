import patientEntries from "../../data/patientEntries";
import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from "../types";
import { v1 as uuid } from 'uuid';

const getPatients = (): NonSensitivePatientEntry[] => {
  return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientById = (id: string): PatientEntry | undefined => {
  return patientEntries.find(p => p.id === id);
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry: PatientEntry = {
    id: uuid(),
    entries: [],
    ...entry
  };

  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};

export default { getPatients, getPatientById, addPatient };