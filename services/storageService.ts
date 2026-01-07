import { BusinessConfig, LeadMessage, UserProfile } from '../types';

const STORAGE_KEYS = {
  USER: 'leadflow_user',
  CONFIG: 'leadflow_config',
  MESSAGES: 'leadflow_messages'
};

export const storageService = {
  getUser: (): UserProfile | null => {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  },
  setUser: (user: UserProfile) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
  getConfig: (): BusinessConfig => {
    const data = localStorage.getItem(STORAGE_KEYS.CONFIG);
    return data ? JSON.parse(data) : {
      autoReplyEnabled: true,
      replyMessage: "Hi there! Thanks for reaching out. We'd love to help. You can book a time with us here: {{link}}",
      bookingLink: "https://calendly.com/your-business",
      followUpEnabled: true,
      metaConnected: false,
      webhooksActive: false,
      subscriptionPlan: null
    };
  },
  saveConfig: (config: BusinessConfig) => {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
  },
  getMessages: (): LeadMessage[] => {
    const data = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    return data ? JSON.parse(data) : [];
  },
  saveMessages: (messages: LeadMessage[]) => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  },
  addMessage: (message: LeadMessage) => {
    const messages = storageService.getMessages();
    storageService.saveMessages([message, ...messages]);
  },
  updateMessageStatus: (id: string, updates: Partial<LeadMessage>) => {
    const messages = storageService.getMessages();
    const updated = messages.map(m => m.id === id ? { ...m, ...updates } : m);
    storageService.saveMessages(updated);
  }
};