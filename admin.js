document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("adminForm");
    const responseMessage = document.getElementById("responseMessage");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form values
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const category = document.getElementById("category").value;

        // Create an object to send to the server
        const newEntry = {
            title: title,
            description: description,
            category: category,
        };

        // Send a POST request to the server to add the new entry
        fetch("https://your-server-endpoint/api/add-entry", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEntry),
        })
            .then((response) => response.json())
            .then((data) => {
                // Show success message
                responseMessage.textContent = "Entry added successfully!";
                responseMessage.style.color = "green";
                form.reset();
            })
            .catch((error) => {
                // Show error message
                responseMessage.textContent = "Failed to add entry: " + error.message;
                responseMessage.style.color = "red";
            });
    });
});
