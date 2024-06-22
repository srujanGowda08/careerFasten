// import dotenv from "dotenv";
// import connectDB from "./db/index.js";
// import { app } from "./app.js";


// dotenv.config({
//     path: './.env'
// })

// connectDB()
// .then(() => {
//     app.on("error", (error) => {
//         console.log("Errror occured while connecting to DB", error);
//         throw error
//     })

//     app.listen(process.env.PORT || 8000, () => {
//         console.log(`Server is running on port : ${process.env.PORT}`);
//     })
// })
// .catch( (err) => {
//     console.error("MongoDB connection FAILED !!!", err)
// })


import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config({
    path: './.env'
});

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("Error occurred while connecting to DB", error);
        throw error;
    });

    const httpServer = createServer(app);

    const io = new Server(httpServer, {
        cors: {
            origin: process.env.CORS_ORIGIN,
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });

        socket.on('exampleEvent', (data) => {
            console.log('Received exampleEvent with data:', data);
            io.emit('responseEvent', data); 
        });
    });

    httpServer.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port: ${process.env.PORT || 8000}`);
    });
})
.catch((err) => {
    console.error("MongoDB connection FAILED !!!", err);
});



// import dotenv from "dotenv";
// import connectDB from "./db/index.js";
// import { app } from "./app.js";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import jwt from "jsonwebtoken";
// import { getUserFromDB } from "./utils/userHelper.js"; 

// dotenv.config({
//   path: './.env'
// });

// connectDB()
//   .then(() => {
//     app.on("error", (error) => {
//       console.log("Error occurred while connecting to DB", error);
//       throw error;
//     });

//     const httpServer = createServer(app);

//     const io = new Server(httpServer, {
//       cors: {
//         origin: "http://127.0.0.1:5500",
//         methods: ["GET", "POST"],
//         credentials: true,
//       },
//     });

//     io.use(async (socket, next) => {
//       try {
//         const token = socket.handshake.auth.token;
//         if (!token) {
//           return next(new Error("Authentication error"));
//         }
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await getUserFromDB(decoded.id);
//         if (!user) {
//           return next(new Error("User not found"));
//         }
//         socket.user = user;
//         next();
//       } catch (err) {
//         next(new Error("Authentication error"));
//       }
//     });

//     io.on('connection', (socket) => {
//       console.log('New client connected:', socket.user.name);

//       socket.on('disconnect', () => {
//         console.log('Client disconnected:', socket.user.name);
//       });

//       socket.on('exampleEvent', (message) => {
//         console.log(`${socket.user.name}: ${message}`);
//         io.emit('responseEvent', { user: socket.user.name, message });
//       });
//     });

//     httpServer.listen(process.env.PORT || 8000, () => {
//       console.log(`Server is running on port: ${process.env.PORT || 8000}`);
//     });
//   })
//   .catch((err) => {
//     console.error("MongoDB connection FAILED !!!", err);
//   });




