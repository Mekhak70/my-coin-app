import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(null);
  const [input, setInput] = useState(0);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      tg.ready();
      const userData = tg.initDataUnsafe?.user;
      if (userData) {
        setUser(userData);

        fetch('https://my-coin-backend.onrender.com/get-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: userData.id }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              setBalance(data.balance);
            } else {
              setBalance(0);
            }
          })
          .catch(err => console.error('❌ Fetch error:', err));
      }
    }
  }, []);

  const updateBalance = (action) => {
    if (!input || isNaN(input)) {
      alert('Խնդրում եմ, գրեք թիվ');
      return;
    }

    fetch('https://my-coin-backend.onrender.com/update-balance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, amount: Number(input), action }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          setBalance(data.balance);
          setInput(0);
        }
      })
      .catch(err => console.error('❌ Fetch error:', err));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Բարի գալուստ My Coin App 🚀</h1>
      {user ? (
        <>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Անուն:</strong> {user.first_name}</p>

          <p><strong>Բալանս:</strong> {balance} 🪙</p>

          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Գրեք թիվ"
            style={{ marginRight: '10px' }}
          />
          <button onClick={() => updateBalance('add')}>➕ Ավելացնել</button>
          <button onClick={() => updateBalance('remove')} style={{ marginLeft: '10px' }}>➖ Հանել</button>
        </>
      ) : (
        <p>Տվյալներ չկան։ Հնարավոր է, որ հավելվածը չես բացել Telegram-ի միջոցով։</p>
      )}
    </div>
  );
}

export default App;
