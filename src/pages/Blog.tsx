import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Choosing Your First Hair System",
    excerpt: "Everything you need to know about selecting the perfect hair system that matches your lifestyle, skin tone, and personal style preferences.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    author: "3S Golden Hair Team",
    date: "December 20, 2025",
    category: "Guide",
    slug: "ultimate-guide-choosing-hair-system"
  },
  {
    id: 2,
    title: "Hair System Maintenance: Tips for Long-Lasting Results",
    excerpt: "Learn the essential maintenance routines that will keep your hair system looking natural and extend its lifespan significantly.",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&h=400&fit=crop",
    author: "3S Golden Hair Team",
    date: "December 15, 2025",
    category: "Tips",
    slug: "hair-system-maintenance-tips"
  },
  {
    id: 3,
    title: "Understanding Different Hair System Base Materials",
    excerpt: "A comprehensive breakdown of lace, skin, and mono bases - which one is right for you and your specific needs.",
    image: "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=600&h=400&fit=crop",
    author: "3S Golden Hair Team",
    date: "December 10, 2025",
    category: "Education",
    slug: "understanding-hair-system-base-materials"
  },
  {
    id: 4,
    title: "How to Style Your Hair System Like a Pro",
    excerpt: "Professional styling techniques that will help you achieve any look with your hair system, from casual to formal.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=400&fit=crop",
    author: "3S Golden Hair Team",
    date: "December 5, 2025",
    category: "Styling",
    slug: "style-hair-system-like-pro"
  },
  {
    id: 5,
    title: "Real Stories: Life-Changing Transformations",
    excerpt: "Read inspiring stories from our clients who have regained their confidence and transformed their lives with our hair systems.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=400&fit=crop",
    author: "3S Golden Hair Team",
    date: "November 28, 2025",
    category: "Stories",
    slug: "real-stories-transformations"
  },
  {
    id: 6,
    title: "Debunking Common Hair System Myths",
    excerpt: "Let's separate fact from fiction and address the most common misconceptions about modern hair replacement systems.",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=400&fit=crop",
    author: "3S Golden Hair Team",
    date: "November 20, 2025",
    category: "Education",
    slug: "debunking-hair-system-myths"
  }
];

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blog | 3S Golden Hair - Hair System Tips & Guides</title>
        <meta
          name="description"
          content="Expert tips, guides, and stories about hair systems. Learn maintenance, styling, and get inspired by real transformation stories."
        />
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
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <button className="inline-flex items-center gap-2 text-primary font-medium text-sm group/btn">
                      Read More
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
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
