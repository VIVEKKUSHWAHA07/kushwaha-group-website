import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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
            productInterest, machineType, quantity, message, honeypot } = await req.json();

    // Fix 2: Server-side honeypot validation
    if (honeypot) {
      // Silently catch bot submissions without revealing the trap
      return new Response(JSON.stringify({ success: true }), { status: 200, headers: corsHeaders });
    }

    // Fix 1: Rate limiting using a rate_limits table
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

    if (supabaseUrl && supabaseServiceKey) {
      const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

      // Clean up old entries (older than 24 hours)
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      await supabaseAdmin.from('rate_limits').delete().lt('created_at', oneDayAgo);

      // Check rate limit for this IP (max 3 per hour)
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      const { data: recentRequests, error: rateLimitError } = await supabaseAdmin
        .from('rate_limits')
        .select('*')
        .eq('ip', ip)
        .gte('created_at', oneHourAgo);

      if (!rateLimitError && recentRequests && recentRequests.length >= 3) {
        return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Insert new request to track limit
      await supabaseAdmin.from('rate_limits').insert({ ip, created_at: new Date().toISOString() });
    }

    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      throw new Error("RESEND_API_KEY is not set in edge function secrets");
    }

    // Fix 3: Move admin email to environment variable
    const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL');
    if (!ADMIN_EMAIL) {
      throw new Error('ADMIN_EMAIL environment variable not configured');
    }

    // 1. Send Admin Email Notification
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Maurvik Industries Website <onboarding@resend.dev>",
        to: [ADMIN_EMAIL],
        subject: `New Quote Request - ${clientName} from ${companyName || "Unknown"}`,
        html: `<div style="font-family:Arial;max-width:600px;margin:auto;">
          <div style="background:#0A1628;padding:24px;border-radius:8px 8px 0 0;">
            <h2 style="color:#E07B00;margin:0;">New Quote Request</h2>
            <p style="color:#fff;margin:4px 0 0;">Maurvik Industries Website</p></div>
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
    
    const resendData = await res.json();
    console.log("Resend API response:", res.status, resendData);
    
    if (!res.ok) {
      throw new Error(`Resend error: ${JSON.stringify(resendData)}`);
    }

    // Fix 4: Send Client Confirmation Email
    try {
      if (email) {
        const referenceNumber = `KG-${Date.now().toString().slice(-6)}`;
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Authorization": `Bearer ${resendKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: "Maurvik Industries <noreply@maurvikindustries.com>",
            to: [email],
            subject: "We received your enquiry — Maurvik Industries",
            html: `<div style="font-family:Arial;max-width:600px;margin:auto;">
              <p>Dear ${clientName},</p>
              <p>Thank you for your enquiry regarding ${productInterest || "our products"}.</p>
              <p><strong>Your Reference Number:</strong> ${referenceNumber}</p>
              <p>Our engineering team will respond within 1-2 business days.</p>
              <br/>
              <p>Best regards,</p>
              <p><strong>Maurvik Industries</strong><br/>
              <a href="mailto:info@maurvikindustries.com">info@maurvikindustries.com</a></p>
            </div>`,
          }),
        });
      }
    } catch (clientEmailError) {
      console.error("Failed to send client confirmation email:", clientEmailError);
    }

    return new Response(JSON.stringify({ success: true, id: resendData.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
