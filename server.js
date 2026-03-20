#!/usr/bin/env node
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get port from environment or default to 10000
const PORT = process.env.PORT || 10000;

// Create openclaw directory and config if they don't exist
const openclawDir = path.join(process.env.HOME || '/app', '.openclaw');
if (!fs.existsSync(openclawDir)) {
  fs.mkdirSync(openclawDir, { recursive: true });
}

// Basic openclaw configuration for cloud deployment
const config = {
  meta: {
    lastTouchedVersion: "2026.3.2",
    lastTouchedAt: new Date().toISOString()
  },
  wizard: {
    lastRunAt: new Date().toISOString(),
    lastRunVersion: "2026.3.2",
    lastRunCommand: "cloud-deploy",
    lastRunMode: "local"
  },
  auth: {
    profiles: {
      "openai-codex:default": {
        provider: "openai-codex",
        mode: "oauth"
      },
      "gemini:default": {
        provider: "gemini",
        mode: "api-key"
      }
    }
  },
  agents: {
    defaults: {
      model: {
        primary: "gemini/gemini-1.5-pro"
      },
      models: {
        "openai-codex/gpt-5.3-codex": {},
        "gemini/gemini-1.5-pro": {},
        "gemini/gemini-1.5-flash": {}
      }
    }
  },
  commands: {
    native: "auto",
    nativeSkills: "auto", 
    restart: true,
    ownerDisplay: "raw"
  },
  gateway: {
    mode: "local",
    bind: "lan",
    port: PORT,
    auth: {
      mode: "token",
      token: process.env.OPENCLAW_GATEWAY_TOKEN || "cloud-deployment-token-" + Math.random().toString(36).substr(2, 15)
    }
  }
};

// Write config file
const configPath = path.join(openclawDir, 'openclaw.json');
if (!fs.existsSync(configPath)) {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log('✓ Created OpenClaw configuration');
}

// Start OpenClaw gateway
console.log(`🦞 Starting OpenClaw Gateway on port ${PORT}`);
console.log(`🔗 Dashboard will be available at: http://0.0.0.0:${PORT}`);

const openclawProcess = spawn('npx', ['openclaw', 'gateway', 'run', '--bind', 'lan', '--port', PORT, '--allow-unconfigured'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    PORT: PORT
  }
});

// Handle process termination
process.on('SIGTERM', () => {
  console.log('🛑 Received SIGTERM, shutting down gracefully...');
  openclawProcess.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('🛑 Received SIGINT, shutting down gracefully...');
  openclawProcess.kill('SIGINT');
});

openclawProcess.on('close', (code) => {
  console.log(`OpenClaw process exited with code ${code}`);
  process.exit(code);
});

openclawProcess.on('error', (error) => {
  console.error('Error starting OpenClaw:', error);
  process.exit(1);
});