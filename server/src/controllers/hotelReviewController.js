import {
  createHotelReviews,
  replyHotelReviews,
  getHotelReviews,
  deleteReviews,
} from "../services/hotelReviewService.js";
import { addReviewImageService } from "../services/hotelreviewImageService.js";

export const createHotelReview = async (req, res) => {
  try {
    const { hotel_id, rating, comment } = req.body;
    const user_id = req.user.id;

    if (!hotel_id || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "請提供有效的評分 (1-5)" });
    }

    // **新增評論**
    const review = await createHotelReviews(user_id, hotel_id, rating, comment);
    if (!review) {
      return res.status(500).json({ error: "無法新增評論" });
    }

    // **處理圖片上傳**
    if (req.files && req.files.length > 0) {
      const imageUrls = req.files.map((file) => ({
        review_id: review.id,
        url: `/uploads/hotel_review_images/${file.filename}`,
      }));

      await Promise.all(
        imageUrls.map((img) =>
          addReviewImageService(img.review_id, img.url, null)
        )
      );
    }

    res
      .status(201)
      .json({ success: true, message: "評論已新增", data: review });
  } catch (error) {
    res.status(500).json({ error: "無法新增評論", details: error.message });
  }
};
export const replyHotelReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;
    const operator_id = req.user.id;

    if (!reply) {
      return res.status(400).json({ error: "請提供回覆內容" });
    }

    const updatedReview = await replyHotelReviews(id, operator_id, reply);
    if (!updatedReview) {
      return res.status(404).json({ error: "找不到該評論或無法回覆" });
    }

    res
      .status(200)
      .json({ success: true, message: "評論回覆成功", data: updatedReview });
  } catch (error) {
    res.status(500).json({ error: "無法回覆評論", details: error.message });
  }
};
export const getHotelReview = async (req, res) => {
  try {
    const { hotel_id } = req.params;
    const reviews = await getHotelReviews(hotel_id);

    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ error: "無法取得評論", details: error.message });
  }
};
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const success = await deleteReviews(id, user_id);
    if (!success) return res.status(403).json({ error: "你無權刪除此評論" });

    res.status(200).json({ success: true, message: "評論已刪除" });
  } catch (error) {
    res.status(500).json({ error: "無法刪除評論", details: error.message });
  }
};
