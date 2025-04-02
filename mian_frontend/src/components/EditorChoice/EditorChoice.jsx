import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import { useArticles } from '../Contex/ArticlesContext';
import './EditorChoice.css'; // Custom CSS for additional styling

const EditorChoice = () => {
  const { getArticlesBySection } = useArticles(); // Get function from context
  const editorChoicePosts = getArticlesBySection('editorChoice'); // Grab articles for the "editorChoice" section

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="editor-choice-title">Editor's Choice</h2>
      </div>
      <div className="row">
        {editorChoicePosts.map((post) => (
          <div key={post.id} className="col-md-4 mb-4">
            <div className="card editor-post-card h-100">
            <Link to={`/article/${post.id}`} >
                 
               
              <div
                className="post-image"
                style={{ backgroundImage: `url(${post.imageUrl})` }}
              >
                <span className="post-category badge bg-success">{post.category}</span>
              </div>
              </Link>
              <div className="card-body">
                {/* Make the title a link to the article detail page */}
                <h5 className="card-title">
                  <Link to={`/article/${post.id}`} className="text-decoration-none text-dark">
                    {post.title}
                  </Link>
                </h5>
                <div className="post-info text-muted">
                  <span className="me-3">
                    <i className="bi bi-person"></i> {post.author}
                  </span>
                  <span>
                    <i className="bi bi-calendar"></i> {post.date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditorChoice;
