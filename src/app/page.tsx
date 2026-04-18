import ChatInterface from "@/components/ChatInterface";
import RainbowCursor from "@/components/RainbowCursor";

export default function Home() {
  return (
    <main>
      {/* Rainbow smoke cursor — canvas layer, pointer-events-none */}
      <RainbowCursor />
      {/* Full portfolio chat interface */}
      <ChatInterface />
    </main>
  );
}
