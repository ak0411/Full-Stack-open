import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@mui/material";
import { Diagnosis, EntryFormValues } from "../../../types";

interface Props {
  formData: EntryFormValues;
  setFormData: React.Dispatch<React.SetStateAction<EntryFormValues>>;
  diagnoses: Diagnosis[];
  handleSubmit: () => void;
  handleToggleForm: () => void;
  children: JSX.Element;
}

const BaseEntryForm = ({
  formData,
  setFormData,
  diagnoses,
  handleSubmit,
  handleToggleForm,
  children
}: Props) => {

  return (
    <FormControl fullWidth>
      {["description", "date", "specialist"].map((field) => (
        <TextField
          key={field}
          name={field}
          label={field}
          value={formData[field as keyof EntryFormValues]}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
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

      {children}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
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

export default BaseEntryForm;
