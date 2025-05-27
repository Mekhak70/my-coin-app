import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  const handleTelegramLogin = async (userData) => {
    console.log('➡️ Sending userData to backend:', userData);

    try {
      const response = await fetch('https://my-coin-backend.onrender.com/auth/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log('✅ Server Response:', data);

      if (data.success) {
        setUser(data.user);  // Պահպանում ենք user-ը, ինչ գալիս է backend-ից
      } else {
        console.error('❌ Authentication failed');
        localStorage.removeItem('telegramUser');
        setUser(null);
      }
    } catch (error) {
      console.error('❌ Fetch error:', error);
    }
  };

  useEffect(() => {
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
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://telegram.org/js/telegram-widget.js?7';
      script.setAttribute('data-telegram-login', 'mycoinapp_bot');  // Օգտագործիր քո ճիշտ բոտի անունը
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-userpic', 'false');
      script.setAttribute('data-radius', '10');
      script.setAttribute('data-auth-url', 'https://my-coin-backend.onrender.com/auth/telegram');
      script.setAttribute('data-request-access', 'write');
      document.getElementById('telegram-login-button').appendChild(script);
    }

    console.log('📌 window.TelegramLoginWidgetCallback set');
  }, []);

  return (
    <div className="App">
      <h1>🚀 Բարի գալուստ My Coin App 🚀</h1>
      {user ? (
        <div>
          <p>👤 {user.first_name || user.username || 'Անանուն'}</p>
          <p>ID: {user.id}</p>
        </div>
      ) : (
        <div id="telegram-login-button"></div>
      )}
    </div>
  );
}

export default App;
