import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import express from 'express';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (req.query.height && req.query.weight) {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (!isNaN(height) && !isNaN(weight)) {
      const bmi = calculateBmi(height, weight);
      return res.json({
        height: height,
        weight: weight,
        bmi
      });
    }
  }

  return res.status(400).json({
    error: "malformatted parameters"
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if ( !daily_exercises || !target) return res.status(400).send({ error: "parameters missing" });

  if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const dailys = (daily_exercises as number[]).map(Number);

  if (dailys.some(isNaN)) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const result = calculateExercises(dailys, Number(target));

  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});