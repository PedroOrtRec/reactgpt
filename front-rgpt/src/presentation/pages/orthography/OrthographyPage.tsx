import { useState } from "react";
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from "../../components"

interface Message {
  text: string;
  isGpt: boolean;
}

export const OrthographyPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { text, isGpt: false }]);

    // TODO: UseCase

    setIsLoading(false);

    // TODO: Añadir mensaje de isGpt = true
  }


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">


          { /* Bienvenida */ }
          <GptMessage text="Hola, soy ReactGPT, tu asistente de ortografía. ¿En qué puedo ayudarte?" />

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
              {/* <TextMessageBoxFile onSendMessage={ handlePost } 
        placeholder="Escribe tu mensaje..."
        /> */}

      {/* <TextMessageBoxSelect onSendMessage={ console.log } 
        options={ [{ id: '1', text: 'Opción 1' }, { id: '2', text: 'Opción 2' }] }
        /> */}
    </div>
  )
}