document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("jsonForm");
    const textarea = document.getElementById("text-area");

    // Clear default text on focus
    textarea.addEventListener("focus", function() {
        if (this.value.trim() === "Some text...") {
            this.value = "";
        }
    });

    // Restore default text if empty on blur
    textarea.addEventListener("blur", function() {
        if (this.value.trim() === "") {
            this.value = "Some text...";
        }
    });

    // Handle form submission with AJAX
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent traditional form submission

        const inputText = textarea.value.trim();
        if (!inputText) {
            alert("Please enter some JSON data before submitting.");
            return;
        }

        try {
            const response = await fetch("/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userInput: inputText })
            });

            const result = await response.json(); // Expect JSON response
            console.log("Server Response:", result);

            // Redirect if the response contains a redirect URL
            if (result.redirectUrl) {
                window.location.href = result.redirectUrl;
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to send request.");
        }
    });
});
