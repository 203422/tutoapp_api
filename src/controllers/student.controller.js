import { StudentModel } from "../models/student.js";
import { validateData } from "../libs/validateData.js";


export class StudentController {

    static async assignTutor(req, res) {

        const { tutorCode, studentEnrollment } = req.body;

        if (!tutorCode || !studentEnrollment) return res.status(400).json({
            message: "Todos los campos son requeridos"
        });

        const assignedTutor = await StudentModel.assignTutor({ data: req.body });
        if (assignedTutor) return res.status(200).json(assignedTutor);

        res.status(500).json({ message: 'Se ha producido un error al asignar el tutor' });
    }

    static async saveStudentData(req, res) {

        const { userId, name, lastName, career, gender, tutorOrParent, birthdate, age, placeOfBirth, religion, activity } = req.body;

        if (!userId || !name || !lastName || !career || !gender || !tutorOrParent || !birthdate || !age || !placeOfBirth || !religion || !activity) {

            return res.status(400).json({
                message: "Todos los campos son requeridos"
            });
        };

        const cleanData = validateData.clean(req.body);

        const dataSave = await StudentModel.studentData({ studentData: cleanData });
        if (dataSave) return res.status(201).json(dataSave);

        res.status(500).json({ message: 'Error al guardar los datos del alumno' });

    }

    static async saveContactData(req, res) {
        const { userId, currentAddress, homeAddress, cellPhoneNumber, homePhoneNumber, email, tutorsEmail } = req.body;

        if (!userId || !currentAddress || !homeAddress || !cellPhoneNumber || !homePhoneNumber || !email || !tutorsEmail) {
            return res.status(400).json({
                message: "Todos los campos son requeridos"
            });
        }

        const cleanData = validateData.clean(req.body);

        const saveData = await StudentModel.contactData({ contactData: cleanData })
        if (saveData) return res.status(201).json(saveData);

        res.status(500).json({ message: 'Error al guardar los datos' });
    }

    static async saveMedicalData(req, res) {
        const { userId, socialSecurityNumber, bloodType, disease, disability, allergy, sustances } = req.body;

        if (!userId || !socialSecurityNumber || !bloodType || !disease || !disability || !allergy || !sustances) {
            return res.status(400).json({
                message: "Todos los campos son requeridos"
            });
        }

        const cleanData = validateData.clean(req.body);

        const saveData = await StudentModel.medicalData({ medicalData: cleanData })
        if (saveData) return res.status(200).json(saveData);
        res.status(500).json({ message: 'Error al guardar los datos' });
    }

    static async saveAcademicData(req, res) {

        const { userId, highSchool, average, scoreCeneval } = req.body;

        if (!userId || !highSchool || !average || !scoreCeneval) {
            return res.status(400).json({
                message: "Todos los campos son requeridos"
            });
        }

        const cleanData = validateData.clean(req.body);

        const saveData = await StudentModel.academicData({ academicData: cleanData })
        if (saveData) return res.status(200).json(saveData);
        res.status(500).json({ message: 'Error al guardar los datos' });
    }

    static async saveSocioeconomicData(req, res) {
        const { userId, workplace, economicalSupport, livesWith } = req.body;

        if (!userId || !workplace || !economicalSupport || !livesWith) {
            return res.status(400).json({
                message: "Todos los campos son requeridos"
            });
        }

        const cleanData = validateData.clean(req.body);

        const saveData = await StudentModel.socioeconomicData({ socioeconomicData: cleanData });
        if (saveData) return res.status(200).json(saveData);
        res.status(500).json({ message: 'Error al guardar los datos' });
    }

    // Controlador para actualizar los datos del estudiante

    static async updateUserStudentData(req, res) {
        const { userId, name, lastName, email} = req.body;

        if (!userId || !name || !lastName || !email) {
            return res.status(400).json({
                message: "Todos los campos son requeridos"
            });
        }

        const cleanData = validateData.clean(req.body);

        try {
            const dataUpdate = await StudentModel.updateUserStudentData({ studentData: cleanData });
            if (dataUpdate) return res.status(200).json(dataUpdate);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al actualizar los datos del alumno' });
        }
    }



    // static async updateStudentData(req, res) {
    //     const { userId, name, lastName, career, gender, tutorOrParent, birthdate, age, placeOfBirth, religion, activity } = req.body;

