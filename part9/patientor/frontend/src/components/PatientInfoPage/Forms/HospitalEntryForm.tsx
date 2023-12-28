import { ChangeEvent, useState } from "react";
import {
  Button,
  FormControl,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent
} from "@mui/material";
import { Diagnosis, EntryFormValues } from "../../../types";

interface Props {
  addEntry: (newEntry: EntryFormValues) => void;
  handleToggleForm: () => void;
  diagnoses: Diagnosis[];
}

interface HospitalFormData {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];
  dischargeDate: string;
  criteria: string;
}

const initialFormData: HospitalFormData = {
  description: '',
  date: '',
  specialist: '',
  diagnosisCodes: [],
  dischargeDate: '',
  criteria: '',
};

const HospitalEntryForm = ({ addEntry, handleToggleForm, diagnoses }: Props) => {
  const [formData, setFormData] = useState<HospitalFormData>(initialFormData);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDiagnosisChange = (e: SelectChangeEvent<string[]>) => {
    setFormData({
      ...formData,
      diagnosisCodes: e.target.value as string[],
    });
  };

  const handleSubmit = () => {
    const newEntry: EntryFormValues = {
      type: 'Hospital',
      ...formData,
      discharge: {
        date: formData.dischargeDate,
        criteria: formData.criteria,
      },
    };

    addEntry(newEntry);

    setFormData(initialFormData);
  };

  return (
    <FormControl fullWidth>
      {["description", "date", "specialist", "dischargeDate", "criteria"].map((field) => (
        <TextField
          key={field}
          name={field}
          label={field}
          value={formData[field as keyof HospitalFormData]}
          onChange={handleChange}
          margin="normal"
          size="small"
          type={field === "date" || field === "dischargeDate" ? "date" : "text"}
          InputLabelProps={{ shrink: true }}
        />
      ))}
      <FormControl fullWidth margin="normal" size="small">
        <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
        <Select
          label="Diagnosis Codes"
          labelId="diagnosis-codes-label"
          multiple
          value={formData.diagnosisCodes}
          onChange={handleDiagnosisChange}
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

export default HospitalEntryForm;