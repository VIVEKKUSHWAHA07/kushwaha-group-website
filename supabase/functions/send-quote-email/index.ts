import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  try {
    const { clientName, companyName, email, phone,
            productInterest, machineType, quantity, message } = await req.json();
    const resendKey = Deno.env.get("RESEND_API_KEY");

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Kushwaha Group Website <onboarding@resend.dev>",
        to: ["kushwahavivek6265@gmail.com"],
        subject: `New Quote Request - ${clientName} from ${companyName || "Unknown"}`,
        html: `<div style="font-family:Arial;max-width:600px;margin:auto;">
          <div style="background:#0A1628;padding:24px;border-radius:8px 8px 0 0;">
            <h2 style="color:#E07B00;margin:0;">New Quote Request</h2>
            <p style="color:#fff;margin:4px 0 0;">Kushwaha Group Website</p></div>
          <table style="width:100%;border-collapse:collapse;background:#fff;">
            <tr><td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;">Name</td>
                <td style="padding:12px;border-bottom:1px solid #eee;">${clientName}</td></tr>
            <tr><td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;">Company</td>
                <td style="padding:12px;border-bottom:1px solid #eee;">${companyName || "-"}</td></tr>
            <tr><td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;">Email</td>
                <td style="padding:12px;border-bottom:1px solid #eee;">${email}</td></tr>
            <tr><td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;">Phone</td>
                <td style="padding:12px;border-bottom:1px solid #eee;">${phone || "-"}</td></tr>
            <tr><td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;">Product</td>
                <td style="padding:12px;border-bottom:1px solid #eee;">${productInterest || "-"}</td></tr>
            <tr><td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;">Machine</td>
                <td style="padding:12px;border-bottom:1px solid #eee;">${machineType || "-"}</td></tr>
            <tr><td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;">Quantity</td>
                <td style="padding:12px;border-bottom:1px solid #eee;">${quantity || "-"}</td></tr>
            <tr><td style="padding:12px;font-weight:bold;">Message</td>
                <td style="padding:12px;">${message || "-"}</td></tr>
          </table>
          <div style="background:#f4f6f9;padding:16px;border-radius:0 0 8px 8px;text-align:center;">
            <a href="https://supabase.com/dashboard" style="color:#E07B00;">Open Admin Panel</a>
          </div></div>`,
      }),
    });
    // NOTE: Auto-reply DISABLED - Resend free tier only sends to verified emails.
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
