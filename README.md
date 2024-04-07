# SocialCircle

SocialCircle is a full-stack social media application built with the MERN (MongoDB, Express, React, Node.js) stack. It offers a seamless social interaction experience similar to Instagram, with features including authentication, likes, comments, dark mode, and more.

https://social-circle-frontend-snowy.vercel.app/

## Features

- **Authentication**: Users can sign up, log in, and log out securely.
- **Post Creation**: Users can create posts to share with their friends and followers.
- **Likes and Comments**: Users can like and comment on posts.
- **Follow Friends**: Users can follow their friends to see their posts in their feed.
- **Dark Mode**: The application supports a dark mode for better usability in low-light environments.

## Technologies Used

- **Frontend**: React.js, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Storage** : Firebase
- **Styling**: CSS
- **Deployment**: Render for backend, Vercel for frontend




![Dashboard Dark](https://github.com/Nova-Spectre/Social-Circle/assets/51260891/3e06e0a1-997d-4fe1-86e5-cd54cb7fee62)
![Dashboard Light](https://github.com/Nova-Spectre/Social-Circle/assets/51260891/3ad9e4b1-0f96-4258-be08-2c9268776b5c)

## Setup


1. **Clone the repository**:

   ```bash
   git clone https://github.com/Nova-Spectre/socialcircle.git


2. Install dependencies

        ```bash
        cd socialcircle/server
        npm install
  
  3. Set up environment variables:
  Create a .env file in the root directory with the following variables:
  
    ```bash
      PORT=3001
      MONGODB_URI=your_mongodb_uri
      JWT_SECRET=your_jwt_secret
  
  4. Run the server:
        
    ```bash
        node index.js
  
  5. Start the frontend:
      Open another terminal window/tab and navigate to the frontend directory:
  
    ```bash
        cd frontend

  
   
  Install frontend dependencies:
  
      ```bash
      npm install
  
 Run the frontend:
       
       ```bash
       npm run dev




## Access the application

Open your browser and visit [http://localhost:5173](http://localhost:5173) to access the SocialCircle application.
Server will start on [http://localhost:3001](http://localhost:3001)

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [MIT License](LICENSE) file for details.







