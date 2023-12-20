import { Diary } from "../types";

const Diaries = ({ diaries }: { diaries: Diary[] }) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map(diary =>
        <div key={diary.id}>
          <p><b>{diary.date}</b></p>
          <div>weather: {diary.weather}</div>
          <div>visibility: {diary.visibility}</div>
          <div>comment: {diary.comment}</div>
        </div>
      )}
    </div>
  );
};

export default Diaries;