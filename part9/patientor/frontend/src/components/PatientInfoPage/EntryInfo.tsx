import { Diagnosis, Entry } from "../../types";
import HealthCheckEntryInfo from "./HealthCheckEntryInfo";
import HospitalEntryInfo from "./HospitalEntryInfo";
import OccupationalHealthcareEntryInfo from "./OccupationalHealthcareEntryInfo";

interface Props {
  entry: Entry,
  diagnoses: Diagnosis[]
}

const EntryInfo = ({ entry, diagnoses }: Props) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryInfo entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryInfo entry={entry} diagnoses={diagnoses} />;
    case "HealthCheck":
      return <HealthCheckEntryInfo entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default EntryInfo;