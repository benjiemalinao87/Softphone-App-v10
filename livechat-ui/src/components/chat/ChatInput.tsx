import React, { useState } from "react";
import {
  Mic,
  Smile,
  Image,
  Paperclip,
  Calendar,
  FolderTree,
  Headphones,
  Send,
  ChevronDown,
  Wand2,
  X,
  Loader2,
  Settings,
} from "lucide-react";
import { CreateAppointment } from "@/components/appointment/CreateAppointment";
import { useToast } from "@/hooks/use-toast"; // Using shadcn/ui toast instead

export const ChatInput = () => {
  const [messageText, setMessageText] = useState("");
  const [messageType, setMessageType] = useState<"reply" | "note">("reply");
  const [showAIOptions, setShowAIOptions] = useState(false);
  const [textareaRows, setTextareaRows] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [disableEnterToSend, setDisableEnterToSend] = useState(false);
  const [showCannedResponses, setShowCannedResponses] = useState(false);
  const [previewData, setPreviewData] = useState<{
    text: string;
    type: string;
    loading?: boolean;
  } | null>(null);

  const { toast } = useToast();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageText(e.target.value);
    const lineCount = e.target.value.split("\n").length;
    setTextareaRows(Math.min(Math.max(lineCount, 1), 5));
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    console.log("Sending message:", {
      type: messageType,
      content: messageText,
      timestamp: new Date().toISOString()
    });

    // Simulate successful message send
    toast({
      title: "Message Sent",
      description: messageType === "reply" ? "Your reply has been sent" : "Note has been added",
    });

    // Clear the input after sending
    setMessageText("");
    setTextareaRows(1);
    setShowAIOptions(false);
    setPreviewData(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        e.preventDefault();
        const newText = messageText + "\n";
        setMessageText(newText);
        setTextareaRows((prev) => Math.min(prev + 1, 5));
      } else if (!disableEnterToSend) {
        e.preventDefault();
        handleSendMessage();
      }
    } else if (e.key === "/") {
      setShowCannedResponses(true);
    }
  };

  const handlePreviewTransformation = (type: string) => {
    setShowAIOptions(false);
    setPreviewData({
      text: messageText,
      type,
      loading: true,
    });
    setTimeout(() => {
      const transformedText = `${messageText} (${type.toLowerCase()})`;
      setPreviewData({
        text: transformedText,
        type,
        loading: false,
      });
    }, 1000);
  };

  const applyTransformation = () => {
    if (previewData) {
      setMessageText(previewData.text);
      setPreviewData(null);
    }
  };

  const handleAppointmentClick = () => {
    // Dispatch a custom event to trigger the appointment panel
    const event = new CustomEvent('openAppointmentPanel');
    window.dispatchEvent(event);
    console.log('Appointment button clicked, dispatched openAppointmentPanel event');
  };

  return (
    <div className="w-full border-t border-gray-200 bg-white p-4">
      <div className="flex gap-4 items-center mb-2">
        <button
          className={`text-sm font-medium ${messageType === "reply" ? "text-blue-500" : "text-gray-500 hover:text-gray-700"}`}
          onClick={() => setMessageType("reply")}
        >
          Reply
        </button>
        <button
          className={`text-sm font-medium ${messageType === "note" ? "text-blue-500" : "text-gray-500 hover:text-gray-700"}`}
          onClick={() => setMessageType("note")}
        >
          Note
        </button>
        <CreateAppointment />
      </div>
      <div
        className={`border rounded-lg ${messageType === "note" ? "bg-[#fff9e6]" : "bg-white"}`}
      >
        {messageText.length > 0 && showAIOptions && (
          <div className="px-3 pt-2">
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
              <Wand2 className="w-4 h-4 text-blue-500" />
              <span>AI Suggestions</span>
              <div className="flex-1 flex gap-2">
                <button
                  className="px-3 py-1 hover:bg-gray-100 rounded"
                  onClick={() => handlePreviewTransformation("Make it more formal")}
                >
                  Make it formal
                </button>
                <button
                  className="px-3 py-1 hover:bg-gray-100 rounded"
                  onClick={() => handlePreviewTransformation("Make it more casual")}
                >
                  Make it casual
                </button>
                <button
                  className="px-3 py-1 hover:bg-gray-100 rounded"
                  onClick={() => handlePreviewTransformation("Improve grammar")}
                >
                  Improve grammar
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="px-4 py-3 relative">
          <textarea
            placeholder={
              messageType === "note"
                ? "Add a note here"
                : "Type your message here"
            }
            value={messageText}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            className={`w-full resize-none outline-none transition-all duration-200 ${messageType === "note" ? "bg-[#fff9e6]" : "bg-white"}`}
            rows={textareaRows}
          />
          {messageText.length > 0 && !showAIOptions && (
            <button
              onClick={() => setShowAIOptions(true)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-lg"
            >
              <Wand2 className="w-5 h-5 text-blue-500" />
            </button>
          )}
        </div>
        {previewData && (
          <div className="border-t bg-blue-50 p-3">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-blue-600 font-medium flex items-center gap-2">
                {previewData.loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Wand2 className="w-4 h-4" />
                )}
                {previewData.type}
              </div>
              <button
                onClick={() => setPreviewData(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-white rounded p-2 text-sm border border-blue-100">
              {previewData.loading ? (
                <div className="text-gray-500">Generating preview...</div>
              ) : (
                previewData.text
              )}
            </div>
            {!previewData.loading && (
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setPreviewData(null)}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={applyTransformation}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        )}
        <div className="border-t px-2 py-2 flex items-center justify-between">
          {messageType === "note" ? (
            <div className="flex items-center justify-between w-full">
              <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                <Mic className="w-5 h-5 text-gray-500" />
              </button>
              <button 
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Add Note
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                  <Mic className="w-5 h-5 text-gray-500" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                  <Smile className="w-5 h-5 text-gray-500" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                  <Image className="w-5 h-5 text-gray-500" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                  <Paperclip className="w-5 h-5 text-gray-500" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-500" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                  <FolderTree className="w-5 h-5 text-gray-500" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                  <Headphones className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400 whitespace-nowrap">
                  {messageText.length}c | 1p
                </span>
                <button 
                  onClick={handleSendMessage}
                  className="flex bg-blue-500 text-white rounded-lg hover:bg-blue-600 overflow-hidden"
                >
                  <span className="px-4 py-2">Send</span>
                  <div className="border-l border-blue-400">
                    <button className="px-2 py-2 hover:bg-blue-600">
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg"
                  >
                    <Settings className="w-5 h-5 text-gray-500" />
                  </button>
                  {showSettings && (
                    <div className="absolute bottom-full right-0 mb-2 bg-white rounded-md shadow-lg border border-gray-200 w-56 py-0.5 z-10">
                      <button className="w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50">
                        Canned Responses
                      </button>
                      <div className="px-3 py-1.5 border-t">
                        <label className="flex items-center gap-2 text-xs">
                          <input
                            type="checkbox"
                            checked={disableEnterToSend}
                            onChange={(e) => setDisableEnterToSend(e.target.checked)}
                            className="w-3 h-3"
                          />
                          Disable Enter key to send
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};