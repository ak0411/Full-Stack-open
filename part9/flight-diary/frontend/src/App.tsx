import { useEffect, useState } from 'react';
import { createDiary, getAllDiaries } from './services/diaryService';
import { Diary, NewDiary } from './types';
import Diaries from './components/Diaries';
import DiaryForm from './components/DiaryForm';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    });
  }, []);

  const addDiary = (newDiary: NewDiary) => {
    createDiary(newDiary)
      .then(data => {
        setDiaries(diaries.concat(data));
      })
      .catch(error => {
        setError(error.response.data);
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
  };

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <DiaryForm addDiary={addDiary} />
      <Diaries diaries={diaries} />
    </>
  );
};

export default App;
