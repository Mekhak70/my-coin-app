import { useState, useEffect } from 'react';

function App() {
  const [telegramData, setTelegramData] = useState(null);

  useEffect(() => {
    window.TelegramLoginWidgetCallback = (userData) => {
      console.log('✅ Telegram Login Data:', userData);
      setTelegramData(userData); // Պահպանում ենք ստեյթում
    };
  }, []);

  return (
    <div>
      <h1>Բարի գալուստ!</h1>
      <div id="telegram-login-button"></div>
      
        <div>
          <h2>Telegram User Info:</h2>
          <pre>{JSON.stringify(telegramData, null, 2)}</pre>
        </div>
      
    </div>
  );
}

export default App;

