import express from 'express';
import patientService from '../services/patientService';
import { toNewEntry, toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);

  if (!patient) {
    return res.status(404).json({ error: 'patient not found' });
  }

  return res.send(patient);
});

router.post('/', (req, res) => {
  try {
    const newPatienEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatienEntry);
    res.json(addedEntry);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(req.params.id, newEntry);
    res.json(addedEntry);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;