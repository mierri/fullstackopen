import { useEffect, useState } from 'react';
import type { DiaryEntry } from './types.ts';
import { getAllDiaries } from './services/diaryService.ts';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
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
