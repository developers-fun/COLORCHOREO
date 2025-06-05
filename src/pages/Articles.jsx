import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const articles = [
  {
    id: 1,
    title: 'Creating Perfect Color Combinations',
    excerpt: 'Learn the principles of color theory and how to create harmonious color combinations for your designs.',
    category: 'Color Theory',
    readTime: '5 min read',
    path: '/articles/color-combinations'
  },
  {
    id: 2,
    title: 'Animation Principles for Web Design',
    excerpt: 'Discover how to use animation effectively in your web projects to enhance user experience.',
    category: 'Animation',
    readTime: '7 min read',
    path: '/articles/animation-principles'
  },
  {
    id: 3,
    title: 'Understanding Color Psychology',
    excerpt: 'Explore how different colors affect human psychology and behavior in design contexts.',
    category: 'Psychology',
    readTime: '6 min read',
    path: '/articles/color-psychology'
  }
];

function Articles() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Articles & Resources</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <motion.article
            key={article.id}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <div className="mb-4">
              <span className="text-sm text-accent">{article.category}</span>
              <span className="text-sm text-gray-400 ml-4">{article.readTime}</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-100 mb-3">
              {article.title}
            </h2>
            <p className="text-gray-400 mb-4">
              {article.excerpt}
            </p>
            <Link
              to={article.path}
              className="text-primary hover:text-primary-dark transition-colors"
            >
              Read more →
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

export default Articles;