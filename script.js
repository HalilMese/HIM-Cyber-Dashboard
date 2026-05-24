// ===== THEME MANAGEMENT =====
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeModal = document.querySelector('.close-modal');

const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeButton(savedTheme);

function updateThemeButton(theme) {
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeButton(newTheme);
});

// ===== SETTINGS MODAL =====
settingsBtn.addEventListener('click', () => {
  settingsModal.classList.add('active');
});

closeModal.addEventListener('click', () => {
  settingsModal.classList.remove('active');
});

window.addEventListener('click', (e) => {
  if (e.target === settingsModal) {
    settingsModal.classList.remove('active');
  }
});

// ===== SYSTEM STATS =====
const cpuElement = document.getElementById('cpu');
const memoryElement = document.getElementById('memory');
const networkElement = document.getElementById('network');
const connectionsElement = document.getElementById('connections');
const threatLevelElement = document.getElementById('threatLevel');
const threatCountElement = document.getElementById('threatCount');
const connectionCountElement = document.getElementById('connectionCount');
const systemStatusElement = document.getElementById('systemStatus');

let refreshInterval = 3000;

function generateStats() {
  return {
    cpu: Math.floor(Math.random() * 80) + 10,
    memory: Math.floor(Math.random() * 75) + 15,
    network: Math.floor(Math.random() * 85) + 10,
    connections: Math.floor(Math.random() * 200) + 50,
    threats: Math.floor(Math.random() * 5)
  };
}

function updateDashboard() {
  const stats = generateStats();
  
  cpuElement.textContent = stats.cpu + '%';
  memoryElement.textContent = stats.memory + '%';
  networkElement.textContent = stats.network + '%';
  connectionsElement.textContent = stats.connections;
  threatCountElement.textContent = stats.threats;
  connectionCountElement.textContent = stats.connections;
  
  // Update progress bars
  document.getElementById('cpuProgress').style.width = stats.cpu + '%';
  document.getElementById('memProgress').style.width = stats.memory + '%';
  document.getElementById('networkProgress').style.width = stats.network + '%';
  document.getElementById('connProgress').style.width = (stats.connections / 200) * 100 + '%';
  
  // Update threat level
  let threatLevel = 'LOW';
  let threatColor = 'safe';
  if (stats.threats >= 3) {
    threatLevel = 'CRITICAL';
    threatColor = 'danger';
  } else if (stats.threats >= 2) {
    threatLevel = 'HIGH';
    threatColor = 'warning';
  } else if (stats.threats >= 1) {
    threatLevel = 'MEDIUM';
    threatColor = 'warning';
  }
  
  threatLevelElement.textContent = threatLevel;
  threatLevelElement.className = threatColor;
  
  // Update system status
  if (stats.threats > 2) {
    systemStatusElement.textContent = '🔴 SYSTEM ALERT';
  } else {
    systemStatusElement.textContent = '🟢 SYSTEM SECURE';
  }
  
  // Update threat indicator
  const filled = '█'.repeat(Math.min(stats.threats + 1, 10));
  const empty = '░'.repeat(Math.max(10 - stats.threats - 1, 0));
  document.getElementById('threatIndicator').textContent = filled + empty;
}

// Initial update
updateDashboard();
setInterval(updateDashboard, refreshInterval);

// ===== CHARTS =====
const chartColors = {
  primary: '#14ff72',
  secondary: '#14b8ff',
  danger: '#ff0055',
  warning: '#ffa500'
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      labels: {
        color: '#b6c2d9',
        font: { family: "'Courier New', monospace" }
      }
    }
  },
  scales: {
    y: {
      ticks: { color: '#b6c2d9' },
      grid: { color: 'rgba(20, 255, 114, 0.1)' }
    },
    x: {
      ticks: { color: '#b6c2d9' },
      grid: { color: 'rgba(20, 255, 114, 0.1)' }
    }
  }
};

