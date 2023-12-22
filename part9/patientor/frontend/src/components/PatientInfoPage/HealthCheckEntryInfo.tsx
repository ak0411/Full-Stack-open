import { Card, CardContent, Typography } from "@mui/material";
import { Diagnosis, HealthCheckEntry } from "../../types";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import DiagnosisInfo from "./DiagnosisInfo";
import { Favorite } from "@mui/icons-material";
import { red, orange, yellow, green } from '@mui/material/colors';

interface Props {
  entry: HealthCheckEntry,
  diagnoses: Diagnosis[]
}

const HealthCheckEntryInfo = ({ entry, diagnoses }: Props) => {
  return (
    <Card sx={{ mb: 1 }}>
      <CardContent>
        <Typography variant="h5">
          Health Check <MonitorHeartIcon />
        </Typography>
        <Typography component="div">
          {entry.date} <br />
          <i>{entry.description}</i> <br />
          <Favorite sx={entry.healthCheckRating === 0
            ? { color: green[500] }
            : entry.healthCheckRating === 1
              ? { color: yellow[500] }
              : entry.healthCheckRating === 2
                ? { color: orange[500] }
                : { color: red[500] }
          }/>
        </Typography>
        <DiagnosisInfo entry={entry} diagnoses={diagnoses} />
        <Typography>diagnose by {entry.specialist}</Typography>
      </CardContent>
    </Card>
  );
};

export default HealthCheckEntryInfo;