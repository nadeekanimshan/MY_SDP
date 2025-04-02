import "bootstrap/dist/css/bootstrap.min.css";
import "./FeaturedPosts.css";

import { Link } from "react-router-dom";
import React from "react";
import { useArticles } from "../Contex/ArticlesContext";

const FeaturedPosts = () => {
  const { getArticlesBySection } = useArticles(); // Use context to get articles by section
  const featuredPosts = getArticlesBySection("top"); // Get "top" section posts directly from context

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2 className="featured-title">Featured Posts</h2>
      </div>
      <div className="row">
        {featuredPosts.map((post) => (
          <div key={post.id} className="col-md-4 mb-4">
            <div className="card post-card h-100">
              <Link to={`/article/${post.id}`} >


                <div
                  className="post-image"
                  style={{ backgroundImage: `url(${post.imageUrl})` }}
                >
                  <span className="post-category badge" style={{ backgroundColor: "#ac834f", color: "white" }}>
    {post.category}
</span>

                </div>
              </Link>
              <div className="card-body">
                {/* Link to article detail page */}
                <h5 className="card-title">
                  <Link to={`/article/${post.id}`} className="text-decoration-none text-dark">
                    {post.title}
                  </Link>
                </h5>
                <div className="post-info text-muted">
                  <span className="me-3"><i className="bi bi-person"></i> {post.author}</span>
                  <span><i className="bi bi-calendar"></i> {post.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-end mt-3">
        <Link to="/articles" className="see-all-posts text-decoration-none">
          See All Posts →
        </Link>
      </div>
    </div>
  );
};

export default FeaturedPosts;
