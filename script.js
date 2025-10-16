// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href').substring(1);
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.add('hidden');
            });
            
            // Show target section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
            }
            
            // Scroll to top smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // Handle "Read More" button clicks
    const readMoreButtons = document.querySelectorAll('.read-more');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const blogCard = this.closest('.blog-card');
            const title = blogCard.querySelector('h3').textContent;
            
            // You can implement full post view here
            alert(`Opening: ${title}\n\nThis is where you would display the full blog post content.`);
            
            // In a real application, you might:
            // - Navigate to a separate page
            // - Load content dynamically
            // - Show a modal with full content
        });
    });
    
    // Handle archive link clicks
    const archiveLinks = document.querySelectorAll('.archive-link');
    
    archiveLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all archive links
            archiveLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the selected month
            const month = this.getAttribute('data-month');
            const monthText = this.textContent;
            
            // Filter blog posts by date (in a real app, this would filter actual data)
            alert(`Showing posts from: ${monthText}\n\nIn a real application, this would filter and display posts from ${month}.`);
            
            // You could implement actual filtering logic here
            filterPostsByMonth(month);
        });
    });
    
    // Function to filter posts by month
    function filterPostsByMonth(month) {
        // This is a placeholder function
        // In a real application, you would:
        // 1. Parse the month parameter
        // 2. Filter blog posts based on their dates
        // 3. Update the display to show only matching posts
        
        console.log(`Filtering posts for: ${month}`);
        
        // Example: You could hide/show posts based on their dates
        const blogCards = document.querySelectorAll('.blog-card');
        blogCards.forEach(card => {
            const dateText = card.querySelector('.post-date').textContent;
            // Add your filtering logic here
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Only handle if it's just a hash (like #home, #about)
            if (href && href.length > 1 && !this.classList.contains('archive-link')) {
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add animation to blog cards on scroll (optional enhancement)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all blog cards
    document.querySelectorAll('.blog-card').forEach(card => {
        observer.observe(card);
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Press '1' for Home, '2' for About, '3' for Archives
        if (e.key === '1') {
            navLinks[0].click();
        } else if (e.key === '2') {
            navLinks[1].click();
        } else if (e.key === '3') {
            navLinks[2].click();
        }
    });
    
    console.log('Blog initialized successfully!');
});

// Add dynamic date update (optional)
function updateCurrentDate() {
    const dateElements = document.querySelectorAll('.current-date');
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    dateElements.forEach(element => {
        element.textContent = formattedDate;
    });
}

// Call on load
updateCurrentDate();
