import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "3S Golden Hair Blog",
    "description": "Expert tips, guides, and stories about hair systems and hair replacement solutions.",
    "url": "https://3sgoldenhair.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "3S Golden Hair",
      "logo": {
        "@type": "ImageObject",
        "url": "https://3sgoldenhair.com/logo.png"
      }
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.image,
      "datePublished": post.dateISO,
      "author": {
        "@type": "Organization",
        "name": post.author
      },
      "url": `https://3sgoldenhair.com/blog/${post.slug}`
    }))
  };

  return (
    <>
      <Helmet>
        <title>Blog | 3S Golden Hair - Hair System Tips & Guides</title>
        <meta
          name="description"
          content="Expert tips, guides, and stories about hair systems. Learn maintenance, styling, and get inspired by real transformation stories."
        />
        <link rel="canonical" href="https://3sgoldenhair.com/blog" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Blog | 3S Golden Hair" />
        <meta property="og:description" content="Expert tips, guides, and stories about hair systems." />
        <meta property="og:url" content="https://3sgoldenhair.com/blog" />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-card to-background">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4"
            >
              Our <span className="text-primary">Blog</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              Expert tips, guides, and inspiring stories to help you on your hair transformation journey.
            </motion.p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300"
                >
                  {/* Image */}
                  <Link to={`/blog/${post.slug}`} className="block relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      width={600}
                      height={400}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={post.dateISO}>{post.date}</time>
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <Link 
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-primary font-medium text-sm group/btn"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Blog;
