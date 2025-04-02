import "bootstrap/dist/css/bootstrap.min.css";
import "./TopStories.css"; // Custom CSS file for additional styling

import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom"; // Import Link for navigation
import { useArticles } from "../Contex/ArticlesContext"; // Import your context for articles

const TopStories = () => {
  const { getArticlesBySection } = useArticles(); // Use context to get articles by section
  const [topStories, setTopStories] = useState([]);
  const [additionalStories, setAdditionalStories] = useState([]);

  useEffect(() => {
    const topArticles = getArticlesBySection("top") || []; // Fetch top stories
    const recentArticles = getArticlesBySection("recent") || []; // Fetch recent stories

    setTopStories(topArticles); // Set top stories in state
    setAdditionalStories(recentArticles); // Set additional stories in state
  }, [getArticlesBySection]);

  return (
    <div className="container my-5" id="top">
      <div className="text-center mb-4">
        <h2 className="top-stories-title">Top Stories</h2>
      </div>
      <div className="row">
        {/* Main Stories (Top Stories) */}
        <div className="col-md-8">
          <div className="row">
            {topStories.length > 0 ? (
              topStories.map((story) => (
                <div key={story.id} className="col-md-6 mb-4">
                  <div className="card story-card h-100">
                  <Link
                          to={`/article/${story.id}`} // Navigate to article detail
                          
                        >
                   
                      
                    <div
                      className="story-image"
                      style={{ backgroundImage: `url(${story.imageUrl})` }}
                    >
                     <span className="post-category badge" style={{ backgroundColor: "#ac834f", color: "white" }}>
    {story.category}
</span>
                    </div>
                    </Link>
                    <div className="card-body text-white">
                      {/* Make the title clickable */}
                      <h5 className="card-title">
                        <Link
                          to={`/article/${story.id}`} // Navigate to article detail
                          className="text-decoration-none"
                          style={{ color: 'black' }} // Inline styles for background color and text color
                        >
                          {story.title || 'Untitled'} {/* Fallback title */}
                        </Link>
                      </h5>

                      <div className="story-info text-muted">
                        <span className="me-3">
                          <i className="bi bi-person"></i> {story.author}
                        </span>
                        <span>
                          <i className="bi bi-calendar"></i> {story.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No top stories available.</p>
            )}
          </div>
        </div>

        {/* Sidebar with Additional Stories */}
        <div className="col-md-4">
          {/* Loop over the first four additional stories */}
          {additionalStories.length > 0 ? (
            additionalStories.slice(0, 4).map((story) => (
              <div key={story.id} className="additional-story mb-3 d-flex align-items-center">
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className="img-fluid rounded me-3"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
                <div>
                  {/* Make the title clickable for additional stories */}
                  <h6 className="mb-1">
                    <Link
                      to={`/article/${story.id}`} // Navigate to article detail
                      className="text-decoration-none text-dark"
                    >
                      {story.title || 'Untitled'} {/* Fallback title */}
                    </Link>
                  </h6>
                  <small className="text-muted">
                    <i className="bi bi-calendar"></i> {story.date}
                  </small>
                </div>
              </div>
            ))
          ) : (
            <p>No additional stories available.</p>
          )}
        </div>
      </div>

      {/* "See All Posts" Link */}
      <div className="text-end mt-3">
        <Link to="/articles" className="see-all-posts text-decoration-none">
          See All Posts →
        </Link>
      </div>
    </div>
  );
};

export default TopStories;
