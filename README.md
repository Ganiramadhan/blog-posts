# Blog Posts

This project is a simple blog application built with Next.js and Prisma. It allows you to display, add, edit, and delete blog posts.

## Prerequisites

Before getting started, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/get-npm) or [Yarn](https://yarnpkg.com/) for package management
- [PostgreSQL](https://www.postgresql.org/) or another supported database for Prisma (make sure your database is set up)

## Cloning the Repository

First, clone this repository to your local machine:

```bash
git clone https://github.com/Ganiramadhan/blog-posts.git
cd blog-posts
npm install # or yarn install
cp .env.example .env
# Update DATABASE_URL in .env with your database credentials
npx prisma generate
npx prisma migrate dev --name init
npm run dev # or yarn dev
