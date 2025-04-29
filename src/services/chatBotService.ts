import api from '@/config/axios';

class ChatBotService {
    async sendMessageToBot(prompt?: string) {
        const response = await api.post(`/chatbot/generate`, null, {
            params: { prompt },
        });
        console.log('response', response);
        return response.data.data.candidates[0].content.parts[0].text;
    }
}

export const chatBotService = new ChatBotService();
