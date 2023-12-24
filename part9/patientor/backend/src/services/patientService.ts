import patientEntries from "../../data/patientEntries";
import { Entry, NewEntry, NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from "../types";
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

const addEntry = (id: string, entry: NewEntry): Entry => {
  const newEntry: Entry = {
    id: uuid(),
    ...entry
  }
  const foundPatient = patientEntries.find(patient => patient.id === id);

  if (!foundPatient) {
    throw new Error('Patient not found');
  }

  foundPatient.entries.push(newEntry);
  return newEntry;
}

export default { getPatients, getPatientById, addPatient, addEntry };