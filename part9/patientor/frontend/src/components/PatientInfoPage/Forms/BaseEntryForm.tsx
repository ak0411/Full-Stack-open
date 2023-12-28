import React, { ChangeEvent } from "react";
import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { Diagnosis, EntryFormValues } from "../../../types";

interface Props {
  initialFormData: EntryFormValues;
  formData: EntryFormValues;
  setFormData: React.Dispatch<React.SetStateAction<EntryFormValues>>;
  addEntry: (newEntry: EntryFormValues) => void;
  additionalFields?: React.ReactNode;
  diagnoses: Diagnosis[];

}

const BaseEntryForm = ({
  initialFormData,
  formData,
  setFormData,
  addEntry,
  additionalFields,
  diagnoses
}: Props) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string[]>) => {
    setFormData((prev) => ({ ...prev, diagnosisCodes: e.target.value as string[] }));
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
        />
      ))}
      <FormControl fullWidth margin="normal" size="small">
        <InputLabel id="diagnosis-codes-label">diagnosis codes</InputLabel>
        <Select
          label="diagnosis codes"
          labelId="diagnosis-codes-label"
          multiple
          value={formData.diagnosisCodes}
          onChange={handleSelectChange}
          size="small"
        >
          {diagnoses.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {d.code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {additionalFields}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Add
        </Button>
        <Button variant="contained" color="error">
          Cancel
        </Button>
      </div>
    </FormControl>
  );
};

export default BaseEntryForm;
