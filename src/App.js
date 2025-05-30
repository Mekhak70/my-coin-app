import { useState, useEffect } from 'react';

function App() {
  const [telegramData, setTelegramData] = useState(null);

  useEffect(() => {
    // Fetch the last authenticated user data from backend
    fetch('https://my-coin-backend.onrender.com/last-user')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTelegramData(data.user);
        }
      });
  }, []);

  return (
    <div>
      <h1>Բարի գալուստ My Coin App 🚀</h1>
      <div id="telegram-login-button"></div>
      {telegramData ? (
        <div>
          <h2>Telegram User Info:</h2>
          <pre>{JSON.stringify(telegramData, null, 2)}</pre>
        </div>
      ) : (
        <p>Telegram user not authenticated yet</p>
      )}
    </div>
  );
}

export default App;
