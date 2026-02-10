const API_URL = "https://digicityoy-43-1ews.onrender.com/api"; 

export async function calculatePrice(formData) {
  try {
    const res = await fetch(`${API_URL}/calculate`, {
      method: "POST",                    // ✅ correct POST
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)     
    });

    if (!res.ok) throw new Error("Failed to fetch price");

    const data = await res.json();      
    return data.estimatedPrice;         
  } catch (err) {
    console.error("Pricing API error:", err); 
    return null;
  }
}
