import express from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import {
  getArticles,
  getId,
  createArticle,
  deleteArticle,
  updateArticle,
  uploadController,
} from "../controllers/articleController.js";
import { getArticlesByAuthorS } from "../services/articleService.js";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = express.Router();

// 用於處理一般表單資料，不包含檔案
const noFileUpload = multer();

// 為圖片上傳設定儲存配置
const uploadDir = path.join(process.cwd(), "public/article_img");
const fileUpload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${uuidv4()}${ext}`;
      cb(null, filename);
    },
  }),
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

router.use(express.static(resolve(__dirname, "../../public", "article_img")));
router.get("/", getArticles);
router.get("/:id", getId);
router.post("/", noFileUpload.none(), createArticle);
router.delete("/:id", deleteArticle);
router.put("/:id", noFileUpload.none(), updateArticle);

// 文章編輯器中的圖片顯示路由
router.post("/upload", fileUpload.single("file"), uploadController.handleUpload);
// 文章圖片上傳的路由
router.post("/upload/cover", fileUpload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    // 返回上傳成功的文件信息，並且格式化為完整的 URL
    const fileUrl = `http://localhost:5000/api/articles/${req.file.filename}`;
    res.status(200).json({
      article_img: fileUrl, // 修改這裡
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 依 author_id 獲取文章
router.get("/author/:author_id", async (req, res) => {
  const { author_id } = req.params;

  try {
    const articles = await getArticlesByAuthorS(author_id);

    const formattedArticles = articles.map(article => ({
      ...article,
      created_at: new Date(article.created_at).toISOString().split('T')[0], // 只取日期
      updated_at: new Date(article.updated_at).toISOString().split('T')[0],  // 只取日期
      cover_image: article.cover_image || "http://localhost:5000/api/articles/image4.jpg" // 設定預設圖片
    }));
    res.json(formattedArticles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;
