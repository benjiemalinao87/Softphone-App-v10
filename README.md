# CHAU - Call Handling and Analytics UI

A modern web application for managing and monitoring call center operations, built with React and Material-UI.

## Project Structure

```
chau/
├── backend/           # Express.js server
│   ├── server.js     # Main server file
│   └── .env          # Backend environment variables
│
├── frontend/         # React frontend
│   ├── src/         # Source files
│   ├── public/      # Static files
│   └── vite.config.ts # Vite configuration
│
└── package.json     # Root package.json for managing workspaces
```

## Features

- 📞 Softphone Integration with Twilio
  - Multi-step configuration wizard
  - Support for multiple phone numbers
  - Real-time call handling
  - Inbound and outbound call management

- 💬 Livechat Integration
  - Embedded Qonvo.ai interface
  - Seamless chat experience
  - Real-time messaging

- 🎯 Navigation & Layout
  - Intuitive grid menu system
  - Quick access to main features
  - Responsive sidebar navigation
  - Modern Material UI components

- 📊 Call Analytics Dashboard
  - Real-time metrics
  - Historical call data
  - Performance insights

## Getting Started

### Prerequisites

- Node.js >= 20.x
- Yarn >= 1.22.x

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/CHAU.git
cd CHAU
```

2. Install dependencies
```bash
yarn install
```

3. Set up environment variables
```bash
cp backend/.env.example backend/.env
```
Edit `backend/.env` with your configuration:
- Twilio credentials
- API endpoints
- Other environment-specific settings

4. Start development servers
```bash
# Start both frontend and backend in development mode
yarn dev

# Or start them separately:
yarn workspace chau-frontend dev
yarn workspace chau-backend dev
```

## Deployment

### Railway Deployment

1. Create a new project on Railway
2. Connect your GitHub repository
3. Add the following environment variables in Railway:
   - `NODE_ENV=production`
   - `PORT=8000`
   - All Twilio-related environment variables

4. Configure the build settings:
   - Build Command: `yarn build`
   - Start Command: `yarn start`

### Production Build

```bash
# Build both frontend and backend
yarn build

# Start production server
yarn start
```

## Documentation

For detailed documentation, please refer to:
- [User Guide](./docs/user-guide.md)
- [API Documentation](./docs/api.md)
- [Development Guide](./docs/development.md)

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
