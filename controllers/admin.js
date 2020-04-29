const handleAdminData = (req, res, db) => {
  const { masFstNm, masLstNm, masCity, masState, masZip, masImamFstNm,
          masImamLstNm, masMouzanFstNm, masMouzanLstNm, masNumHomes, masNumPeople } = req.body;

  console.log(req.body);

  if (!masFstNm, !masLstNm, !masCity, !masState, !masZip, !masImamFstNm,
         !masImamLstNm, !masMouzanFstNm, !masMouzanLstNm, !masNumHomes, !masNumPeople) 
  {
    return res.status(400).json('incorrect form submission');
  }

    db.transaction(trx => {
      trx.insert({
        masfstnm: masFstNm,
        maslstnm: masLstNm,
        city: masCity,
        state: masState,
        zip: masZip,
        imamfstnm: masImamFstNm,
        imamlstnm: masImamLstNm,
        mouzanfstnm: masMouzanFstNm,
        mouzanlstnm: masMouzanLstNm,
        numhomes: masNumHomes,
        numpeoples: masNumPeople   
      })
      .into('masjid')
      .returning('*')
      .then(named => {
            res.json(named[0]);
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
  handleAdminData: handleAdminData
};


