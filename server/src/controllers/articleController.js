import { getAllarticle, getIdS, createArticlesS, deleteArticleS, updateArticleS } from "../services/articleService.js";
import fs from 'fs';
import path from 'path';


// 獲取所有文章
export const getArticles = async (req,res) => {
  try {
    const articles = await getAllarticle();
    if (articles.length === 0) {
      return res.status(404).json({ error: "找不到全部文章" });
    }

    // 格式化文章資料，處理 created_at、updated_at，並設定 cover_image 預設值
    const formattedArticles = articles.map(article => ({
      ...article,
      created_at: new Date(article.created_at).toISOString().split('T')[0], // 只取日期
      updated_at: new Date(article.updated_at).toISOString().split('T')[0],  // 只取日期
      cover_image: article.cover_image || "http://localhost:5000/api/articles/image4.jpg" // 設定預設圖片
    }));
    // console.log(formattedArticles)
    res.json(formattedArticles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






export const getId = async (req, res) => {
  const { id } = req.params;

  try {
    const results = await getIdS(id);

    if (!results || results.length === 0) {
      return res.status(404).json({ message: "文章不存在" });
    }

    // 格式化日期（只顯示 YYYY-MM-DD）
    const formatDate = (date) => date ? new Date(date).toISOString().split('T')[0] : null;

    // 組合文章資料
    const article = {
      id: results[0].id,
      title: results[0].title,
      content: results[0].content,
      cover_image: results[0].cover_image,
      author_id: results[0].user_id,
      author_name: results[0].name,
      category_id: results[0].category_id,
      category_name: results[0].category_name,
      created_at: formatDate(results[0].created_at),
      updated_at: formatDate(results[0].updated_at),
      comments: []
    };

    const commentMap = new Map(); // 用 Map 避免重複

    results.forEach(row => {
      if (row.comment_id && !commentMap.has(row.comment_id) && row.is_deleted !== 1) {
        let authorImg = row.commenter_img; // 取得原始圖片

        // 檢查圖片是否為空值、null 或未定義，或者圖片檔案不存在
        if (!authorImg || authorImg.trim() === "") {
          authorImg = "Dog5.png"; // 預設圖片
        } else {
          const imgPath = path.join(process.cwd(), 'public/user/img', authorImg);
          if (!fs.existsSync(imgPath)) {
            authorImg = "Dog5.png"; // 若圖片不存在則使用預設圖片
          }
        }

        commentMap.set(row.comment_id, {
          id: row.comment_id,
          content: row.comment_content,
          author: row.commenter_name,
          author_img: authorImg,
          is_deleted: row.is_deleted
        });
      }
    });

    article.comments = Array.from(commentMap.values());
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 創建文章

export const createArticle = async (req, res) => {
  const { title, content, author_id, category_id, article_img } = req.body;
  // console.log(req.body);
  try {
    // 呼叫服務層函數來創建文章
    const article = await createArticlesS({ title, content, author_id, category_id, article_img });

    // 返回創建成功的響應
    res.status(201).json({
      message: "文章創建成功",
      article
    });
    // console.log(article);
  } catch (err) {
    // 如果有錯誤，返回錯誤響應
    console.log(err);

    res.status(500).json({
      message: "文章創建失敗",
      error: err.message
    });
  }

}

// 處理創建文章時的圖片上傳

// controllers/uploadController.js
export const uploadController = {
  handleUpload: (req, res) => {
    try {
      // multer 成功後，檔案資訊會放在 req.file
      // 這裡可以做：存 DB、記錄、或其他商業邏輯
      const filePath = `http://localhost:5000/api/articles/${req.file.filename}`

      // 最後回傳給前端
      res.status(200).json({
        link: filePath,
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
}


// 編輯文章

export const updateArticle = async (req, res) => {
  const { id } = req.params;  // 從 URL 參數中獲取文章的 ID
  const { title, content, author_id, category_id, article_img } = req.body;

  try {
    // 呼叫服務層來更新文章資料
    const updatedArticle = await updateArticleS({
      id, title, content, author_id, category_id, article_img
    });

    // 返回成功響應
    res.status(200).json({
      message: "文章更新成功",
      article: updatedArticle
    });
  } catch (err) {
    // 返回錯誤響應
    res.status(500).json({
      message: "文章更新失敗",
      error: err.message
    });
  }
};



// 刪除文章
export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("Article ID:", id);
    const article = await deleteArticleS(id);
  

    return res.json({ message: "文章刪除成功", deletedArticle: article }); // 成功刪除
  } catch (error) {
    return res.status(500).json({ error: error.message + "是我這裡出問題" });
   
  }
};