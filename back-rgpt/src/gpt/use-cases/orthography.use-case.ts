import OpenAI from "openai";

interface Options {
    prompt: string;
}

export const OrthographyCheckUseCase = async ( openai: OpenAI, { prompt }: Options ) => {

    const coletilla = "¡Alma de cántaro!";

    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: `Eres un experto en gramática y ortografía. Vas a recibir un texto y vas a verificar si está bien escrito o no. Si está bien escrito, vas a devolver el texto con la ortografía correcta. Si no está bien escrito, vas a devolver un mensaje agresivo avisando de la equivocación y sugeriendo la corrección. Vas a ser muy directo e incluso un poco grosero. Vas a hacer mofa del propio texto que recibes, pero no solo de como está escrito, sino de lo que dice en si el texto, satirizando aquello de lo que se habla en el texto. Si el texto tiene errores de ortografía, vas a terminar siempre tu mensaje con la coletilla ${coletilla}. Si el texto no tiene errores de ortografía, vas a devolver un mensaje de felicitación, pero restándole importancia al asunto con una breve broma.
                
                Formato de salida:

                {
                    "userScore": 20, // Valor entre 0 y 100
                    "errors": [
                    "wapa - guapa",
                    "nobia - novia"
                    ],
                    "message": "¿Pero que manera de escribir es esta? Me da verguenza ajena. Se dice 'mi novia es la más guapa', pero si es tan guapa como eres tú buen escritor, entonces debe de ser el auténtico Yeti ¡Alma de cántaro!"
                }

                `
            },
            {
                role: "user",
                content: prompt
            }
        ],
        temperature: 0.3,
        max_tokens: 150,

    });

    // console.log(completion);

    const jsonResponse = JSON.parse(completion.choices[0].message.content || "{}");

    return jsonResponse;

}