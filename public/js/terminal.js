const textarea = document.getElementById('text-area');


textarea.addEventListener('focus', function() {
    // Clear the textarea content when it gains focus
    if (this.value === 'Some text...') {
        this.value = '';
    }
});

textarea.addEventListener('blur', function() {
    // Restore placeholder text if the textarea is empty
    if (this.value === '') {
        this.value = 'Some text...';
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const textarea = document.getElementById("text-area");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the default form submission

        const data = { message: textarea.value.trim() }; // Get textarea input

        console.log("Sending Data:", data); // Debugging

        try {
            const response = await fetch("/jsonresponse", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" // Explicitly set JSON
                },
                body: JSON.stringify(data) // Convert data to JSON format
            });

            const result = await response.text();
            console.log("Server Response:", result);
        } catch (error) {
            console.error("Error:", error);
        }
    });
});
