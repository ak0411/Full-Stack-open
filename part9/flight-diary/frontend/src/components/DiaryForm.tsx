import { NewDiary, Visibility, Weather } from "../types";

const DiaryForm = ({ addDiary }: { addDiary: (newDiary: NewDiary) => void}) => {
  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const date = event.target.date.value;
    const visibility = event.target.visibility.value;
    const weather = event.target.weather.value;
    const comment = event.target.comment.value;

    addDiary({ date, visibility, weather, comment });
  };

  return (
    <div>
      <h2>Add new diary</h2>
      <form onSubmit={submit}>
        <div>
          Date:
          <input type="date" name="date" />
        </div>
        <div>
          Visibility:
          {Object.values(Visibility).map(v =>
            <span key={v.toString()}>
              <input type="radio" name="visibility" value={v.toString()} />
              {v.toString()}
            </span>
          )}
        </div>
        <div>
          Weather:
          {Object.values(Weather).map(v =>
            <span key={v.toString()}>
              <input type="radio" name="weather" value={v.toString()} />
              {v.toString()}
            </span>
          )}
        </div>
        <div>
          Comment:
          <input type="text" name="comment" autoComplete="off" /><br />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;