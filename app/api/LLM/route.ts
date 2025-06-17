"use server"

import { fetchNewsData } from "@/lib/fetchStocks";

export async function POST(req: Request) {

  const { ticker } = await req.json();

  const res = await fetchNewsData(ticker);

  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        body: JSON.stringify({
          model: 'gemma3:27b',
          prompt: 'Tell me a joke',
          stream: true
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      const reader = response.body?.getReader();

      while (reader) {
        const { value, done } = await reader.read();
        if (done) break;
        controller.enqueue(value);
      }

      controller.close();
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain',
      'Transfer-Encoding': 'chunked',
    }
  });
}


