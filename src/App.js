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
    script.setAttribute('data-auth-url', 'https://your-backend.com/auth/telegram'); // Այստեղ կլինի քո backend հասցեն (կփոխենք հետո)
    script.setAttribute('data-request-access', 'write');
    document.getElementById('telegram-login-button').appendChild(script);
  }, []);

  return (
    <div className="App">
      <h1>Բարի գալուստ My Coin App 🚀</h1>
      <div id="telegram-login-button"></div>
      <p>This is your React project integrated with Telegram!</p>
    </div>
  );
}

export default App;
