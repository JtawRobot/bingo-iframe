import axios from 'axios';
import { parseStringPromise } from 'xml2js';

const checkSessionHandler = async (req, res) => {
  const { sessionId, userId } = req.query;

  if (sessionId === '') {
    res.status(200).json({ isValid: 'no account' });
    return;
  }

  const sessionResult = await axios({
    method: 'get',
    url: `${process.env.PBBAPI}/validsession.action`,
    params: {
      sessionId,
      siteId: process.env.PBBAPISITEID,
      key: process.env.PBBAPISITEKEY,
    },
  });

  const sessionData = await parseStringPromise(sessionResult.data, { explicitArray: false });

  if (sessionData.results.errors) {
    res.status(200).json({ isValid: false });
    return;
  }

  if (sessionData.results.rows.row.$.success === 'false') {
    res.status(200).json({ isValid: false });
    return;
  }

  const balanceResult = await axios({
    method: 'get',
    url: `${process.env.PBBAPI}/getbalance.action`,
    params: {
      userId,
      sessionId,
      siteId: process.env.PBBAPISITEID,
      key: process.env.PBBAPISITEKEY,
    },
  });

  const jsonBalance = await parseStringPromise(balanceResult.data, { explicitArray: false });

  if (jsonBalance.results.errors) {
    console.log('balance check error');
  }

  const balanceData = jsonBalance.results.rows.row.$;

  res.status(200).json({ isValid: true, balance: balanceData.balance });
};

export default checkSessionHandler;
