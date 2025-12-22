export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  const { name, email } = body ?? {};

  if (!name || !email) return res.status(400).json({ error: "Name and email are required" });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return res.status(400).json({ error: "Invalid email format" });

  if (!process.env.BREVO_API_KEY || !process.env.BREVO_LIST_ID) {
    return res.status(500).json({ error: "Server misconfigured (missing BREVO_API_KEY / BREVO_LIST_ID)" });
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        attributes: { FIRSTNAME: name },
        listIds: [parseInt(process.env.BREVO_LIST_ID, 10)],
        updateEnabled: true,
      }),
    });

    let data = {};
    const ct = response.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      try { data = await response.json(); } catch {}
    } else {
      data = { message: await response.text() };
    }

    if (response.ok || response.status === 201) {
      return res.json({ success: true, message: "Successfully subscribed to newsletter" });
    }

    // Email duplicata = successo comunque
    if (response.status === 400 && data.code === "duplicate_parameter") {
      return res.json({ success: true, message: "Email already subscribed" });
    }

    if (response.status === 401) {
      return res.status(500).json({ error: "Configuration error. Please contact support." });
    }

    return res.status(500).json({ error: "Failed to subscribe. Please try again later." });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error. Please try again later." });
  }
}
