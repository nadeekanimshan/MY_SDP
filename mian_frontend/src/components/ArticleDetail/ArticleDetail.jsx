import './a.css';

import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { useArticles } from '../Contex/ArticlesContext';

function ArticleDetail() {
  const { id } = useParams();
  const { articles, setArticles } = useArticles();
  const [articleHtml, setArticleHtml] = useState('');
  const [likes, setLikes] = useState(0);
  const [loadingLikes, setLoadingLikes] = useState(true);
  const [hasLiked, setHasLiked] = useState(false);
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackContent, setFeedbackContent] = useState('');

  const savedFeedback = JSON.parse(localStorage.getItem(`feedback-${id}`)) || [];
  const [submittedFeedback, setSubmittedFeedback] = useState(savedFeedback);

  const articleId = parseInt(id);
  const allArticles = articles.allArticles;
  const article = allArticles.find((a) => a.id === articleId);
  const currentIndex = allArticles.findIndex((a) => a.id === articleId);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  const workerUrl = "https://blog-likes-counter.expositionmit2022.workers.dev";

  useEffect(() => {
    if (article) {
      fetch(`/articles/article${id}.html`)
        .then((response) => response.text())
        .then((htmlContent) => setArticleHtml(htmlContent))
        .catch((error) => console.error("Error loading article HTML:", error));

      // Fetch likes from Cloudflare Worker
      fetchLikes();

      // Check if user has already liked
      const likedArticles = JSON.parse(localStorage.getItem("likedArticles")) || {};
      if (likedArticles[id]) {
        setHasLiked(true);
      }
    }
  }, [id, articles]);

  const fetchLikes = async () => {
    try {
      const res = await fetch(`${workerUrl}/likes/${id}`);
      const data = await res.json();
      setLikes(data.likes || 0);
      setLoadingLikes(false);
    } catch (err) {
      console.error("Error fetching likes:", err);
      setLoadingLikes(false);
    }
  };

  const handleLike = async () => {
    if (hasLiked) {
      alert("You have already liked this article.");
      return;
    }

    try {
      const res = await fetch(`${workerUrl}/likes/${id}`, { method: "POST" });
      if (!res.ok) throw new Error(`Failed to update likes: ${res.statusText}`);

      const data = await res.json();
      setLikes(data.likes || 0); // ✅ Updates like count immediately
      setHasLiked(true);

      // Store like in localStorage
      const likedArticles = JSON.parse(localStorage.getItem("likedArticles")) || {};
      likedArticles[id] = true;
      localStorage.setItem("likedArticles", JSON.stringify(likedArticles));

      // Update global articles state
      setArticles((prevArticles) => ({
        ...prevArticles,
        allArticles: prevArticles.allArticles.map((a) =>
          a.id === article.id ? { ...a, likes: data.likes } : a
        ),
      }));
    } catch (err) {
      console.error("Error updating likes:", err);
    }
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (feedbackName && feedbackContent) {
      const newFeedback = { name: feedbackName, content: feedbackContent };
      const updatedFeedback = [...submittedFeedback, newFeedback];
      setSubmittedFeedback(updatedFeedback);
      localStorage.setItem(`feedback-${id}`, JSON.stringify(updatedFeedback));
      setFeedbackName('');
      setFeedbackContent('');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.content,
        url: window.location.href,
      })
        .then(() => console.log('Article shared successfully!'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Sharing is not supported on this browser. Please copy the link manually.');
    }
  };

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="container my-4">
      <img src={article.imageUrl} alt={article.title} className="img-fluid rounded mb-4 d-block mx-auto" />

      <h2 style={{ fontWeight: 'bold', fontSize: 'clamp(24px, 7vw, 48px)', textAlign: 'center' }}>
        {article.title}
      </h2>

      <div className="article-content" dangerouslySetInnerHTML={{ __html: articleHtml }}></div>

      <div className="d-flex align-items-center mt-3">
        {article.authorImage && (
          <img src={article.authorImage} alt={article.author} className="rounded-circle me-2" width="100" height="100" />
        )}
        <p>Written by <strong>{article.author}</strong></p>
      </div>

      <button
        className={`btn ${hasLiked ? "btn-secondary" : "btn-primary"} mt-3 me-2`}
        onClick={handleLike}
        disabled={hasLiked}
      >
        {loadingLikes ? "Loading..." : `Like (${likes})`}
      </button>

      <button className="btn btn-secondary mt-3" onClick={handleShare}>
        Share
      </button>

      <div className="mt-5">
        <h4>Leave Feedback</h4>
        <form onSubmit={handleFeedbackSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              value={feedbackName}
              onChange={(e) => setFeedbackName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Leave your feedback..."
              value={feedbackContent}
              onChange={(e) => setFeedbackContent(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-secondary mt-2">Submit Feedback</button>
        </form>
      </div>

      {submittedFeedback.length > 0 && (
        <div className="mt-4">
          <h4>Submitted Feedback</h4>
          <ul className="list-group">
            {submittedFeedback.map((feedback, index) => (
              <li key={index} className="list-group-item">
                <strong>{feedback.name}</strong>: {feedback.content}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="article-navigation">
        {prevArticle && (
          <Link to={`/article/${prevArticle.id}`} className="btn-custom">
            ← Previous: {prevArticle.title}
          </Link>
        )}
        {nextArticle && (
          <Link to={`/article/${nextArticle.id}`} className="btn-custom">
            Next: {nextArticle.title} →
          </Link>
        )}
      </div>
    </div>
  );
}

export default ArticleDetail;
