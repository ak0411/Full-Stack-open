import { Entry } from "../../types";

const EntryInfo = ({ entry }: { entry: Entry }) => {
  return (
    <div>
      <p>{entry.date} <i>{entry.description}</i></p>
      <ul>
        {entry.diagnosisCodes && entry.diagnosisCodes.map(code =>
          <li key={code}>{code}</li>
        )}
      </ul>
    </div>
  );
};

export default EntryInfo;