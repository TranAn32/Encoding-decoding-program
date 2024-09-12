// Hàm tính nghịch đảo modulo
function modInverse(a, m) {
    a = a % m;
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
            return x;
        }
    }
    return -1; // Không có nghịch đảo
}

// Hàm mã hóa Affine Cipher
function affineCipher(text, a, b, mode) {
    const m = 26; // Số ký tự trong bảng chữ cái
    let result = "";

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let charCode = text.charCodeAt(i);

        // Xử lý chỉ cho các ký tự chữ cái (chữ thường)
        if (charCode >= 97 && charCode <= 122) {
            let x = charCode - 97; // Đưa mã ASCII về [0, 25]

            if (mode === "encode") {
                let encoded = (a * x + b) % m;
                result += String.fromCharCode(encoded + 97); // Chuyển ngược lại về mã ASCII
            } else if (mode === "decode") {
                let a_inv = modInverse(a, m); // Tìm nghịch đảo của a modulo m
                if (a_inv === -1) {
                    alert("Không có nghịch đảo của 'a', giải mã không thể thực hiện.");
                    return "";
                }
                let decoded = (a_inv * (x - b + m)) % m;
                result += String.fromCharCode(decoded + 97); // Chuyển ngược lại về mã ASCII
            }
        } else {
            result += char; // Giữ nguyên các ký tự không phải chữ cái
        }
    }
    return result;
}

// Hàm xử lý khi nhấn nút Thực hiện
function processText() {
    const plainText = document.getElementById("plainText").value.trim().toLowerCase();
    const a = parseInt(document.getElementById("a").value);
    const b = parseInt(document.getElementById("b").value);
    const action = document.querySelector('input[name="action"]:checked').value;

    if (!plainText) {
        alert("Vui lòng nhập bản rõ hoặc bản mã.");
        return;
    }

    const result = affineCipher(plainText, a, b, action);
    document.getElementById("result").value = result;
}

// Hàm đọc file .txt và thêm nội dung vào ô "Nhập bản rõ"
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
        document.getElementById('plainText').value = fileContent.toLowerCase();  // Gán nội dung file vào ô "Nhập bản rõ"
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
