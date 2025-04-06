import "bootstrap/dist/css/bootstrap.min.css";
import "./FeaturedPosts.css";
import { Link } from "react-router-dom";
import React from "react";
import { useArticles } from "../Contex/ArticlesContext";

const FeaturedPosts = () => {
  const { getArticlesBySection } = useArticles();
  const featuredPosts = getArticlesBySection("top").slice(0, 2); // Get only first 2 posts

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2 className="featured-title">Featured Posts</h2>
      </div>
      <div className="row justify-content-center">
        {featuredPosts.map((post) => (
          <div key={post.id} className="col-lg-6 col-md-6 mb-4">
            <div className="card post-card h-100 border-0 shadow-sm">
              <div className="row g-0 h-100">
                {/* Image Column */}
                <div className="col-md-5">
                  <Link to={`/article/${post.id}`}>
                    <div 
                      className="h-100 post-image"
                      style={{ 
                        backgroundImage: `url(${post.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <span className="post-category badge" style={{ backgroundColor: "#ac834f", color: "white" }}>
                        {post.category}
                      </span>
                    </div>
                  </Link>
                </div>
                
                {/* Content Column */}
                <div className="col-md-7">
                  <div className="card-body d-flex flex-column h-100">
                    <h5 className="card-title">
                      <Link to={`/article/${post.id}`} className="text-decoration-none text-dark">
                        {post.title}
                      </Link>
                    </h5>
                    <p className="card-text text-muted mb-3">{post.excerpt || post.description}</p>
                    <div className="post-info text-muted mt-auto">
                      <span className="me-3"><i className="bi bi-person"></i> {post.author}</span>
                      <span><i className="bi bi-calendar"></i> {post.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-end mt-3">
        <Link to="/articles" className="btn btn-outline-primary">
          View All Posts <i className="bi bi-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedPosts;