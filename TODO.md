# TODO

- [x] Cập nhật `src/components/QuestionCard.jsx`
  - [x] Thêm state `showCorrectPopup`
  - [x] Sửa `handleSelect` khi đúng: bật popup, không hiển thị explanation dưới card, timeout ~3s rồi gọi `onCorrect()`
  - [x] Chặn render Explanation khi đúng: dùng `showExplanation && !isCorrect`
  - [x] Thêm `AnimatePresence` render popup (overlay mờ + nội dung chính xác)
  - [x] Đảm bảo `handleRetry` tắt popup

- [ ] Test thủ công:
  - [ ] Chọn đúng: card không bị kéo dài, popup hiện đúng nội dung, tự đóng sau ~3s
  - [ ] Chọn sai: vẫn hiện explanation + nút Thử lại
