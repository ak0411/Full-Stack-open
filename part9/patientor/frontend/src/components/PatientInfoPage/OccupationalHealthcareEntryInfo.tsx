import { Card, CardContent, Typography } from "@mui/material";
import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import DiagnosisInfo from "./DiagnosisInfo";

interface Props {
  entry: OccupationalHealthcareEntry,
  diagnoses: Diagnosis[]
}

const OccupationalHealthcareEntryInfo = ({ entry, diagnoses }: Props) => {
  return (
    <Card sx={{ mb: 1 }}>
      <CardContent>
        <Typography variant="h5">
          Occupational Healthcare <MedicalInformationIcon />
        </Typography>
        <Typography component="div">
          {entry.date} <br />
          <i>{entry.description}</i> <br />
        </Typography>
        <DiagnosisInfo entry={entry} diagnoses={diagnoses} />
        <Typography component="div">
          employer: {entry.employerName}
          {entry.sickLeave && <div>sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</div>}
        </Typography>
        <Typography>diagnose by {entry.specialist}</Typography>
      </CardContent>
    </Card>
  );
};

export default OccupationalHealthcareEntryInfo;