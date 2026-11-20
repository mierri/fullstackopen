import express from 'express';
import type { Response } from 'express';
import { z } from 'zod';
import type { NonSensitivePatient, Patient, Entry } from '../types.ts';
import patientService from '../services/patientService.ts';
import { toNewPatient, toNewEntry } from '../utils.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res: Response<Patient>) => {
  const patient = patientService.getPatient(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).end();
  }
});

router.post('/', (req, res: Response<Patient | { error: unknown } | string>) => {
  try {
    const newPatientEntry = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

router.post('/:id/entries', (req, res: Response<Entry | { error: unknown } | string>) => {
  const patient = patientService.getPatient(req.params.id);
  if (!patient) {
    res.status(404).send({ error: 'Patient not found' });
    return;
  }

  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(patient, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

export default router;
