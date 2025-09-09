import { RequestHandler } from "express";

export const handleChat: RequestHandler = async (req, res) => {
  try {
    const { input, model = "gpt-4o-mini", images } = req.body as { input: string; model?: string; images?: string[] };

    if (!input || typeof input !== "string") {
      return res.status(400).json({ error: "Missing input in request body" });
    }

    const apiKey = process.env.OPENAI_API_KEY as string | undefined;

    const looksLikeKey = (k?: string) => typeof k === 'string' && k.startsWith('sk-') && k.length > 30;

    if (!looksLikeKey(apiKey)) {
      // Fallback offline reply when OpenAI key is not configured or invalid
      console.warn('/api/chat: OpenAI key missing or invalid, using local fallback. Current OPENAI_API_KEY=', apiKey);

      const isSpanish = /\b(hola|gracias|por favor|pregunta|imagenes|imágenes|adiós|buenas)\b/i.test(input);
      const greeting = isSpanish ? 'Gracias por tu mensaje. (Respuesta en modo local)' : 'Thanks for your message. (Local fallback reply)';
      let reply = `${greeting}\n\n`;

      // Very small local 'AI' that echoes and offers guidance
      reply += isSpanish ? `Has dicho: "${input}".` : `You said: "${input}".`;

      if (images && images.length) {
        reply += isSpanish ? ` He recibido ${images.length} imagen(es).` : ` I received ${images.length} image(s).`;
      }

      reply += '\n\n';
      reply += isSpanish ? 'Si quieres respuestas más avanzadas conecta una clave de OpenAI válida en la variable de entorno OPENAI_API_KEY.' : 'For more advanced responses, connect a valid OpenAI API key as the OPENAI_API_KEY environment variable.';

      return res.status(200).json({ output: reply, warning: 'openai_key_missing' });
    }

    // Call OpenAI Responses API directly using fetch to avoid adding new dependencies
    const payload: any = {
      model,
      input,
    };

    // If images were provided by the client we include a short note so the model can consider them.
    if (images && images.length) {
      payload.input = `${input}\n\nAttached images: ${images.slice(0, 3).join(", ")}`;
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    // Try to extract a sensible text reply from the Responses API shape
    let replyText = "";
    if (data.output_text) replyText = data.output_text;
    else if (Array.isArray(data.output) && data.output.length > 0) {
      // Concatenate output content pieces
      replyText = data.output
        .map((o: any) => {
          if (o.content && Array.isArray(o.content)) {
            return o.content.map((c: any) => (c.text ? c.text : typeof c === "string" ? c : JSON.stringify(c))).join("\n");
          }
          return o.text || JSON.stringify(o);
        })
        .join("\n");
    } else {
      replyText = JSON.stringify(data);
    }

    return res.status(200).json({ output: replyText });
  } catch (err: any) {
    console.error("/api/chat error:", err && err.stack ? err.stack : err);
    return res.status(500).json({ error: "Failed to get response from OpenAI.", detail: err?.message || String(err) });
  }
};
