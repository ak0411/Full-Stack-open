import {
  FormControl,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup
} from "@mui/material";
import { useState } from "react";
import { Diagnosis, EntryFormValues, HealthCheckEntry, HealthCheckRating } from "../../../types";
import BaseEntryForm from "./BaseEntryForm";

interface Props {
  addEntry: (newEntry: EntryFormValues) => void;
  handleToggleForm: () => void;
  diagnoses: Diagnosis[];
}

const initialFormData: EntryFormValues = {
  type: 'HealthCheck',
  description: '',
  date: '',
  specialist: '',
  diagnosisCodes: [],
  healthCheckRating: HealthCheckRating.Healthy
};

const HealthCheckEntryForm = ({ addEntry, handleToggleForm, diagnoses }: Props) => {
  const [formData, setFormData] = useState<EntryFormValues>(initialFormData);

  const handleSubmit = () => {
    addEntry(formData);
    setFormData(initialFormData);
  };

  const healthRatings = Object
    .keys(HealthCheckRating)
    .filter((v) => isNaN(Number(v)));

  return (
    <BaseEntryForm
      formData={formData}
      setFormData={setFormData}
      diagnoses={diagnoses}
      handleSubmit={handleSubmit}
      handleToggleForm={handleToggleForm}
    >
      <FormControl component="fieldset" margin="normal" size="small">
        <Typography>Health rating</Typography>
        <RadioGroup
          row
          aria-label="health-check-rating"
          name="healthCheckRating"
          value={(formData as HealthCheckEntry).healthCheckRating}
          onChange={(e) => setFormData({
            ...formData as HealthCheckEntry,
            healthCheckRating: Number(e.target.value)
          })}
        >
          {healthRatings.map((v, i) => (
              <FormControlLabel
              key={i}
              value={i}
              control={<Radio />}
              label={v}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </BaseEntryForm>
  );
};

export default HealthCheckEntryForm;