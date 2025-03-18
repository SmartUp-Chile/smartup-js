# SmartUp JavaScript Library

The **SmartUp JavaScript Library** is a JavaScript/TypeScript interface to the SmartUp API, providing methods for interacting with the SmartUp platform.

SmartUp uses LLMs and ML models for communication, language understanding, and data analysis to accelerate business processes.

## Installation

```bash
npm install smartup
```

## Usage

```javascript
import { SmartUp } from 'smartup';

// Set the SmartUp server URL (if not using environment variable)
SmartUp.setServerUrl('https://your-smartup-server.com');

// Create a chat with an agent
async function chatWithAgent() {
  try {
    const response = await SmartUp.chat.create({
      agent: 'your-agent-name',
      messages: [
        { role: 'user', content: 'Hello, how can you help me today?' }
      ],
      model: 'gpt-4', // optional, defaults to gpt-4
      email: 'user@example.com' // optional
    });
    
    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
}

chatWithAgent();
```

## API Reference

### SmartUp.setServerUrl(url)

Sets the SmartUp server URL manually.

```javascript
SmartUp.setServerUrl('https://your-smartup-server.com');
```

Alternatively, you can set the `SMARTUP_SERVER_URL` environment variable.

### SmartUp.chat.create(options)

Creates a new chat with a SmartUp agent.

#### Options

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| agent | string | Yes | - | The name of the agent to chat with |
| messages | Array | Yes | - | Array of message objects with role and content |
| model | string | No | 'gpt-4' | The model to use for the chat |
| email | string | No | 'module@smartup.lat' | User email for identification |
| hyperparameters | Object | No | {} | Additional parameters for the model |
| conversationId | string | No | Random ID | ID to track the conversation |
| customDeployment | string | No | '' | Custom deployment identifier |
| responseFormat | string | No | undefined | Format for the response |

#### Example

```javascript
const response = await SmartUp.chat.create({
  agent: 'customer-support',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'I need help with my order.' }
  ],
  model: 'gpt-4-turbo',
  email: 'customer@example.com'
});
```

## License

ISC
