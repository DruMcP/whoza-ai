import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostBySlug, getPublishedPosts } from '../../data/blogPosts';
import './Blog.css';

function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const foundPost = getPostBySlug(slug);
      
      if (!foundPost) {
        navigate('/blog', { replace: true });
        return;
      }
      
      // Check if post is published
      const today = new Date().toISOString().split('T')[0];
      if (foundPost.publishDate > today) {
        navigate('/blog', { replace: true });
        return;
      }
      
      setPost(foundPost);
      setError(null);
      
      // Get related posts (same category, excluding current)
      const allPosts = getPublishedPosts();
      const related = allPosts
        .filter(p => p.id !== foundPost.id)
        .slice(0, 3);
      setRelatedPosts(related);
      
      // Scroll to top
      window.scrollTo(0, 0);
    } catch (err) {
      console.error('Error loading blog post:', err);
      setError(err.message);
    }
  }, [slug, navigate]);

  // Set page title and meta tags
  useEffect(() => {
    if (!post) return;

    // Set document title
    document.title = `${post.title} | Whoza.ai Blog`;

    // Update meta description
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) metaDescription.setAttribute('content', post.metaDescription);

    // Update Open Graph tags
    const ogTitle = document.querySelector("meta[property='og:title']");
    if (ogTitle) ogTitle.setAttribute('content', post.title);
    
    const ogDescription = document.querySelector("meta[property='og:description']");
    if (ogDescription) ogDescription.setAttribute('content', post.metaDescription);
    
    const ogUrl = document.querySelector("meta[property='og:url']");
    if (ogUrl) ogUrl.setAttribute('content', `https://whoza.ai/blog/${post.slug}`);

    // Update canonical
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (canonicalLink) canonicalLink.setAttribute('href', `https://whoza.ai/blog/${post.slug}`);

    // Add Article schema
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.metaDescription,
      "image": "https://whoza.ai/whoza-logo.png",
      "author": {
        "@type": "Organization",
        "name": post.author,
        "url": "https://whoza.ai"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Whoza.ai",
        "url": "https://whoza.ai",
        "logo": {
          "@type": "ImageObject",
          "url": "https://whoza.ai/whoza-logo.png"
        }
      },
      "datePublished": post.publishDate,
      "dateModified": post.publishDate,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://whoza.ai/blog/${post.slug}`
      },
      "keywords": post.tags.join(', ')
    };

    // Add FAQ schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": post.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    // Add Breadcrumb schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://whoza.ai"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://whoza.ai/blog"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.title,
          "item": `https://whoza.ai/blog/${post.slug}`
        }
      ]
    };

    // Add schema scripts
    const schemas = [
      { id: 'article-schema', data: articleSchema },
      { id: 'faq-schema', data: faqSchema },
      { id: 'breadcrumb-schema', data: breadcrumbSchema }
    ];

    schemas.forEach(({ id, data }) => {
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data);
    });

    return () => {
      schemas.forEach(({ id }) => {
        const script = document.getElementById(id);
        if (script) script.remove();
      });
    };
  }, [post]);

  if (!post) {
    return (
      <div className="blog-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <main className="blog-post-page" role="main">
      <article className="blog-article" itemScope itemType="https://schema.org/Article">
        {/* Header */}
        <header className="article-header">
          <div className="container">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <ol>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li aria-current="page">{post.title}</li>
              </ol>
            </nav>
            
            <div className="article-meta">
              <span className="post-category">{post.category}</span>
              <time dateTime={post.publishDate} itemProp="datePublished">
                {new Date(post.publishDate).toLocaleDateString('en-GB', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </time>
              <span className="post-read-time">{post.readTime}</span>
            </div>
            
            <h1 itemProp="headline">{post.title}</h1>
            
            {/* Lead Answer - Critical for AEO */}
            <div className="lead-answer" itemProp="description" style={{
              fontSize: '1.125rem',
              lineHeight: '1.75',
              color: '#ffffff',
              backgroundColor: 'rgba(59, 130, 246, 0.05)',
              borderLeft: '4px solid #3b82f6',
              padding: '1.5rem',
              marginBottom: '2rem',
              borderRadius: '0.375rem'
            }}>
              <p style={{ margin: 0, color: '#ffffff' }}>{post.leadAnswer}</p>
            </div>
            
            <div className="article-author" itemProp="author" itemScope itemType="https://schema.org/Organization">
              <span>By </span>
              <span itemProp="name">{post.author}</span>
            </div>
          </div>
        </header>

        {/* Table of Contents */}
        <nav className="table-of-contents" aria-label="Table of Contents">
          <div className="container">
            <details open>
              <summary>Table of Contents</summary>
              <ol>
                {post.content.map((section, index) => (
                  <li key={index}>
                    <a href={`#section-${index}`}>{section.heading}</a>
                  </li>
                ))}
                <li><a href="#faq">Frequently Asked Questions</a></li>
              </ol>
            </details>
          </div>
        </nav>

        {/* Main Content */}
        <div className="article-content" itemProp="articleBody">
          <div className="container">
            {post.content.map((section, index) => (
              <section key={index} id={`section-${index}`} className="content-section">
                <h2>{section.heading}</h2>
                {section.content.split('\n\n').map((paragraph, pIndex) => {
                  // Handle lists
                  if (paragraph.startsWith('- **') || paragraph.startsWith('1. ')) {
                    const items = paragraph.split('\n').filter(item => item.trim());
                    const isOrdered = paragraph.startsWith('1.');
                    const ListTag = isOrdered ? 'ol' : 'ul';
                    return (
                      <ListTag key={pIndex}>
                        {items.map((item, iIndex) => {
                          const cleanItem = item.replace(/^[-\d.]\s*/, '');
                          // Parse bold text
                          const parts = cleanItem.split(/(\*\*[^*]+\*\*)/g);
                          return (
                            <li key={iIndex}>
                              {parts.map((part, partIndex) => {
                                if (part.startsWith('**') && part.endsWith('**')) {
                                  return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
                                }
                                return part;
                              })}
                            </li>
                          );
                        })}
                      </ListTag>
                    );
                  }
                  
                  // Handle regular paragraphs with bold text
                  const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
                  return (
                    <p key={pIndex}>
                      {parts.map((part, partIndex) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
                        }
                        return part;
                      })}
                    </p>
                  );
                })}
              </section>
            ))}

            {/* FAQ Section */}
            <section id="faq" className="faq-section">
              <h2>Frequently Asked Questions</h2>
              <div className="faq-list">
                {post.faqs.map((faq, index) => (
                  <div key={index} className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                    <h3 itemProp="name">{faq.question}</h3>
                    <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p itemProp="text">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            {post.cta && (
              <section className="article-cta">
                <div className="cta-card">
                  <h2>{post.cta.heading}</h2>
                  <p>{post.cta.text}</p>
                  <Link to={post.cta.buttonLink} className="cta-button">
                    {post.cta.buttonText}
                  </Link>
                </div>
              </section>
            )}

            {/* Tags */}
            <div className="article-tags">
              <span>Topics: </span>
              {post.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="related-posts">
          <div className="container">
            <h2>Continue Reading</h2>
            <div className="related-grid">
              {relatedPosts.map(relatedPost => (
                <article key={relatedPost.id} className="related-card">
                  <span className="post-category">{relatedPost.category}</span>
                  <h3>
                    <Link to={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                  </h3>
                  <p>{relatedPost.metaDescription}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="blog-cta">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to Improve Your AI Visibility?</h2>
            <p>Join UK tradespeople who are already getting found by ChatGPT, Google AI, and Perplexity.</p>
            <div className="cta-buttons">
              <Link to="/free-score" className="cta-button">Get Free Score</Link>
              <Link to="/start" className="cta-button secondary">Start Free Trial</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default BlogPost;
