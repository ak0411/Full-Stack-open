import { useState } from "react";
import {
  TextField,
} from "@mui/material";
import { Diagnosis, EntryFormValues, HospitalEntry } from "../../../types";
import BaseEntryForm from "./BaseEntryForm";

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
      </>
    </BaseEntryForm>
  );
};

export default HospitalEntryForm;