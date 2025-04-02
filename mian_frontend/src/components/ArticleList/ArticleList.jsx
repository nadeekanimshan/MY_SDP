// src/components/ArticleList/ArticleList.js

import React from 'react';
import { Link } from 'react-router-dom';

function ArticleList({ articles }) {
  return (
    <div className="row">
      {articles.map((article) => (
        <div className="col-md-4 mb-4" key={article.id}>
          <div className="card">
            <img src={article.imageUrl} className="card-img-top" alt={article.title} />
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              <p className="card-text">{article.content.substring(0, 100)}...</p>
              <Link to={`/article/${article.id}`} className="btn btn-primary">
                Read More
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ArticleList;
