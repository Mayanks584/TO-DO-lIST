// Page Content Loading Functions

function loadHomePage(pageElement) {
    pageElement.innerHTML = `
        <div class="main-hero">
            <div class="hero-left">
                <div class="brand slide-left-fade">
                    <span style="color: var(--primary);">Bitrix24</span>
                    <span class="clock">&#128337;</span>
                </div>
                <div class="hero-title slide-left-fade">
                    <span class="free">FREE</span>
                    <span class="img-bubble"><img src="https://randomuser.me/api/portraits/women/44.jpg" alt="woman"></span>
                    <br>
                    ONLINE TASK<br>
                    MANAGER
                    <span class="img-bubble"><img src="https://randomuser.me/api/portraits/men/32.jpg" alt="man"></span>
                </div>
                <div class="hero-desc slide-left-fade">
                    Organize and manage your team like a boss with Bitrix24, a free task management tool packing more capabilities than you can imagine.
                </div>
                <button class="hero-btn fade-in" onclick="showPage('login')"><span>Get Started</span></button>
            </div>
            <div class="hero-right">
                <div class="hero-img-container slide-down">
                    <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" alt="Modern Task Manager Dashboard">
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <footer class="footer">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Bitrix24</h3>
                    <p>The ultimate task management solution for teams and individuals.</p>
                    <div class="social-links">
                        <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                        <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                        <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                        <a href="#" aria-label="GitHub"><i class="fab fa-github"></i></a>
                    </div>
                </div>
                <div class="footer-section">
                    <h4>Product</h4>
                    <ul>
                        <li><a onclick="showPage('features')">Features</a></li>
                        <li><a onclick="showPage('pricing')">Pricing</a></li>
                        <li><a onclick="showPage('dashboard')">Dashboard</a></li>
                        <li><a onclick="showPage('login')">Get Started</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Company</h4>
                    <ul>
                        <li><a onclick="showPage('contact')">About Us</a></li>
                        <li><a onclick="showPage('contact')">Contact</a></li>
                        <li><a onclick="showPage('help')">Help Center</a></li>
                        <li><a onclick="showPage('privacy')">Privacy Policy</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Resources</h4>
                    <ul>
                        <li><a onclick="showPage('help')">Documentation</a></li>
                        <li><a onclick="showPage('contact')">Support</a></li>
                        <li><a onclick="showPage('help')">Blog</a></li>
                        <li><a onclick="showPage('help')">Tutorials</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Bitrix24 Task Manager. All rights reserved.</p>
            </div>
        </footer>
    `;
    
    // Add home page specific styles
    addHomeStyles();
}

function loadFeaturesPage(pageElement) {
    pageElement.innerHTML = `
        <!-- Hero Section -->
        <section class="hero-section">
            <h1>Powerful Features for Better Productivity</h1>
            <p>Discover all the tools you need to manage tasks, collaborate with your team, and achieve your goals efficiently.</p>
        </section>

        <!-- Features -->
        <div class="features-container">
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-tasks"></i>
                    </div>
                    <h3>Task Management</h3>
                    <p>Create, organize, and track tasks with ease. Set due dates, priorities, and categories to stay on top of your work.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <h3>Team Collaboration</h3>
                    <p>Work together seamlessly with your team. Share tasks, assign responsibilities, and track progress in real-time.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <h3>Progress Tracking</h3>
                    <p>Monitor your productivity with detailed analytics and reports. See what's working and what needs improvement.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-mobile-alt"></i>
                    </div>
                    <h3>Mobile Responsive</h3>
                    <p>Access your tasks anywhere, anytime. Our responsive design works perfectly on all devices and screen sizes.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-filter"></i>
                    </div>
                    <h3>Smart Filtering</h3>
                    <p>Find what you need quickly with powerful search and filtering options. Sort by date, category, or status.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-bell"></i>
                    </div>
                    <h3>Notifications</h3>
                    <p>Never miss a deadline with smart notifications and reminders. Stay informed about important updates.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-cloud"></i>
                    </div>
                    <h3>Cloud Sync</h3>
                    <p>Your data is automatically synced across all devices. Access your tasks from anywhere with internet connection.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <h3>Secure & Private</h3>
                    <p>Your data is protected with enterprise-grade security. We respect your privacy and never share your information.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-palette"></i>
                    </div>
                    <h3>Customizable</h3>
                    <p>Personalize your workspace with custom categories, themes, and layouts that match your workflow.</p>
                </div>
            </div>
        </div>

        <!-- CTA Section -->
        <section class="cta-section">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of users who are already boosting their productivity with Bitrix24.</p>
            <a onclick="showPage('register')" class="cta-btn">Start Free Trial</a>
        </section>
    `;
    
    addFeaturesStyles();
}

