import { useState, useEffect } from 'react';

function App() {
  const [telegramData, setTelegramData] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://telegram.org/js/telegram-widget.js?7";
    script.setAttribute("data-telegram-login", "mycoinapp_bot"); // առանց @ նշանի
    script.setAttribute("data-size", "large");
    script.setAttribute("data-userpic", "false");
    script.setAttribute("data-radius", "10");
    script.setAttribute("data-request-access", "write");
    document.getElementById("telegram-login-button").appendChild(script);

    window.TelegramLoginWidgetCallback = (userData) => {
      console.log('✅ Telegram User Data:', userData);
      setTelegramData(userData);
    };
  }, []);

  return (
    <div>
      <h1>Բարի գալուստ My Coin App 🚀</h1>
      <div id="telegram-login-button"></div>
      {telegramData && (
        <div>
          <h2>Telegram User Info:</h2>
          <pre>{JSON.stringify(telegramData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