// Performance Chart
const perfCtx = document.getElementById('performanceChart').getContext('2d');
const perfChart = new Chart(perfCtx, {
  type: 'line',
  data: {
    labels: Array.from({length: 12}, (_, i) => (i*2) + ':00'),
    datasets: [{
      label: 'CPU',
      data: Array.from({length: 12}, () => Math.floor(Math.random() * 80) + 10),
      borderColor: chartColors.primary,
      backgroundColor: 'rgba(20, 255, 114, 0.1)',
      tension: 0.4,
      fill: true
    }, {
      label: 'Memory',
      data: Array.from({length: 12}, () => Math.floor(Math.random() * 75) + 15),
      borderColor: chartColors.secondary,
      backgroundColor: 'rgba(20, 184, 255, 0.1)',
      tension: 0.4,
      fill: false
    }]
  },
  options: chartOptions
});

// Network Chart
const netCtx = document.getElementById('networkChart').getContext('2d');
const netChart = new Chart(netCtx, {
  type: 'bar',
  data: {
    labels: ['Upload', 'Download', 'P2P', 'DNS', 'HTTP', 'HTTPS'],
    datasets: [{
      label: 'Traffic (MB/s)',
      data: Array.from({length: 6}, () => Math.floor(Math.random() * 100) + 10),
      backgroundColor: [
        chartColors.primary,
        chartColors.secondary,
        chartColors.danger,
        chartColors.warning,
        chartColors.primary,
        chartColors.secondary
      ]
    }]
  },
  options: chartOptions
});

// Threats Chart
const threatsCtx = document.getElementById('threatsChart').getContext('2d');
const threatsChart = new Chart(threatsCtx, {
  type: 'doughnut',
  data: {
    labels: ['Blocked', 'Monitored', 'Pending', 'Resolved'],
    datasets: [{
      data: [45, 20, 10, 25],
      backgroundColor: [
        chartColors.primary,
        chartColors.warning,
        chartColors.danger,
        chartColors.secondary
      ],
      borderColor: '#09111d',
      borderWidth: 2
    }]
  },
  options: { ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'bottom' } } }
});

// Health Chart
const healthCtx = document.getElementById('healthChart').getContext('2d');
const healthChart = new Chart(healthCtx, {
  type: 'radar',
  data: {
    labels: ['Security', 'Performance', 'Uptime', 'Backup', 'Updates', 'Compliance'],
    datasets: [{
      label: 'Health Score',
      data: [95, 85, 99, 90, 88, 92],
      borderColor: chartColors.primary,
      backgroundColor: 'rgba(20, 255, 114, 0.1)',
      pointBackgroundColor: chartColors.primary,
      pointBorderColor: '#09111d'
    }]
  },
  options: { ...chartOptions, scales: { r: { ticks: { color: '#b6c2d9' }, grid: { color: 'rgba(20, 255, 114, 0.1)' } } } }
});

// ===== THREATS =====
const threatsData = [
  { title: 'Port Scan Detected', desc: 'Suspicious activity on port 22', severity: 'warning', time: '2 min ago' },
  { title: 'Failed Login Attempt', desc: 'Invalid credentials from 192.168.1.x', severity: 'info', time: '5 min ago' },
  { title: 'Malware Signature Match', desc: 'Quarantined potentially harmful file', severity: 'danger', time: '15 min ago' },
  { title: 'DDoS Mitigation', desc: 'Blocked 10,000 suspicious requests', severity: 'danger', time: '1 hour ago' },
  { title: 'SSL Certificate Valid', desc: 'All certificates verified and valid', severity: 'success', time: '3 hours ago' },
  { title: 'Firewall Rule Updated', desc: 'New security policy deployed', severity: 'info', time: 'Today' }
];

function renderThreats() {
  const grid = document.getElementById('threatsGrid');
  grid.innerHTML = threatsData.map(threat => `
    <div class="threat-card ${threat.severity}">
      <div class="threat-title">${threat.title}</div>
      <div class="threat-desc">${threat.desc}</div>
      <div class="threat-time">${threat.time}</div>
    </div>
  `).join('');
}

