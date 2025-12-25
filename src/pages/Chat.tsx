import { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Trash2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from '@/components/ChatMessage';
import { ChatInput } from '@/components/ChatInput';
import { useChat } from '@/hooks/useChat';
import { useToast } from '@/hooks/use-toast';

const Chat = () => {
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  const suggestedQuestions = [
    'What types of hair systems do you offer?',
    'How much do your hair systems cost?',
    'How long does the fitting process take?',
    'Can I swim with a hair system?',
  ];

  return (
    <>
      <Helmet>
        <title>Chat with AI Assistant | 3S Golden Hair</title>
        <meta
          name="description"
          content="Get instant answers about our premium hair systems, pricing, and services from our AI assistant."
        />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-display text-lg font-semibold text-foreground">
                    AI Assistant
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Ask anything about our hair systems
                  </p>
                </div>
              </div>
            </div>
            {messages.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearMessages}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
          <ScrollArea className="flex-1 px-4" ref={scrollRef}>
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <MessageCircle className="h-10 w-10 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
                  How can I help you today?
                </h2>
                <p className="text-muted-foreground text-center max-w-md mb-8">
                  I'm your AI assistant for 3S Golden Hair. Ask me anything about our premium hair systems, 
                  pricing, consultations, or care instructions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                  {suggestedQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => sendMessage(question)}
                      className="p-4 text-left text-sm bg-secondary hover:bg-secondary/80 rounded-xl border border-border transition-colors"
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="py-4">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                  <div className="flex gap-3 p-4">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                      <div className="flex gap-1">
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce"
                          style={{ animationDelay: '0ms' }}
                        />
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce"
                          style={{ animationDelay: '150ms' }}
                        />
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce"
                          style={{ animationDelay: '300ms' }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Input */}
          <div className="border-t border-border bg-card">
            <div className="max-w-3xl mx-auto">
              <ChatInput
                onSend={sendMessage}
                isLoading={isLoading}
                placeholder="Type your question..."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
