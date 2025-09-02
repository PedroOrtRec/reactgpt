import { useRef, useState } from "react";
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from "../../components"
import { prosConsStreamGeneratorUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
}

export const ProsConsStreamPage = () => {

  const abortController = useRef<AbortController>( new AbortController() );
  const isRunning = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {

    if (isRunning.current) {
      abortController.current.abort();
      abortController.current = new AbortController();
    }

    setIsLoading(true);
    isRunning.current = true;
    setMessages(prev => [...prev, { text, isGpt: false }]);

    const stream = prosConsStreamGeneratorUseCase(text, abortController.current.signal);
    
    setIsLoading(false);
    
    if (!stream) return alert('No se pudo procesar la comparación');

    setMessages(prev => [...prev, { text: '', isGpt: true }]);

    for await (const chunk of stream) {
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].text = chunk;
        return newMessages;
      });
    }

    isRunning.current = false;

    // const reader = await prosConsStreamUseCase(text);

    // setIsLoading(false);

    // if (!reader) return alert('No se pudo procesar la comparación');

    // const decoder = new TextDecoder();
    // let message = '';

    // setMessages(prev => [...prev, { text: message, isGpt: true }]);

    // while (true) {
    //   const { done, value } = await reader.read();

    //   if (done) break;

    //   const chunk = decoder.decode(value, { stream: true });

    //   message += chunk;

    //   setMessages(prev => {
    //     const newMessages = [...prev];
    //     newMessages[newMessages.length - 1].text = message;
    //     return newMessages;
    //   });
    // }

  }


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">


          { /* Bienvenida */ }
          <GptMessage text="Criatura indecisa, déjame ayudarte con mi infinita sabiduría interdimensional, ¿Tienes alguna decisión que tomar?" />

          {
            messages.map( (message, index) => (
              message.isGpt ? (
                <GptMessage key={ index } text={ message.text } />
              ) : (
                <MyMessage key={ index } text={ message.text } />
              )
            ))
          }

          {
            isLoading && (
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader/>
              </div>
            )
          }

        </div>
      </div>


      <TextMessageBox onSendMessage={ handlePost } 
        placeholder="Escribe tu mensaje..."
        disableCorrections
        />
    </div>
  )
}