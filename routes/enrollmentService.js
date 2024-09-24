import express from "express";
import db from "../db/dbconnection.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    person_id,
    year_of_study,
    enrollment_date,
    current_semester,
    branch,
    status,
  } = req.body;

  try {
    const [newEnrollmentId] = await db("enrollment")
      .insert({
        person_id,
        year_of_study,
        enrollment_date,
        current_semester,
        branch,
        status,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning("enrollment_id");

    res.status(201).json({ enrollment_id: newEnrollmentId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// router.get("/", async (req, res) => {
//   try {
//     const enrollments = await db("enrollment").select("*");
//     res.status(200).json(enrollments);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.get("/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const enrollment = await db("enrollment").where({ enrollment_id: id });

//     if (enrollment) {
//       res.status(200).json(enrollment);
//     } else {
//       res.status(404).json({
//         message: "enrollment not found ",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    person_id,
    year_of_study,
    enrollment_date,
    current_semester,
    branch,
    status,
  } = req.body;

  try {
    const updateEnroll = await db("enrollment").where({ enrollment_id: id }).update({
      person_id,
      year_of_study,
      enrollment_date,
      current_semester,
      branch,
      status,
      updatedAt: new Date(),
    });
    if (updateEnroll) {
      res.status(200).json({
        message: "User updated succesfully",
        updateEnrollId: id,
      });
    } else {
      res.status(404).json({
        message: "Enrollment not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    console.log("Received ID for deletion:", id); // Logging the received ID

    try {
        const deletedEnrollment = await db("enrollment").where({ enrollment_id: Number(id) }).del();

        if (deletedEnrollment > 0) {
            res.status(200).json({
                message: "Enrollment deleted successfully",
            });
        } else {
            res.status(404).json({
                message: "Enrollment not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});

router.get("/", async (req,res) => {
    const page =  parseInt(req.query.page) || 1 ;
    const pageSize = parseInt(req.query.pageSize) || 3;

    try {
        const enrolls = await db ("enrollment")
        .select("*")
        .limit(pageSize)
        .offset((page - 1) * pageSize);

        const totalEnrolls = await db("enrollment").count('enrollment_id').first();

        res.status(200).json({
            total: totalEnrolls.count,
            page,
            pageSize,
            totalPages: Math.ceil(totalEnrolls.count / pageSize),
            enrolls,
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

export default router;
