# Portfolio Website

A modern, dark-themed full-stack portfolio website built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- **Modern UI/UX**: Dark theme, glassmorphism, and smooth animations.
- **Responsive Design**: Fully responsive for all devices.
- **Projects Showcase**: Filterable project grid with detailed modals.
- **Contact Form**: Functional contact form with email notifications (Nodemailer).

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS v4, Framer Motion.
- **Backend**: Next.js API Routes.
- **Validation**: Zod, React Hook Form.
- **Email**: Nodemailer.

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Zenus004/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_USER=your_email@example.com
   SMTP_PASS=your_password
   SMTP_FROM="Portfolio <noreply@example.com>"
   CONTACT_EMAIL=your_email@example.com
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## Deployment

Deploy easily on [Vercel](https://vercel.com).
1. Push to GitHub.
2. Import project in Vercel.
3. Add environment variables in Vercel dashboard.
4. Deploy.
