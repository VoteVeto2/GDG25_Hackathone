import { useState, useEffect } from 'react';

function App() {
  const [counter, setCounter] = useState(0);
  const [totalInteractions, setTotalInteractions] = useState(0);
  const [interactions, setInteractions] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Fetch counter value on mount
  useEffect(() => {
    fetchCounter();
  }, []);

  const fetchCounter = async () => {
    try {
      const response = await fetch('/api/counter');
      const data = await response.json();
      setCounter(data.counter);
      setTotalInteractions(data.totalInteractions);
    } catch (error) {
      console.error('Error fetching counter:', error);
    }
  };

  const fetchInteractions = async () => {
    try {
      const response = await fetch('/api/interactions');
      const data = await response.json();
      setInteractions(data.interactions);
    } catch (error) {
      console.error('Error fetching interactions:', error);
    }
  };

  const handleIncrement = async () => {
    try {
      const response = await fetch('/api/counter/increment', {
        method: 'POST'
      });
      const data = await response.json();
      setCounter(data.counter);
      setTotalInteractions(prev => prev + 1);
      if (showHistory) fetchInteractions();
    } catch (error) {
      console.error('Error incrementing counter:', error);
    }
  };

  const handleDecrement = async () => {
    try {
      const response = await fetch('/api/counter/decrement', {
        method: 'POST'
      });
      const data = await response.json();
      setCounter(data.counter);
      setTotalInteractions(prev => prev + 1);
      if (showHistory) fetchInteractions();
    } catch (error) {
      console.error('Error decrementing counter:', error);
    }
  };

  const handleReset = async () => {
    try {
      const response = await fetch('/api/counter/reset', {
        method: 'POST'
      });
      const data = await response.json();
      setCounter(data.counter);
      setTotalInteractions(prev => prev + 1);
      if (showHistory) fetchInteractions();
    } catch (error) {
      console.error('Error resetting counter:', error);
    }
  };

  const handleToggleHistory = () => {
    if (!showHistory) {
      fetchInteractions();
    }
    setShowHistory(!showHistory);
  };

  const handleClearHistory = async () => {
    try {
      await fetch('/api/interactions', {
        method: 'DELETE'
      });
      setInteractions([]);
      setTotalInteractions(0);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Counter App</h1>

        <div className="counter-display">
          <div className="counter-value">{counter}</div>
          <div className="counter-label">Current Value</div>
        </div>

        <div className="button-group">
          <button onClick={handleDecrement} className="btn btn-decrement">
            - Decrement
          </button>
          <button onClick={handleReset} className="btn btn-reset">
            Reset
          </button>
          <button onClick={handleIncrement} className="btn btn-increment">
            + Increment
          </button>
        </div>

        <div className="stats">
          <p>Total Interactions: {totalInteractions}</p>
        </div>

        <div className="history-section">
          <button onClick={handleToggleHistory} className="btn btn-secondary">
            {showHistory ? 'Hide History' : 'Show History'}
          </button>

          {showHistory && (
            <div className="history">
              <div className="history-header">
                <h3>Interaction History</h3>
                {interactions.length > 0 && (
                  <button onClick={handleClearHistory} className="btn btn-small">
                    Clear History
                  </button>
                )}
              </div>

              {interactions.length === 0 ? (
                <p className="no-history">No interactions yet</p>
              ) : (
                <ul className="history-list">
                  {[...interactions].reverse().map(interaction => (
                    <li key={interaction.id} className={`history-item ${interaction.action}`}>
                      <span className="action">{interaction.action}</span>
                      <span className="value">Value: {interaction.value}</span>
                      <span className="timestamp">
                        {new Date(interaction.timestamp).toLocaleTimeString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
