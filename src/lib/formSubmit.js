export const submitData = async (endpoint, data) => {
    try {
      const response = await fetch(`https://renovabackend.adaptable.app/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error submitting data:", errorData);
        throw new Error(`Failed to submit data: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log("Data submitted successfully:", result);
      return result;
    } catch (error) {
      console.error("Submission error:", error.message);
      throw error;
    }
  };
  