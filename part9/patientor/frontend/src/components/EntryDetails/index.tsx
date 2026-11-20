import { Box, Typography } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';
import type { Entry, Diagnosis, HealthCheckRating } from '../../types';

interface EntryDetailsProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const getHealthRatingColor = (rating: HealthCheckRating): string => {
  switch (rating) {
    case 0:
      return 'green';
    case 1:
      return 'yellow';
    case 2:
      return 'orange';
    case 3:
      return 'red';
    default:
      return 'grey';
  }
};

const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
  const getDiagnosisName = (code: string): string => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : '';
  };

  const renderEntrySpecifics = () => {
    switch (entry.type) {
      case 'Hospital':
        return (
          <Box>
            <Typography>
              discharge: {entry.discharge.date} ({entry.discharge.criteria})
            </Typography>
          </Box>
        );
      case 'OccupationalHealthcare':
        return (
          <Box>
            {entry.sickLeave && (
              <Typography>
                sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
              </Typography>
            )}
          </Box>
        );
      case 'HealthCheck':
        return (
          <Box>
            <FavoriteIcon sx={{ color: getHealthRatingColor(entry.healthCheckRating) }} />
          </Box>
        );
      default:
        return assertNever(entry);
    }
  };

  const renderIcon = () => {
    switch (entry.type) {
      case 'Hospital':
        return <LocalHospitalIcon />;
      case 'OccupationalHealthcare':
        return <WorkIcon />;
      case 'HealthCheck':
        return <MedicalServicesIcon />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 2, mb: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {entry.date} {renderIcon()} {entry.type === 'OccupationalHealthcare' && <i>{entry.employerName}</i>}
      </Typography>
      <Typography sx={{ fontStyle: 'italic', color: '#555' }}>
        {entry.description}
      </Typography>
      {renderEntrySpecifics()}
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <li key={code}>
              {code} {getDiagnosisName(code)}
            </li>
          ))}
        </ul>
      )}
      <Typography variant="body2" sx={{ mt: 1, color: '#777' }}>
        diagnose by {entry.specialist}
      </Typography>
    </Box>
  );
};

export default EntryDetails;