renderThreats();

// ===== TERMINAL =====
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');

const commands = {
  'status': 'SYSTEM STATUS: All systems operational',
  'scan': 'Running security scan... Complete! No threats detected',
  'network': '128 ACTIVE CONNECTIONS | Bandwidth: 62% | Uptime: 99.8%',
  'user': 'Current User: admin | Privileges: ROOT',
  'access': 'ACCESS GRANTED | Admin privileges verified',
  'backup': 'Backup Status: Completed 23:30 | Size: 2.4 TB',
  'update': 'Security Updates: All patches installed and verified',
  'firewall': 'Firewall Status: ACTIVE | Rules: 1,247 | Blocked IPs: 42',
  'help': 'Commands: status, scan, network, user, access, backup, update, firewall, clear'
};

terminalInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const cmd = terminalInput.value.trim().toLowerCase();
    
    const output = document.createElement('p');
    output.innerHTML = `<strong>> ${cmd}</strong>`;
    terminalOutput.appendChild(output);
    
    if (cmd === 'clear') {
      terminalOutput.innerHTML = '';
    } else if (commands[cmd]) {
      const result = document.createElement('span');
      result.textContent = commands[cmd];
      terminalOutput.appendChild(result);
    } else if (cmd) {
      const error = document.createElement('span');
      error.textContent = 'Command not recognized. Type "help" for available commands.';
      terminalOutput.appendChild(error);
    }
    
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    terminalInput.value = '';
  }
});

// ===== LOGS =====
const logsBox = document.getElementById('logsBox');
const logMessages = [
  { text: 'Security monitoring started', type: 'info' },
  { text: 'Firewall rules loaded successfully', type: 'success' },
  { text: 'Intrusion detection system active', type: 'success' },
  { text: 'Network traffic analysis enabled', type: 'info' },
  { text: 'Vulnerability scanner initialized', type: 'info' }
];

function addLog(text, type = 'info') {
  const entry = document.createElement('div');
  entry.className = `log-entry ${type}`;
  entry.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
  logsBox.insertBefore(entry, logsBox.firstChild);
  
  if (logsBox.children.length > 50) {
    logsBox.removeChild(logsBox.lastChild);
  }
}

// Add initial logs
logMessages.forEach(log => addLog(log.text, log.type));

// ===== CHAT =====
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const chatBox = document.getElementById('chatBox');

const aiResponses = [
  'System is operating at optimal levels.',
  'All security protocols are active and functioning.',
  'No threats detected in current scans.',
  'Network infrastructure is stable.',
  'Latest security patches have been applied.',
  'Would you like me to run a full system diagnostic?',
  'All firewalls are operational and blocking unauthorized access.',
  'Backup systems are synchronized and ready.'
];

function addChatMessage(text, isUser) {
  const msg = document.createElement('div');
  msg.className = `message ${isUser ? 'user' : 'ai'}`;
  msg.innerHTML = `
    <div class="message-icon">${isUser ? '👤' : '🤖'}</div>
    <div class="message-content">${text}</div>
  `;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const text = chatInput.value.trim();
  if (text) {
    addChatMessage(text, true);
    chatInput.value = '';
    
    setTimeout(() => {
      const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      addChatMessage(response, false);
      addLog(`User: ${text}`, 'info');
    }, 500);
  }
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

// ===== SETTINGS =====
const refreshIntervalInput = document.getElementById('refreshInterval');
refreshIntervalInput.addEventListener('change', (e) => {
  refreshInterval = parseInt(e.target.value) * 1000;
  clearInterval(updateDashboard);
  setInterval(updateDashboard, refreshInterval);
});

// ===== ANIMATIONS =====
window.addEventListener('scroll', () => {
  const cards = document.querySelectorAll('.dashboard-card, .chart-container, .threat-card');
  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }
  });
});

console.log('HIM Cyber Dashboard loaded successfully 🔥');
console.log('Commands available: status, scan, network, user, access, backup, update, firewall, help');
