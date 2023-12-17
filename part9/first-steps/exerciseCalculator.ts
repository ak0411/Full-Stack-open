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

const calculateExercises = (hoursPerDay: number[], target: number): TrainingResult => {
  const periodLength = hoursPerDay.length;
  const trainingDays = hoursPerDay.filter(dailyHour => dailyHour > 0).length;
  const average = hoursPerDay.reduce((acc, curr) => acc + curr, 0) / periodLength;
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
  }
}

console.log(calculateExercises([3, 5, 2, 4.5, 4, 3, 1], 2))