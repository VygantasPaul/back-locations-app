import express from 'express';
import { GET_LOCATIONS, ADD_LOCATION, DELETE_LOCATION, GET_LOCATION_BY_ID, PUT_LOCATION, GET_LOCATION_RANDOM, GET_USERS_LOCATIONS } from '../controllers/locations.js'
const router = express.Router();
import auth from "../middlewares/auth.js";
router.get('/locations/random', auth, GET_LOCATION_RANDOM)
router.post('/locations', auth, ADD_LOCATION)
router.get('/locations', auth, GET_USERS_LOCATIONS)
router.get('/locations/:id', auth, GET_LOCATION_BY_ID)
router.put('/locations/:id', auth, PUT_LOCATION)
router.delete('/locations/:id', auth, DELETE_LOCATION)

export { GET_LOCATIONS, ADD_LOCATION, DELETE_LOCATION, GET_LOCATION_BY_ID, PUT_LOCATION, GET_LOCATION_RANDOM, GET_USERS_LOCATIONS }

export default router; 