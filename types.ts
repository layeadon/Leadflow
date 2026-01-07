export interface UserProfile {
    id: string;
    email: string;
    businessName: string;
    isLoggedIn: boolean;
  }
  
  export interface BusinessConfig {
    autoReplyEnabled: boolean;
    replyMessage: string;
    bookingLink: string;
    followUpEnabled: boolean;
    metaConnected: boolean;
    webhooksActive: boolean;
    subscriptionPlan: 'free' | 'starter' | 'pro' | null;
  }
  
  export interface LeadMessage {
    id: string;
    senderName: string;
    platform: 'instagram' | 'meta';
    text: string;
    timestamp: string;
    status: 'pending' | 'replied' | 'followed-up';
    clickedLink: boolean;
  }
  
  export interface AnalyticsData {
    totalMessages: number;
    totalReplies: number;
    totalClicks: number;
  }