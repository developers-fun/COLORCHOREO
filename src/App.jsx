import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import PaletteBuilder from './pages/PaletteBuilder';
import ShapePlayground from './pages/ShapePlayground';
import Articles from './pages/Articles';

function App() {
  return (
    <>
      <Helmet>
        <title>Color Choreographer - Create Beautiful Animated Gradients</title>
        <meta name="description" content="Create stunning animated gradients and shapes for your web projects with Color Choreographer. Easy to use, customizable, and ready to embed." />
        <meta name="keywords" content="color animation, gradient generator, web animation, CSS animation, shape animation" />
        <meta property="og:title" content="Color Choreographer - Animated Gradient Generator" />
        <meta property="og:description" content="Create stunning animated gradients and shapes for your web projects." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/palette" element={<PaletteBuilder />} />
          <Route path="/shapes" element={<ShapePlayground />} />
          <Route path="/articles" element={<Articles />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;