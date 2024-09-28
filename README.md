# Blog Post Management System

This is a Next.js application that enables users to create, read, update, and delete blog posts with image uploads. It features a responsive design, SweetAlert notifications for user interactions, and uses Prisma for database management. This project is perfect for building a simple blog platform using modern tech stacks.

## Features

- **CRUD Functionality**: Create, read, update, and delete blog posts seamlessly.
- **Image Uploads**: Easily upload images associated with each blog post.
- **Responsive Design**: The application is designed to be fully responsive, providing an optimal viewing experience on all devices.
- **SweetAlert Notifications**: User-friendly notifications for various interactions, enhancing user experience.
- **Database Management with Prisma**: Utilizes Prisma ORM for efficient database management and queries.

## Getting Started

To clone and run this project locally, follow these steps:

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (or Yarn) installed on your machine.

1. Open your terminal.
2. Clone the repository using the following command:
   ```bash
   git clone https://github.com/Ganiramadhan/blog-posts.git
    ```
3. Navigate to the project directory:
   ```bash
   cd blog-posts
    ```
4. Install Dependencies:
   ```bash
   npm or yarn install 
    ```
5. Set Up Database:
   ```bash
   npx prisma migrate dev --name init
    ```
6. Run the Development Server:
   ```bash
   npm or yarn dev 
   ```

Your application should now be running at http://localhost:3000. Open this URL in your browser to see your project.



