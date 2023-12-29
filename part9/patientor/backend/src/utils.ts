import { DiagnosisEntry, Discharge, EntryType, Gender, HealthCheckRating, NewEntry, NewPatientEntry, SickLeave } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation)
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const isEntryType = (type: string): type is EntryType => {
  return Object.values(EntryType).map(entry => entry.toString()).includes(type);
};

const parseType = (type: unknown): EntryType => {
  if (!type || !isString(type) || !isEntryType(type)) {
    throw new Error('Incorrect or missing type: ' + type);
  }
  return type;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<DiagnosisEntry['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<DiagnosisEntry['code']>;
  }

  return object.diagnosisCodes as Array<DiagnosisEntry['code']>;
};

const isDischarge = (discharge: object): discharge is Discharge => {
  if (
    'date' in discharge &&
    'criteria' in discharge &&
    isString(discharge.date) &&
    isDate(discharge.date) &&
    isString(discharge.criteria) &&
    discharge.criteria
  ) {
    return true;
  }
  return false;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== 'object' || !isDischarge(discharge)) {
    throw new Error(`Incorrect or missing discharge: ${JSON.stringify(discharge)}`);
  }

  return discharge;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employer name: ' + employerName);
  }

  return employerName;
};

const isSickLeave = (sickLeave: object): sickLeave is SickLeave => {
  return (
    'startDate' in sickLeave &&
    'endDate' in sickLeave &&
    isString(sickLeave.startDate) &&
    isDate(sickLeave.startDate) &&
    isString(sickLeave.endDate) &&
    isDate(sickLeave.endDate)
  );
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    return undefined;
  }

  return sickLeave;
};

const isHealthCheckRating = (healthCheckRating: number): healthCheckRating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (isNaN(Number(healthCheckRating)) || !isHealthCheckRating(Number(healthCheckRating))) {
    throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
  }
  return Number(healthCheckRating);
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('type' in object && 'description' in object && 'date' in object && 'specialist' in object) {
    const type = parseType(object.type);
    const entry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object),
    };

    switch (type) {
      case EntryType.Hospital:
        if ('discharge' in object) {
          return {
            ...entry,
            type: 'Hospital',
            discharge: parseDischarge(object.discharge),
          };
        }
        break;
      case EntryType.OccupationalHealthcare:
        if ('employerName' in object && 'sickLeave' in object) {
          return {
            ...entry,
            type: 'OccupationalHealthcare',
            employerName: parseEmployerName(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave)
          };
        }
        break;
      case EntryType.HealthCheck:
        if ('healthCheckRating' in object) {
          return {
            ...entry,
            type: 'HealthCheck',
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
          };
        }
        break;
      default:
        throw new Error('Incorrect type: ' + type);
    }
  }

  throw new Error('Incorrect data: some fields are missing');
};