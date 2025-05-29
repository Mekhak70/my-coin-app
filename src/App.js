import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://telegram.org/js/telegram-widget.js?7';
    script.setAttribute('data-telegram-login', 'mycoinapp_bot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-userpic', 'false');
    script.setAttribute('data-auth-url', 'https://my-coin-backend.onrender.com/auth/telegram');
    script.setAttribute('data-request-access', 'write');

    const container = document.getElementById('telegram-login-button');
    if (container) {
      container.appendChild(script);
    }

    return () => {
      if (container) container.removeChild(script);
    };
  }, []);

  return (
    <div className="App">
      <h1>Բարի գալուստ My Coin App 🚀</h1>
      <div id="telegram-login-button"></div>
    </div>
  );
}

export default App;

