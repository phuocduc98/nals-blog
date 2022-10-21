import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';

import { Navbar } from './pages/components/Navbar';
import { BorderGrowSpinner } from './pages/components/Spinner';

const Blogs = lazy(() => import('./pages/blogs/Blogs'));
const BlogDetail = lazy(() => import('./pages/blogs/BlogDetail'));

function App() {
  return (
    <div className="container mt-2 mb-5">
      <Router>
        <Suspense fallback={<BorderGrowSpinner />}>
          <Navbar />
          <Routes>
            <Route path="/">
              <Route path="blogs" element={<Blogs />} />
              <Route path="blogs/:id" element={<BlogDetail />} />
              <Route
                path="*"
                element={
                  <main style={{ padding: '1rem' }}>
                    <p>There's nothing here!</p>
                  </main>
                }
              />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
