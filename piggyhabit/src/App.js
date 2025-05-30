import React, { useState } from 'react';
import './App.css';

// Piggy bank SVG (inline, large and friendly)
const PiggyBankIcon = () => (
  <svg
    width="90"
    height="90"
    viewBox="0 0 90 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Piggy Bank"
    style={{ display: 'block', margin: '0 auto 0.5rem' }}
  >
    <ellipse cx="45" cy="60" rx="33" ry="18" fill="#E87A41" />
    <ellipse cx="45" cy="38" rx="32" ry="23" fill="#FFB300" stroke="#E87A41" strokeWidth="3"/>
    <ellipse cx="36" cy="41.5" rx="4" ry="2.2" fill="#E65100" opacity="0.14"/>
    <rect x="63" y="26" width="10" height="6" rx="3" fill="#FFB300" stroke="#E87A41" strokeWidth="2" />
    <circle cx="30" cy="32" r="3" fill="#fff" />
    <circle cx="30" cy="32" r="1" fill="#E65100" />
    <ellipse cx="58" cy="49" rx="3" ry="1.5" fill="#E65100" opacity="0.3" />
    <ellipse cx="45" cy="33" rx="10" ry="3" fill="#1A1A1A" opacity="0.13"/>
  </svg>
);

// Progress Bar component
function ProgressBar({ value, max }) {
  const percent = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div style={{
      background: 'rgba(255,255,255,0.09)',
      borderRadius: 6,
      height: 18,
      marginTop: 10,
      marginBottom: 20,
      overflow: 'hidden',
      border: '1px solid var(--border-color)'
    }}>
      <div
        style={{
          width: `${percent}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #E87A41 75%, #FFB300 100%)',
          transition: 'width 0.5s cubic-bezier(.6,.3,.3,1)',
        }}
      />
    </div>
  );
}

// Modal for setting the savings goal
function GoalModal({ isOpen, onClose, goal, setGoal }) {
  const [value, setValue] = useState(goal !== null ? goal : '');

  // PUBLIC_INTERFACE
  function handleSubmit(e) {
    e.preventDefault();
    const number = Number(value);
    if (isNaN(number) || number <= 0) return;
    setGoal(number);
    onClose();
  }

  if (!isOpen) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.58)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'var(--kavia-dark)', color: 'var(--text-color)',
          borderRadius: 12, padding: 28, minWidth: 320, boxShadow: '0 6px 24px 0 rgba(0,0,0,0.25)', position: 'relative'
        }}
        aria-label="Set Savings Goal"
      >
        <h2 style={{ marginTop: 0, marginBottom: 12 }}>Set Your Savings Goal</h2>
        <div style={{ marginBottom: 18 }}>
          <label htmlFor="goal-amount" style={{ fontWeight: 500 }}>Goal Amount:</label>
          <input
            id="goal-amount"
            type="number"
            className="modal-input"
            value={value}
            autoFocus
            min={1}
            step={1}
            onChange={e => setValue(e.target.value)}
            style={{
              width: '100%', padding: 8, fontSize: '1rem',
              borderRadius: 5, border: '1.5px solid var(--border-color)',
              marginTop: 8, marginBottom: 8, outline: 'none', backgroundColor: '#222', color: '#fff'
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button type="button" className="btn" style={{ background: '#333' }} onClick={onClose}>Cancel</button>
          <button type="submit" className="btn" style={{ background: 'var(--kavia-orange)' }}>Set Goal</button>
        </div>
      </form>
    </div>
  );
}

// Savings History List
function SavingsHistory({ history }) {
  if (!history.length) {
    return (
      <div style={{ color: 'var(--text-secondary)', textAlign: 'center', margin: '24px 0' }}>
        No savings activity yet. Start adding or removing savings!
      </div>
    );
  }

  return (
    <ul style={{
      listStyle: 'none', margin: 0, padding: 0,
      maxHeight: 220, overflow: 'auto'
    }}>
      {history.map(entry => (
        <li
          key={entry.id}
          style={{
            marginBottom: 13,
            padding: '7px 11px',
            borderRadius: 6,
            background: 'rgba(255, 255, 255, 0.04)',
            borderLeft: `4px solid ${entry.type === 'add' ? 'var(--kavia-orange)' : '#E65100'}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}
          aria-label={`${entry.type === 'add' ? 'Deposit' : 'Withdrawal'} entry`}
        >
          <span style={{ fontWeight: 500, color: entry.type === 'add' ? 'var(--kavia-orange)' : '#E65100' }}>
            {entry.type === 'add' ? '+ ' : '- '}
            {Number(entry.amount).toFixed(2)}
          </span>
          <span style={{ fontSize: '0.97em', color: 'var(--text-secondary)' }}>
            {new Date(entry.date).toLocaleString()}
          </span>
        </li>
      ))}
    </ul>
  );
}

