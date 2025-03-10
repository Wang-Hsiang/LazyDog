import React from "react";
import Link from "next/link";
import couponStyles from "./userCoupon.module.css";

const Hotel = ({ hotelOrders }) => {
  return (
    <>
      {hotelOrders.map((order) => {
        const imageUrl =
          order.images?.length > 0 && order.images[0].url
            ? order.images[0].url.startsWith("http")
              ? order.images[0].url
              : `http://localhost:5000${order.images[0].url}`
            : "/hotel/hotel-uploads/1-l-room.webp";

        return (
          <div key={order.id} className={`mt-2 ${couponStyles.suCouponCard}`}>
            <Link href="">
              <img
                src={imageUrl}
                style={{ maxHeight: "100px", objectFit: "cover" }}
                alt={`旅館訂單 ${order.id}`}
                onError={(e) =>
                  (e.target.src = "/hotel/hotel-uploads/1-l-room.webp")
                }
              />
            </Link>
            <div className={couponStyles.suDetails}>
              <Link href="" style={{ color: "#f5842b" }}>
                旅館編號: {order.hotel_id}
              </Link>
              <p className="text-muted">
                入住時間: {order.check_in}~{order.check_out}
              </p>
            </div>
            <span className={couponStyles.suPrice}>
              NT {order.final_amount.split(".")[0]}
            </span>
          </div>
        );
      })}
    </>
  );
};

export default Hotel;
