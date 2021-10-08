import axios from 'axios';

const getRealtimeBingoRoomsHandler = async (req, res) => {
  try {
    const result = await axios({
      method: 'get',
      url: `${process.env.PBBAPI}/addon-api/gamelaunch.action`,
      params: {
        siteId: process.env.PBBAPISITEID,
        key: process.env.PBBAPISITEKEY,
      },
    });

    const { rooms } = result.data;

    const data = rooms ? Object.keys(result.data.rooms).map((key) => rooms[key]) : [];
    res.status(200).json({ bingoRooms: data });
  } catch (e) {
    res.status(200).json({ bingoRooms: [] });
  }
};

export default getRealtimeBingoRoomsHandler;
