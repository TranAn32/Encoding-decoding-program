// Hàm mã hóa AES
function aesEncrypt(plainText, key) {
    // Mã hóa sử dụng CryptoJS AES
    const encrypted = CryptoJS.AES.encrypt(plainText, key);
    return encrypted.toString();
}

// Hàm giải mã AES
function aesDecrypt(cipherText, key) {
    // Giải mã sử dụng CryptoJS AES
    const decrypted = CryptoJS.AES.decrypt(cipherText, key);
    return decrypted.toString(CryptoJS.enc.Utf8);
}

// Hàm xử lý khi nhấn nút Thực hiện
function processText() {
    const plainText = document.getElementById("plainText").value.trim();
    const key = document.getElementById("key").value.trim();
    const action = document.querySelector('input[name="action"]:checked').value;

    if (!plainText || (key.length !== 16 && key.length !== 24 && key.length !== 32)) {
        alert("Vui lòng nhập văn bản và khóa hợp lệ (16, 24 hoặc 32 ký tự).");
        return;
    }

    let result;
    if (action === "encode") {
        result = aesEncrypt(plainText, key);
    } else if (action === "decode") {
        result = aesDecrypt(plainText, key);
    }

    document.getElementById("result").value = result;
}

// Hàm tải tệp .txt và thêm nội dung vào ô "Nhập bản rõ"
function loadFile() {
    const file = document.getElementById('fileInput').files[0]; // Lấy file từ input
    
    if (!file) {
        alert("Vui lòng chọn một tệp!");
        return;
    }

    if (file.type !== "text/plain") {
        alert("Vui lòng chọn một tệp .txt!");
        return;
    }

    const reader = new FileReader();
    
    reader.onload = function(e) {
        const fileContent = e.target.result;  // Lấy nội dung của file
        console.log("File content:", fileContent);  // Kiểm tra xem nội dung file có được đọc hay không
        document.getElementById('plainText').value = fileContent;  // Gán nội dung file vào ô "Nhập bản rõ"
    };

    reader.onerror = function(e) {
        console.error("Error reading file", e);
        alert("Đã xảy ra lỗi khi đọc tệp!");
    };

    reader.readAsText(file);  // Đọc file dưới dạng text
}

// Hàm tải xuống kết quả dưới dạng tệp .txt
function downloadFile() {
    const resultText = document.getElementById('result').value;
    const blob = new Blob([resultText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'result.txt';
    link.click();
}
