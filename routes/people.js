import express from "express";
import db from "../db/dbconnection.js";

const router = express.Router();
router.use(express.json());

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
    enrollment_date,
    year_of_study,
    current_semester,
    branch,
    status,
    employee_id,
    date_of_hire,
    teaching_department_id,
  } = req.body;

  try {
    const [newPersonId] = await db("people")
      .insert({
        first_name,
        last_name,
        date_of_birth,
        gender,
        email,
        phone_number,
        address,
        role,
        student_id,
        enrollment_date,
        year_of_study,
        current_semester,
        branch,
        status,
        employee_id,
        date_of_hire,
        teaching_department_id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning("person_id");

    res.status(201).json({
      id: newPersonId,
      message: "Person created successfully.",
    });
  } catch (error) {
    console.error("Error creating person:", error.message); // Log error message
    res.status(500).json({
      message: "Error creating person.",
      error: error.message, // Include the error message in the response
    });
  }
});

 router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 3; 
  const offset = (page - 1) * limit; 

  try {
    const [totalCount] = await db("people").count("person_id as count").whereNull("deleted_at");

    const people = await db("people")
      .select("*")
      .whereNull("deleted_at")
      .limit(limit)
      .offset(offset);

    res.status(200).json({
      page,
      totalPages: Math.ceil(totalCount.count / limit),
      totalCount: totalCount.count,
      people,
    });
  } catch (error) {
    console.error("Error retrieving people:", error);
    res.status(500).json({ message: "Error retrieving people." });
  }
});

router.get("/search", async (req, res) => {
  const { student_id, employee_id } = req.query;

  try {
      const query = db("people").whereNull("deleted_at");
      if (student_id) {
          query.andWhere("student_id", student_id);
      }
      if (employee_id) {
          query.andWhere("employee_id", employee_id);
      }

      const results = await query.select("*");

      res.status(200).json({ results });
  } catch (error) {
      console.error("Error searching for people:", error.message);
      res.status(500).json({ message: "Error searching for people." });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const personData = req.body;

  if (personData.date_of_birth) {
    personData.date_of_birth = new Date(personData.date_of_birth).toISOString().split('T')[0];
  }
  if (personData.enrollment_date) {
    personData.enrollment_date = new Date(personData.enrollment_date).toISOString().split('T')[0];
  }
  if (personData.date_of_hire) {
    personData.date_of_hire = new Date(personData.date_of_hire).toISOString().split('T')[0];
  }

  try {
    const result = await db('people')
      .where({ person_id: id })
      .update({
        ...personData,
        updatedAt: new Date() // Ensure to update the timestamp
      });

    if (result) {
      res.status(200).json({ message: 'Person updated successfully' });
    } else {
      res.status(404).json({ message: 'Person not found' });
    }
  } catch (error) {
    console.error('Error updating person:', error.message); // Log error message
    res.status(500).json({
      message: 'Error updating person.',
      error: error.message, // Include the error message in the response
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const currentTime = new Date();
    const formattedTime = currentTime.toISOString().slice(0, 19).replace('T', ' '); // Format to 'YYYY-MM-DD HH:MM:SS'

    const updatedRows = await db("people")
      .where({ person_id: id })
      .update({ deleted_at: formattedTime }); // Set the deleted_at field

    if (updatedRows === 0) {
      res.status(404).json({ message: "Person not found." });
    }

    res.status(200).json({ message: "Person soft deleted successfully." });
  } catch (error) {
    console.error("Error deleting person:", error);
    res.status(500).json({ message: "Error deleting person." });
  }
});

export default router;
