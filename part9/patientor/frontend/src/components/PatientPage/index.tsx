import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import type { Patient } from '../../types';
import patientService from '../../services/patients';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

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
      <Typography variant="h5" component="h3" sx={{ mt: 3, fontWeight: 'bold' }}>
        entries
      </Typography>
      {patient.entries && patient.entries.length > 0 ? (
        patient.entries.map((_entry, index) => (
          <Box key={index} sx={{ mt: 1 }}>
          </Box>
        ))
      ) : (
        <Typography sx={{ mt: 1 }}>no entries</Typography>
      )}
    </Box>
  );
};

export default PatientPage;
