import { Card, CardContent, Typography } from "@mui/material";
import { Diagnosis, HospitalEntry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DiagnosisInfo from "./DiagnosisInfo";


interface Props {
  entry: HospitalEntry,
  diagnoses: Diagnosis[]
}

const HospitalEntryInfo = ({ entry, diagnoses }: Props) => {
  return (
    <Card sx={{ mb: 1 }}>
      <CardContent>
        <Typography variant="h5">
          Hospital <LocalHospitalIcon />
        </Typography>
        <Typography component="div">
          {entry.date} <br />
          <i>{entry.description}</i> <br />
        </Typography>
        <DiagnosisInfo entry={entry} diagnoses={diagnoses} />
        <Typography>
          discharged {entry.discharge.date}: {entry.discharge.criteria}
        </Typography>
        <Typography>diagnose by {entry.specialist}</Typography>
      </CardContent>
    </Card>
  );
};

export default HospitalEntryInfo;