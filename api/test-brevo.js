export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  if (!process.env.BREVO_API_KEY) {
    return res.status(500).json({
      error: "BREVO_API_KEY not configured",
      configured: { apiKey: false, listId: !!process.env.BREVO_LIST_ID },
    });
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/account", {
      method: "GET",
      headers: { accept: "application/json", "api-key": process.env.BREVO_API_KEY },
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({ error: "Brevo API error", status: response.status, message: text });
    }

    const data = await response.json();
    return res.json({
      success: true,
      message: "Brevo connection successful",
      account: { email: data.email, firstName: data.firstName, lastName: data.lastName },
      configured: { apiKey: true, listId: !!process.env.BREVO_LIST_ID, listIdValue: process.env.BREVO_LIST_ID },
    });
  } catch (e) {
    return res.status(500).json({ error: "Connection failed", message: e?.message ?? String(e) });
  }
}
