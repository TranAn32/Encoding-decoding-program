// Hàm mã hóa Vigenère Cipher
function vigenereCipher(text, key, mode) {
    const m = 26; // Số ký tự trong bảng chữ cái
    let result = "";
    key = key.toLowerCase(); // Chuyển khóa thành chữ thường
    let keyIndex = 0; // Chỉ số để theo dõi vị trí của ký tự trong khóa

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let charCode = text.charCodeAt(i);

        // Xử lý chỉ cho các ký tự chữ cái (chữ thường)
        if (charCode >= 97 && charCode <= 122) {
            let x = charCode - 97; // Đưa mã ASCII về [0, 25]
            let k = key.charCodeAt(keyIndex % key.length) - 97; // Lấy ký tự tương ứng trong khóa

            if (mode === "encode") {
                let encoded = (x + k) % m;
                result += String.fromCharCode(encoded + 97); // Chuyển ngược lại về mã ASCII
            } else if (mode === "decode") {
                let decoded = (x - k + m) % m;
                result += String.fromCharCode(decoded + 97); // Chuyển ngược lại về mã ASCII
            }

            keyIndex++; // Chuyển sang ký tự tiếp theo trong khóa
        } else {
            result += char; // Giữ nguyên các ký tự không phải chữ cái
        }
    }
    return result;
}

// Hàm xử lý khi nhấn nút Thực hiện
function processText() {
    const plainText = document.getElementById("plainText").value.trim().toLowerCase();
    const key = document.getElementById("key").value.trim().toLowerCase();
    const action = document.querySelector('input[name="action"]:checked').value;

    if (!plainText || !key) {
        alert("Vui lòng nhập bản rõ hoặc bản mã và từ khóa.");
        return;
    }

    const result = vigenereCipher(plainText, key, action);
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
