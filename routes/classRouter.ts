import { Router } from "express";
import { isAuthenticated, isTeacher } from "../middleware";
import { classSchema } from "../types";
import { Class } from "../models";

const classRouter = Router();

classRouter.post("/",isAuthenticated,async (req, res) => {
    const {success, data} = classSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ error: "Invalid class data", details: data });
    }
    try {
        const newClass = await Class.create({
            className: data.className,
            teacherId: req.userId,
            studentIds: []
        });
        res.status(201).json({
            success: true,
            data: {
                _id:req.userId,
                className: newClass.className,
                teacherId: newClass.teacherId,
                studentIds: newClass.studentIds
            }
        });
    } catch(error){
        res.status(500).json({ error: "Failed to create class" });
    }
});
classRouter.post("/:id/add-student",isAuthenticated, isTeacher,async (req, res) => {
    const classId = req.params.id;
    const teacherId = req.userId;
    const { studentId } = req.body;
    try {
        const classObj = await Class.findById(classId);
        if (!classObj) {
            return res.status(404).json({ error: "Class not found" });
        }
  }
})
export default classRouter;