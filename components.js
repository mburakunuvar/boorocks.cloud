// Shared Components - DRY approach for repeated HTML structures
const Components = {
  // Sidebar navigation component
  sidebarNav: (activePage = '') => `
    <aside class="sidebar-left">
      <div class="sidebar-header">
        <div class="logo">
          <img src="${activePage.includes('blogposts') ? '../' : ''}images/vibecoding.jpg" alt="Logo">
        </div>
        <h2 class="sidebar-title">Cloud Notes by Burak</h2>
        <p class="sidebar-description">Learnt by blood, tears;<br/>Written by vibe coding 🙂</p>
      </div>
      <nav class="nav-menu">
        <ul>
          ${['backtobasics', 'home', 'archives'].map(page => `
            <li><a href="${activePage.includes('blogposts') ? '../' : ''}${page}.html" 
                   class="nav-link${activePage === page ? ' active' : ''}">${
                     page === 'backtobasics' ? 'Back to Basics' : 
                     page.charAt(0).toUpperCase() + page.slice(1)
                   }</a></li>
          `).join('')}
        </ul>
      </nav>
    </aside>
  `,

  // Archive sidebar component
  archiveSidebar: () => `
    <aside class="sidebar-right">
      <div class="archive-section">
        <h3>Archives</h3>
        <ul class="archive-list">
          ${['October 2025', 'September 2025', 'August 2025'].map((month, i) => `
            <li><a href="#" class="archive-link" data-month="${
              ['2025-10', '2025-09', '2025-08'][i]
            }">${month}</a></li>
          `).join('')}
        </ul>
      </div>
    </aside>
  `,

  // Blog card component
  blogCard: (post) => `
    <a href="${post.url}" class="blog-card-link">
      <article class="blog-card">
        <h3>${post.title}</h3>
        <div class="post-meta">
          <span class="post-date">📅 ${post.date}</span>
          <span class="post-read-time">⏱️ ${post.readTime} minute read</span>
        </div>
        <p class="post-excerpt">${post.excerpt}</p>
      </article>
    </a>
  `,

  // Page header component
  pageHeader: (subtitle = "These articles reflect my own thoughts, stories and ideas. All I know is i know nothing so please don't kill me if i'm wrong 😊") => `
    <header class="page-header">
      <p class="subtitle">${subtitle}</p>
    </header>
  `
};

// Blog posts data - Single source of truth
const blogPosts = [
  {
    id: 1,
    title: 'Connecting Namecheap Domain To GitHub Pages',
    date: 'Oct 16, 2025',
    readTime: 5,
    excerpt: 'How to connect a custom domain registered with Namecheap to a GitHub Pages repository in GitHub.',
    url: 'blogposts/1-namecheap2githubpages.html'
  },
  {
    id: 2,
    title: 'Hosting your domain in Azure DNS',
    date: 'Oct 17, 2025',
    readTime: 3,
    excerpt: 'How to host your domain in Azure DNS.',
    url: 'blogposts/2-hosting-your-domain-in-Azure-DNS.html'
  }
];

// Export if using modules, otherwise attach to window
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Components, blogPosts };
} else {
  window.Components = Components;
  window.blogPosts = blogPosts;
}
