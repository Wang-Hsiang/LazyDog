import { getHotels, getId } from "../services/hotelService.js";

export const getAllHotels = async (req, res) => {
  try {
    const hotels = await getHotels();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {  
  try{
    const hotels = await getId(req.params);
    res.json(hotels);
  }catch(err){
    res.status(500).json({err:err.message})
  }
};


export const createHotel = async (req, res) => {
  try{
    const newHotel = req.body;
    const hotels = await createHotel();
    newHotel.id = hotels.length + 1;
    hotels.push(newHotel);
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


