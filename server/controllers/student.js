import studentData from "./../models/student.js";
export const getStudents = async (request, response) => {
  try {
    const allStudents = await studentData.find();
    response.status(200).json(allStudents);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const createStudent = async (request, response) => {
  const student = request.body;
  const newStudent = new studentData(student);
  try {
    await newStudent.save();
    response.status(201).json(newStudent);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

export const deleteStudent = async (request, response) => {
  const id = request.params.id;
  try {
    await studentData.findByIdAndRemove(id).exec();
    response.send("Successfully Deleted");
  } catch (error) {
    console.log(error);
  }
};

export const updateStudent = async (request, response) => {
  const id = request.params.id;
  const student = request.body;
  try {
    await studentData.findByIdAndUpdate(id, student).exec();
    response.send("Successfully Updated");
  } catch (error) {
    console.log(error);
  }
};
