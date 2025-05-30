import { useState, useEffect } from 'react';

function App() {
  const [telegramData, setTelegramData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('auth') === 'success') {
      fetch('https://my-coin-backend.onrender.com/last-user')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setTelegramData(data.user);
          }
        });
    }
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://telegram.org/js/telegram-widget.js?7";
    script.setAttribute("data-telegram-login", "mycoinapp_bot"); // քո Bot-ի անունը (առանց @)
    script.setAttribute("data-size", "large");
    script.setAttribute("data-userpic", "false");
    script.setAttribute("data-radius", "10");
    script.setAttribute("data-request-access", "write");
    script.setAttribute("data-auth-url", "https://my-coin-backend.onrender.com/auth/telegram");
    document.getElementById("telegram-login-button").appendChild(script);
  }, []);

  return (
    <div>
      <h1>Բարի գալուստ My Coin App 🚀</h1>
      {telegramData ? (
        <div>
          <h2>Telegram User Info:</h2>
          <pre>{JSON.stringify(telegramData, null, 2)}</pre>
        </div>
      ) : (
        <p>Telegram user not authenticated yet</p>
      )}
      <div id="telegram-login-button"></div>
    </div>
  );
}

export default App;
