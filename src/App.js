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

  // ✅ Կեղծ տվյալներով request sender
  const testFakeData = () => {
    fetch("https://my-coin-backend.onrender.com/auth/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: "123456789",
        username: "faker",
        first_name: "Fake",
        last_name: "User",
        hash: "bad_hash_value"
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Server response:", data);
        alert(`Response: ${JSON.stringify(data)}`);
      })
      .catch((err) => console.error("❌ Error:", err));
  };

  return (
    <div className="App">
      <h1>My Coin App 🔐</h1>
      <div id="telegram-login-button" style={{ marginBottom: '20px' }}></div>
      <button onClick={testFakeData}>🚨 Ուղարկել կեղծ տվյալ</button>
    </div>
  );
}

export default App;


