import expres from "express";
import db from "../db/dbconnection.js";

const router = expres.Router();

router.post("/", async (req, res) => {
  const {
    first_name,
    last_name,
    date_of_birth,
    gender,
    email,
    phone_number,
    address,
    role,
    student_id,
    employee_id,
    date_of_hire,
    teaching_department_id,
  } = req.body;

  try {
    const [newUserId] = await db("user").insert({
      first_name,
      last_name,
      date_of_birth,
      gender,
      email,
      phone_number,
      address,
      role,
      student_id,
      employee_id,
      date_of_hire,
      teaching_department_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted_at: new Date(),
    });
    res.statu(201).json({
      id: newUserId,
      message: "Person created successfully.",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// router.get("/", async (req, res) => {
//   try {
//     const users = await db("user").select("*");
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.get("/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await db("user").where({ person_id: id }).first();

//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res.statu(404).json({
//         message: "users not found",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// });

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    date_of_birth,
    gender,
    email,
    phone_number,
    address,
    role,
    student_id,
    employee_id,
    date_of_hire,
    teaching_department_id,
  } = req.body;

  try {
    const upatedUser = await db("user").where({ person_id: id }).update({
      first_name,
      last_name,
      date_of_birth,
      gender,
      email,
      phone_number,
      address,
      role,
      student_id,
      employee_id,
      date_of_hire,
      teaching_department_id,
      updatedAt: new Date(),
    });

    if (upatedUser) {
      res.status(200).json({
        message: "user updated successfully",
        upatedUserId: id,
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params; // Change this line

  try {
    const deleteUser = await db("user")
      .where({ person_id: Number(id) }) // Ensure id is a number
      .del();

    if (deleteUser > 0) {
      res.status(200).json({
        message: "User deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 3; // Default to 10 items per page if not provided
  
    try {
      const users = await db("user")
        .select("*")
        .limit(pageSize) // Limit the number of records returned
        .offset((page - 1) * pageSize); // Calculate offset
  
      const totalUsers = await db("user").count('person_id as count').first(); // Get total count of users
  
      res.status(200).json({
        total: totalUsers.count,
        page,
        pageSize,
        totalPages: Math.ceil(totalUsers.count / pageSize),
        users,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router;
