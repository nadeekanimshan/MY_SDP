import './RecentPosts.css'; // Custom CSS for additional styling

import { Link } from 'react-router-dom';
import React from 'react';
import { useArticles } from '../Contex/ArticlesContext';

// Import Link for navigation



const RecentPosts = () => {
  const { getArticlesBySection } = useArticles(); // Get function from context
  const recentPosts = getArticlesBySection('recent'); // Grab articles for the "recent" section

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2 className="recent-posts-title">Recent Posts</h2>
      </div>
      <div className="row">
        {recentPosts.map((post) => (
          <div key={post.id} className="col-md-6 col-lg-3 mb-4">
            <div className="card recent-post-card shadow-sm h-100">
              <img src={post.imageUrl} className="card-img-top rounded-top" alt={post.title} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{post.title}</h5>
                <p className="text-muted small mb-1">
                  
                </p>
                <p className="text-muted small">
                  <i className="bi bi-calendar me-1"></i>{post.date}
                </p>
                {/* Wrap the Read More button with Link for navigation */}
                <Link to={`/article/${post.id}`} className="btn btn-primary mt-auto align-self-start">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-end mt-3">
        <a href="/articles" className="see-all-posts-link">
          See All Posts →
        </a>
      </div>
    </div>
  );
};

export default RecentPosts;
