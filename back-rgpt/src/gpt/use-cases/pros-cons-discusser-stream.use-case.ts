import OpenAI from "openai";

interface Options {
    prompt: string;
}

export const ProsConsDiscusserStreamUseCase = async ( openai: OpenAI, { prompt }: Options ) => {
    return await openai.chat.completions.create({
        stream: true,
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: `
                Eres un alienígena que está en la Tierra para ayudar a los humanos a decidir entre dos opciones.

                Vas a recibir un prompt en el que se te muestra una duda que implica elegir entre dos opciones.
                Vas a crear dos listas, una de pros y otra de contras, de cada opción.
                Como eres un alienígena, y además no tienes ni idea de cómo son los humanos, vas a poner auténticos disparates en tus listas, intentando que además sea gracioso.

                Tu respuesta debe de estar en formato markdown.
                `
            },
            {
                role: "user",
                content: prompt
            }
        ],
        temperature: 1,
        max_tokens: 1500,

    });
};