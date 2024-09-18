// Hàm mã hóa Hill Cipher
function hillCipherEncrypt(plainText, keyMatrix) {
    const size = 2; // Kích thước ma trận 2x2
    let result = "";
    plainText = plainText.toUpperCase().replace(/[^A-Z]/g, ""); // Chỉ giữ lại chữ cái

    // Chuyển văn bản thành cặp ký tự
    if (plainText.length % size !== 0) {
        plainText += "X"; // Thêm ký tự X nếu độ dài không chia hết cho 2
    }

    for (let i = 0; i < plainText.length; i += size) {
        const block = [
            plainText.charCodeAt(i) - 65, 
            plainText.charCodeAt(i + 1) - 65
        ];

        // Nhân ma trận với block
        const encryptedBlock = [
            (keyMatrix[0] * block[0] + keyMatrix[1] * block[1]) % 26,
            (keyMatrix[2] * block[0] + keyMatrix[3] * block[1]) % 26
        ];

        result += String.fromCharCode(encryptedBlock[0] + 65);
        result += String.fromCharCode(encryptedBlock[1] + 65);
    }
    
    return result;
}

// Hàm giải mã Hill Cipher
function hillCipherDecrypt(cipherText, inverseKeyMatrix) {
    const size = 2;
    let result = "";
    cipherText = cipherText.toUpperCase().replace(/[^A-Z]/g, "");

    for (let i = 0; i < cipherText.length; i += size) {
        const block = [
            cipherText.charCodeAt(i) - 65,
            cipherText.charCodeAt(i + 1) - 65
        ];

        const decryptedBlock = [
            (inverseKeyMatrix[0] * block[0] + inverseKeyMatrix[1] * block[1]) % 26,
            (inverseKeyMatrix[2] * block[0] + inverseKeyMatrix[3] * block[1]) % 26
        ];

        result += String.fromCharCode(decryptedBlock[0] + 65);
        result += String.fromCharCode(decryptedBlock[1] + 65);
    }

    return result;
}

// Hàm xử lý khi nhấn nút Thực hiện
function processText() {
    const plainText = document.getElementById("plainText").value.trim();
    const keyInput = document.getElementById("key").value.trim().split(',');
    const action = document.querySelector('input[name="action"]:checked').value;

    if (!plainText || keyInput.length !== 4) {
        alert("Vui lòng nhập văn bản và khóa hợp lệ.");
        return;
    }

    const keyMatrix = keyInput.map(Number);

    if (action === "encode") {
        const result = hillCipherEncrypt(plainText, keyMatrix);
        document.getElementById("result").value = result;
    } else if (action === "decode") {
        // Cần tính ma trận khóa nghịch đảo trước khi giải mã (ví dụ đơn giản không bao gồm tính toán nghịch đảo)
        alert("Giải mã Hill Cipher yêu cầu ma trận khóa nghịch đảo.");
    }
}

// Các hàm loadFile() và downloadFile() tương tự như trên.
