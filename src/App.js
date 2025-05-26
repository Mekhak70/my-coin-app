import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  // Backend-ին հարցում ուղարկելու ֆունկցիա
  const handleTelegramLogin = (userData) => {
    console.log('➡️ Sending userData to backend:', userData);
    fetch('https://my-coin-backend.onrender.com/auth/telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
      .then(res => res.json())
      .then(data => {
        console.log('✅ Server Response:', data);
        if (data.success) {
          setUser(userData);
        } else {
          localStorage.removeItem('telegramUser');
          setUser(null);
        }
      })
      .catch(err => console.error('❌ Fetch error:', err));
  };

  useEffect(() => {
    // Նախ գրանցում ենք callback-ը, որ միշտ լինի
    window.TelegramLoginWidgetCallback = (userData) => {
      console.log('✅ Telegram Login Callback triggered:', userData);
      localStorage.setItem('telegramUser', JSON.stringify(userData));
      handleTelegramLogin(userData);
    };

    const storedUser = localStorage.getItem('telegramUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      handleTelegramLogin(parsedUser);
    } else {
      // Telegram login widget-ը ցուցադրելու համար
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://telegram.org/js/telegram-widget.js?7';
      script.setAttribute('data-telegram-login', 'mycoinapp_bot');
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-userpic', 'false');
      script.setAttribute('data-radius', '10');
      script.setAttribute('data-auth-url', 'https://my-coin-backend.onrender.com/auth/telegram');
      script.setAttribute('data-request-access', 'write');
      document.getElementById('telegram-login-button').appendChild(script);
    }

    // Debug
    console.log('📌 window.TelegramLoginWidgetCallback set:', window.TelegramLoginWidgetCallback);
  }, []);

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
