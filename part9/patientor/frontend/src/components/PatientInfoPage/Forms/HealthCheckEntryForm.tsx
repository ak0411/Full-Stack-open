import {
  Button,
  FormControl,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControlLabel,
  Radio,
  RadioGroup
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Diagnosis, EntryFormValues, HealthCheckEntry, HealthCheckRating } from "../../../types";

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    addEntry(formData);
    setFormData(initialFormData);
  };

  const isHealthCheckEntry = (
    entry: EntryFormValues
  ): entry is HealthCheckEntry => {
    return entry.type === "HealthCheck";
  };

  const healthRatings = Object
    .keys(HealthCheckRating)
    .filter((v) => isNaN(Number(v)));

  return (
    <FormControl fullWidth>
      {["description", "date", "specialist"].map((field) => (
        <TextField
          key={field}
          name={field}
          label={field}
          value={formData[field as keyof EntryFormValues]}
          onChange={handleChange}
          margin="normal"
          size="small"
          type={field === "date" ? "date" : "text"}
          InputLabelProps={{ shrink: true }}
        />
      ))}
      <FormControl fullWidth margin="normal" size="small">
        <InputLabel id="diagnosis-codes-label">diagnosis codes</InputLabel>
        <Select
          label="diagnosis codes"
          labelId="diagnosis-codes-label"
          multiple
          value={formData.diagnosisCodes}
          onChange={(e) => setFormData({...formData, diagnosisCodes: e.target.value as string[]})}
          size="small"
        >
          {diagnoses.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {d.code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl component="fieldset" margin="normal" size="small">
        <Typography>Health rating</Typography>
        <RadioGroup
          row
          aria-label="health-check-rating"
          name="healthCheckRating"
          value={(formData as HealthCheckEntry).healthCheckRating}
          onChange={(e) => {
            setFormData((prev) => {
              if (isHealthCheckEntry(prev)) {
                return {
                  ...prev,
                  healthCheckRating: Number(e.target.value)
                };
              }
              return prev;
            });
          }}
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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Add
        </Button>
        <Button onClick={handleToggleForm} variant="contained" color="error">
          Cancel
        </Button>
      </div>
    </FormControl>
  );
};

export default HealthCheckEntryForm;