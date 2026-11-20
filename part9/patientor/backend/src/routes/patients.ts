import express from 'express';
import type { Response } from 'express';
import type { NonSensitivePatient, Patient, NewPatient } from '../types.ts';
import patientService from '../services/patientService.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(patientService.getNonSensitivePatients());
});

router.post('/', (req, res: Response<Patient>) => {
  const body = req.body as NewPatient;
  const newPatient = patientService.addPatient(body);
  res.json(newPatient);
});

export default router;
