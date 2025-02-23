"use client";

const API_URL = "http://localhost:5000/api/hotels";
const HOTEL_TAGS_URL = "http://localhost:5000/api/hotel_tags";
const HOTEL_ROOM_TYPES_URL = "http://localhost:5000/api/hotel_room_types";
const ROOM_BASE_PRICE_URL = "http://localhost:5000/api/room_base_price";
const ROOM_TYPES_URL = "http://localhost:5000/api/read/room_types"; 
const ROOM_INVENTORY_URL = "http://localhost:5000/api/room_inventory";
const HOTEL_IMAGES_URL = "http://localhost:5000/api/hotel_images";
const HOTEL_ORDERS_URL = "http://localhost:5000/api/hotel_orders";
const ORDER_DOGS_URL = "http://localhost:5000/api/order_dogs";
const HOTEL_FAVORITES_URL = "http://localhost:5000/api/hotel_favorites";
const HOTEL_REVIEW_URL = "http://localhost:5000/api/hotel_review";

const getToken = () => localStorage.getItem("loginWithToken");

// 所有 C
export const getAllHotels = async () => {
  const res = await fetch(API_URL, { method: "GET" });
  return await res.json();
};
// id
export const getHotelById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "GET" });
  return await res.json();
};

export const fetchHotelsCount = async () => {
  try {
    const res = await fetch(`${API_URL}/count`);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

    const data = await res.json();
    console.log("從 API 獲取的總飯店數量:", data.total);
    return data.total;
  } catch (error) {
    console.error("獲取總飯店數量失敗:", error);
    return 0;
  }
};

export const getPaginatedHotels = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    const res = await fetch(`${API_URL}/paginated?limit=${limit}&offset=${offset}`);

    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

    const data = await res.json();
    console.log(`取得第 ${page} 頁的飯店數據:`, data);
    return data;
  } catch (error) {
    console.error("獲取飯店失敗:", error);
    return [];
  }
};


export const getSearch = async () => {
  const res = await fetch(`${API_URL}/search`, { method: "GET" });
  return await res.json();
};

