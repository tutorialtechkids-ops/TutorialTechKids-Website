import { RequestHandler } from "express";

export const handleChat: RequestHandler = async (req, res) => {
  try {
    const { input, model = "gpt-4o-mini", images } = req.body as { input: string; model?: string; images?: string[] };

    if (!input || typeof input !== "string") {
      return res.status(400).json({ error: "Missing input in request body" });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "OpenAI API key not configured on the server (OPENAI_API_KEY)." });
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
