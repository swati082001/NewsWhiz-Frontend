import { useRef, useEffect ,useState} from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const API = "http://localhost:3000/api/chat";

function App() {
  const [sessionId] = useState(() => uuidv4());
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi! I'm NewsWhiz. Ask me about the latest news." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
     setIsTyping(true);

    try {
      const res = await axios.post(API, {
        sessionId,
        query: userMsg.content,
      });

      const botReply = res.data.reply || "No response.";
      
      let index = 0;
    const typingMessage = { role: "bot", content: "" };
    setMessages((prev) => [...prev, typingMessage]);

    const typingInterval = setInterval(() => {
      index++;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...typingMessage,
          content: botReply.slice(0, index),
        };
        return updated;
      });

      scrollToBottom(); 

      if (index >= botReply.length) {
        clearInterval(typingInterval);
        setIsTyping(false); 
        setLoading(false);
      }
    }, 20);

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "❌ Something went wrong while fetching the response.",
        },
      ]);
      setIsTyping(false);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = async () => {
    await axios.post(`${API}/reset`, { sessionId });
    setMessages([
      {
        role: "bot",
        content: "Hi! I'm NewsWhiz. Ask me about the latest news.",
      },
    ]);
  };

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-900 sticky top-0 z-10">
        <h1 className="text-xl font-bold flex items-center gap-2">
          🧠 <span>NewsWhiz</span>
        </h1>
        <button
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
          onClick={resetChat}
        >
          Reset Chat
        </button>
      </header>

      {/* Chat Window */}
      <main className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`w-fit max-w-[80%] px-4 py-2 rounded-xl break-words ${
              msg.role === "user"
                ? "bg-blue-600 ml-auto text-right"
                : "bg-gray-700"
            }`}
          >
            <div className="prose prose-invert max-w-none text-white">
              <ReactMarkdown
                children={msg.content}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              />
            </div>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="p-4 border-t border-gray-700 bg-gray-900 sticky bottom-0 z-10">
        <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2">
          <input
            type="text"
            className="flex-1 bg-transparent text-white outline-none"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="text-blue-400 hover:text-blue-600 ml-2"
          >
            ✈️
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
