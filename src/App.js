import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  // Backend-ին հարցում ուղարկելու ֆունկցիա
  const handleTelegramLogin = (userData) => {
    fetch('https://my-coin-backend.onrender.com/auth/telegram', {  // ✅ ԱՅՍՏԵՂ ՓՈԽԵԼ
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
      .then(res => res.json())
      .then(data => {
        console.log('Server Response:', data);
        if (data.success) {
          setUser(userData);
        } else {
          localStorage.removeItem('telegramUser');
          setUser(null);
        }
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('telegramUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      handleTelegramLogin(parsedUser); // ուղարկում ենք backend-ին
    } else {
      // Telegram login widget-ը ցուցադրելու համար
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://telegram.org/js/telegram-widget.js?7';
      script.setAttribute('data-telegram-login', 'mycoinapp_bot');
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-userpic', 'false');
      script.setAttribute('data-radius', '10');
      script.setAttribute('data-auth-url', 'https://my-coin-backend.onrender.com/auth/telegram'); // ✅ ԱՅՍՏԵՂ ԷԼ
      script.setAttribute('data-request-access', 'write');
      document.getElementById('telegram-login-button').appendChild(script);
    }
  }, []);

  // Telegram login callback
  window.TelegramLoginWidgetCallback = (userData) => {
    localStorage.setItem('telegramUser', JSON.stringify(userData));
    handleTelegramLogin(userData);
  };

  return (
    <div className="App">
      <h1>🚀 Բարի գալուստ My Coin App 🚀</h1>
      {user ? (
        <p>👤 {user.first_name || user.username || 'Անանուն'}</p>
      ) : (
        <div id="telegram-login-button"></div>
      )}
    </div>
  );
}

export default App;
