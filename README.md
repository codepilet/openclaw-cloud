# OpenClaw Cloud Deployment

This project deploys OpenClaw to the cloud with automatic configuration and setup.

## Features

- 🦞 Full OpenClaw AI Agent in the cloud
- 🔒 Secure token-based authentication
- 🌐 Web dashboard accessible via browser
- 📱 Mobile-friendly interface
- ⚡ Fast deployment on Render, Vercel, or other platforms

## Quick Deploy to Render

1. Push this repository to GitHub/GitLab/Bitbucket
2. Click this link to deploy: 
   ```
   https://dashboard.render.com/blueprint/new?repo=https://github.com/codepilet/openclaw-cloud
   ```
3. Set your `OPENAI_API_KEY` in the Render dashboard
4. Your OpenClaw instance will be live!

## Deploy to Other Platforms

### Vercel
```bash
vercel deploy
```

### Railway
```bash
railway login
railway deploy
```

### Heroku
```bash
heroku create your-openclaw-app
git push heroku main
heroku config:set OPENAI_API_KEY=your_key_here
```

## Local Development

```bash
npm install
npm start
```

Visit http://localhost:10000 to access the dashboard.

## Configuration

Set these environment variables:

- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `OPENCLAW_GATEWAY_TOKEN` - Custom gateway token (optional, auto-generated)
- `PORT` - Server port (default: 10000)

## Accessing Your Deployed Instance

Once deployed, you'll get a URL like `https://your-app.onrender.com`

The OpenClaw dashboard will be available at the root URL with token-based authentication.

## Skills and Features

Your cloud instance includes:

- 📦 GitHub integration
- 🧵 Terminal multiplexer (tmux)
- 🎞️ Video processing (FFmpeg)
- 📜 Session logging
- 🌤️ Weather information
- 🧠 Memory management
- 🤖 Smart model routing

## Support

- Documentation: [docs.openclaw.ai](https://docs.openclaw.ai)
- Issues: Create issues in this repository
- Community: Join the OpenClaw community

## Security

- All communication is encrypted
- Token-based authentication
- No sensitive data stored locally
- Environment variables for secrets