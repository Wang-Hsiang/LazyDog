import pool from "../config/mysql.js";

// 獲取全部文章
export const getAllarticle = async () => {
  try {
    const [articles] = await pool.query(
      `SELECT articles.*, 
      article_img.url AS cover_image,
      users.name AS name,
      article_type.name AS category_name
       FROM articles 
       LEFT JOIN article_img ON articles.id = article_img.article_id 
       LEFT JOIN users ON articles.author_id = users.id
       LEFT JOIN article_type ON articles.category_id = article_type.id
       WHERE articles.is_deleted = 0 AND users.is_deleted = 0`
    );
    return articles;
  } catch (error) {
    throw new Error(" 無法取得所有文章：" + error.message);
  }
};

// 獲取指定文章
export const getIdS = async (id) => {
  try {
    const sqlString = 
    `SELECT articles.*, 
    article_img.url AS cover_image, 
    users.id AS user_id, 
    users.name AS name, 
    article_type.name AS category_name, 
    comments.id AS comment_id, 
    comments.content AS comment_content, 
    comment_users.name AS commenter_name, 
    comment_users.user_img AS commenter_img,
    comments.is_deleted AS is_deleted
    FROM articles 
    LEFT JOIN article_img ON articles.id = article_img.article_id 
    LEFT JOIN users ON articles.author_id = users.id 
    LEFT JOIN article_type ON articles.category_id = article_type.id
    LEFT JOIN comments ON articles.id = comments.article_id 
    LEFT JOIN users AS comment_users ON comments.user_id = comment_users.id 
    WHERE articles.is_deleted = 0 AND users.is_deleted = 0 AND articles.id = ?`;

    const [articles] = await pool.query(sqlString, [id]);
    return articles;
  } catch (error) {
    throw new Error(`找不到 ${id} 文章，文章可能不存在或可能已被刪除：${error.message}`);

  }
}

// 創建文章

export const createArticlesS = async (createArticle) => {

  const connection = await pool.getConnection();
  try {
    const { title, content, author_id, category_id, article_img } = createArticle;

    // 開始事務
    await connection.beginTransaction();

    // 第一步：插入文章資料到 articles 資料表
    const [result] = await connection.query(
      `INSERT INTO articles 
          (title, content, author_id, category_id, created_at, updated_at, is_deleted) 
          VALUES (?, ?, ?, ?, NOW(), NOW(), 0)`,
      [title, content, author_id, category_id]
    );
    // console.log(result)
    // 第二步：將圖片 URL 插入 article_img 資料表，並與文章建立關聯
    const articleId = result.insertId;  // 取得剛插入的文章的 ID
    await connection.query(
      `INSERT INTO article_img (article_id, url) VALUES (?, ?)`,
      [articleId, article_img]  // 插入對應的 article_id 和圖片 URL
    );

    // 提交事務
    // console.log(req.body)
    await connection.commit();

    return {
      id: articleId,
      title,
      content,
      author_id,
      category_id,
      article_img  // 返回圖片 URL
    };
  } catch (err) {
    // 回滾事務
    await connection.rollback();
    throw new Error("文章創建失敗：" + err.message);
  } finally {
    connection.release();
  }
};


// 編輯文章

export const updateArticleS = async (updateArticle) => {
  const connection = await pool.getConnection();
  try {
    const { id, title, content, author_id, category_id, article_img } = updateArticle;

    // 開始事務
    await connection.beginTransaction();

    // 第一步：更新 articles 資料表的文章內容
    const [result] = await connection.query(
      `UPDATE articles SET 
        title = ?, content = ?, author_id = ?, category_id = ?, updated_at = NOW()
        WHERE id = ?`,
      [title, content, author_id, category_id, id]
    );

    // 第二步：更新 article_img 資料表中的圖片 URL（如果提供了新的圖片 URL）
    if (article_img) {
      await connection.query(
        `UPDATE article_img SET url = ? WHERE article_id = ?`,
        [article_img, id]  // 更新對應的圖片 URL
      );
    }

    // 提交事務
    await connection.commit();

    return {
      id,
      title,
      content,
      author_id,
      category_id,
      article_img  // 返回更新後的圖片 URL
    };
  } catch (err) {
    // 回滾事務
    await connection.rollback();
    throw new Error("文章更新失敗：" + err.message);
  } finally {
    connection.release();
  }
};


// 刪除文章
export const deleteArticleS = async (id) => {
  try {
    const [result] = await pool.query(
      `UPDATE articles SET is_deleted = 1, updated_at = NOW() WHERE id = ? AND is_deleted = 0`,
      [id]
    );
    if (result.affectedRows == 0) {
      return { error: "刪除失敗，找不到該文章" };
    }
    return { message: "以軟刪除文章", id };
  } catch (error) {
    console.error("刪除文章時出錯:", error);
    throw new Error("刪除文章時出錯：" + error.message);
  }
};

// 搜尋文章
export const searchKeywordS = async (keyword) => {
  console.log("我在server端的try外面")
  try {
    // console.log("我在server端的try李面")
    if (!keyword || keyword.trim() == "") {
      return { error: "請提供有效的搜尋關鍵字" };
    }
    const [articles] = await pool.execute(
      `SELECT articles.*,
      article_img.url AS cover_image,
      users.name AS name,
      article_type.name AS category_name,
      comments.id AS comment_id,
       comments.content AS comment_content,
       comment_users.name AS commenter_name, 
       comment_users.user_img AS commenter_img
      FROM articles 
      LEFT JOIN article_img ON articles.id = article_img.article_id 
      LEFT JOIN users ON articles.author_id = users.id
      LEFT JOIN article_type ON articles.category_id = article_type.id
      LEFT JOIN comments ON articles.id = comments.article_id 
      LEFT JOIN users AS comment_users ON comments.user_id = comment_users.id
      WHERE (articles.title LIKE ?) AND articles.is_deleted = 0 AND users.is_deleted = 0`,
      [`%${keyword}%`]
    );
    // console.log(articles)
    return articles;
  } catch (error) {
    // console.error("搜尋文章時出錯:", error);
    throw new Error("搜尋文章時出錯：" + error.message);
  }
}


// 根據使用者id調取所有該作者沒有被ban的文章
export const getArticlesByAuthorS = async (author_id) => {
  try {
    const [articles] = await pool.query(
      `SELECT articles.*, 
      article_img.url AS cover_image,
      users.name AS author_name,
      article_type.name AS category_name
      FROM articles 
      LEFT JOIN article_img ON articles.id = article_img.article_id 
      LEFT JOIN users ON articles.author_id = users.id
      LEFT JOIN article_type ON articles.category_id = article_type.id
      WHERE articles.is_deleted = 0 
      AND users.is_deleted = 0 
      AND articles.author_id = ?`,
      [author_id]
    );

    if (articles.length === 0) {
      return { message: "該作者沒有文章或文章已被刪除" };
    }

    return articles;
  } catch (error) {
    throw new Error(`獲取作者 ${author_id} 文章時發生錯誤：${error.message}`);
  }
};

