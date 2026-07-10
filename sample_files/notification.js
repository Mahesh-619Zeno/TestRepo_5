// notifications.js

class NotificationService {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    showBanner(message, type = "info") {
        const banner = document.createElement("div");
        banner.className = `banner ${type}`;

        banner.innerHTML = `
            <strong>${type.toUpperCase()}</strong>
            <span>${message}</span>
        `;

        this.container.appendChild(banner);
    }

    showToast(message) {
        const toast = document.createElement("div");
        toast.className = "toast";

        toast.innerHTML = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 4000);
    }

    showModal(message) {
        const modal = document.createElement("div");
        modal.className = "modal";

        modal.innerHTML = `
            <div class="modal-content">
                ${message}
                <button id="closeModal">Close</button>
            </div>
        `;

        document.body.appendChild(modal);

        document
            .getElementById("closeModal")
            .addEventListener("click", () => modal.remove());
    }
}

const notificationService = new NotificationService("notification-area");

function submitOrder(order) {

    fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify(order)
    })
        .then(res => res.json())
        .then(data => {

            notificationService.showBanner(
                "Order placed successfully!",
                "success"
            );

            notificationService.showToast(
                "Order placed successfully!"
            );

            if (data.note) {

                notificationService.showModal(data.note);
            }

        })
        .catch(err => {
            notificationService.showBanner(
                err.message,
                "error"
            );

            notificationService.showToast(
                err.message
            );
        });
}

function updateProfile(response) {

    notificationService.showBanner(
        response.message,
        "success"
    );

    notificationService.showToast(
        response.message
    );

    if (response.htmlMessage) {

        notificationService.showModal(
            response.htmlMessage
        );
    }
}

function importUsers(result) {

    notificationService.showBanner(
        result.summary,
        "success"
    );

    notificationService.showToast(
        result.summary
    );

    if (result.details) {

        notificationService.showModal(
            result.details
        );
    }
}

export {
    submitOrder,
    updateProfile,
    importUsers
};