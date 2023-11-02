"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_1 = require("botbuilder");
const path = __importStar(require("path"));
// See https://aka.ms/teams-ai-library to learn more about the Teams AI library.
const teams_ai_1 = require("@microsoft/teams-ai");
const config_1 = __importDefault(require("./config"));
// Create AI components
// Use OpenAI
// const planner = new OpenAIPlanner({
//   apiKey: config.openAIKey,
//   defaultModel: "gpt-3.5-turbo",
//   useSystemMessage: true,
//   logRequests: true,
// });
// Uncomment the following lines to use Azure OpenAI
/**
const planner = new AzureOpenAIPlanner({
  apiKey: config.azureOpenAIKey,
  endpoint: config.azureOpenAIEndpoint,
  defaultModel: "gpt-35-turbo",
  useSystemMessage: true,
  logRequests: true,
});
*/
const planner = new teams_ai_1.AzureOpenAIPlanner({
    apiKey: config_1.default.azureOpenAIKey,
    endpoint: config_1.default.azureOpenAIEndpoint,
    defaultModel: "gpt-35-turbo",
    useSystemMessage: true,
    logRequests: true,
});
const promptManager = new teams_ai_1.DefaultPromptManager(path.join(__dirname, "../src/prompts"));
// Define storage and application
const storage = new botbuilder_1.MemoryStorage();
const app = new teams_ai_1.Application({
    storage,
    ai: {
        planner,
        promptManager,
        prompt: "chat",
        history: {
            assistantHistoryType: "text",
        },
    },
});
app.conversationUpdate("membersAdded", async (context) => {
    await context.sendActivity("How can I help you today?");
});
exports.default = app;
//# sourceMappingURL=app.js.map