export const validateBooking = (req, res, next) => {
  const {
    community_post_id,
    services,
    name,
    age,
    gender,
    current_location,
    trip_duration,
    number_of_people,
    booking_date,
  } = req.body;

  if (!community_post_id) {
    return res.status(400).json({
      message: "Community post is required",
    });
  }

  if (!services || services.length === 0) {
    return res.status(400).json({
      message: "Please select at least one service",
    });
  }

  if (!name || !age || !gender) {
    return res.status(400).json({
      message: "Name, age, and gender are required",
    });
  }

  if (!current_location) {
    return res.status(400).json({
      message: "Current location is required",
    });
  }

  if (!trip_duration || trip_duration < 1) {
    return res.status(400).json({
      message: "Trip duration must be at least 1 day",
    });
  }

  if (!number_of_people || number_of_people < 1) {
    return res.status(400).json({
      message: "Number of people must be at least 1",
    });
  }

  if (!booking_date) {
    return res.status(400).json({
      message: "Booking date is required",
    });
  }

  next();
};
