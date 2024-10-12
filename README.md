# PixelPost - Generative AI community Platform

> PixelPost is a full-stack web application that leverages OpenAI's API to generate AI-driven images and allows users to create, share, and explore a community of AI-generated content. The application features secure authentication using Auth0, personalized user profiles, and image storage powered by Cloudinary.


## Features

- AI-generated image creation using OpenAI's API
- User authentication with Auth0
- Personalized user profiles
- Image storage and management with Cloudinary
- Community showcase for sharing and exploring images
- Responsive UI for a seamless experience on all devices


## Tech Stack

- **Client:** React, Vite, TailwindCSS, Material UI
- **Server:** Node.js, Express
- **Database:** MongoDB (Atlas)
- **Authentication:** Auth0
- **Cloud Storage:** Cloudinary
- **AI Integration:** OpenAI API
- **Containerization:** Docker
- **Orchestration:** Kubernetes (Optional)

  
 

## Getting Started
### Prerequisites

- Node.js (v16 or later)
- Docker (optional for containerization)
- Kubernetes (optional for orchestration)

## Environement Variables

- ### Backend(server/.env)
```
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
OPENAI_API_KEY=<your-openai-api-key>
MONGODB_URL=<your-mongodb-url>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
AUTH0_DOMAIN=<your-auth0-domain>
AUTH0_AUDIENCE=<your-auth0-audience>
CLIENT_SECRET=<your-auth0-client-secret>
AUTH0_CLIENT_ID=<your-auth0-client-id>
```

- ### Frontend(client/.env)
```
VITE_AUTH0_DOMAIN=<your-auth0-domain>
VITE_AUTH0_CLIENT_ID=<your-auth0-client-id>
VITE_CLIENT_SECRET=<your-auth0-client-secret>
VITE_AUTH0_AUDIENCE=http://localhost:8080/
```

## Installation
Clone the repository:
```
git clone https://github.com/your-username/pixelpost.git
cd pixelpost
```

### Install Dependencies
For both backend and frontend, install the dependencies:

**Backend:**
```
cd server
npm install
```
**Frontend:**
```
cd client
npm install
```

## Running the Application
- **Backend**
```
cd server
npm start
The backend will be running at http://localhost:8080.
```

- **Frontend**
```
cd client
npm run dev
The frontend will be running at http://localhost:5173.
```

## Docker Setup
To containerize the application with Docker, use the following Dockerfiles located in server/ and client/ directories.

1. Build the backend image:
```
docker build -t your-backend-image-name ./server
```
2. Build the frontend image:
```
docker build -t your-frontend-image-name ./client
```
3. Run Docker Compose (in the root of the project):
```
docker-compose up --build
```
This will set up both frontend and backend using Docker.

## Contributing
*Contributions are welcome! Please fork the repository, create a branch, and submit a pull request.*😎
