# PixelPost - Generative AI Community Platform

> PixelPost is a full-stack web application that leverages OpenAI's API to generate AI-driven images and allows users to create, share, and explore a community of AI-generated content. The application features secure authentication using Auth0, personalized user profiles, and image storage powered by Azure Blog Storage.


## Features

- AI-generated image creation using OpenAI's API
- User authentication with Auth0
- Personalized user profiles with like and comment features
- Image storage and management with Azure Blob Storage
- Community showcase for sharing and exploring images
- Responsive UI for a seamless experience on all devices


## Tech Stack

- **Client:** React, Vite, TailwindCSS
- **Server:** Node.js, Express
- **Database:** Azure CosmosDB
- **Authentication:** Auth0
- **Cloud Storage:** Azure Blog Storage
- **AI Integration:** OpenAI API
  
 

## Getting Started

## Environement Variables

- ### Backend(server/.env)
```
OPENAI_API_KEY=<your-openai-api-key>
COSMOSDB_URL=<your-cosmosDB-url>
AZURE_BLOB_CONNECTION_STRING=<blob-storage-connection-string>
AUTH0_DOMAIN=<your-auth0-domain>
AUTH0_AUDIENCE=<your-auth0-audience>
```

- ### Frontend(client/.env)
```
VITE_AUTH0_DOMAIN=<your-auth0-domain>
VITE_AUTH0_CLIENT_ID=<your-auth0-client-id>
VITE_CLIENT_SECRET=<your-auth0-client-secret>
VITE_AUTH0_AUDIENCE=http://localhost:8080/
VITE_BASE_URL=http://localhost:8080
```

## Installation
Clone the repository:
```
git clone https://github.com/your-username/PixelPost-Azure.git
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

## Contributing
*Contributions are welcome! Please fork the repository, create a branch, and submit a pull request.*😎
