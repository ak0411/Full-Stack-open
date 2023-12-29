import { useState } from "react";
import {
  FormControl,
  Typography,
  TextField,
} from "@mui/material";
import { Diagnosis, EntryFormValues, OccupationalHealthcareEntry } from "../../../types";
import BaseEntryForm from "./BaseEntryForm";

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

  const handleSubmit = () => {
    addEntry(formData);
    setFormData(initialFormData);
  };

  return (
    <BaseEntryForm
      formData={formData}
      setFormData={setFormData}
      diagnoses={diagnoses}
      handleSubmit={handleSubmit}
      handleToggleForm={handleToggleForm}
    >
      <>
        <TextField
          name="employerName"
          label="employer name"
          value={(formData as OccupationalHealthcareEntry).employerName}
          onChange={(e) => setFormData({
            ...formData as OccupationalHealthcareEntry,
            employerName: e.target.value
          })}
          margin="normal"
          size="small"
          type="text"
          InputLabelProps={{ shrink: true }}
        />
        <FormControl component="fieldset" margin="normal" size="small">
          <Typography>Sick leave</Typography>
          <TextField
            type="date"
            label="start"
            InputLabelProps={{ shrink: true }}
            margin="normal"
            size="small"
            value={(formData as OccupationalHealthcareEntry).sickLeave?.startDate}
            onChange={(e) => setFormData({
              ...formData as OccupationalHealthcareEntry,
              sickLeave: {
                startDate: e.target.value,
                endDate: (formData as OccupationalHealthcareEntry).sickLeave?.endDate || '',
              }
            })}
          />
          <TextField
            type="date"
            label="end"
            InputLabelProps={{ shrink: true }}
            margin="normal"
            size="small"
            value={(formData as OccupationalHealthcareEntry).sickLeave?.endDate}
            onChange={(e) => setFormData({
              ...formData as OccupationalHealthcareEntry,
              sickLeave: {
                startDate: (formData as OccupationalHealthcareEntry).sickLeave?.startDate || '',
                endDate: e.target.value,
              }
            })}
          />
        </FormControl>
      </>
    </BaseEntryForm>
  );
};

export default OccupationalHealthcareEntryForm;