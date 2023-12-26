import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Diagnosis, Entry, EntryFormValues, Patient } from "../../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EntryInfo from "./EntryInfo";
import diagnosisService from "../../services/diagnoses";
import HospitalEntryForm from "./Forms/HospitalEntryForm";
import { Alert, Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";


const PatientInfoPage = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [patient, setPatient] = useState<Patient>();
  const [entries, setEntries] = useState<Entry[]>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const [selectedEntryType, setSelectedEntryType] = useState('hospital');
  const [error, setError] = useState(null);

  const id = useParams().id;

  useEffect(() => {
    patientService
      .getById(id)
      .then(returnedPatient => {
        setPatient(returnedPatient);
        setEntries(returnedPatient.entries);
      })
      .catch(error => {
        console.log(error.response.data.error);
      });
  }, [id]);

  useEffect(() => {
    diagnosisService
      .getAll()
      .then(returnedDiagnoses => {
        setDiagnoses(returnedDiagnoses);
      })
      .catch(error => {
        console.log(error.response.data.error);
      });
  }, []);

  if (!patient || !diagnoses) {
    return null;
  }

  const handleToggleForm = () => {
    setFormVisible(!isFormVisible);
  };

  const addEntry = (newEntry: EntryFormValues) => {
    patientService
      .createEntry(patient.id, newEntry)
      .then(returnedEntry => {
        setEntries(entries?.concat(returnedEntry));
        return true;
      })
      .catch(error => {
        setError(error.response.data);
        setTimeout(() => {
          setError(null);
        }, 3000);
      });

    return false;
  };

  return (
    <div>
      <h2>
        {patient.name}
        {patient.gender === 'other'
          ? null
          : patient.gender === 'male'
            ? <MaleIcon />
            : <FemaleIcon />
        }
      </h2>
      <div>gender: {patient.gender}</div>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      {error && <Alert severity="error">{error}</Alert>}
      <div>
        {isFormVisible && (
          <Container sx={{ mt: 2, border: 'solid 1px grey', borderRadius: '5px', padding: 2 }}>
            <FormControl>
              <FormLabel id="entry-types">Add Entry</FormLabel>
              <RadioGroup
                aria-labelledby="entry-types"
                value={selectedEntryType}
                onChange={(e) => setSelectedEntryType(e.target.value)}
                row
              >
                <FormControlLabel value="hospital" control={<Radio />} label="Hospital" />
                <FormControlLabel value="occupational" control={<Radio />} label="Occupational Healthcare" />
                <FormControlLabel value="health" control={<Radio />} label="Health" />
              </RadioGroup>
            </FormControl>
            {selectedEntryType === 'hospital' && <HospitalEntryForm addEntry={addEntry} handleToggleForm={handleToggleForm} />}
            {selectedEntryType === 'occupational' && <div>Occupational</div>}
            {selectedEntryType === 'health' && <div>Health</div>}
          </Container>
        )}
        {!isFormVisible && <Button onClick={handleToggleForm} variant="contained" sx={{ mt: 2 }}>New entry</Button>}
        <h2>entries</h2>
        {!entries || entries.length === 0
          ? <div>none</div>
          : entries.map(entry =>
            <EntryInfo key={entry.id} entry={entry} diagnoses={diagnoses} />
          )
        }
      </div>
    </div>
  );
};

export default PatientInfoPage;