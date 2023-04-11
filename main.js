document.getElementById("summary-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const bookName = document.getElementById("book_name").value;
    const summary = await getSummary(bookName);
    if (summary) {
        document.getElementById("summary").innerText = summary;
        document.getElementById("summary-container").style.display = "block";
    } else {
        document.getElementById("summary-container").style.display = "none";
    }
});

async function getSummary(bookName) {
    const response = await fetch("path/to/your/serverless/function", {
        method: "POST",
        body: JSON.stringify({ bookName }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        const data = await response.json();
        return data.summary;
    } else {
        console.error("Error getting summary");
        return null;
    }
}
