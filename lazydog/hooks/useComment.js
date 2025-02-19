"use client"

import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:5000/api/articles' 

function useArticles() {
  const [articles, setArticles] = useState([]) // 文章列表
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // 取得對應文章下的留言
  const getComment = async (id) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/${id}`)
      if (!response.ok) throw new Error('無法取得文章')
      return await response.json()
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  // 新增文章
  const createArticle = async (newArticle) => {
    setLoading(true)
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArticle),
      })
      if (!response.ok) throw new Error('無法新增文章')

      const createdArticle = await response.json()
      setArticles([createdArticle, ...articles]) // 將新文章加入列表
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // 更新文章
  const updateArticle = async (id, updatedData) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      })
      if (!response.ok) throw new Error('無法更新文章')

      const updatedArticle = await response.json()
      setArticles(articles.map((article) => (article.id === id ? updatedArticle : article)))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // **刪除文章**
  const deleteArticle = async (id) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('無法刪除文章')

      setArticles(articles.filter((article) => article.id !== id)) // 移除文章
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // **在元件載入時自動取得文章**
  useEffect(() => {
    getArticles()
  }, [])

  return {
    articles,
    loading,
    error,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
  }
}

export default useArticles
