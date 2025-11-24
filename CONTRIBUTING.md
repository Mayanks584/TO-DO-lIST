# 🤝 Contributing to TaskFlow

We love your input! We want to make contributing to TaskFlow as easy and transparent as possible, whether it's:

- 🐛 Reporting a bug
- 💡 Discussing the current state of the code
- 🚀 Submitting a fix
- 🎯 Proposing new features
- 👨‍💻 Becoming a maintainer

## 🚀 Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### 📋 Pull Request Process

1. **Fork the repo** and create your branch from `main`
2. **Add tests** if you've added code that should be tested
3. **Update documentation** if you've changed APIs
4. **Ensure the test suite passes**
5. **Make sure your code lints**
6. **Issue that pull request!**

## 🐛 Report Bugs Using GitHub Issues

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/Mayanks584/TaskFlow/issues).

### 📝 Bug Report Template

**Great Bug Reports** tend to have:

- 📋 A quick summary and/or background
- 🔄 Steps to reproduce
  - Be specific!
  - Give sample code if you can
- 🎯 What you expected would happen
- 💥 What actually happens
- 📝 Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## 🎨 Coding Style

### JavaScript/React Style Guide

- **Use Functional Components** and Hooks for React
- **Use 2 spaces** for indentation
- **Use semicolons** at the end of statements
- **Use camelCase** for variable and function names
- **Use PascalCase** for component names
- **Use UPPER_CASE** for constants
- **Add comments** for complex logic

### CSS Style Guide

- **Use 2 spaces** for indentation
- **Use CSS Variables** for theming (defined in `index.css`)
- **Use kebab-case** for CSS classes
- **Group related CSS properties** together
- **Use meaningful class names**

### Example Code Style

```jsx
// ✅ Good Component

import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const TaskItem = ({ task }) => {
  const { updateTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);

  const handleComplete = () => {
    updateTask(task.id, { status: 'completed' });
  };

  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <button onClick={handleComplete}>Done</button>
    </div>
  );
};
```

## 🏗️ Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/TaskFlow.git
   cd TaskFlow/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase URL and Anon Key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🧪 Testing

### Manual Testing Checklist

Before submitting a PR, please test:

- [ ] **User Registration** - New users can create accounts via Supabase Auth
- [ ] **User Login** - Existing users can log in
- [ ] **Dashboard Access** - Authenticated users can access dashboard
- [ ] **Task CRUD** - Create, Read, Update, and Delete tasks works with Supabase
- [ ] **Real-time Updates** - Changes reflect immediately
- [ ] **Responsive Design** - App works on mobile and desktop
- [ ] **Form Validation** - Forms show appropriate error messages

### Browser Testing

Please test your changes in:

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 📱 Feature Requests

We welcome feature requests! Please:

1. **Check existing issues** to avoid duplicates
2. **Provide detailed description** of the feature
3. **Explain the use case** - why would this be useful?
4. **Consider the scope** - is this a small enhancement or major feature?

### 🎯 Current Roadmap

Features we're planning to implement:

- [ ] **Advanced Task Filtering** - Filter by date, priority, category
- [ ] **Task Collaboration** - Share tasks with team members (Supabase RLS updates needed)
- [ ] **Task Templates** - Create reusable task templates
- [ ] **Calendar Integration** - View tasks in calendar format
- [ ] **Mobile App** - Native mobile applications
- [ ] **Dark Mode** - Dark theme support
- [ ] **Notifications** - Email and push notifications

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:

- 📋 README.md contributors section
- 🎉 Release notes for significant contributions
- 🏆 Special mentions for outstanding contributions

## 💬 Questions?

Feel free to reach out:

- 📧 Email: support@taskflow.com
- 💬 GitHub Discussions: [TaskFlow Discussions](https://github.com/Mayanks584/TaskFlow/discussions)
- 🐛 Issues: [GitHub Issues](https://github.com/Mayanks584/TaskFlow/issues)

---

**Thank you for contributing to TaskFlow! 🎉**

*Made with ❤️ by the TaskFlow community*
