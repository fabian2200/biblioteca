export async function cargarContextoTexto(historialChat) {
    const url = "http://localhost:11434/api/chat";
    try {
        
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "qwen2.5-coder:14b",
                messages: historialChat,
                stream: false,
                options: { temperature: 0.1 }
            })
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, message: "Texto procesado.", data: data };
        }else{
            return { success: false, message: "Error al procesar el texto.", data: null };
        }
        
    } catch (error) {
        return { success: false, message: "Error al procesar el texto.", data: null };
    }
}

export async function realizarResumenStreaming(historialChat, onChunk, lista_mensajes){
    const url = "http://localhost:11434/api/chat";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "qwen2.5-coder:14b",
                messages: historialChat,
                stream: true,
                options: {
                    temperature: 0.1
                }
            })
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        let contenido_respuesta = "";
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });

            const lineas = chunk.split("\n").filter(l => l.trim() !== "");

            for (const linea of lineas) {
                const json = JSON.parse(linea);

                if (json.message?.content) {
                    contenido_respuesta += json.message.content;
                    onChunk(json.message.content, false);
                }

                if(json.done){
                    onChunk(json.message.content, true);
                    lista_mensajes.push({ role: "assistant", content: contenido_respuesta });
                    break;
                }
            }
        }
    } catch (error) {
        return {
            success: false,
            message: "Error al realizar la tarea.",
            data: null
        }
    }
}