function App() {
  // --- MOTIVATIONAL QUOTES ---
  // Array of habit/savings-related quotes
  const QUOTES = [
    "Small habits make big changes. Keep it up!",
    "Every coin counts on your way to your goal.",
    "Consistency is the key to growing your savings.",
    "Success starts with a single step (or coin)!",
    "Good habits today lead to achievements tomorrow.",
    "Your future self will thank you for saving today.",
    "Big dreams start small. Save a little each day!",
    "Progress, not perfection—add something to your piggy!"
  ];
  // Pick a random quote on mount/reload
  const [quote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)]);

  // --- STATE ---
  // PUBLIC_INTERFACE
  const [balance, setBalance] = useState(0);
  // PUBLIC_INTERFACE
  const [goal, setGoal] = useState(null);
  // PUBLIC_INTERFACE
  const [history, setHistory] = useState([]);
  const [addAmount, setAddAmount] = useState('');
  const [removeAmount, setRemoveAmount] = useState('');
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // --- EVENT HANDLERS ---

  // PUBLIC_INTERFACE
  function handleAdd() {
    const amount = parseFloat(addAmount);
    if (isNaN(amount) || amount <= 0) {
      setErrorMsg('Enter a valid amount to add.');
      return;
    }
    setBalance(prev => prev + amount);
    setAddAmount('');
    setErrorMsg('');
    setHistory(prev => [
      { id: Date.now(), type: 'add', amount, date: new Date().toISOString() },
      ...prev,
    ]);
  }

  // PUBLIC_INTERFACE
  function handleRemove() {
    const amount = parseFloat(removeAmount);
    if (isNaN(amount) || amount <= 0) {
      setErrorMsg('Enter a valid amount to remove.');
      return;
    }
    if (amount > balance) {
      setErrorMsg('Cannot remove more than current balance.');
      return;
    }
    setBalance(prev => prev - amount);
    setRemoveAmount('');
    setErrorMsg('');
    setHistory(prev => [
      { id: Date.now(), type: 'remove', amount, date: new Date().toISOString() },
      ...prev,
    ]);
  }

  // --- MAIN RENDER ---
  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar" style={{ background: 'var(--kavia-dark)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo" style={{ color: 'var(--kavia-orange)' }}>
              <span className="logo-symbol" role="img" aria-label="Piggy">
                🐷
              </span>
              <span>PiggyHabit</span>
            </div>
            <button
              className="btn"
              style={{ background: 'var(--kavia-orange)', color: '#fff' }}
              onClick={() => setShowGoalModal(true)}
            >
              Set Goal
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <main>
        <div className="container">
          <div
            style={{
              paddingTop: 110,
              maxWidth: 430,
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            {/* Piggy Bank and Balance */}
            <PiggyBankIcon />

            <div
              style={{
                fontSize: '2.3rem',
                fontWeight: 700,
                margin: '0.45rem 0 0.3rem 0',
                color: 'var(--kavia-orange)'
              }}
              aria-label="Current Savings Balance"
            >
              ${balance.toFixed(2)}
            </div>

            <div style={{
              margin: '0 0 12px 0',
              color: 'var(--text-secondary)',
              fontWeight: 400,
              fontSize: '1.1rem'
            }}>
              {goal
                ? `Saved toward $${Number(goal).toFixed(2)} goal`
                : `No goal set`}
            </div>

            {/* Savings Progress Bar */}
            <ProgressBar value={balance} max={goal || 0} />

            {/* Add / Remove Controls */}
            <div style={{
              display: 'flex',
              gap: 16,
              width: '100%',
              justifyContent: 'center',
              marginBottom: 10
            }}>
              {/* Add */}
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center'
              }}>
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="Add $"
                  min="0.01"
                  step="0.01"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  className="modal-input"
                  style={{
                    width: 92, padding: 6, borderRadius: 4,
                    border: '1px solid var(--border-color)',
                    marginBottom: 4,
                    background: '#232323', color: '#fff', fontWeight: 500
                  }}
                />
                <button
                  className="btn"
                  style={{ background: 'var(--kavia-orange)', width: '100%' }}
                  onClick={handleAdd}
                  type="button"
                >Add</button>
              </div>

              {/* Remove */}
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center'
              }}>
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="Remove $"
                  min="0.01"
                  step="0.01"
                  value={removeAmount}
                  onChange={(e) => setRemoveAmount(e.target.value)}
                  className="modal-input"
                  style={{
                    width: 92, padding: 6, borderRadius: 4,
                    border: '1px solid var(--border-color)',
                    marginBottom: 4,
                    background: '#232323', color: '#fff', fontWeight: 500
                  }}
                />
                <button
                  className="btn"
                  style={{
                    background: '#E65100', width: '100%'
                  }}
                  onClick={handleRemove}
                  type="button"
                >Remove</button>
              </div>
            </div>

            {/* Error Message */}
            {errorMsg &&
              <div style={{
                color: '#E65100', margin: '6px 0 8px 0', fontWeight: 500,
                background: 'rgba(230,81,0,0.09)', borderRadius: 4, padding: '5px 11px'
              }}>
                {errorMsg}
              </div>
            }

            {/* History Section */}
            <div style={{
              width: '100%',
              marginTop: 28,
              marginBottom: 18,
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 10,
              boxShadow: '0 2px 8px 0 rgba(0,0,0,0.07)',
              padding: '18px 14px 10px 14px'
            }}>
              <div style={{
                fontWeight: 600,
                color: 'var(--kavia-orange)',
                fontSize: '1.15rem',
                marginBottom: 11
              }}>
                Savings History
              </div>
              <SavingsHistory history={history} />
            </div>
          </div>
        </div>
      </main>

      {/* Goal Modal */}
      <GoalModal
        isOpen={showGoalModal}
        onClose={() => setShowGoalModal(false)}
        goal={goal}
        setGoal={setGoal}
      />
    </div>
  );
}

export default App;
