export async function* prosConsStreamGeneratorUseCase (prompt: string, abortSignal: AbortSignal) {
    try {
        const response = await fetch(`${ import.meta.env.VITE_GPT_API }/pros-cons-discusser-stream`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
                // TODO: Abort signal
                signal: abortSignal,
            })

            if (!response.ok) throw new Error('No se pudo procesar la comparación')

            const reader = response.body?.getReader();

            if (!reader) throw new Error('No se pudo obtener el reader')

            const decoder = new TextDecoder();

            let text = '';

            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                const chunk = decoder.decode(value, { stream: true });

                text += chunk;
                yield text;

            }

    } catch {
        return null;
    }
}