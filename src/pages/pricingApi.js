export async function calculatePrice(formData) {
  try {
    const res = await fetch("/api/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (!res.ok) throw new Error("API error");

    const data = await res.json();
    return data.estimatedPrice;
  } catch (err) {
    console.error(err);
    return null;
  }
}
