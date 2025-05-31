import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  alert(JSON.stringify(Object.keys(window), null, 2));

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      tg.ready(); // Պաշտոնապես նշված է Telegram-ի փաստաթղթերում
      const userData = tg.initDataUnsafe?.user;
      if (userData) {
        setUser(userData);
      }
    }
  }, [user]);

  return (
    <div>
      <h1>Telegram Օգտատիրոջ Տվյալներ</h1>
      {user ? (
        <ul>
          <li><strong>ID:</strong> {user.id}</li>
          <li><strong>Անուն:</strong> {user.first_name}</li>
          <li><strong>Ազգանուն:</strong> {user.last_name || 'Չկա'}</li>
          <li><strong>Օգտանուն:</strong> {user.username || 'Չկա'}</li>
          <li><strong>Լեզու:</strong> {user.language_code || 'Չկա'}</li>
          <li><strong>Premium:</strong> {user.is_premium ? 'Այո' : 'Ոչ'}</li>
          <li><strong>Նկար:</strong> 
            {user.photo_url ? <img src={user.photo_url} alt="profile" width="100" /> : 'Չկա'}
          </li>
        </ul>
      ) : (
        <p>Տվյալներ չկան։ Հնարավոր է, որ հավելվածը չես բացել Telegram-ի միջոցով։</p>
      )}
    </div>
  );
}

export default App;
