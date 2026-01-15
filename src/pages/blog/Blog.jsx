import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPublishedPosts, getFeaturedPosts } from '../../data/blogPosts';
import './Blog.css';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);

  useEffect(() => {
    const publishedPosts = getPublishedPosts();
    const featured = getFeaturedPosts();
    
    if (featured.length > 0) {
      setFeaturedPost(featured[0]);
      setPosts(publishedPosts.filter(p => p.id !== featured[0].id));
    } else {
      setPosts(publishedPosts);
    }
  }, []);

  // Add structured data for blog listing
  useEffect(() => {
    const allPosts = getPublishedPosts();
    const schema = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Whoza.ai Blog - AI Visibility for UK Tradespeople",
      "description": "Expert guides on AI visibility, AEO, and digital marketing for UK plumbers, electricians, builders, and tradespeople.",
      "url": "https://whoza.ai/blog",
      "publisher": {
        "@type": "Organization",
        "name": "Whoza.ai",
        "url": "https://whoza.ai",
        "logo": {
          "@type": "ImageObject",
          "url": "https://whoza.ai/whoza-logo.png"
        }
      },
      "blogPost": allPosts.map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.metaDescription,
        "url": `https://whoza.ai/blog/${post.slug}`,
        "datePublished": post.publishDate,
        "author": {
          "@type": "Organization",
          "name": post.author
        }
      }))
    };

    // Add schema script
    let schemaScript = document.getElementById('blog-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'blog-schema';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(schema);

    return () => {
      const script = document.getElementById('blog-schema');
      if (script) script.remove();
    };
  }, []);

  return (
    <main className="blog-page" role="main">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/" itemProp="item"><span itemProp="name">Home</span></Link>
                <meta itemProp="position" content="1" />
              </li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span itemProp="name" aria-current="page">Blog</span>
                <meta itemProp="position" content="2" />
              </li>
            </ol>
          </nav>
          
          <h1>AI Visibility Blog</h1>
          <p className="blog-hero-subtitle">
            Expert guides on getting your trade business found by ChatGPT, Google AI, and Perplexity. 
            Learn Answer Engine Optimization (AEO) strategies specifically for UK plumbers, electricians, 
            builders, and tradespeople.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="blog-featured">
          <div className="container">
            <article className="featured-post-card">
              <div className="featured-badge">Featured</div>
              <div className="featured-content">
                <div className="post-meta">
                  <span className="post-category">{featuredPost.category}</span>
                  <span className="post-date">{new Date(featuredPost.publishDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span className="post-read-time">{featuredPost.readTime}</span>
                </div>
                <h2>
                  <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                </h2>
                <p className="featured-excerpt">{featuredPost.leadAnswer}</p>
                <Link to={`/blog/${featuredPost.slug}`} className="read-more-btn">
                  Read Full Article
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* Post Grid */}
      <section className="blog-grid-section">
        <div className="container">
          {posts.length > 0 ? (
            <div className="blog-grid">
              {posts.map(post => (
                <article key={post.id} className="post-card">
                  <div className="post-meta">
                    <span className="post-category">{post.category}</span>
                    <span className="post-date">{new Date(post.publishDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <h3>
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="post-excerpt">{post.metaDescription}</p>
                  <div className="post-footer">
                    <span className="post-read-time">{post.readTime}</span>
                    <Link to={`/blog/${post.slug}`} className="post-link">
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : !featuredPost ? (
            <div className="no-posts">
              <p>New content coming soon. Check back for expert guides on AI visibility for tradespeople.</p>
            </div>
          ) : null}
        </div>
      </section>

      {/* CTA Section */}
      <section className="blog-cta">
        <div className="container">
          <div className="cta-card">
            <h2>Check Your AI Visibility Score</h2>
            <p>Find out how visible your trade business is to AI assistants like ChatGPT and Google AI. Get your free score in 60 seconds.</p>
            <Link to="/free-score" className="cta-button">
              Get Free Score
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Blog;
