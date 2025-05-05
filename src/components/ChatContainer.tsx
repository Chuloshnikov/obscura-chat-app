import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwnMessage = message.senderId === authUser._id;
          const bubbleStyle = isOwnMessage
            ? "text-zinc-900 bg-zinc-300"
            : "text-zinc-500";

          return (
            <div
              key={message._id}
              className={`w-full ${isOwnMessage ? "text-right" : "text-left"}`}
              ref={messageEndRef}
            >
              {(message.text || message.image) && (
                <div
                  className={`border inline-block p-2 rounded my-1 max-w-[50%] break-words ${bubbleStyle}`}
                >
                  <div className="flex flex-col gap-2">
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="sm:max-w-[200px] rounded-md"
                      />
                    )}
                    {message.text && <p>{message.text}</p>}
                  </div>
                </div>
              )}

              <div className="text-xs text-gray-600 mt-1">
                {formatMessageTime(message.createdAt)}
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;