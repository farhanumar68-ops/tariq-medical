export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Backend API: Handle Form Submission
    if (url.pathname === "/api/book-appointment" && request.method === "POST") {
      try {
        const body = await request.json();
        
        // Yahan patient ka data backend ko mil raha hai (Future me D1 database me save hoga)
        console.log("New Booking Received:", body);

        return new Response(JSON.stringify({
          success: true,
          message: `Shukriya ${body.name}! Aapki booking request ${body.date} ke liye receive ho chuki hai.`
        }), {
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*" 
          }
        });
      } catch(err) {
        return new Response(JSON.stringify({ success: false, message: "Invalid Request" }), { status: 400 });
      }
    }

    // Serve HTML assets
    return env.ASSETS.fetch(request);
  }
};
