import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use(cookieParser());

import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";
import feedbackRouter from "./routes/feedback.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/feedbacks", feedbackRouter);

export { app };




// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import path from "path";
// import { fileURLToPath } from 'url';

// // Define __dirname in ES module scope
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   })
// );

// app.use(express.json({ limit: "16kb" }));
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"));

// app.use(cookieParser());

// import userRouter from "./routes/user.route.js";
// import adminRouter from "./routes/admin.route.js";
// import feedbackRouter from "./routes/feedback.route.js";

// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/admins", adminRouter);
// app.use("/api/v1/feedbacks", feedbackRouter);

// // Serve the discussion HTML file
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/views/discuss.html'));
// });

// export { app };

