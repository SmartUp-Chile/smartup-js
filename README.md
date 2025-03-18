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
      model: 'gpt-4o-mini', // optional, defaults to gpt-4o-mini
      email: 'user@example.com' // optional
    });
    
    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
}

chatWithAgent();
```

## Using with Next.js API Routes

Here's an example of how to use SmartUp in a Next.js API route:

```typescript
// pages/api/smartup.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { SmartUp } from "smartup";

type Data = {
  response?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Set your SmartUp server URL
    SmartUp.setServerUrl(process.env.SMARTUP_SERVER_URL || 'https://your-smartup-server.com');
    
    // Get data from request body
    const { message, agent } = req.body;
    
    // Call SmartUp API
    const response = await SmartUp.chat.create({
      agent: agent || 'default-agent',
      messages: [
        { role: 'user', content: message || 'Hello' }
      ],
      // Optional parameters
      email: req.body.email || 'user@example.com'
    });
    
    return res.status(200).json({ response });
  } catch (error) {
    console.error('SmartUp API error:', error);
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
```

You can test this API route by sending a POST request to `/api/smartup` with a request body like:

```json
{
  "message": "Hello, how can you help me?",
  "agent": "your-agent-name",
  "email": "user@example.com"
}
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
| model | string | No | 'gpt-4o-mini' | The model to use for the chat |
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
  model: 'gpt-4o-mini',
  email: 'customer@example.com'
});
```

## Testing

To test the functionality of your SmartUp integration, you can create a simple script:

```typescript
// test.js
import { SmartUp } from 'smartup';

// Set your environment variables
process.env.SMARTUP_SERVER_URL = 'https://your-smartup-server.com';

async function testSmartUp() {
  try {
    const response = await SmartUp.chat.create({
      agent: 'test-agent',
      messages: [
        { role: 'user', content: 'Hello, this is a test message.' }
      ]
    });
    
    console.log('Response:', response);
    console.log('Test passed!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testSmartUp();
```

Run the test with:
```bash
node test.js
```

## License

ISC
