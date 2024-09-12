// Hàm mã hóa Caesar Cipher
function caesarCipher(text, shift, mode) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);
        if (mode === "encode") {
            result += String.fromCharCode((charCode + shift) % 256); 
        } else if (mode === "decode") {
            result += String.fromCharCode((charCode - shift + 256) % 256); 
        }
    }
    return result;
}

// Hàm xử lý khi nhấn nút Thực hiện
function processText() {
    const plainText = document.getElementById("plainText").value.trim();
    const shift = parseInt(document.getElementById("shift").value);
    const action = document.querySelector('input[name="action"]:checked').value;

    if (!plainText) {
        alert("Vui lòng nhập bản rõ hoặc bản mã.");
        return;
    }

    const result = caesarCipher(plainText, shift, action);
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
