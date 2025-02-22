import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, ArrowLeft, Bot, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function ChatbotPage() {
    const token = sessionStorage.getItem('token');
    const [messages, setMessages] = useState([
        {
            id: "welcome",
            role: "assistant",
            content:
                "Hello! I'm your Socratic learning companion. I'll help you explore and understand concepts through thoughtful questions and discussion. What would you like to learn about today?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const scrollRef = useRef(null);

    const getChatResponse = async (query) => {
        try {
            const response = await fetch(`http://localhost:3000/api/chatbot`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ query }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessages((prev) => [
                    ...prev,
                    {
                        id: Date.now().toString(),
                        role: "assistant",
                        content: data.reply,
                    },
                ]);
            } else {
                console.error(`Error: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error("Request failed:", error);
        }
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        await getChatResponse(userMessage.content);
        setIsLoading(false);
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#FFFBF5]">
            <header className="border-b bg-white">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <Link to="/dashboard" className="flex items-center gap-2 text-slate-600 hover:text-slate-800">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Dashboard
                        </Link>
                        <div>
                            <h1 className="text-xl font-semibold text-slate-800">Socratic Learning Assistant</h1>
                            <p className="text-sm text-slate-600">Explore concepts through guided questioning</p>
                        </div>
                    </div>
                    <Badge variant="outline" className="gap-1">
                        <Bot className="h-3 w-3" /> AI Tutor
                    </Badge>
                </div>
            </header>

            <div className="container mx-auto flex max-w-4xl flex-1 flex-col gap-4 p-4">
                <Card className="flex flex-1 flex-col">
                    <ScrollArea ref={scrollRef} className="flex-1 p-4">
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div key={message.id} className={`flex items-start gap-3 ${message.role === "assistant" ? "flex-row" : "flex-row-reverse"}`}>
                                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${message.role === "assistant" ? "bg-purple-100 text-purple-600" : "bg-slate-100 text-slate-600"}`}>
                                        {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                                    </div>
                                    <div className={`relative max-w-[80%] rounded-lg px-4 py-3 ${message.role === "assistant" ? "bg-white" : "bg-purple-600 text-white"}`}>
                                        <div className={`absolute -left-2 h-3 w-3 rotate-45 ${message.role === "assistant" ? "bg-white" : "bg-purple-600"}`} />
                                        <p className="text-sm">{message.content}</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-center gap-2 text-slate-500">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span className="text-sm">Thinking...</span>
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    <div className="border-t bg-white p-4">
                        <form onSubmit={handleSubmit} className="flex items-center gap-2">
                            <Input value={input} onChange={handleInputChange} placeholder="Ask a question..." className="flex-1" />
                            <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={isLoading || !input.trim()}>
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                <span className="ml-2">Send</span>
                            </Button>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    );
}
