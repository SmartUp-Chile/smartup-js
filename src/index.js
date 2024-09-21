"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartUp = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
class SmartUp {
}
exports.SmartUp = SmartUp;
SmartUp.serverUrl = process.env.SMARTUP_SERVER_URL || "";
SmartUp.chat = class {
    static create(options) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const response = yield (0, node_fetch_1.default)(`${SmartUp.serverUrl}/use-agent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const responseText = yield response.text();
            return responseText.replace("[DONE]", "");
        });
    }
};
