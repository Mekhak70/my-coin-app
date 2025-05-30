import { useState, useEffect } from 'react';

function App() {
  const [telegramData, setTelegramData] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://telegram.org/js/telegram-widget.js?7";
    script.setAttribute("data-telegram-login", "mycoinapp_bot"); // քո bot-ի անունը, առանց @
    script.setAttribute("data-size", "large");
    script.setAttribute("data-userpic", "false");
    script.setAttribute("data-radius", "10");
    script.setAttribute("data-request-access", "write");
    script.setAttribute("data-auth-url", "https://my-coin-backend.onrender.com/auth/telegram"); // backend հասցեն

    document.getElementById("telegram-login-button").appendChild(script);
  }, []);

  useEffect(() => {
    // Optional: Backend-ից ստացված տվյալները տեղադրիր state-ի մեջ (եթե էկրանին ցույց տալու կարիք լինի)
    fetch("https://my-coin-backend.onrender.com/last-user")
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