export const getOperatorHotels = async () => {
  const token = getToken();
  const res = await fetch(`${API_URL}/operator`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};
export const createHotel = async (formData) => {
  const token = getToken();
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return await res.json();
};

export const updateHotel = async (id, formData) => {
  const token = getToken();
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return await res.json();
};
export const softDeleteHotel = async (id) => {
  const token = getToken();
  const res = await fetch(`${API_URL}/${id}/soft-delete`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};

//標籤C
export const getAllTags = async () => {
  try {
    const res = await fetch(`${HOTEL_TAGS_URL}/tags`, { method: "GET" });
    if (!res.ok) throw new Error(`錯誤! Status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("獲取標籤失敗:", error);
    return []; // API 失敗時回傳空陣列，避免前端崩潰
  }
};
export const getHotelTags = async (hotelId) => {
  try {
    const res = await fetch(`${HOTEL_TAGS_URL}/${hotelId}`, { method: "GET" });
    if (!res.ok) throw new Error(`錯誤! Status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(`獲取飯店 (${hotelId}) 標籤失敗:`, error);
    return [];
  }
};

export const removeHotelTag = async (hotelId, tagId) => {
  try {
    const res = await fetch(`${HOTEL_TAGS_URL}/${hotelId}/${tagId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error(`錯誤! Status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(`刪除標籤失敗 (${hotelId}, ${tagId}):`, error);
    return { success: false, message: "刪除標籤失敗" };
  }
};
//價格
// 取得所有飯店的價格範圍
export const getGlobalPriceRange = async () => {
  try {
    const res = await fetch(`${ROOM_BASE_PRICE_URL}/range`);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("獲取所有飯店價格範圍失敗:", error);
    return { min_price: 0, max_price: 10000 };
  }
};
// 取得所有房型價格
export const getRoomBasePrices = async () => {
  try {
    const res = await fetch(`${ROOM_BASE_PRICE_URL}`);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("獲取房型價格失敗:", error);
    return [];
  }
};

// 取得特定飯店價格範圍
export const getHotelPriceRange = async (hotelId) => {
  try {
    const res = await fetch(`${ROOM_BASE_PRICE_URL}/range/${hotelId}`);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(`獲取飯店 (${hotelId}) 價格範圍失敗:`, error);
    return {};
  }
};




//房型跟庫存

export const getAllRoomTypes = async () => {
  try {
    const res = await fetch(ROOM_TYPES_URL);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("獲取房型失敗:", error);
    return []; // 返回空陣列，避免前端崩潰
  }
};

export const getHotelRoomById = async (roomId) => {
  const res = await fetch(`${HOTEL_ROOM_TYPES_URL}/${roomId}`, {
    method: "GET",
  });
  return await res.json();
};

//OP ONLY
export const createHotelRoom = async (roomData) => {
  const token = getToken();
  const res = await fetch(HOTEL_ROOM_TYPES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(roomData),
  });
  return await res.json();
};
export const updateHotelRoom = async (roomId, updateData) => {
  const token = getToken();
  const res = await fetch(`${HOTEL_ROOM_TYPES_URL}/${roomId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });
  return await res.json();
};
export const deleteHotelRoom = async (roomId) => {
  const token = getToken();
  const res = await fetch(`${HOTEL_ROOM_TYPES_URL}/${roomId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};
//OP END

//房間庫存
export const getRoomInventory = async () => {
  const res = await fetch(ROOM_INVENTORY_URL, { method: "GET" });
  return await res.json();
};
//OP ONLY
export const updateRoomInventory = async (roomInventoryId, updateData) => {
  const token = getToken();
  const res = await fetch(`${ROOM_INVENTORY_URL}/${roomInventoryId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });
  return await res.json();
};
//OP END

//hotel的圖C
export const getAllHotelImages = async () => {
  const res = await fetch(HOTEL_IMAGES_URL, { method: "GET" });
  return await res.json();
};
export const getByIds = async (imageId) => {
  const res = await fetch(`${HOTEL_IMAGES_URL}/${imageId}`, { method: "GET" });
  return await res.json();
};
export const getByHotelId = async (hotelId) => {
  const res = await fetch(`${HOTEL_IMAGES_URL}/hotel/${hotelId}`, {
    method: "GET",
  });
  return await res.json();
};

//訂單C
export const getAllHotelOrders = async () => {
  const token = getToken();
  const res = await fetch(HOTEL_ORDERS_URL, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};
// 取得特定訂單
export const getOrderById = async (orderId) => {
  const token = getToken();
  const res = await fetch(`${HOTEL_ORDERS_URL}/${orderId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};
export const createNewOrder = async (orderData) => {
  const token = getToken();
  const res = await fetch(HOTEL_ORDERS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });
  return await res.json();
};
// OP ONLY
export const updateOrder = async (orderId, updateData) => {
  const token = getToken();
  const res = await fetch(`${HOTEL_ORDERS_URL}/${orderId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });
  return await res.json();
};
export const changeOrderStatus = async (orderId, status) => {
  const token = getToken();
  const res = await fetch(`${HOTEL_ORDERS_URL}/${orderId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  return await res.json();
};
export const updateOrderPayment = async (orderId, paymentStatus) => {
  const token = getToken();
  const res = await fetch(`${HOTEL_ORDERS_URL}/${orderId}/payment`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ paymentStatus }),
  });
  return await res.json();
};
export const softDeleteOrder = async (orderId) => {
  const token = getToken();
  const res = await fetch(`${HOTEL_ORDERS_URL}/${orderId}/soft-delete`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};
//OP END

//訂單裡面狗的資料
export const getAllOrderDogs = async () => {
  const token = getToken();
  const res = await fetch(ORDER_DOGS_URL, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};
//
export const getOrderDogs = async (orderId) => {
  const token = getToken();
  const res = await fetch(`${ORDER_DOGS_URL}/${orderId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};
export const createOrderDog = async (dogData) => {
  const token = getToken();
  const res = await fetch(ORDER_DOGS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dogData),
  });
  return await res.json();
};
export const updateOrderDog = async (dogId, updateData) => {
  const token = getToken();
  const res = await fetch(`${ORDER_DOGS_URL}/${dogId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });
  return await res.json();
};
export const deleteOrderDog = async (dogId) => {
  const token = getToken();
  const res = await fetch(`${ORDER_DOGS_URL}/${dogId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};
//END

//收藏C
export const getUserFavorites = async () => {
  const token = getToken();
  const res = await fetch(HOTEL_FAVORITES_URL, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};
export const addHotelToFavorites = async (hotelId) => {
  const token = getToken();
  const res = await fetch(HOTEL_FAVORITES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ hotelId }),
  });
  return await res.json();
};
export const removeHotelToFavorites = async (hotelId) => {
  const token = getToken();
  const res = await fetch(`${HOTEL_FAVORITES_URL}/${hotelId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ hotelId }),
  });
  return await res.json();
};

//ReviewC
export const getHotelReviews = async (hotelId) => {
  const res = await fetch(`${HOTEL_REVIEW_URL}/${hotelId}`, { method: "GET" });
  return await res.json();
};

export const addHotelReview = async (hotelId, reviewData) => {
  const token = getToken();
  const res = await fetch(HOTEL_REVIEW_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ hotelId, ...reviewData }),
  });
  return await res.json();
};
export const replyHotelReview = async (reviewId, replyData) => {
  const token = getToken();
  const res = await fetch(`${HOTEL_REVIEW_URL}/${reviewId}/reply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(replyData),
  });
  return await res.json();
};

export const deleteHotelReview = async (reviewId) => {
  const token = getToken();
  const res = await fetch(`${HOTEL_REVIEW_URL}/${reviewId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};
export const ratingAv = async () => {
  try {
    const res = await fetch(`${HOTEL_REVIEW_URL}/average`, { method: "GET" });

    if (!res.ok) {
      throw new Error(`獲取評分失敗: ${res.status} ${res.statusText}`);
    }

    return await res.json(); // 確保返回的是 Array
  } catch (error) {
    console.error("獲取飯店評分時發生錯誤:", error.message);
    return [];
  }
};
