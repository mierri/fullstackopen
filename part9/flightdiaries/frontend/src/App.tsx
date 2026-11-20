import { useEffect, useState, type SyntheticEvent } from 'react';
import axios from 'axios';
import type { DiaryEntry, Visibility, Weather } from './types.ts';
import { getAllDiaries, createDiary } from './services/diaryService.ts';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('great');
  const [weather, setWeather] = useState<Weather>('sunny');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const addDiary = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const createdEntry = await createDiary({
        date,
        visibility,
        weather,
        comment
      });
      setDiaries(diaries.concat(createdEntry));
      setDate('');
      setComment('');
      setErrorMessage('');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          if (typeof error.response.data === 'string') {
            setErrorMessage(error.response.data);
          } else if (typeof error.response.data === 'object' && 'error' in error.response.data) {
            const err = error.response.data.error;
            if (Array.isArray(err)) {
              setErrorMessage(
                err
                  .map((e: { message?: string; path?: (string | number)[] }) =>
                    `${e.path ? e.path.join('.') + ': ' : ''}${e.message || ''}`
                  )
                  .join(', ')
              );
            } else if (typeof err === 'string') {
              setErrorMessage(err);
            } else {
              setErrorMessage(JSON.stringify(err));
            }
          } else {
            setErrorMessage(error.message);
          }
        } else {
          setErrorMessage(error.message);
        }
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Unknown error');
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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
