import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!req.query.height || !req.query.weight || isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const bmi = calculateBmi(height, weight);

  res.json({
    weight,
    height,
    bmi
  });
});

app.post('/exercises', (req, res) => {
  const body = req.body as unknown;

  if (typeof body !== 'object' || body === null) {
    res.status(400).json({ error: 'parameters missing' });
    return;
  }

  const { daily_exercises, target } = body as {
    daily_exercises?: unknown;
    target?: unknown;
  };

  if (daily_exercises === undefined || target === undefined) {
    res.status(400).json({ error: 'parameters missing' });
    return;
  }

  if (
    !Array.isArray(daily_exercises) ||
    isNaN(Number(target)) ||
    typeof target === 'boolean' ||
    daily_exercises.some((item) => isNaN(Number(item)) || typeof item === 'boolean' || item === null)
  ) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const dailyExerciseHours = daily_exercises.map(Number);
  const targetNumber = Number(target);

  const result = calculateExercises(dailyExerciseHours, targetNumber);
  res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
