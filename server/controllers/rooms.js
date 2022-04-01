import roomsData from "./../models/rooms.js";
export const getroomss = async (request, response) => {
    console.log("sda end bna ");
    try {
        const allroomss = await roomsData.find();
        response.status(200).json(allroomss);
    } catch (error) {
        response.status(404).json({ message: error.message });
        console.log("404 error");
    }
};

export const createrooms = async (request, response) => {
    const rooms = request.body;
    const newrooms = new roomsData(rooms);
    try {
        await newrooms.save();
        response.status(201).json(newrooms);
    } catch (error) {
        response.status(409).json({ message: error.message });
    }
};

export const deleterooms = async (request, response) => {
    const id = request.params.id;
    try {
        await roomsData.findByIdAndRemove(id).exec();
        response.send("Successfully Deleted");
    } catch (error) {
        console.log(error);
    }
};

export const updaterooms = async (request, response) => {
    const id = request.params.id;
    const rooms = request.body;
    try {
        await roomsData.findByIdAndUpdate(id, rooms).exec();
        response.send("Successfully Updated");
    } catch (error) {
        console.log(error);
    }
};
