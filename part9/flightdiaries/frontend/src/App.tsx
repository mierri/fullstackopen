import { useEffect, useState, type SyntheticEvent } from 'react';
import type { DiaryEntry, Visibility, Weather } from './types.ts';
import { getAllDiaries, createDiary } from './services/diaryService.ts';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('great');
  const [weather, setWeather] = useState<Weather>('sunny');
  const [comment, setComment] = useState('');

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const addDiary = (event: SyntheticEvent) => {
    event.preventDefault();
    createDiary({
      date,
      visibility,
      weather,
      comment
    }).then((createdEntry) => {
      setDiaries(diaries.concat(createdEntry));
      setDate('');
      setComment('');
    });
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={addDiary}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility
          <input
            type="text"
            value={visibility}
            onChange={(event) => setVisibility(event.target.value as Visibility)}
          />
        </div>
        <div>
          weather
          <input
            type="text"
            value={weather}
            onChange={(event) => setWeather(event.target.value as Weather)}
          />
        </div>
        <div>
          comment
          <input
            type="text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>

      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>
            visibility: {diary.visibility}
            <br />
            weather: {diary.weather}
            {diary.comment && (
              <>
                <br />
                comment: {diary.comment}
              </>
            )}
          </p>
        </div>
      ))}
    </div>
  );
};

export default App;
