import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostBySlug, getPublishedPosts } from '../../data/blogPosts';
import Playbook2026 from './Playbook2026';
import { generateOrganizationSchema, generateBreadcrumbSchema, getBaseUrl } from '../../utils/schemaOrg';
import './Blog.css';

function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Check if this is the playbook slug - render dedicated component
      if (slug === 'uk-trades-business-playbook-ai-search-visibility-2026') {
        const playbookPost = getPostBySlug(slug);
        if (playbookPost) {
          setPost({ ...playbookPost, isPlaybook: true });
        } else {
          setPost({
            isPlaybook: true,
            title: "The Trades Business Playbook for AI Search Visibility in 2026",
            metaDescription: "A comprehensive playbook for trades businesses",
            slug: slug,
            tags: ["AI search", "AEO", "tradespeople"],
            publishDate: "2026-01-28",
            author: "Whoza.ai Team"
          });
        }
        setError(null);
        return;
      }
      
      const foundPost = getPostBySlug(slug);
      
      if (!foundPost) {
        navigate('/blog', { replace: true });
        return;
      }
      
      const today = new Date().toISOString().split('T')[0];
      if (foundPost.publishDate > today) {
        navigate('/blog', { replace: true });
        return;
      }
      
      setPost(foundPost);
      setError(null);
      
      const allPosts = getPublishedPosts();
      const sameCategoryPosts = allPosts
        .filter(p => p.id !== foundPost.id && p.category === foundPost.category)
        .slice(0, 3);
      
      if (sameCategoryPosts.length < 3) {
        const otherPosts = allPosts
          .filter(p => p.id !== foundPost.id && p.category !== foundPost.category)
          .slice(0, 3 - sameCategoryPosts.length);
        setRelatedPosts([...sameCategoryPosts, ...otherPosts]);
      } else {
        setRelatedPosts(sameCategoryPosts);
      }
      
      window.scrollTo(0, 0);
    } catch (err) {
      // Error displayed in UI via setError
      setError(err.message);
    }
  }, [slug, navigate]);

  useEffect(() => {
    if (!post) return;
    if (post.isPlaybook) return;

    const baseUrl = getBaseUrl();

    document.title = `${post.title} | Whoza.ai Blog`;

    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) metaDescription.setAttribute('content', post.metaDescription);

    const ogTitle = document.querySelector("meta[property='og:title']");
    if (ogTitle) ogTitle.setAttribute('content', post.title);
    
    const ogDescription = document.querySelector("meta[property='og:description']");
    if (ogDescription) ogDescription.setAttribute('content', post.metaDescription);
    
    const ogUrl = document.querySelector("meta[property='og:url']");
    if (ogUrl) ogUrl.setAttribute('content', `${baseUrl}/blog/${post.slug}`);

    let canonicalLink = document.querySelector("link[rel='canonical']");
    const canonicalUrl = post.canonicalTo
      ? post.canonicalTo
      : `${baseUrl}/blog/${post.slug}`;
    if (canonicalLink) canonicalLink.setAttribute('href', canonicalUrl);

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.metaDescription,
      "image": `${baseUrl}/whoza-logo.png`,
      "author": {
        "@type": "Organization",
        "name": post.author,
        "url": baseUrl
      },
      "publisher": {
        "@type": "Organization",
        "name": "Whoza.ai",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/whoza-logo.png`
        }
      },
      "datePublished": post.publishDate,
      "dateModified": post.publishDate,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${baseUrl}/blog/${post.slug}`
      },
      "keywords": post.tags.join(', ')
    };

    const hasFaqs = post.faqs && post.faqs.length > 0;
    const faqSchema = hasFaqs ? {
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
    } : null;

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": `${baseUrl}/blog`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.title,
          "item": `${baseUrl}/blog/${post.slug}`
        }
      ]
    };

    const schemas = [
      { id: 'article-schema', data: articleSchema },
      ...(faqSchema ? [{ id: 'faq-schema', data: faqSchema }] : []),
      { id: 'breadcrumb-schema', data: breadcrumbSchema }
    ];

    // Clean up any existing schema scripts to prevent duplicates during hydration
    // (prerendered HTML may already contain schema, and we want to ensure only one set exists)
    schemas.forEach(({ id }) => {
      const existingScript = document.getElementById(id);
      if (existingScript) existingScript.remove();
    });

    schemas.forEach(({ id, data }) => {
      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
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

  if (post.isPlaybook) {
    return <Playbook2026 />;
  }

  const renderText = (text) => {
    if (typeof text !== 'string') return text;
    
    const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('[') && part.includes('](')) {
        const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (match) {
          return <a key={index} href={match[2]} target="_blank" rel="noopener noreferrer">{match[1]}</a>;
        }
      }
      return part;
    });
  };

  const renderTable = (content) => {
    const lines = content.trim().split('\n');
    if (lines.length < 3) return <p>{content}</p>;

    const headerRow = lines[0].split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim());
    const bodyRows = lines.slice(2).map(row => 
      row.split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim())
    );

    return (
      <div className="table-responsive" style={{ overflowX: 'auto', margin: '2rem 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid rgba(255,255,255,0.1)' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
              {headerRow.map((header, i) => (
                <th key={i} style={{ padding: '12px', textAlign: 'left', border: '1px solid rgba(255,255,255,0.1)', color: '#3b82f6' }}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bodyRows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>{renderText(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <main className="blog-post-page" role="main">
      <article className="blog-article" itemScope itemType="https://schema.org/Article">
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
            
            <h1 itemProp="headline" style={{ color: '#ffffff', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 700, margin: '20px 0', lineHeight: 1.2 }}>{post.title}</h1>
            
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
              <p style={{ margin: 0, color: '#ffffff' }}>{renderText(post.leadAnswer)}</p>
            </div>
            
            <div className="article-author-info">
              <span itemProp="author" itemScope itemType="https://schema.org/Organization">
                By <span itemProp="name">{post.author}</span>
              </span>
            </div>
          </div>
        </header>

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
                {post.faqs && post.faqs.length > 0 && (
                  <li><a href="#faq">Frequently Asked Questions</a></li>
                )}
              </ol>
            </details>
          </div>
        </nav>

        <div className="article-content" itemProp="articleBody">
          <div className="container">
            {post.content.map((section, index) => {
              // Check if heading starts with a number (listicle item)
              const isListicleItem = /^\d+\./.test(section.heading);
              
              return (
                <section key={index} id={`section-${index}`} className={`content-section ${isListicleItem ? 'listicle-item' : ''}`}>
                  <h2 className={isListicleItem ? 'listicle-heading' : ''}>{section.heading}</h2>
                  {section.content.split('\n\n').map((paragraph, pIndex) => {
                    if (paragraph.trim().startsWith('|')) {
                      return <div key={pIndex}>{renderTable(paragraph)}</div>;
                    }

                    if (paragraph.trim().startsWith('- ') || /^\d+\.\s/.test(paragraph.trim())) {
                      const items = paragraph.trim().split('\n').filter(item => item.trim());
                      const isOrdered = /^\d+\.\s/.test(items[0]);
                      const ListTag = isOrdered ? 'ol' : 'ul';
                      return (
                        <ListTag key={pIndex} className="rich-list">
                          {items.map((item, iIndex) => {
                            const cleanItem = item.replace(/^[-\d.]\s*/, '');
                            return <li key={iIndex}>{renderText(cleanItem)}</li>;
                          })}
                        </ListTag>
                      );
                    }
                    
                    return <p key={pIndex}>{renderText(paragraph)}</p>;
                  })}
                </section>
              );
            })}

            {post.faqs && post.faqs.length > 0 && (
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
            )}

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

            <div className="article-tags">
              <span>Topics: </span>
              {post.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </article>

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

      <section className="blog-cta">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to Improve Your AI Visibility?</h2>
            <p>Join tradespeople who are already getting found by ChatGPT, Google AI, and Perplexity.</p>
            <div className="cta-buttons">
              <Link to="/competitor-analysis" className="cta-button">Check My Competitor</Link>
              <Link to="/start" className="cta-button secondary">Start Free Trial</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default BlogPost;
