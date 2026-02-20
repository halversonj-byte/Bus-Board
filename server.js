const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Bus configuration - edit these numbers to match your routes
const BUS_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// Bus states: "arrived" (green, default) or "late" (red)
const busStates = {};

function resetAllBuses() {
  for (const num of BUS_NUMBERS) {
    busStates[num] = 'arrived';
  }
}

// Initialize all buses to "arrived"
resetAllBuses();

// Schedule daily reset at midnight (server local time)
function scheduleDailyReset() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const msUntilMidnight = tomorrow - now;

  setTimeout(() => {
    resetAllBuses();
    io.emit('state-sync', { buses: BUS_NUMBERS, states: busStates });
    // Schedule the next reset
    scheduleDailyReset();
  }, msUntilMidnight);
}

scheduleDailyReset();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Socket.IO real-time communication
io.on('connection', (socket) => {
  // Send current state to the newly connected client
  socket.emit('state-sync', { buses: BUS_NUMBERS, states: busStates });

  // Handle bus toggle from any client
  socket.on('bus-toggle', (busNumber) => {
    if (busStates[busNumber] === undefined) return;

    if (busStates[busNumber] === 'arrived') {
      busStates[busNumber] = 'late';
    } else {
      busStates[busNumber] = 'arrived';
    }

    // Broadcast updated state to ALL connected clients (including sender)
    io.emit('bus-update', { bus: busNumber, state: busStates[busNumber] });
  });

  // Handle reset all buses
  socket.on('reset-all', () => {
    resetAllBuses();
    io.emit('state-sync', { buses: BUS_NUMBERS, states: busStates });
  });
});

server.listen(PORT, () => {
  console.log(`Bus Board running at http://localhost:${PORT}`);
});
