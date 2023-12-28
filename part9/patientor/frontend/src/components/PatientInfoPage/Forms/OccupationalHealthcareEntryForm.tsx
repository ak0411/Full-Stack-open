import { ChangeEvent, useState } from "react";
import {
  Button,
  FormControl,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel
} from "@mui/material";
import { Diagnosis, EntryFormValues, OccupationalHealthcareEntry } from "../../../types";

interface Props {
  addEntry: (newEntry: EntryFormValues) => void;
  handleToggleForm: () => void;
  diagnoses: Diagnosis[];
}

const initialFormData: EntryFormValues = {
  type: 'OccupationalHealthcare',
  description: '',
  date: '',
  specialist: '',
  diagnosisCodes: [],
  employerName: '',
  sickLeave: {
    startDate: '',
    endDate: ''
  }
};

const OccupationalHealthcareEntryForm = ({ addEntry, handleToggleForm, diagnoses }: Props) => {
  const [formData, setFormData] = useState<EntryFormValues>(initialFormData);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const newEntry: EntryFormValues = {
      ...formData
    };

    addEntry(newEntry);

    setFormData(initialFormData);
  };

  const isOccupationalHealthcareEntry = (
    entry: EntryFormValues
  ): entry is OccupationalHealthcareEntry => {
    return entry.type === "OccupationalHealthcare";
  };


  return (
    <FormControl fullWidth>
      {["description", "date", "specialist", "employerName"].map((field) => (
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
      <FormControl component="fieldset" margin="normal" size="small">
        <Typography>Sick leave</Typography>
        <TextField
          type="date"
          label="start"
          InputLabelProps={{ shrink: true }}
          margin="normal"
          size="small"
          value={(formData as OccupationalHealthcareEntry).sickLeave?.startDate}
          onChange={(e) => {
            setFormData((prev) => {
              if (isOccupationalHealthcareEntry(prev)) {
                return {
                  ...prev,
                  sickLeave: {
                    startDate: e.target.value,
                    endDate: prev.sickLeave?.endDate || '',
                  },
                };
              }
              return prev;
            });
          }}
        />
        <TextField
          type="date"
          label="end"
          InputLabelProps={{ shrink: true }}
          margin="normal"
          size="small"
          value={(formData as OccupationalHealthcareEntry).sickLeave?.endDate}
          onChange={(e) => {
            setFormData((prev) => {
              if (isOccupationalHealthcareEntry(prev)) {
                return {
                  ...prev,
                  sickLeave: {
                    startDate: prev.sickLeave?.startDate || '',
                    endDate: e.target.value,
                  },
                };
              }
              return prev;
            });
          }}
        />
      </FormControl>
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

export default OccupationalHealthcareEntryForm;