import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Global variables as database
let counter = 0;
let interactions = [];

// Middleware
app.use(cors());
app.use(express.json());

// Get counter value
app.get('/api/counter', (req, res) => {
  res.json({ counter, totalInteractions: interactions.length });
});

// Increment counter
app.post('/api/counter/increment', (req, res) => {
  counter++;
  interactions.push({
    id: interactions.length + 1,
    action: 'increment',
    value: counter,
    timestamp: new Date().toISOString()
  });
  res.json({ counter, message: 'Counter incremented' });
});

// Decrement counter
app.post('/api/counter/decrement', (req, res) => {
  counter--;
  interactions.push({
    id: interactions.length + 1,
    action: 'decrement',
    value: counter,
    timestamp: new Date().toISOString()
  });
  res.json({ counter, message: 'Counter decremented' });
});

// Reset counter
app.post('/api/counter/reset', (req, res) => {
  counter = 0;
  interactions.push({
    id: interactions.length + 1,
    action: 'reset',
    value: counter,
    timestamp: new Date().toISOString()
  });
  res.json({ counter, message: 'Counter reset' });
});

// Get all interactions
app.get('/api/interactions', (req, res) => {
  res.json({ interactions });
});

// Clear interactions history
app.delete('/api/interactions', (req, res) => {
  interactions = [];
  res.json({ message: 'Interactions cleared' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
