type Rating = 1 | 2 | 3;

interface TrainingResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  daily_exercises: number[];
}

const parseInputs = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);

  if (isNaN(target)) {
    throw new Error('Provided target value is not a number!');
  }

  const daily_exercises = args.slice(3).map(Number);

  if(daily_exercises.includes(NaN)) {
    throw new Error('Provided values were not numbers!');
  }

  return {
    target: Number(args[2]),
    daily_exercises: args.slice(3).map(Number)
  };
};

export const calculateExercises = (daily_exercises: number[], target: number): TrainingResult => {
  const periodLength = daily_exercises.length;
  const trainingDays = daily_exercises.filter(dailyHour => dailyHour > 0).length;
  const average = daily_exercises.reduce((acc, curr) => acc + curr, 0) / periodLength;
  const success = average >= target;
  let rating: Rating;
  let ratingDescription: string;

  if (average < target / 2) {
    rating = 1;
    ratingDescription = 'come on you can work harder than that';
  } else if (average >= target / 2 && average <= target * 1.5) {
    rating = 2;
    ratingDescription = 'keep up the good work';
  } else {
    rating = 3;
    ratingDescription = 'you have transceded';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average  
  };
};

try {
  const { target, daily_exercises } = parseInputs(process.argv);
  console.log(calculateExercises(daily_exercises, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}