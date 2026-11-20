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
import type { EntryWithoutId, HealthCheckRating } from '../../types';

interface Props {
  onSubmit: (values: EntryWithoutId) => Promise<void>;
  onCancel: () => void;
  error?: string;
}

type EntryType = 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';

const AddEntryForm = ({ onSubmit, onCancel, error }: Props) => {
  const [entryType, setEntryType] = useState<EntryType>('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const [healthCheckRating, setHealthCheckRating] = useState('0');

  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const codes = diagnosisCodes
      .split(',')
      .map((code) => code.trim())
      .filter((code) => code.length > 0);

    const baseData = {
      description,
      date,
      specialist,
      ...(codes.length > 0 ? { diagnosisCodes: codes } : {})
    };

    let newEntry: EntryWithoutId;

    switch (entryType) {
      case 'HealthCheck':
        newEntry = {
          ...baseData,
          type: 'HealthCheck',
          healthCheckRating: Number(healthCheckRating) as HealthCheckRating
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
          fullWidth
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
        <TextField
          label="Diagnosis codes"
          placeholder="e.g. M24.2, M51.2"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
          sx={{ mb: 2 }}
        />

        {entryType === 'HealthCheck' && (
          <TextField
            label="Healthcheck rating"
            fullWidth
            type="number"
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(target.value)}
            inputProps={{ min: 0, max: 3 }}
            sx={{ mb: 2 }}
          />
        )}

        {entryType === 'Hospital' && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
              Discharge
            </Typography>
            <TextField
              label="Discharge date"
              fullWidth
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
              fullWidth
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Sick leave end date"
              fullWidth
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
