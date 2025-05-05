import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import { toast } from "sonner";
import { MessageData } from "@/types";


import { Button } from "./ui/button";
import { Input } from "./ui/input";

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { sendMessage } = useChatStore();
  
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
  
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    };
  
    const removeImage = () => {
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
  
    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!text.trim() && !imagePreview) {
        return;
      }
  
      try {
        await sendMessage({
          text: text.trim(),
          image: imagePreview,
        } as MessageData);
  
        // Clear form
        setText("");
        setImagePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    };
  
    return (
      <div className="p-4 w-full">
        {imagePreview && (
          <div className="mb-3 flex items-center gap-2">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
              />
              <Button
                onClick={removeImage}
                className="absolute -top-0 -right-0 w-5 h-5 border border-white rounded-lg shadow-lg bg-base-300
                flex items-center justify-center cursor-pointer hover:bg-white hover:border-black"
                type="button"
              >
                <X className="size-3 text-black" />
              </Button>
            </div>
          </div>
        )}
  
        <form onSubmit={handleSendMessage} className="flex flex-col md:flex-row items-center gap-2">
          <div className="flex gap-2 items-center flex-1 w-full">
            <Input
              type="text"
              className="w-full input input-bordered rounded-lg input-sm h-[40px] sm:input-md"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              <Button
                type="button"
                className={`btn btn-circle
                        ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                onClick={() => fileInputRef.current?.click()}
              >
                <Image size={20} />
              </Button>
            </div>
          </div>
          <Button
            type="submit"
            className="btn w-full md:max-w-[80px]"
            disabled={!text.trim() && !imagePreview}
          >
            <Send size={22} />
          </Button>
        </form>
      </div>
    );
  };
  
  export default MessageInput;