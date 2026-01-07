
import React from 'react';

interface ChatBubbleProps {
  message: string;
  role: 'user' | 'assistant';
  isLoading?: boolean;
}

const TypingIndicator = () => (
  <div className="flex items-center space-x-1 p-2">
    <div className="w-2 h-2 bg-rose rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
    <div className="w-2 h-2 bg-rose rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    <div className="w-2 h-2 bg-rose rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
  </div>
);

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, role, isLoading = false }) => {
  const isUser = role === 'user';
  
  const bubbleStyles = isUser
    ? 'bg-rose text-white self-end rounded-t-lg rounded-bl-lg'
    : 'bg-beige text-soft-black self-start rounded-t-lg rounded-br-lg';

  return (
    <div className={`max-w-md p-3 ${bubbleStyles} animate-fadeIn`}>
      {isLoading ? <TypingIndicator /> : <p className="text-sm leading-relaxed">{message}</p>}
    </div>
  );
};

export default ChatBubble;