import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const FashionChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your KAPAS fashion assistant! 👋 How can I help you find the perfect kurti today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    'Show me short kurtis',
    'What\'s trending?',
    'Size guide',
    'Return policy',
  ];

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('short') || lowerMessage.includes('kurti')) {
      return "Our short kurtis are perfect for casual outings! They're comfortable, stylish, and available in sizes S to XXL. Check out our Short Kurti collection - we have floral, solid, embroidered, and printed designs. Would you like me to show you our best sellers? 🌸";
    } else if (lowerMessage.includes('long')) {
      return "Long kurtis are ideal for formal events and traditional occasions! We have elegant Anarkali styles, straight cut designs, and designer pieces. All available with premium fabrics. What color are you looking for? ✨";
    } else if (lowerMessage.includes('backless')) {
      return "Our backless kurtis are bold and beautiful! Perfect for parties and special events. They feature elegant draping and come in stunning colors. These are very popular among college students! Want to see our latest designs? 💃";
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "We have kurtis ranging from ₹1,049 to ₹2,799! Currently, there's a flat 30% OFF on all items. Our average price is around ₹1,500-₹2,000 with great quality. What's your budget? 💰";
    } else if (lowerMessage.includes('size')) {
      return "We offer sizes S, M, L, XL, and XXL for all our kurtis! For the best fit:\n• S: Bust 32-34\"\n• M: Bust 36-38\"\n• L: Bust 40-42\"\n• XL: Bust 44-46\"\n• XXL: Bust 48-50\"\n\nNeed help choosing your size? 📏";
    } else if (lowerMessage.includes('trending') || lowerMessage.includes('popular')) {
      return "Right now, these are super popular:\n1. Floral Print Short Kurtis 🌺\n2. Backless Party Kurtis 💃\n3. Designer Long Anarkali 👗\n4. Embroidered Festive Collection ✨\n\nOur customers love the backless designs - they're selling fast! Want to see them?";
    } else if (lowerMessage.includes('return') || lowerMessage.includes('exchange')) {
      return "We have a hassle-free 7-day return policy! You can return or exchange any item within 7 days of delivery. Just make sure the tags are intact and the product is unworn. Free returns for all orders! 🔄";
    } else if (lowerMessage.includes('delivery') || lowerMessage.includes('shipping')) {
      return "We offer FREE shipping on orders above ₹1,000! 🚚\n• Standard delivery: 5-7 business days\n• Express delivery: 2-3 business days (₹100 extra)\n\nYour order will be delivered in beautiful packaging! Where are you ordering from?";
    } else if (lowerMessage.includes('color')) {
      return "We have kurtis in beautiful colors:\n• Classic: Black, White, Beige\n• Vibrant: Red, Pink, Blue, Green\n• Trending: Pastel shades, Mint, Coral\n\nWhich color suits your style? Our cherry red collection is amazing! 🎨";
    } else if (lowerMessage.includes('occasion')) {
      return "Let me help you choose based on the occasion:\n• College/Casual: Short Kurtis\n• Office: Long Straight Cut\n• Parties: Backless or Embroidered\n• Festivals: Anarkali or Designer Collection\n• Weddings: Silk Blend or Heavy Work\n\nWhat's the occasion? 🎉";
    } else if (lowerMessage.includes('discount') || lowerMessage.includes('offer')) {
      return "Amazing news! We have a FLAT 30% OFF on ALL kurtis right now! 🎉 Plus, free shipping on orders above ₹1,000. This is a limited time offer for the festive season. Don't miss out! Want to add something to your cart?";
    } else if (lowerMessage.includes('fabric') || lowerMessage.includes('material')) {
      return "We use premium quality fabrics:\n• Cotton: Breathable & comfortable\n• Silk Blend: Elegant & luxurious\n• Rayon: Soft & flowy\n• Cotton Blend: Durable & easy care\n\nAll our fabrics are skin-friendly and perfect for Indian weather! What's your preference? 🧵";
    } else if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return "I'm here to help! You can ask me about:\n✅ Product recommendations\n✅ Sizes and fit\n✅ Prices and offers\n✅ Delivery and returns\n✅ Styling tips\n✅ Current trends\n\nWhat would you like to know?";
    } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're welcome! Happy shopping at KAPAS! 🛍️ Feel free to ask if you need anything else. Enjoy your new kurti! ✨";
    } else {
      return "I'd love to help you find the perfect kurti! Could you tell me more about what you're looking for? You can ask about sizes, styles, prices, or get recommendations for any occasion! 💕";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-[#ff6b81] to-[#ff8fa3] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-50 animate-bounce"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs text-gray-800 font-bold px-2 py-1 rounded-full">
            AI
          </span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border-2 border-[#ff6b81]">
          <div className="bg-gradient-to-r from-[#ff6b81] to-[#ff8fa3] text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6" />
              <div>
                <h3 className="font-bold text-lg">KAPAS Fashion AI</h3>
                <p className="text-xs opacity-90">Your style assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-[#ff6b81] text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-md'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="px-3 py-1 bg-gray-100 hover:bg-[#ff6b81] hover:text-white text-sm rounded-full whitespace-nowrap transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ff6b81]"
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#ff6b81] hover:bg-[#ff8fa3] text-white p-3 rounded-full transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FashionChatbot;
