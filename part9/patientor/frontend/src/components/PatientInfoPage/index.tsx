import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Patient } from "../../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EntryInfo from "./EntryInfo";


const PatientInfoPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const id = useParams().id;

  useEffect(() => {
    patientService
      .getById(id)
      .then(returnedPatient => {
        setPatient(returnedPatient);
      })
      .catch(error => {
        console.log(error.response.data.error);
      });
  }, [id]);


  if (!patient) {
    return null;
  }

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
      <div>
        <h3>entries</h3>
        {patient.entries.length === 0
          ? <div>none</div>
          : patient.entries.map(entry =>
            <EntryInfo key={entry.id} entry={entry} />
          )
        }
      </div>
    </div>
  );
};

export default PatientInfoPage;