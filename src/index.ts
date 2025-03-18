import fetch from 'node-fetch';

export interface Message {
    role: string;
    content: string;
}

export interface ChatOptions {
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

    /**
     * Set the SmartUp server URL manually
     * @param url The SmartUp server URL
     */
    public static setServerUrl(url: string): void {
        SmartUp.serverUrl = url;
    }

    /**
     * Get the current SmartUp server URL
     * @returns The current server URL
     */
    public static getServerUrl(): string {
        return SmartUp.serverUrl;
    }

    static chat = class {
        /**
         * Create a new chat with the SmartUp API
         * @param options Chat configuration options
         * @returns The response from the SmartUp API
         */
        static async create(options: ChatOptions): Promise<string> {
            if (!SmartUp.serverUrl) {
                throw new Error("SMARTUP_SERVER_URL is not set. Use SmartUp.setServerUrl() or set the SMARTUP_SERVER_URL environment variable.");
            }

            const data = {
                conversationId: options.conversationId || `smartup-sdk-${Math.random().toString(36).substring(7)}`,
                messages: options.messages,
                agentName: options.agent,
                email: options.email || "module@smartup.lat",
                model: options.model || "gpt-4o-mini",
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

            if (!response.ok) {
                throw new Error(`SmartUp API error: ${response.status} ${response.statusText}`);
            }

            const responseText = await response.text();
            return responseText.replace("[DONE]", "");
        }
    };
}
