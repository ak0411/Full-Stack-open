import { ChangeEvent, useState } from "react";
import {
  Button,
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Diagnosis, EntryFormValues, HospitalEntry } from "../../../types";

interface Props {
  addEntry: (newEntry: EntryFormValues) => void;
  handleToggleForm: () => void;
  diagnoses: Diagnosis[];
}

const initialFormData: EntryFormValues = {
  type: 'Hospital',
  description: '',
  date: '',
  specialist: '',
  diagnosisCodes: [],
  discharge: {
    date: '',
    criteria: ''
  }
};

const HospitalEntryForm = ({ addEntry, handleToggleForm, diagnoses }: Props) => {
  const [formData, setFormData] = useState<EntryFormValues>(initialFormData);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    addEntry(formData);
    setFormData(initialFormData);
  };

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
      <TextField
        label="discharge date"
        value={(formData as HospitalEntry).discharge.date}
        onChange={(e) => setFormData({
          ...formData as HospitalEntry,
          discharge: {
            date: e.target.value,
            criteria: (formData as HospitalEntry).discharge.criteria
          }
        })}
        margin="normal"
        size="small"
        type="date"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="criteria"
        value={(formData as HospitalEntry).discharge.criteria}
        onChange={(e) => setFormData({
          ...formData as HospitalEntry,
          discharge: {
            date: (formData as HospitalEntry).discharge.date,
            criteria: e.target.value
          }
        })}
        margin="normal"
        size="small"
        type="text"
        InputLabelProps={{ shrink: true }}
      />
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

export default HospitalEntryForm;