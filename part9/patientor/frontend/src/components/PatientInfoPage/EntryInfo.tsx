import { Diagnosis, Entry } from "../../types";

interface Props {
  entry: Entry,
  diagnoses: Diagnosis[]
}

const EntryInfo = ({ entry, diagnoses }: Props) => {
  return (
    <div>
      <p>{entry.date} <i>{entry.description}</i></p>
      <ul>
        {entry.diagnosisCodes && entry.diagnosisCodes.map(code =>
          <li key={code}>{code} {diagnoses.find(d => d.code === code)?.name}</li>
        )}
      </ul>
    </div>
  );
};

export default EntryInfo;