import React, { useState, useEffect } from "react";
import "./Article.css";

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);

  const fetchArticles = async () => {
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${page}`
      );
      const data = await response.json();
      setArticles((prevArticles) => [...prevArticles, ...data]);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      fetchArticles();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <div className="articles">
        {articles.map((article, index) => (
          <div key={index} className="article">
            <img src={article.download_url} alt={article.author} />
            <div className="author">{article.author}</div>
            {/* Add thumbs up icon and count */}
            <div className="like">
              <span
                role="img"
                aria-label="thumbs-up"
                onClick={() => {
                  // Implement your like logic here
                }}
              >
                👍
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Article;
