import { Diagnosis, Entry } from "../../types";

interface Props {
  entry: Entry,
  diagnoses: Diagnosis[]
}

const DiagnosisInfo = ({ entry, diagnoses }: Props) => {
  if (!entry.diagnosisCodes || entry.diagnosisCodes.length === 0 ) return null;

  const diagnosisCodeMap: Record<string, string> = {};

  diagnoses.forEach(d => {
    diagnosisCodeMap[d.code] = d.name;
  });

  return (
    <ul>
      {entry.diagnosisCodes.map(code =>
        <li key={code}>{code} {diagnosisCodeMap[code]}</li>
      )}
    </ul>
  );
};

export default DiagnosisInfo;