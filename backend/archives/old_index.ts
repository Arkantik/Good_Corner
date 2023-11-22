// import "reflect-metadata";
// import express, { Request, Response } from "express";
// import db from "./db";

// // Entities
// import Ad from "./entities/Ad";

// const app = express();
// app.use(express.json());

// const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.get("/ads", async (req: Request, res: Response) => {
//   let location = req.query.location;
//   let sql = "SELECT * FROM ad";

//   if (location) {
//     sql += " WHERE location = ?";
//     db.all(sql, [location], (err: any, rows: any) => {
//       if (err) {
//         res.status(500).send(err.message);
//       } else {
//         res.send(rows);
//       }
//     });
//   } else {
//     db.all(sql, (err: any, rows: any) => {
//       if (err) {
//         res.status(500).send(err.message);
//       } else {
//         res.send(rows);
//       }
//     });
//   }
// });

// app.post("/ads", async (req: Request, res: Response) => {
//   const newAd: Ad = {
//     ...req.body,
//     createdAt: new Date().toISOString(),
//   };

//   db.run(
//     "INSERT INTO ad (title, owner, description, price, picture, location, createdAt) VALUES ($title, $owner, $description, $price, $picture, $location, $createdAt)",
//     {
//       $title: newAd.title,
//       $owner: newAd.owner,
//       $description: newAd.description,
//       $price: newAd.price,
//       $picture: newAd.picture,
//       $location: newAd.location,
//       $createdAt: newAd.createdAt,
//     },
//     function (this: any, err: any) {
//       if (!err) return res.send({ ...newAd, id: this.lastID });
//       console.log(err);
//       res.sendStatus(500);
//     }
//   );
// });

// app.patch("/ads/:id", async (req: Request, res: Response) => {
//   db.get("SELECT * FROM ad WHERE id = ?", [req.params.id], (err, row) => {
//     if (err) {
//       console.log(err);
//       return res.sendStatus(500);
//     }
//     if (!row) return res.sendStatus(404);

//     const setProps = Object.keys(req.body)
//       .reduce<string[]>((acc, prop) => [...acc, `${prop} = $${prop}`], [])
//       .join(", ");

//     const propsToUpdate = Object.keys(req.body).reduce(
//       (acc, prop) => ({ ...acc, [`$${prop}`]: req.body[prop] }),
//       {}
//     );

//     db.run(
//       `UPDATE ad SET ${setProps} WHERE id = $id`,
//       { ...propsToUpdate, $id: req.params.id },
//       (err: any) => {
//         if (!err) return res.send({ ...row, ...req.body });
//         console.log(err);
//         res.sendStatus(500);
//       }
//     );
//   });
// });

// app.delete("/ads/:id", async (req: Request, res: Response) => {
//   db.get("SELECT * FROM ad WHERE id = ?", [req.params.id], (err, row) => {
//     if (err) {
//       console.log(err);
//       return res.sendStatus(500);
//     }
//     if (!row) return res.sendStatus(404);
//     res.send(row);
//   });
// });

// app.listen(port, async () => {
//   await db.initialize();
//   console.log(`Example app listening on port ${port}`);
// });
