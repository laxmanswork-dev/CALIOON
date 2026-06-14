const handleSubmit = async (e) => {
  e.preventDefault();

  const response = await fetch("/api/application", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const result = await response.json();

  if (result.success) {
    alert("Application Submitted");
  }
};