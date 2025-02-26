"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import styles from "../css/CartList.module.css";
// import "../css/CartList.css";
import { useCart } from "@/hooks/use-cart";
import Header from "@/app/components/layout/header";
import Breadcrumb from "@/app/course/_components/Id/breadcrumb";
import Thead from "@/app/components/cart/thead";
import Other from "../../components/teacher/otherTeacher";
import Link from "next/link";
export default function CartListPage(props) {
  const {
    productItems = [],
    courseItems = [],
    hotelItems = [],
    totalProductAmount,
    totalProductQty,
    totalCourseAmount,
    totalCourseQty,
    totalHotelAmount,
    totalHotelQty,
    onIncrease,
    onDecrease,
    onRemove,
  } = useCart();

  const totalAmount = totalProductAmount + totalCourseAmount + totalHotelAmount;

  const teacherData = [
    {
      imgSrc: "/teacher-img/Zoe.png",
      col: "col-6 col-md-3",
      name: "Zoe",
      text: "寵物訓練",
      link: "/teacher/info",
    },
    {
      imgSrc: "/teacher-img/Zoe.png",
      col: "col-6 col-md-3",
      name: "Zoe",
      text: "寵物訓練",
      link: "/teacher/info",
    },
    {
      imgSrc: "/teacher-img/Zoe.png",
      col: "col-6 col-md-3",
      name: "Zoe",
      text: "寵物訓練",
      link: "/teacher/info",
    },
    {
      imgSrc: "/teacher-img/Zoe.png",
      col: "col-6 col-md-3",
      name: "Zoe",
      text: "寵物訓練",
      link: "/teacher/info",
    },
  ];

  return (
    <>
      <Header />
      <div>
        <div className={styles.cartImg}>
          <img src="/cart/cattlist.png" />
        </div>

        <div className="container">
          <Breadcrumb
            links={[
              { label: "首頁 ", href: "/" },
              {
                label: " 購物車",
                href: "/cart/CartList",
                active: true,
              },
            ]}
          />
          <div className={`${styles.customTable} row`}>
            <table
              className="col-lg-8 col-md-auto col-auto me-5 mb-5"
              style={{ marginLeft: "auto" }}
            >
              {productItems.length > 0 && (
                <>
                  <Thead />
                  <tbody>
                    {/* 顯示商品 */}
                    {productItems.map((cartItem) => (
                      <tr key={cartItem.id}>
                        <td className={styles.table}>
                          <img src={cartItem.img} alt={cartItem.name} />
                        </td>
                        <td>{cartItem.name}</td>
                        <td>{cartItem.price}</td>
                        <td>
                          <button onClick={() => onIncrease(cartItem.id)}>
                            +
                          </button>
                          {cartItem.count}
                          <button onClick={() => onDecrease(cartItem.id)}>
                            -
                          </button>
                        </td>
                        <td>{cartItem.count * cartItem.price}</td>
                        <td>
                          <button
                            style={{
                              border: "transparent",
                              backgroundColor: "white",
                            }}
                            onClick={() => onRemove(cartItem.id)}
                          >
                            <FontAwesomeIcon
                              icon={faTrashAlt}
                              style={{ color: "#f2662b" }}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}

              {courseItems.length > 0 && (
                <>
                  <Thead />
                  <tbody>
                    {/* 顯示課程 */}
                    {courseItems.map((cartItem) => (
                      <tr key={cartItem.id}>
                        <td className={styles.table}>
                          <img src={cartItem.img} alt={cartItem.name} />
                        </td>
                        <td>{cartItem.name}</td>
                        <td>{cartItem.price}</td>
                        <td>
                          <button onClick={() => onIncrease(cartItem.id)}>
                            +
                          </button>
                          {cartItem.count}
                          <button onClick={() => onDecrease(cartItem.id)}>
                            -
                          </button>
                        </td>
                        <td>{cartItem.count * cartItem.price}</td>
                        <td>
                          <button
                            style={{
                              border: "transparent",
                              backgroundColor: "white",
                            }}
                            onClick={() => onRemove(cartItem.id)}
                          >
                            <FontAwesomeIcon
                              icon={faTrashAlt}
                              style={{ color: "#f2662b" }}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}

              {hotelItems.length > 0 && (
                <>
                  <Thead />
                  <tbody>
                    {/* 顯示旅館 */}
                    {hotelItems.map((cartItem) => (
                      <tr key={cartItem.id}>
                        <td className={styles.table}>
                          <img src={cartItem.img} alt={cartItem.name} />
                        </td>
                        <td>{cartItem.name}</td>
                        <td>{cartItem.price}</td>
                        <td>
                          <button onClick={() => onIncrease(cartItem.id)}>
                            +
                          </button>
                          {cartItem.count}
                          <button onClick={() => onDecrease(cartItem.id)}>
                            -
                          </button>
                        </td>
                        <td>{cartItem.count * cartItem.price}</td>
                        <td>
                          <button
                            style={{
                              border: "transparent",
                              backgroundColor: "white",
                            }}
                            onClick={() => onRemove(cartItem.id)}
                          >
                            <FontAwesomeIcon
                              icon={faTrashAlt}
                              style={{ color: "#f2662b" }}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            </table>

            {/* 顯示摘要區 */}
            <aside
              className={`${styles.aside} col-lg-3 col-md-auto col-auto mb-5`}
              style={{ margin: "auto" }}
            >
              <div className="aside-card">
                <div
                  className={`${styles.summaryItem} d-flex justify-content-between`}
                >
                  <span>商品小計</span>
                  <span>{`Rs. ${totalProductAmount}`}</span>
                </div>
                <div
                  className={`${styles.summaryItem} d-flex justify-content-between`}
                >
                  <span>課程小計</span>
                  <span>{`Rs. ${totalCourseAmount}`}</span>
                </div>
                <div
                  className={`${styles.summaryItem} d-flex justify-content-between`}
                >
                  <span>旅館小計</span>
                  <span>{`Rs. ${totalHotelAmount}`}</span>
                </div>
                <div
                  className={`${styles.summaryItem} d-flex justify-content-between mt-3`}
                >
                  <span>總金額</span>
                  <span
                    className={styles.totalmoney}
                  >{`NT$ ${totalAmount}`}</span>
                </div>
              </div>

              {/* 折扣區 */}
              <div
                className={`${styles.summaryItem} ${styles.summaryItem2} d-flex justify-content-between`}
              >
                <span>折扣金額</span>
                <span>-</span>
              </div>
              <div
                className={`${styles.summaryItem} ${styles.summaryItem2} d-flex justify-content-between`}
              >
                <span>總金額:</span>
                <span
                  className={styles.totalmoney}
                >{`NT$ ${totalAmount}`}</span>
              </div>

              {/* 結帳按鈕 */}
              <div className="d-flex justify-content-center pt-5 pb-5">
                {/* <button
                  type="submit"
                  style={{ backgroundColor: "#f2662b", color: "#fff" }}
                  className="btn w-50"
                  onClick={() => history.push("/cart/CartListPay")}
                >
                  商品結帳
                </button> */}
                <Link
                  style={{ backgroundColor: "#f2662b", color: "#fff" }}
                  className="btn w-50"
                  href={{
                    pathname: "/cart/CartListPay",
                    query: {
                      productItems: JSON.stringify(productItems),
                      courseItems: JSON.stringify(courseItems),
                      hotelItems: JSON.stringify(hotelItems),
                      totalAmount: totalAmount,
                    },
                  }}
                >
                  前往結帳
                </Link>
              </div>
            </aside>
          </div>

          {/* 推薦商品區 */}
          <div className="main2">
            <div>
              <h2>加購其他優惠商品</h2>
              <Other cards={teacherData} />
            </div>
            <div className="card"></div>
            <div>
              <h2>看看其他精選商品 </h2>
              <Other cards={teacherData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
