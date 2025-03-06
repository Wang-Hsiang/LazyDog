"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./category.module.css";
import Aside from "../../_components/aside/aside";
import Link from "next/link";
import Card from "../../_components/card/card";
import { useCategoryFetch, useDetailFetch } from "@/hooks/product/use-fetch";
import { useFavorite } from "@/hooks/product/use-favorite";

import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "bootstrap"; // 引入 Bootstrap 的 Carousel

export default function CategoryPage() {
  const {
    width,
    products,
    int,
    productLine,
    emptyMessage,
    category,
    keyword,
    setKeyword,
    newUrl,
    changeUrl,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    sortName,
    setSortName,
    pages,
    pageNow,
    setPageNow,
    product,
    mutate,
    isLoading,
    error,
  } = useCategoryFetch();
  const { CardInt, hotSale } = useDetailFetch();
  const [hot, setHot] = useState(0);

  const { favorite, setFavorite } = useFavorite();
  const [dropDown, setDropDown] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [pageInput, setPageInput] = useState("選擇分頁");
  const [collapseBtn, setCollapseBtn] = useState(false);
  const collapseRef = useRef(null);
  useEffect(() => {
    const clickOutside = (event) => {
      if (listOpen && !event.target.closest(`.${styles.dropdown}`)) {
        setListOpen(false);
      }
      if (dropDown && !event.target.closest(`.${styles.TitleFilter}`)) {
        setDropDown(false);
      }
      if (collapseBtn && !event.target.closest(`.${styles.collapseAside}`)) {
        collapseRef.current.click();
      }
    };
    document.addEventListener("click", clickOutside);
    return () => document.removeEventListener("click", clickOutside);
  }, [listOpen, dropDown, collapseBtn]);
  if (error) {
    return (
      <div className="container">
        <img style={{ width: "100%" }} src="/product/404.png" />
      </div>
    );
  }

  useEffect(() => {
    // 確保在組件加載後初始化 Carousel
    const carouselElement = document.getElementById(
      "carouselExampleIndicators"
    );
    const carousel = new Carousel(carouselElement, {
      interval: 4000, // 每2秒自動切換
      ride: "carousel", // 啟用自動輪播
    });
    return () => {
      carousel.dispose(); // 清除 Carousel 實例，避免記憶體泄漏
    };
  }, []);
  return (
    <>
      <div className={`${styles.collapseAside} d-lg-none`}>
        <div className={`${styles.collapseAsideContent}`}>
          <div
            className={`${styles.collapseHorizontal} collapse collapse-horizontal`}
            id="collapseWidthExample"
          >
            <Aside
              changeUrl={changeUrl}
              keyword={keyword}
              setKeyword={setKeyword}
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              setMinPrice={setMinPrice}
              sortName={sortName}
            />
            <button
              ref={collapseRef}
              className={`${styles.collapseAsideBtn} btn`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseWidthExample"
              aria-expanded="false"
              aria-controls="collapseWidthExample"
              onClick={() => setTimeout(() => setCollapseBtn(false), 50)}
            >
              <img src={`/product/font/left(orange).png`} alt="" />
            </button>
          </div>
          {collapseBtn == false && (
            <button
              className={`${styles.collapseAsideBtn} btn`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseWidthExample"
              aria-expanded="false"
              aria-controls="collapseWidthExample"
              onClick={() => setCollapseBtn(true)}
            >
              <img src={`/product/font/right(orange).png`} alt="" />
            </button>
          )}
        </div>
      </div>
      <div className={`${styles.Container} container`}>
        <section className={styles.DmArea}>
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={0}
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              />
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={1}
                aria-label="Slide 2"
              />
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={2}
                aria-label="Slide 3"
              />
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={3}
                aria-label="Slide 4"
              />
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={4}
                aria-label="Slide 5"
              />
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={5}
                aria-label="Slide 6"
              />
            </div>
            <div className="carousel-inner">
              <div className={`${styles.carouselItem} carousel-item active`}>
                <img
                  src="/product/DM/DM_1.webp"
                  className="d-block w-100"
                  alt=""
                />
              </div>
              <div className={`${styles.carouselItem} carousel-item`}>
                <img
                  src="/product/DM/DM_2.webp"
                  className="d-block w-100"
                  alt=""
                />
              </div>
              <div className={`${styles.carouselItem} carousel-item`}>
                <img
                  src="/product/DM/DM_3.webp"
                  className="d-block w-100"
                  alt=""
                />
              </div>
              <div className={`${styles.carouselItem} carousel-item`}>
                <img
                  src="/product/DM/DM_4.webp"
                  className="d-block w-100"
                  alt=""
                />
              </div>
              <div className={`${styles.carouselItem} carousel-item`}>
                <img
                  src="/product/DM/DM_5.webp"
                  className="d-block w-100"
                  alt=""
                />
              </div>
              <div className={`${styles.carouselItem} carousel-item`}>
                <img
                  src="/product/DM/DM_6.webp"
                  className="d-block w-100"
                  alt=""
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </section>
        <section className={styles.BreadcrumbsTitle}>
          <div className={`${styles.Breadcrumbs} d-none d-lg-flex`}>
            <Link href="/">首頁</Link>
            <img src="/product/font/right.png" alt="" />
            <Link href="/product/list">商品目錄</Link>
            <img src="/product/font/right.png" alt="" />
            <Link
              className={styles.BreadcrumbsActive}
              href={`/product/list/category?category=${category}`}
            >
              {category}
            </Link>
          </div>
          {products && (
            <div className={styles.Title}>
              <div className="d-none d-lg-flex">
                <h5>目前共{products.length}項商品</h5>
              </div>
              <div className={`${styles.Breadcrumbs} d-lg-none`}>
                <Link href="/">首頁</Link>
                <img src="/product/font/right.png" alt="" />
                <Link href="/product/list">商品目錄</Link>
                <img src="/product/font/right.png" alt="" />
                <Link
                  className={styles.BreadcrumbsActive}
                  href={`/product/list/category?category=${category}`}
                >
                  {category}
                </Link>
              </div>
              <div className={styles.TitleFilter}>
                <img
                  src={`/product/font/${
                    sortName.includes("名稱")
                      ? "filter-a"
                      : sortName.includes("價格")
                      ? "filter-m"
                      : sortName.includes("時間")
                      ? "filter-d"
                      : "filter"
                  }.png`}
                  alt=""
                />
                <div
                  className={styles["dropdown"]}
                  onMouseEnter={() => {
                    setDropDown(true);
                  }}
                  onMouseLeave={() => {
                    setDropDown(false);
                  }}
                >
                  <li
                    onClick={() => {
                      setDropDown(!dropDown);
                    }}
                  >
                    <h6 className={styles["dropbtn"]}>{sortName}</h6>
                  </li>
                  <div
                    className={`${
                      width <= 1024 && dropDown
                        ? styles["dropdown-contentOn"]
                        : width <= 1024
                        ? styles["dropdown-contentOff"]
                        : styles["dropdown-content"]
                    }`}
                  >
                    <h6
                      className={`${styles["dropdown-link"]} ${styles["dropdown-link-top"]}`}
                      onClick={() => {
                        changeUrl(
                          `http://localhost:5000/api/products/category?category=${category}&min=${minPrice}&max=${maxPrice}&sort=name`
                        );
                        setSortName("↓商品名稱");
                        setDropDown(false);
                      }}
                    >
                      ↓商品名稱
                    </h6>
                    <h6
                      className={styles["dropdown-link"]}
                      onClick={() => {
                        changeUrl(
                          `http://localhost:5000/api/products/category?category=${category}&min=${minPrice}&max=${maxPrice}&sort=price`
                        );
                        setSortName("↑商品價格");
                        setDropDown(false);
                      }}
                    >
                      ↑商品價格
                    </h6>
                    <h6
                      className={styles["dropdown-link"]}
                      onClick={() => {
                        changeUrl(
                          `http://localhost:5000/api/products/category?category=${category}&min=${minPrice}&max=${maxPrice}&sort=priceDown`
                        );
                        setSortName("↓商品價格");
                        setDropDown(false);
                      }}
                    >
                      ↓商品價格
                    </h6>
                    <h6
                      className={`${styles["dropdown-link"]}`}
                      onClick={() => {
                        changeUrl(
                          `http://localhost:5000/api/products/category?category=${category}&min=${minPrice}&max=${maxPrice}&sort=update`
                        );
                        setSortName("↑上架時間");
                        setDropDown(false);
                      }}
                    >
                      ↑上架時間
                    </h6>
                    <h6
                      className={`${styles["dropdown-link"]} ${styles["dropdown-link-bottom"]}`}
                      onClick={() => {
                        changeUrl(
                          `http://localhost:5000/api/products/category?category=${category}&min=${minPrice}&max=${maxPrice}&sort=updateDown`
                        );
                        setSortName("↓上架時間");
                        setDropDown(false);
                      }}
                    >
                      ↓上架時間
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
        <section className={styles.PdArea}>
          <div className="d-none d-lg-flex">
            <Aside
              changeUrl={changeUrl}
              keyword={keyword}
              setKeyword={setKeyword}
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              setMinPrice={setMinPrice}
              sortName={sortName}
            />
          </div>
          {!products && (
            <div className={styles.empty}>
              <h2>{emptyMessage}</h2>
              <section className={styles.OtherLike}>
                <h4 className={styles.OtherLikeTitle}>要不要看看其他好物...</h4>
                <div className={styles.OtherLikeContent}>
                  <button
                    type="button"
                    className={styles.ProductInfoImgSmallBtn}
                    onClick={() => {
                      setHot(hot - 1 < 0 ? hot : hot - 1);
                    }}
                  >
                    <img src="/product/font/left(orange).png" alt="" />
                  </button>
                  <ul className={`${styles.OtherLikeList} row`}>
                    {hotSale.length > 0 &&
                      hotSale?.map((v, i) => {
                        if (i < CardInt + hot && i >= hot) {
                          return (
                            <Card
                              key={`Card${i}`}
                              productID={v}
                              favorite={favorite}
                              setFavorite={setFavorite}
                            />
                          );
                        }
                      })}
                  </ul>
                  <button
                    type="button"
                    className={styles.ProductInfoImgSmallBtn}
                    onClick={() => {
                      setHot(
                        hot + 1 > hotSale.length - CardInt ? hot : hot + 1
                      );
                    }}
                  >
                    <img src="/product/font/right(orange).png" alt="" />
                  </button>
                </div>
              </section>
            </div>
          )}
          {products && (
            <main className={styles.PdList}>
              {[...Array(productLine)].map((value, index) => {
                return (
                  <ul className={`${styles.ProductCardGroup} row`} key={index}>
                    {product?.map((v, i) => {
                      if (index * int <= i && i < (index + 1) * int)
                        return (
                          <Card
                            key={v.productID}
                            productID={v.productID}
                            favorite={favorite}
                            setFavorite={setFavorite}
                          />
                        );
                    })}
                  </ul>
                );
              })}
              <nav>
                <ul className={styles.ProductListPagination}>
                  {products.length > 24 && (
                    <li className={`${styles.PageArrow}`}>
                      <Link
                        onClick={() => {
                          setPageNow(pageNow - 1 == 0 ? 1 : pageNow - 1);
                          pageNow - 1 > 1
                            ? setPageInput(`第 ${pageNow - 1} 頁`)
                            : setPageInput("選擇分頁");
                        }}
                        href={`/product/list/category?category=${category}&page=${
                          pageNow - 1 == 0 ? 1 : pageNow - 1
                        }`}
                      >
                        <img src="/product/font/left(orange).png" alt="" />
                      </Link>
                    </li>
                  )}
                  <li
                    className={`${styles.PageItem} page-item ${
                      pageNow == 1 ? styles.PageItemActive : ""
                    }`}
                  >
                    <Link
                      onClick={() => {
                        setPageNow(1);
                        setPageInput("選擇分頁");
                      }}
                      className={`${styles.PageLink} page-link `}
                      href={`/product/list/category?category=${category}&page=${1}`}
                    >
                      1
                    </Link>
                  </li>
                  {pages >= 3 && (
                    <div
                      className={`${styles.dropdown}`}
                      onMouseEnter={() => {
                        setListOpen(true);
                      }}
                      onMouseLeave={() => {
                        setListOpen(false);
                      }}
                    >
                      <button
                        className={`btn dropdown-toggle ${
                          styles.dropdownToggle
                        } ${
                          pageInput !== "選擇分頁" ? styles.PageItemActive : ""
                        }`}
                        type="button"
                        onClick={() =>
                          width > 1024 ? "" : setListOpen(!listOpen)
                        }
                      >
                        {pageInput}
                      </button>
                      <ul
                        className={`${
                          listOpen
                            ? styles.dropdownMenu
                            : styles.dropdownMenuOff
                        } dropdown-menu`}
                      >
                        {[...Array(pages)].map((v, i) => {
                          if (i > 0 && i < pages - 1) {
                            return (
                              <li
                                key={`li${i}`}
                                className={`dropdown-item ${
                                  styles.dropdownItem
                                } ${
                                  pageNow == i + 1 ? styles.PageItemActive : ""
                                }`}
                              >
                                <Link
                                  onClick={() => {
                                    setPageNow(i + 1);
                                    setPageInput(`第 ${i + 1} 頁`);
                                    setListOpen(false);
                                  }}
                                  className={`${styles.PageLink} page-link`}
                                  href={`/product/list/category?category=${category}&page=${
                                    i + 1
                                  }`}
                                >
                                  {i + 1}
                                </Link>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </div>
                  )}
                  {products.length > 24 && (
                    <li
                      className={`${styles.PageItem} page-item ${
                        pageNow == pages ? styles.PageItemActive : ""
                      }`}
                    >
                      <Link
                        onClick={() => {
                          setPageNow(pages);
                          setPageInput("選擇分頁");
                        }}
                        className={`${styles.PageLink} page-link `}
                        href={`/product/list/category?category=${category}&page=${pages}`}
                      >
                        {pages}
                      </Link>
                    </li>
                  )}
                  {products.length > 24 && (
                    <li className={`${styles.PageArrow}`}>
                      <Link
                        onClick={() => {
                          setPageNow(
                            pageNow + 1 > pages ? pageNow : pageNow + 1
                          );
                          pageNow + 1 >= pages
                            ? setPageInput("選擇分頁")
                            : setPageInput(`第 ${pageNow + 1} 頁`);
                        }}
                        href={`/product/list/category?category=${category}&page=${
                          pageNow + 1 > pages ? pageNow : pageNow + 1
                        }`}
                      >
                        <img src="/product/font/right(orange).png" alt="" />
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            </main>
          )}
        </section>
      </div>
    </>
  );
}
