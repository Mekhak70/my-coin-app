import './App.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://telegram.org/js/telegram-widget.js?7';
    script.setAttribute('data-telegram-login', 'mycoinapp_bot'); // քո Bot-ի անունը, առանց @ նշանի
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-userpic', 'false');
    script.setAttribute('data-radius', '10');

    // Փոխիր քո իրական Vercel domain-ը այստեղ:
    script.setAttribute('data-auth-url', 'https://my-coin-app.vercel.app/auth/telegram');

    script.setAttribute('data-request-access', 'write');
    document.getElementById('telegram-login-button').appendChild(script);
  }, []);

  const handleTelegramLogin = (userData) => {
    // Քո backend-ի իրական հասցե (եթե backend-ը Vercel-ում է)
    fetch('https://my-coin-app.vercel.app/auth/telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
      .then(res => res.json())
      .then(data => {
        console.log('Server Response:', data);
        alert(data.message || 'Login success!');
      })
      .catch(err => console.error(err));
  };

  // Telegram login widget callback
  window.TelegramLoginWidgetCallback = (user) => {
    handleTelegramLogin(user);
  };

  return (
    <div className="App">
      <h1>Բարի գալուստ My Coin App 🚀</h1>
      <div id="telegram-login-button"></div>
      <p>This is your React project integrated with Telegram!</p>
    </div>
  );
}

export default App;