    //     if (!userId || !name || !lastName || !career || !gender || !tutorOrParent || !birthdate || !age || !placeOfBirth || !religion || !activity) {
    //         return res.status(400).json({
    //             message: "Todos los campos son requeridos"
    //         });
    //     }

    //     const cleanData = validateData.clean(req.body);

    //     try {
    //         const dataUpdate = await StudentModel.updateStudentData({ studentData: cleanData });
    //         if (dataUpdate) return res.status(200).json(dataUpdate);
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ message: 'Error al actualizar los datos del alumno' });
    //     }
    // }

    // Controlador para actualizar los datos de contacto
    static async updateContactData(req, res) {
        const { userId, currentAddress, homeAddress, cellPhoneNumber, homePhoneNumber, tutorsEmail } = req.body;

        if (!userId || !currentAddress || !homeAddress || !cellPhoneNumber || !homePhoneNumber || !tutorsEmail) {
            return res.status(400).json({
                message: "Todos los campos son requeridos"
            });
        }

        const cleanData = validateData.clean(req.body);

        try {
            const dataUpdate = await StudentModel.updateContactData({ contactData: cleanData });
            if (dataUpdate) return res.status(200).json(dataUpdate);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al actualizar los datos de contacto' });
        }
    }

    // Controlador para actualizar los datos médicos
    static async updateMedicalData(req, res) {
        const { userId, socialSecurityNumber, bloodType, disease, disability, allergy, sustances } = req.body;

        if (!userId || !socialSecurityNumber || !bloodType || !disease || !disability || !allergy || !sustances) {
            return res.status(400).json({
                message: "Todos los campos son requeridos"
            });
        }

        const cleanData = validateData.clean(req.body);

        try {
            const dataUpdate = await StudentModel.updateMedicalData({ medicalData: cleanData });
            if (dataUpdate) return res.status(200).json(dataUpdate);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al actualizar los datos médicos' });
        }
    }

    // Controlador para actualizar los datos académicos
    static async updateAcademicData(req, res) {
        const { userId, highSchool, average, scoreCeneval } = req.body;

        if (!userId || !highSchool || !average || !scoreCeneval) {
            return res.status(400).json({
                message: "Todos los campos son requeridos"
            });
        }

        const cleanData = validateData.clean(req.body);

        try {
            const dataUpdate = await StudentModel.updateAcademicData({ academicData: cleanData });
            if (dataUpdate) return res.status(200).json(dataUpdate);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al actualizar los datos académicos' });
        }
    }

    // Controlador para actualizar los datos socioeconómicos
    static async updateSocioeconomicData(req, res) {
        const { userId, workplace, economicalSupport, livesWith } = req.body;

        if (!userId || !workplace || !economicalSupport || !livesWith) {
            return res.status(400).json({
                message: "Todos los campos son requeridos"
            });
        }

        const cleanData = validateData.clean(req.body);

        try {
            const dataUpdate = await StudentModel.updateSocioeconomicData({ socioeconomicData: cleanData });
            if (dataUpdate) return res.status(200).json(dataUpdate);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al actualizar los datos socioeconómicos' });
        }
    }


    static async saveImage(req, res) {

        const student_id = req.params.id;
        const file = req.file;
        const savedImage = await StudentModel.saveImage(file, student_id)

        if (savedImage) return res.json(savedImage);
        res.status(500).json({ message: 'Error al guardar la imagen' });

    }

    static async checkProgressForm(req, res) {

        const student_id = req.params.id;

        const section = await StudentModel.checkProgressForm({ student_id });
        if (section) return res.status(200).json(section);

        res.status(500).json({ message: 'Error al obtener el progreso' });
    }

    static async getImageById(req, res) {
        const student_id = req.params.id;
        const image = await StudentModel.getImage(student_id);
        if (image) return res.json(image);
        res.status(500).json({ message: 'Error al obtener la imagen' });
    }

    static async deleteStudentById(req, res) {
        const studentId = req.params.id;
        const eliminatedStudent = await StudentModel.deleteStudent(studentId);
        if (eliminatedStudent) return res.status(200).json(eliminatedStudent)
        res.status(500).json({ message: 'Error al eliminar el alumno' });
    }
}