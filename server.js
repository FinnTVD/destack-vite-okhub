/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";

const app = express();
const port = 5555;

app.use(cors());
app.use(express.json());

// Multer để xử lý upload file
const upload = multer({ dest: "uploads/" });

// API upload ảnh
app.post("/upload", upload.array("files"), (req, res) => {
  const files = req.files.map((file) => ({
    src: `http://localhost:5000/uploads/${file.filename}`,
  }));
  res.json(files);
});

// API xóa ảnh (chỉ giả lập)
app.delete("/delete", (req, res) => {
  res.json({ success: true });
});

// API lưu project
app.post("/save", (req, res) => {
  fs.writeFileSync("project.json", JSON.stringify(req.body.project, null, 2));
  res.json({ success: true });
});

// API tải project
app.get("/load", (req, res) => {
  if (fs.existsSync("project.json")) {
    const project = JSON.parse(fs.readFileSync("project.json"));
    res.json({ project });
  } else {
    res.json({ project: null });
  }
});

// Serve files từ thư mục uploads
app.use("/uploads", express.static("uploads"));

// Khởi động server
app.listen(port, () =>
  console.log(`✅ Server chạy tại: http://localhost:${port}`)
);
