let qr;

function isValidURL(url) {
    const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}([\/?#].*)?$/;
    return pattern.test(url);
}

function generateQRCode() {
    const url = document.getElementById("urlInput").value.trim();
    const qrContainer = document.getElementById("qrcode");

    qrContainer.innerHTML = "";

    if (url === "") {
        alert("Please enter a URL.");
        return;
    }

    if (!isValidURL(url)) {
        alert("Please enter a valid URL (e.g., https://example.com)");
        return;
    }

    qr = new QRCode(qrContainer, {
        text: url,
        width: 200,
        height: 200,
    });

    document.getElementById("downloadBtn").style.display = "inline-block";
}

function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function downloadQRCode() {
    const qrImg = document.querySelector("#qrcode img") || document.querySelector("#qrcode canvas");

    if (!qrImg) {
        alert("QR code not ready yet.");
        return;
    }

    if (isIOS()) {
        const dataURL = qrImg.nodeName === "IMG" ? qrImg.src : qrImg.toDataURL("image/png");
        window.open(dataURL, "_blank");
        alert("On iPhone, tap and hold the image in the new tab to save it.");
        return;
    }

    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrImg.nodeName === "IMG" ? qrImg.src : qrImg.toDataURL("image/png");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
