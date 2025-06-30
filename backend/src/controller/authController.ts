import { Request, Response } from "express";
import { query } from "../dbConn/pgClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate tokens or session here if needed
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.ACCESS_TOKEN || "your_access_token_secret",
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.REFRESH_TOKEN || "your_refresh_token_secret",
      { expiresIn: "7d" }
    );

    res.cookie("token", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 hour
    });

    res.status(200).json({
      accessToken,
    });
  } catch (error) {}
};

// export const refresh = async (req: Request, res: Response) => {
//   try {
//     const cookie = req.cookies;

//     if (!cookie || !cookie.token) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const refreshToken = cookie.token;

//     jwt.verify(
//       refreshToken,
//       process.env.REFRESH_TOKEN as string,
//       async (err: jwt.VerifyErrors | null, decoded: any) => {
//         if (err) {
//           return res.status(403).json({ message: "Forbidden" });
//         }

//         const user = await prisma.user.findUnique({
//           where: {
//             id: (decoded as { id: string }).id,
//           },
//         });

//         if (!user) {
//           return res.status(404).json({ message: "User not found" });
//         }

//         const accessToken = jwt.sign(
//           {
//             id: user.id,
//             name: user.name,
//             email: user.email,
//             createdAt: user.createdAt,
//             updatedAt: user.updatedAt,
//           },
//           process.env.ACCESS_TOKEN as string,
//           {
//             expiresIn: "1h",
//           }
//         );

//         return res.status(200).json({ accessToken });
//       }
//     );
//   } catch (error) {
//     return res.status(400).json({ message: "Unauthorised User" });
//   }
// };

// export const createUser = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   const existingUser = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (existingUser) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   // Hash the password before saving
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = await prisma.user.create({
//     data: {
//       email,
//       password: hashedPassword,
//     },
//   });

//   res.status(201).json({
//     message: "User created successfully",
//     newUser,
//   });
// };
