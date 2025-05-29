import { useEffect } from "react";

function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://telegram.org/js/telegram-widget.js?7";
    script.setAttribute("data-telegram-login", "mycoinapp_bot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-userpic", "false");
    script.setAttribute("data-auth-url", "https://my-coin-backend.onrender.com/auth/telegram");
    script.setAttribute("data-request-access", "write");

    const container = document.getElementById("telegram-login-button");
    if (container) {
      container.appendChild(script);
    }

    return () => {
      if (container) container.removeChild(script);
    };
  }, []);

  // Fake տվյալներ ուղարկելու ֆունկցիա
  const testSendFakeData = () => {
    fetch("https://my-coin-backend.onrender.com/auth/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: "555555555",
        username: "testuser",
        first_name: "Test",
        last_name: "User",
        hash: "justtesting"
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log("✅ Server response:", data))
      .catch((err) => console.error("❌ Error:", err));
  };

  return (
    <div className="App">
      <h1>Բարի գալուստ My Coin App 🚀</h1>
      <div id="telegram-login-button" style={{ marginBottom: "20px" }}></div>
      <button onClick={testSendFakeData} style={{ padding: "10px 20px" }}>
        Ուղարկել Fake Տվյալներ
      </button>
    </div>
  );
}

export default App;
