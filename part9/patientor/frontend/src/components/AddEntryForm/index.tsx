import { useState, SyntheticEvent } from 'react';
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import type { EntryWithoutId, HealthCheckRating, Diagnosis } from '../../types';

interface Props {
  onSubmit: (values: EntryWithoutId) => Promise<void>;
  onCancel: () => void;
  error?: string;
  diagnoses: Diagnosis[];
}

type EntryType = 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';

const AddEntryForm = ({ onSubmit, onCancel, error, diagnoses }: Props) => {
  const [entryType, setEntryType] = useState<EntryType>('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);

  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const baseData = {
      description,
      date,
      specialist,
      ...(diagnosisCodes.length > 0 ? { diagnosisCodes } : {})
    };

    let newEntry: EntryWithoutId;

    switch (entryType) {
      case 'HealthCheck':
        newEntry = {
          ...baseData,
          type: 'HealthCheck',
          healthCheckRating
        };
        break;
      case 'Hospital':
        newEntry = {
          ...baseData,
          type: 'Hospital',
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria
          }
        };
        break;
      case 'OccupationalHealthcare':
        newEntry = {
          ...baseData,
          type: 'OccupationalHealthcare',
          employerName,
          ...(sickLeaveStartDate && sickLeaveEndDate
            ? {
                sickLeave: {
                  startDate: sickLeaveStartDate,
                  endDate: sickLeaveEndDate
                }
              }
            : {})
        };
        break;
    }

    await onSubmit(newEntry);
  };

  const handleDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    const val = event.target.value;
    setDiagnosisCodes(typeof val === 'string' ? val.split(',') : val);
  };

  return (
    <Box sx={{ border: '2px dashed #999', p: 2, my: 2, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        New Entry
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="entry-type-label">Entry Type</InputLabel>
          <Select
            labelId="entry-type-label"
            label="Entry Type"
            value={entryType}
            onChange={(e: SelectChangeEvent<EntryType>) =>
              setEntryType(e.target.value as EntryType)
            }
          >
            <MenuItem value="HealthCheck">HealthCheck</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          value={date}
          onChange={({ target }) => setDate(target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="diagnosis-codes-label">Diagnosis codes</InputLabel>
          <Select<string[]>
            labelId="diagnosis-codes-label"
            label="Diagnosis codes"
            multiple
            value={diagnosisCodes}
            onChange={handleDiagnosisCodesChange}
          >
            {diagnoses.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.code} - {d.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {entryType === 'HealthCheck' && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="healthcheck-rating-label">Healthcheck rating</InputLabel>
            <Select
              labelId="healthcheck-rating-label"
              label="Healthcheck rating"
              value={healthCheckRating}
              onChange={(e) =>
                setHealthCheckRating(Number(e.target.value) as HealthCheckRating)
              }
            >
              <MenuItem value={0}>Healthy</MenuItem>
              <MenuItem value={1}>LowRisk</MenuItem>
              <MenuItem value={2}>HighRisk</MenuItem>
              <MenuItem value={3}>CriticalRisk</MenuItem>
            </Select>
          </FormControl>
        )}

        {entryType === 'Hospital' && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
              Discharge
            </Typography>
            <TextField
              label="Discharge date"
              type="date"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Discharge criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </Box>
        )}

        {entryType === 'OccupationalHealthcare' && (
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Employer name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
              sx={{ mb: 2 }}
            />
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
              Sick Leave (optional)
            </Typography>
            <TextField
              label="Sick leave start date"
              type="date"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Sick leave end date"
              type="date"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            />
          </Box>
        )}

        <Grid container justifyContent="space-between">
          <Grid size="auto">
            <Button color="error" variant="contained" type="button" onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
          <Grid size="auto">
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddEntryForm;
