document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const statusMsg = document.getElementById("formStatus");
    const submitBtn = document.getElementById("submitBtn");

    if (form) {
        form.addEventListener("submit", async (event) => {
            // Prevent standard page reload behavior on form submit
            event.preventDefault();

            // Your Formspree Endpoint ID
            const endpoint = "https://formspree.io/f/xaqryjwe";

            // Gather field values into a FormData object
            const formData = new FormData(form);

            // Visual indicator during network transmission
            submitBtn.innerText = "Sending...";
            submitBtn.style.opacity = "0.7";
            submitBtn.disabled = true;

            try {
                const response = await fetch(endpoint, {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    statusMsg.innerText = "Message sent successfully! I'll get back to you soon.";
                    statusMsg.className = "form-status-msg success";
                    form.reset(); // Clear input fields
                } else {
                    const data = await response.json();
                    if (data.hasOwnProperty('errors')) {
                        statusMsg.innerText = data['errors'].map(error => error['message']).join(", ");
                    } else {
                        statusMsg.innerText = "Oops! There was a problem submitting your form.";
                    }
                    statusMsg.className = "form-status-msg error";
                }
            } catch (error) {
                statusMsg.innerText = "Network error. Please check your internet connection and try again.";
                statusMsg.className = "form-status-msg error";
            } finally {
                // Reset button text state after completion
                submitBtn.innerText = "Send Message";
                submitBtn.style.opacity = "1";
                submitBtn.disabled = false;
            }
        });
    }
});

// INTERACTIVE EDUCATION GRADES PANEL
    const toggleBtn = document.getElementById("toggle-grades-btn");
    const gradesPanel = document.getElementById("grades-panel");

    if (toggleBtn && gradesPanel) {
        toggleBtn.addEventListener("click", () => {
            const isOpen = gradesPanel.classList.toggle("open");
            toggleBtn.classList.toggle("active");

            if (isOpen) {
                // Dynamically sets max-height to the scrollable height of the element
                gradesPanel.style.maxHeight = gradesPanel.scrollHeight + "px";
            } else {
                gradesPanel.style.maxHeight = "0";
            }
        });
    }
