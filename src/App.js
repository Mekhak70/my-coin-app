import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://telegram.org/js/telegram-widget.js?7";
    script.setAttribute("data-telegram-login", "mycoinapp_bot"); // Քո բոտի անունը, առանց @ նշանի
    script.setAttribute("data-size", "large");
    script.setAttribute("data-userpic", "false");
    script.setAttribute("data-auth-url", "https://my-coin-backend.onrender.com/auth/telegram"); // Քո backend-ի հասցեն HTTPS-ով
    script.setAttribute("data-request-access", "write");

    const container = document.getElementById("telegram-login-button");
    if (container) {
      container.appendChild(script);
    } else {
      console.error("❌ Telegram Login container not found!");
    }

    return () => {
      if (container) container.removeChild(script);
    };
  }, []);

  return (
    <div className="App" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Բարի գալուստ My Coin App 🚀</h1>
      <div id="telegram-login-button" style={{ marginBottom: "20px" }}></div>
    </div>
  );
}

export default App;
