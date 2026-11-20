import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import axios from 'axios';
import type { Patient, Diagnosis, EntryWithoutId } from '../../types';
import patientService from '../../services/patients';
import EntryDetails from '../EntryDetails';
import AddEntryForm from '../AddEntryForm';

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState<string>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        try {
          const patientData = await patientService.getById(id);
          setPatient(patientData);
        } catch (error: unknown) {
          console.error(error);
        }
      }
    };
    void fetchPatient();
  }, [id]);

  if (!patient) {
    return <div>Loading patient information...</div>;
  }

  const handleAddEntry = async (values: EntryWithoutId) => {
    if (!id) return;
    try {
      const newEntry = await patientService.createEntry(id, values);
      setPatient({
        ...patient,
        entries: patient.entries.concat(newEntry)
      });
      setShowForm(false);
      setFormError(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response?.data && typeof e.response.data === 'object' && 'error' in e.response.data) {
          const err = (e.response.data as { error: unknown }).error;
          setFormError(typeof err === 'string' ? err : JSON.stringify(err));
        } else if (typeof e.response?.data === 'string') {
          setFormError(e.response.data);
        } else {
          setFormError('Unrecognized axios error');
        }
      } else {
        setFormError('Unknown error');
      }
    }
  };

  const renderGenderIcon = () => {
    switch (patient.gender) {
      case 'male':
        return <MaleIcon />;
      case 'female':
        return <FemaleIcon />;
      default:
        return <TransgenderIcon />;
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
        {patient.name} {renderGenderIcon()}
      </Typography>
      <Typography sx={{ mt: 1 }}>
        ssn: {patient.ssn}
      </Typography>
      <Typography>
        date of birth: {patient.dateOfBirth}
      </Typography>
      <Typography>
        occupation: {patient.occupation}
      </Typography>
      {showForm ? (
        <AddEntryForm
          onSubmit={handleAddEntry}
          onCancel={() => {
            setShowForm(false);
            setFormError(undefined);
          }}
          error={formError}
        />
      ) : (
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => setShowForm(true)}>
          Add New Entry
        </Button>
      )}
      <Typography variant="h5" component="h3" sx={{ mt: 3, fontWeight: 'bold' }}>
        entries
      </Typography>
      {patient.entries && patient.entries.length > 0 ? (
        patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))
      ) : (
        <Typography sx={{ mt: 1 }}>no entries</Typography>
      )}
    </Box>
  );
};

export default PatientPage;
