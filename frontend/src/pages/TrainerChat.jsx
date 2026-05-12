import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import axios from "axios";

const TrainerChat = () => {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const [typing, setTyping] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  };

  const fetchChats = useCallback(async () => {

    try {

      const response = await axios.get(
        "https://fit-mind-ai-backend.vercel.app/api/chat",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setMessages(response.data);

    } catch (error) {

      console.log(error);

    }

  }, [userInfo.token]);

  const sendMessage = async () => {

  if (!message) return;

  const userMessage = {
    sender: "user",
    text: message,
  };

  // instantly show user message
  setMessages((prev) => [
    ...prev,
    userMessage,
  ]);

  const currentMessage = message;

  setMessage("");

  setTyping(true);

  try {

    await axios.post(
      "https://fit-mind-ai-backend.vercel.app/api/chat",
      {
        text: currentMessage,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    // fetch updated chats including AI reply
    await fetchChats();

    setTyping(false);

  } catch (error) {

    console.log(error);

    setTyping(false);

  }

};
  useEffect(() => {

    const loadChats = async () => {

      await fetchChats();

    };

    loadChats();

  }, [fetchChats]);

  useEffect(() => {

    scrollToBottom();

  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">

        <h1 className="text-4xl font-bold mb-6">
          AI Trainer Chat
        </h1>

        <div className="h-125 overflow-y-auto border rounded-lg p-4 mb-4">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`px-4 py-3 rounded-2xl max-w-[70%] whitespace-pre-wrap ${
                  msg.sender === "user"
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </div>

            </div>
          ))}

          {typing && (
            <div className="flex justify-start">

              <div className="bg-gray-200 px-4 py-3 rounded-2xl">
                AI Trainer is typing...
              </div>

            </div>
          )}

          <div ref={messagesEndRef}></div>

        </div>

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Ask your AI trainer..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
          />

          <button
            onClick={sendMessage}
            className="bg-black text-white px-6 rounded-lg hover:bg-gray-800 transition"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
};

export default TrainerChat;