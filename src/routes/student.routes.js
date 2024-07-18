import { Router } from "express";
import { StudentController } from "../controllers/student.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import multer from "multer";
import { storage } from "../middlewares/uploadImage.js";
import { TutorControllers } from "../controllers/tutor.controller.js";

const upload = multer({ storage }).single('profileImg');

export const studentRouter = Router();

studentRouter.get('/verify/tutor/:id', authenticate.authenticate(), TutorControllers.getTutorById);
studentRouter.post('/assign-tutor', authenticate.authenticate(), StudentController.assignTutor);
studentRouter.post('/save-data', authenticate.authenticate(), StudentController.saveStudentData);
studentRouter.post('/contact-data', authenticate.authenticate(), StudentController.saveContactData);
studentRouter.post('/medical-data', authenticate.authenticate(), StudentController.saveMedicalData);
studentRouter.post('/academic-data', authenticate.authenticate(), StudentController.saveAcademicData);
studentRouter.post('/socioeconomic-data', authenticate.authenticate(), StudentController.saveSocioeconomicData);
studentRouter.get('/form/progress/:id', authenticate.authenticate(), StudentController.checkProgressForm);
studentRouter.post('/image/:id', authenticate.authenticate(), upload, StudentController.saveImage);
studentRouter.get('/image/:id', authenticate.authenticate(), StudentController.getImageById);
studentRouter.delete('/:id', authenticate.authenticate(), StudentController.deleteStudentById)

// studentRouter.put('/update-data', authenticate.authenticate(), StudentController.updateStudentData);
studentRouter.put('/update-user-data', authenticate.authenticate(), StudentController.updateUserStudentData);
studentRouter.put('/update-contact-data', authenticate.authenticate(), StudentController.updateContactData);
studentRouter.put('/update-medical-data', authenticate.authenticate(), StudentController.updateMedicalData);
studentRouter.put('/update-academic-data', authenticate.authenticate(), StudentController.updateAcademicData);
studentRouter.put('/update-socioeconomic-data', authenticate.authenticate(), StudentController.updateSocioeconomicData);