import pool from "../config/mysql.js";

export const getHotels = async () => {
  try {
    const [hotels] = await pool.query(
      "SELECT * FROM hotel WHERE is_deleted = 0"
    );
    return hotels;
  } catch (error) {
    console.log("取得失敗");
    throw new Error(" 無法取得旅館list：" + error.message);
  }
};

export const searchHotels = async (keyword) => {
  try {
    if (!keyword || keyword.trim() == "") {
      return { error: "請提供有效的搜尋關鍵字" };
    }
    const [hotels] = await pool.execute(
      "SELECT * FROM hotel WHERE name LIKE   ? AND is_deleted = 0",
      [`%${keyword}%`]
    );
    
    return hotels;
  } catch (error) {
    console.log(error);
    throw new Error("搜尋失敗");
  }
};

export const getId = async (id) => {
  try {
    const [hotels] = await pool.query(
      "SELECT * FROM hotel WHERE id = ? AND is_deleted = 0",
      [id]
    );

    if (hotels.length == 0) {
      throw new Error(`找不到 id=${id} 的旅館`);
    }

    return hotels[0];
  } catch (error) {
    throw new Error(`無法取得 id=${id} 旅館: ` + error.message);
  }
};

export const createHotels = async (hotelData) => {
  try {
    const { name, county, district, address, phone } = hotelData;

    const [result] = await pool.query(
      `INSERT INTO hotel 
          (name, county, district, address, phone, 
          created_at, updated_at, is_deleted) 
          VALUES (?, ?, ?, ?, ?, NOW(), NOW(), 0)`,
      [name, county, district, address, phone]
    );

    return { id: result.insertId, name, address, phone };
  } catch (err) {
    throw new Error("無法創立旅館：" + err.message);
  }
};

export const updateHotelById = async (updateData) => {
  try {
    // 解構賦值排除不應該更新的欄位(目前寫在{}裡的欄位) ...updateFields展開 運算值是剩下欄位
    //updateFields變成一個新的物件來存放剩餘可更新欄位

    const { id, created_at, average_rating, total_reviews, ...updateFields } =
      updateData;

    if (!id) {
      return { error: "缺少 id，無法更新旅館" };
    }

    // 如果 updateFields 是空的，不更新
    if (Object.keys(updateFields).length == 0) {
      return { error: "沒有提供更新欄位" };
    }

    console.log(" 需要更新的欄位:", updateFields);

    //  動態生成 SQL **需要再研究 **
    const keys = Object.keys(updateFields);
    const values = Object.values(updateFields);
    const setClause = keys.map((key) => `${key} = ?`).join(", ");
    values.push(id);

    const [result] = await pool.query(
      `UPDATE hotel SET ${setClause}, updated_at = NOW() WHERE id = ?`,
      values
    );

    if (result.affectedRows == 0) {
      return { error: "更新失敗，找不到該旅館" };
    }

    return { message: `旅館 id=${id} 更新成功` };
  } catch (error) {
    return { error: "無法更新旅館：" + error.message };
  }
};

export const softDeleteHotelById = async (id) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [existingHotel] = await connection.query(
      "SELECT * FROM hotel WHERE id = ? AND is_deleted = 0",
      [id]
    );

    if (existingHotel.length == 0) {
      await connection.rollback();
      return { error: `刪除失敗，找不到 id=${id} 或該旅館已刪除` };
    }

    // 軟刪除旅館
    const [result] = await connection.query(
      "UPDATE hotel SET is_deleted = 1 WHERE id = ?",
      [id]
    );

    if (result.affectedRows == 0) {
      await connection.rollback();
      return { error: `軟刪除失敗，找不到 id=${id}` };
    }

    await connection.commit();
    return { message: `旅館 id=${id} 已成功軟刪除` };
  } catch (error) {
    await connection.rollback();
    return { error: "無法刪除旅館：" + error.message };
  } finally {
    connection.release();
  }
};
