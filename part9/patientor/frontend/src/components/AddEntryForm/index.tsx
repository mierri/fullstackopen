import { useState, SyntheticEvent } from 'react';
import { TextField, Button, Grid, Box, Typography, Alert } from '@mui/material';
import type { EntryWithoutId, HealthCheckRating } from '../../types';

interface Props {
  onSubmit: (values: EntryWithoutId) => Promise<void>;
  onCancel: () => void;
  error?: string;
}

const AddEntryForm = ({ onSubmit, onCancel, error }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('0');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const codes = diagnosisCodes
      .split(',')
      .map((code) => code.trim())
      .filter((code) => code.length > 0);

    const newEntry: EntryWithoutId = {
      type: 'HealthCheck',
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
      ...(codes.length > 0 ? { diagnosisCodes: codes } : {})
    };

    await onSubmit(newEntry);
  };

  return (
    <Box sx={{ border: '2px dashed #999', p: 2, my: 2, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        New HealthCheck entry
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
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
          label="Healthcheck rating"
          fullWidth
          type="number"
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
          inputProps={{ min: 0, max: 3 }}
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
