import LocationModel from "../models/locations.js"

const ADD_LOCATION = async (req, res) => {
    try {
        const location = new LocationModel({
            title: req.body.title,
            description: req.body.description,
            longitude: Number(req.body.longitude),
            latitude: Number(req.body.latitude),
            location_photo_url: req.body.location_photo_url,
            owner_id: req.body.userId
        })

        const response = await location.save()
        return res.status(201).json({ response: response })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}
const GET_USERS_LOCATIONS = async (req, res) => {
    try {

        const locations = await LocationModel.find({ owner_id: req.body.userId });

        return res.status(200).json({ locations: locations });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const GET_LOCATIONS = async (req, res) => {
    try {
        const locations = await LocationModel.find()
        return res.status(200).json({ locations: locations })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}


const GET_LOCATION_RANDOM = async (req, res) => {
    try {
        // Fetch all locations and await the result
        const locations = await LocationModel.find();

        if (locations.length === 0) {
            return res.status(404).json({ error: 'No locations found' });
        }

        const numberOfLocations = locations.length;
        console.log(numberOfLocations)

        // Create a shallow copy of the locations array
        const copyOfLocations = [...locations];

        const randomLocations = [];

        for (let i = 0; i < numberOfLocations; i++) {
            const randomIndex = Math.floor(Math.random() * copyOfLocations.length);
            const randomLocation = copyOfLocations[randomIndex];
            randomLocations.push(randomLocation);

            // Remove the selected element to avoid duplicates
            copyOfLocations.splice(randomIndex, 1);
        }

        return res.status(200).json({ locations: randomLocations });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something wrong' });
    }
};


const GET_LOCATION_BY_ID = async (req, res) => {
    try {
        const locations = await LocationModel.findOne({ _id: req.params.id })
        return res.status(200).json({ locations: locations })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ response: "Something wrong" })
    }
}

const PUT_LOCATION = async (req, res) => {
    try {
        const location = await LocationModel.updateOne({ _id: req.params.id }, { ...req.body })
        if (!location) {
            return res.status(404).json({ response: "Location not found" })
        }
        return res.status(200).json({ response: req.body, status: "Location was updated" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ response: "Something wrong" })
    }
}
const DELETE_LOCATION = async (req, res) => {
    try {
        const locations = await LocationModel.deleteOne({ _id: req.params.id })
        return res.status(200).json({ response: req.body, locations })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ response: "Something wrong" })
    }
}

export { GET_LOCATIONS, ADD_LOCATION, DELETE_LOCATION, GET_LOCATION_BY_ID, PUT_LOCATION, GET_LOCATION_RANDOM, GET_USERS_LOCATIONS }