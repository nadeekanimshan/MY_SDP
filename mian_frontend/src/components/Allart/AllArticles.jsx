import './AllArticles.css'; // Custom CSS for additional styling

import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { useArticles } from '../Contex/ArticlesContext';

function AllArticles() {
  const { getAllArticles } = useArticles(); // Get all articles from the context
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState('All'); // Default filter set to 'All'

  // Fetch articles and set the state when the component mounts
  useEffect(() => {
    const allArticles = getAllArticles(); // Get all articles
    setArticles(allArticles); // Set the articles state
  }, [getAllArticles]);

  // Filter articles based on the selected category
  const filteredArticles = filter === 'All' 
    ? articles 
    : articles.filter(article => article.category === filter);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">All Articles</h2>
      
      <div className="mb-4 filter-container">
        <label htmlFor="category-filter" className="form-label">Filter by Category:</label>
        <select
          id="category-filter"
          className="form-select w-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="IT(Social)">IT(Social)</option>
          <option value="IT(AI)">IT(AI)</option>
          <option value="Management">Management</option>
         
        </select>
      </div>

      <div className="row">
        {filteredArticles.length === 0 ? (
          <div className="col-12 text-center">
            <p>No articles found for this category.</p>
          </div>
        ) : (
          filteredArticles.map((article) => (
            <div className="col-md-4 col-sm-6 mb-4" key={article.id}>
              <div className="card article-card h-100">
                <img 
                  src={article.imageUrl} 
                  className="card-img-top article-image" 
                  alt={article.title} 
                />
                <div className="card-body">
                  <h5 className="card-title article-title">{article.title}</h5>
                  <p className="card-text article-content">
                    {article.content ? article.content.substring(0, 100) + '...' : 'No content available'}
                  </p>
                  <Link to={`/article/${article.id}`} style={{backgroundColor: 'white',color:'Black',borderColor:'#ac834f'}} className="btn btn-primary read-more-btn">Read More</Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllArticles;

