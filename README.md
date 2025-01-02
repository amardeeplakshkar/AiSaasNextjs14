# EDITH AI - Advanced AI Assistant Platform 🤖

<div align="center">
  <img src="/public/Hero.png" alt="EDITH AI Platform" width="600"/>
  
  ![Next.js](https://img.shields.io/badge/Next.js-15.1.3-black)
  ![React](https://img.shields.io/badge/React-19.0.0-blue)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue)
  ![Prisma](https://img.shields.io/badge/Prisma-6.1.0-green)
  ![License](https://img.shields.io/badge/License-MIT-yellow)
</div>

## 🌟 Features

- **🤖 AI Chat**: Engage in natural conversations with advanced AI
- **🎨 Image Generation**: Create stunning AI-generated images from text descriptions
- **💻 Code Generation**: Get AI-powered code suggestions and solutions
- **🔍 SearchGPT**: Advanced search capabilities with AI understanding
- **👥 AI Companions**: Interact with various AI personalities
- **⚡ Real-time Processing**: Fast and responsive AI interactions
- **🔐 User Authentication**: Secure authentication with Clerk
- **💳 API Limit Management**: Track and manage API usage
- **🎯 Modern UI**: Beautiful interface with Tailwind CSS and shadcn/ui

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB Database
- Clerk Account for Authentication
- Environment Variables Setup

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/edith-ai.git
cd edith-ai
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```env
# Create a .env file with:
DATABASE_URL="your_mongodb_url"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

## 🏗️ Project Structure

```
edith-ai/
├── app/                    # Next.js app directory
│   ├── (apis)/            # API routes
│   ├── (auth)/            # Authentication pages
│   ├── (routes)/          # Application routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # UI components
│   └── ...               # Feature components
├── lib/                  # Utility functions
├── prisma/               # Database schema
└── public/              # Static assets
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15.1.3
- **Language**: TypeScript
- **Database**: MongoDB with Prisma ORM
- **Authentication**: Clerk
- **UI Components**: 
  - Tailwind CSS
  - shadcn/ui
  - Radix UI
- **State Management**: React Hooks
- **API Integration**: REST APIs
- **Deployment**: Vercel (recommended)

## 🔑 Key Features Explained

### AI Chat System
- Real-time conversation with AI
- Context-aware responses
- Markdown support with syntax highlighting
- LaTeX math rendering

### Image Generation
- Text-to-image generation
- Multiple aspect ratio support
- Image download functionality
- Safe content filtering

### Code Generation
- Multiple language support
- Syntax highlighting
- Copy-to-clipboard functionality
- Code explanation capability

### AI Companions
- Multiple AI personalities
- Contextual conversations
- Customizable responses
- Interactive chat interface

## 🔐 Security

- Secure authentication with Clerk
- API rate limiting
- Protected routes
- Input sanitization
- Secure data handling

## 🎯 Future Roadmap

- [ ] Voice interaction support
- [ ] Mobile application
- [ ] Additional AI models integration
- [ ] Enhanced companion customization
- [ ] Team collaboration features
- [ ] Advanced analytics dashboard

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Clerk](https://clerk.dev/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## 📧 Contact

For any queries or support, please reach out to:
- Email: amardeep.devs@gmail.com
- Twitter: [@AmardeepDevs](https://twitter.com/AmardeepDevs)
- Website: [Portfolio](https://amardeep-portfolio.vercel.app])

---
<div align="center">
  Made with ❤️ by Amardeep Lakshkar
</div>