function loadPricingPage(pageElement) {
    pageElement.innerHTML = `
        <!-- Hero Section -->
        <section class="hero-section">
            <h1>Simple, Transparent Pricing</h1>
            <p>Choose the plan that's right for you. Start free and upgrade as you grow.</p>
        </section>

        <!-- Pricing -->
        <div class="pricing-container">
            <div class="pricing-grid">
                <!-- Free Plan -->
                <div class="pricing-card">
                    <div class="plan-name">Free</div>
                    <div class="plan-price">$0<span>/month</span></div>
                    <div class="plan-description">Perfect for individuals getting started</div>
                    <ul class="plan-features">
                        <li class="included"><i class="fas fa-check"></i> Up to 10 tasks</li>
                        <li class="included"><i class="fas fa-check"></i> Basic task management</li>
                        <li class="included"><i class="fas fa-check"></i> Mobile access</li>
                        <li class="not-included"><i class="fas fa-times"></i> Team collaboration</li>
                        <li class="not-included"><i class="fas fa-times"></i> Advanced analytics</li>
                        <li class="not-included"><i class="fas fa-times"></i> Priority support</li>
                    </ul>
                    <a onclick="showPage('register')" class="plan-btn secondary">Get Started Free</a>
                </div>

                <!-- Pro Plan -->
                <div class="pricing-card popular">
                    <div class="popular-badge">Most Popular</div>
                    <div class="plan-name">Pro</div>
                    <div class="plan-price">$9<span>/month</span></div>
                    <div class="plan-description">Great for small teams and professionals</div>
                    <ul class="plan-features">
                        <li class="included"><i class="fas fa-check"></i> Unlimited tasks</li>
                        <li class="included"><i class="fas fa-check"></i> Team collaboration</li>
                        <li class="included"><i class="fas fa-check"></i> Advanced filtering</li>
                        <li class="included"><i class="fas fa-check"></i> File attachments</li>
                        <li class="included"><i class="fas fa-check"></i> Email notifications</li>
                        <li class="not-included"><i class="fas fa-times"></i> Advanced analytics</li>
                    </ul>
                    <a onclick="showPage('register')" class="plan-btn">Start Pro Trial</a>
                </div>

                <!-- Business Plan -->
                <div class="pricing-card">
                    <div class="plan-name">Business</div>
                    <div class="plan-price">$19<span>/month</span></div>
                    <div class="plan-description">Perfect for growing businesses</div>
                    <ul class="plan-features">
                        <li class="included"><i class="fas fa-check"></i> Everything in Pro</li>
                        <li class="included"><i class="fas fa-check"></i> Advanced analytics</li>
                        <li class="included"><i class="fas fa-check"></i> Custom workflows</li>
                        <li class="included"><i class="fas fa-check"></i> API access</li>
                        <li class="included"><i class="fas fa-check"></i> Priority support</li>
                        <li class="included"><i class="fas fa-check"></i> Custom integrations</li>
                    </ul>
                    <a onclick="showPage('register')" class="plan-btn">Start Business Trial</a>
                </div>
            </div>
        </div>

        <!-- FAQ Section -->
        <section class="faq-section">
            <div class="faq-container">
                <h2 class="faq-title">Frequently Asked Questions</h2>
                
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFaq(this)">
                        Can I change my plan anytime?
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFaq(this)">
                        Is there a free trial for paid plans?
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        Yes, we offer a 14-day free trial for all paid plans. No credit card required to start your trial.
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFaq(this)">
                        What payment methods do you accept?
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        We accept all major credit cards (Visa, MasterCard, American Express) and PayPal.
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFaq(this)">
                        Can I cancel my subscription anytime?
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        Absolutely! You can cancel your subscription at any time. You'll continue to have access until the end of your current billing period.
                    </div>
                </div>
            </div>
        </section>
    `;
    
    addPricingStyles();
}

