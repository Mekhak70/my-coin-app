import { useEffect } from 'react';

function App() {
  useEffect(() => {
    window.TelegramLoginWidgetCallback = (userData) => {
      console.log('✅ Telegram Login Data:', userData);
      // Կարող ես նաև պահպանել ստեյթում կամ localStorage-ում
    };
  }, []);

  return (
    <div>
      <h1>Բարի գալուստ!</h1>
      <div id="telegram-login-button"></div>
    </div>
  );
}

export default App;
