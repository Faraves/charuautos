export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // 1. Obtener la llave secreta desde las variables de entorno de Vercel
    const API_KEY = process.env.GEMINI_API_KEY;
    
    if (!API_KEY) {
      return new Response(JSON.stringify({ error: 'Falta GEMINI_API_KEY en el servidor' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. Leer el cuerpo de la petición que nos manda el frontend
    const body = await request.json();

    // 3. Hacer la llamada real a Google desde el servidor (oculto al usuario)
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    // 4. Devolver la respuesta al frontend
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