function loadDashboardPage(pageElement) {
    pageElement.innerHTML = `
        <!-- Main Dashboard -->
        <div class="app-container">
            <header>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h1><i class="fas fa-tasks"></i> Task Dashboard</h1>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <span id="user-info" style="color: #666; font-size: 0.9rem;"></span>
                        <button onclick="logout()" class="btn" style="background: #dc3545; color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.5rem; cursor: pointer;">
                            <i class="fas fa-sign-out-alt"></i> Logout
                        </button>
                    </div>
                </div>
            </header>

            <!-- Controls -->
            <div class="controls">
                <button class="btn add-btn" id="add-task-btn">
                    <i class="fas fa-plus"></i> Add New Task
                </button>
                <div class="filters">
                    <input type="text" id="search-bar" placeholder="Search tasks...">
                    <select id="filter-category">
                        <option value="all">All Categories</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Shopping">Shopping</option>
                    </select>
                    <select id="filter-status">
                        <option value="all">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="incomplete">Incomplete</option>
                    </select>
                    <select id="sort-tasks">
                        <option value="date-desc">Due Date (Latest)</option>
                        <option value="date-asc">Due Date (Earliest)</option>
                    </select>
                </div>
            </div>

            <!-- Task List -->
            <ul id="task-list"></ul>
        </div>

        <!-- Task Modal -->
        <div class="modal-overlay" id="task-modal" style="display: none;">
            <div class="modal-content">
                <h2 id="modal-title">Add New Task</h2>
                <form id="task-form">
                    <input type="hidden" id="task-id">
                    <div class="form-group">
                        <label for="task-title">Task Title</label>
                        <input type="text" id="task-title" required>
                    </div>
                    <div class="form-group">
                        <label for="task-desc">Description</label>
                        <textarea id="task-desc" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="task-due-date">Due Date</label>
                        <input type="date" id="task-due-date" required>
                    </div>
                    <div class="form-group">
                        <label for="task-category">Category</label>
                        <select id="task-category">
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Shopping">Shopping</option>
                        </select>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn cancel-btn" id="cancel-btn">Cancel</button>
                        <button type="submit" class="btn save-btn">Save Task</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    addDashboardStyles();
    initializeDashboard();
}

function loadHelpPage(pageElement) {
    pageElement.innerHTML = `
        <!-- Hero Section -->
        <section class="hero-section">
            <h1>Help Center</h1>
            <p>Find answers to your questions and learn how to get the most out of Bitrix24 Task Manager.</p>
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Search for help articles..." id="helpSearch">
            </div>
        </section>

        <!-- Help Content -->
        <div class="help-container">
            <!-- Help Categories -->
            <div class="help-categories">
                <div class="category-card" onclick="showCategory('getting-started')">
                    <div class="category-icon">
                        <i class="fas fa-rocket"></i>
                    </div>
                    <h3>Getting Started</h3>
                    <p>Learn the basics of using Bitrix24 Task Manager</p>
                    <div class="article-count">8 articles</div>
                </div>
                
                <div class="category-card" onclick="showCategory('task-management')">
                    <div class="category-icon">
                        <i class="fas fa-tasks"></i>
                    </div>
                    <h3>Task Management</h3>
                    <p>Master task creation, editing, and organization</p>
                    <div class="article-count">12 articles</div>
                </div>
                
                <div class="category-card" onclick="showCategory('collaboration')">
                    <div class="category-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <h3>Team Collaboration</h3>
                    <p>Work effectively with your team members</p>
                    <div class="article-count">6 articles</div>
                </div>
                
                <div class="category-card" onclick="showCategory('account')">
                    <div class="category-icon">
                        <i class="fas fa-user-cog"></i>
                    </div>
                    <h3>Account & Settings</h3>
                    <p>Manage your account and customize preferences</p>
                    <div class="article-count">5 articles</div>
                </div>
                
                <div class="category-card" onclick="showCategory('troubleshooting')">
                    <div class="category-icon">
                        <i class="fas fa-tools"></i>
                    </div>
                    <h3>Troubleshooting</h3>
                    <p>Solve common issues and technical problems</p>
                    <div class="article-count">10 articles</div>
                </div>
                
                <div class="category-card" onclick="showCategory('mobile')">
                    <div class="category-icon">
                        <i class="fas fa-mobile-alt"></i>
                    </div>
                    <h3>Mobile App</h3>
                    <p>Use Bitrix24 on your mobile devices</p>
                    <div class="article-count">4 articles</div>
                </div>
            </div>

            <!-- FAQ Section -->
            <div class="faq-section">
                <h2>Frequently Asked Questions</h2>
                
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFaq(this)">
                        How do I create my first task?
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Creating your first task is easy:</p>
                        <ul>
                            <li>Click the "Add New Task" button on your dashboard</li>
                            <li>Fill in the task title (required)</li>
                            <li>Add a description if needed</li>
                            <li>Set a due date</li>
                            <li>Choose a category</li>
                            <li>Click "Save Task"</li>
                        </ul>
                        <p>Your task will appear in your task list immediately.</p>
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFaq(this)">
                        Can I organize tasks by categories?
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Yes! Bitrix24 Task Manager supports task categorization:</p>
                        <ul>
                            <li>Default categories include Work, Personal, and Shopping</li>
                            <li>You can filter tasks by category using the dropdown filter</li>
                            <li>Categories help you organize and find tasks quickly</li>
                            <li>Each category has a distinct color for easy identification</li>
                        </ul>
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFaq(this)">
                        How do I mark a task as completed?
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>To mark a task as completed:</p>
                        <ul>
                            <li>Find the task in your task list</li>
                            <li>Click the checkbox next to the task title</li>
                            <li>The task will be marked as completed and crossed out</li>
                            <li>You can uncheck it to mark it as incomplete again</li>
                        </ul>
                        <p>Completed tasks can be filtered using the status filter.</p>
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFaq(this)">
                        Is my data saved automatically?
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Yes, your data is automatically saved:</p>
                        <ul>
                            <li>All tasks are saved to your browser's local storage</li>
                            <li>Changes are saved immediately when you create, edit, or delete tasks</li>
                            <li>Your tasks will persist between browser sessions</li>
                            <li>For cloud sync, upgrade to a paid plan</li>
                        </ul>
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFaq(this)">
                        Can I search for specific tasks?
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Absolutely! Use the search functionality:</p>
                        <ul>
                            <li>Type in the search bar at the top of your dashboard</li>
                            <li>Search works for both task titles and descriptions</li>
                            <li>Results update in real-time as you type</li>
                            <li>Combine search with filters for more precise results</li>
                        </ul>
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFaq(this)">
                        What browsers are supported?
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Bitrix24 Task Manager works on all modern browsers:</p>
                        <ul>
                            <li>Chrome (recommended)</li>
                            <li>Firefox</li>
                            <li>Safari</li>
                            <li>Microsoft Edge</li>
                            <li>Opera</li>
                        </ul>
                        <p>For the best experience, keep your browser updated to the latest version.</p>
                    </div>
                </div>
            </div>

            <!-- Contact Support -->
            <div class="contact-support">
                <h2>Still Need Help?</h2>
                <p>Can't find what you're looking for? Our support team is here to help you succeed.</p>
                <a onclick="showPage('contact')" class="support-btn">Contact Support</a>
            </div>
        </div>
    `;
    
    addHelpStyles();
}

function loadContactPage(pageElement) {
    pageElement.innerHTML = `
        <!-- Hero Section -->
        <section class="hero-section">
            <h1>Get in Touch</h1>
            <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </section>

        <!-- Contact Content -->
        <div class="contact-container">
            <!-- Contact Information -->
            <div class="contact-info">
                <h2>Contact Information</h2>
                
                <div class="contact-item">
                    <div class="contact-icon">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div class="contact-details">
                        <h3>Address</h3>
                        <p>123 Business Street<br>Tech City, TC 12345<br>United States</p>
                    </div>
                </div>
                
                <div class="contact-item">
                    <div class="contact-icon">
                        <i class="fas fa-phone"></i>
                    </div>
                    <div class="contact-details">
                        <h3>Phone</h3>
                        <p>+1 (555) 123-4567</p>
                    </div>
                </div>
                
                <div class="contact-item">
                    <div class="contact-icon">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <div class="contact-details">
                        <h3>Email</h3>
                        <p>support@bitrix24taskmanager.com</p>
                    </div>
                </div>
                
                <div class="contact-item">
                    <div class="contact-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="contact-details">
                        <h3>Business Hours</h3>
                        <p>Monday - Friday: 9:00 AM - 6:00 PM<br>Saturday: 10:00 AM - 4:00 PM<br>Sunday: Closed</p>
                    </div>
                </div>
            </div>

            <!-- Contact Form -->
            <div class="contact-form">
                <h2>Send us a Message</h2>
                <form id="contactForm">
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="subject">Subject</label>
                        <select id="subject" name="subject" required>
                            <option value="">Select a subject</option>
                            <option value="general">General Inquiry</option>
                            <option value="support">Technical Support</option>
                            <option value="billing">Billing Question</option>
                            <option value="feature">Feature Request</option>
                            <option value="bug">Bug Report</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" placeholder="Tell us how we can help you..." required></textarea>
                    </div>
                    
                    <button type="submit" class="submit-btn">Send Message</button>
                </form>
                <div id="form-message" style="margin-top: 1rem; text-align: center; font-weight: 600;"></div>
            </div>
        </div>

        <!-- Social Media Section -->
        <section class="social-section">
            <h2>Follow Us</h2>
            <p>Stay connected with us on social media for updates and tips</p>
            <div class="social-links">
                <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="#" aria-label="GitHub"><i class="fab fa-github"></i></a>
            </div>
        </section>
    `;
    
    addContactStyles();
    initializeContactForm();
}

function loadLoginPage(pageElement) {
    pageElement.innerHTML = `
        <div class="auth-container">
            <div class="auth-box">
                <div class="auth-logo">Bitrix24</div>
                <div class="auth-title">Sign in to your account</div>
                <form class="auth-form" autocomplete="off" id="loginForm">
                    <div>
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" required>
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" required>
                    </div>
                    <div class="forgot">
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit" class="auth-btn"><span>Login</span></button>
                </form>
                <div id="message" style="margin-top: 1rem; text-align: center; font-size: 0.9rem;"></div>
                <div class="auth-link">
                    Don't have an account? <a onclick="showPage('register')">Sign up</a>
                </div>
            </div>
        </div>
    `;
    
    addAuthStyles();
    initializeLoginForm();
}

function loadRegisterPage(pageElement) {
    pageElement.innerHTML = `
        <div class="auth-container">
            <div class="auth-box">
                <div class="auth-logo">Bitrix24</div>
                <div class="auth-title">Create your account</div>
                <form class="auth-form" autocomplete="off" id="registerForm">
                    <div>
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" required>
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password (min 6 characters)" required>
                    </div>
                    <div>
                        <label for="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" required>
                    </div>
                    <button type="submit" class="auth-btn"><span>Register</span></button>
                </form>
                <div id="message" style="margin-top: 1rem; text-align: center; font-size: 0.9rem;"></div>
                <div class="auth-link">
                    Already have an account? <a onclick="showPage('login')">Sign in</a>
                </div>
            </div>
        </div>
    `;
    
    addAuthStyles();
    initializeRegisterForm();
}
