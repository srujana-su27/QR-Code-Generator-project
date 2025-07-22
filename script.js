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

function downloadQRCode() {
    const qrImg = document.querySelector("#qrcode img") || document.querySelector("#qrcode canvas");

    const link = document.createElement("a");
    link.download = "qrcode.png";

    if (qrImg.nodeName === "IMG") {
        link.href = qrImg.src;
    } else {
        link.href = qrImg.toDataURL("image/png");
    }

    link.click();
}
