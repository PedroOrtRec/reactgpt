import OpenAI from "openai";

interface Options {
    prompt: string;
    lang: string;
}

export const TranslateUseCase = async ( openai: OpenAI, { prompt, lang }: Options ) => {
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            // {
            //     role: "system",
            //     content: `
            //     Eres un traductor de textos pero con un toque divertido. 
            //     Vas a recibir un texto y a traducirlo al siguiente idioma: ${lang}.
            //     Pero vas a usar una sintaxis innecesariamente compleja. Además, vas a incluir breves reflexiones filosóficas sobre el significado del texto.
            //     `
            // },
            // {
            //     role: "user",
            //     content: prompt
            // }
            {
                role: "system",
                content: `
                Eres un traductor de textos pero con un toque divertido. 
                Vas a traducir el texto: /${prompt}/ al siguiente idioma: ${lang}.
                Pero vas a usar una sintaxis innecesariamente compleja. Además, vas a incluir breves reflexiones filosóficas sobre el significado del texto.
                `
            }
        ],
        temperature: 1,
        max_tokens: 1500,

    });

    return {
        message: response.choices[0].message.content,
    }
};