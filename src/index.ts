import fetch from 'node-fetch';

interface Message {
    role: string;
    content: string;
}

interface ChatOptions {
    agent: string;
    messages: Message[];
    model?: string;
    email?: string;
    hyperparameters?: Record<string, any>;
    conversationId?: string;
    customDeployment?: string;
    responseFormat?: string;
}

export class SmartUp {
    private static serverUrl = process.env.SMARTUP_SERVER_URL || "";

    static chat = class {
        static async create(options: ChatOptions): Promise<string> {
            if (!SmartUp.serverUrl) {
                throw new Error("SMARTUP_SERVER_URL is not set.");
            }

            const data = {
                conversationId: options.conversationId || `smartup-sdk-${Math.random().toString(36).substring(7)}`,
                messages: options.messages,
                agentName: options.agent,
                email: options.email || "module@smartup.lat",
                model: options.model || "gpt-4",
                hyperparameters: options.hyperparameters || {},
                customDeployment: options.customDeployment || "",
                responseFormat: options.responseFormat,
            };

            const response = await fetch(`${SmartUp.serverUrl}/use-agent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const responseText = await response.text();
            return responseText.replace("[DONE]", "");
        }
    };
}
