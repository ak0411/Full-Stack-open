import { Button, FormControl, Typography, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { EntryFormValues } from "../../../types";

interface Props {
  addEntry: (newEntry: EntryFormValues) => boolean;
  handleToggleForm: () => void;
}

const HospitalEntryForm = ({ addEntry, handleToggleForm }: Props) => {
  const [formData, setFormData] = useState({
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: '',
    dischargeDate: '',
    criteria: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const {
      description,
      date,
      specialist,
      diagnosisCodes,
      dischargeDate,
      criteria
    } = formData;

    const newEntry: EntryFormValues = {
      type: 'Hospital',
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes
        ? diagnosisCodes.replace(/ /g,'').split(',')
        : undefined,
      discharge: {
        date: dischargeDate,
        criteria
      }
    };

    const isSuccess = addEntry(newEntry);
    if (isSuccess) {
      setFormData({
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: '',
        dischargeDate: '',
        criteria: '',
      });
    }
  };

  return (
    <FormControl fullWidth>
      <Typography variant="h5">Hospital Entry</Typography>
      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
        margin="normal"
        size="small"
      />
      <TextField
        name="date"
        label="Date"
        value={formData.date}
        onChange={handleChange}
        margin="normal"
        size="small"
      />
      <TextField
        name="specialist"
        label="Specialist"
        value={formData.specialist}
        onChange={handleChange}
        margin="normal"
        size="small"
      />
      <TextField
        name="diagnosisCodes"
        label="Diagnosis Codes"
        value={formData.diagnosisCodes}
        onChange={handleChange}
        margin="normal"
        size="small"
      />
      <TextField
        name="dischargeDate"
        label="Discharge Date"
        value={formData.dischargeDate}
        onChange={handleChange}
        margin="normal"
        size="small"
      />
      <TextField
        name="criteria"
        label="Criteria"
        value={formData.criteria}
        onChange={handleChange}
        margin="normal"
        size="small"
      />
      <Button variant="contained" color="success" onClick={handleSubmit} sx={{ mb: 1, display: 'inline-block' }}>
        Add
      </Button>
      <Button onClick={handleToggleForm} variant="contained" color="error" sx={{ display: 'inline-block' }}>Cancel</Button>
    </FormControl>
  );
};

export default HospitalEntryForm;