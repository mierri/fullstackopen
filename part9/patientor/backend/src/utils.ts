import { newPatientSchema, newEntrySchema } from './types.ts';
import type { NewPatient, NewEntry } from './types.ts';

export const toNewPatient = (object: unknown): NewPatient => {
  return newPatientSchema.parse(object);
};

export const toNewEntry = (object: unknown): NewEntry => {
  return newEntrySchema.parse(object);
};

export default toNewPatient;
