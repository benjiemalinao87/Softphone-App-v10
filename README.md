# CHAU - Call Handling and Analytics UI

A modern web application for managing and monitoring call center operations, built with React and Material-UI.

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

- 🎨 Modern UI/UX
  - Material Design
  - Responsive layout
  - Dark/light mode support

## Getting Started

### Prerequisites

- Node.js >= 16.x
- npm >= 8.x

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/CHAU.git
cd CHAU
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` with your configuration:
- Twilio credentials
- API endpoints
- Other environment-specific settings

4. Start the development server
```bash
npm run dev
```

## Navigation

The application features a streamlined navigation system:

1. Main Menu
   - Quick access to the main dashboard
   - Overview of key metrics and features

2. Agent Tools
   - Access to agent-specific functionalities
   - Performance monitoring tools

3. Configure Softphone
   - Multi-step setup wizard
   - Phone system configuration

4. Livechat
   - Integrated Qonvo.ai chat interface
   - Real-time customer communication

## Configuration

The application requires initial setup through the configuration wizard:

1. Configure inbound/outbound call settings
2. Enter Twilio credentials
3. Select phone numbers
4. Set up Ngrok URL for webhooks
5. Review and confirm settings

## Documentation

For detailed documentation, please refer to:
- [User Guide](./docs/user-guide.md)
- [API Documentation](./docs/api.md)
- [Development Guide](./docs/development.md)

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
