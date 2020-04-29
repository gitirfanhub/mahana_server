const handleUser = (req, res, db) => {
  
  const { masLstNm } = req.body;

  if ( !masLstNm ) {
    return res.status(400).json('incorrect form submission');
  }

  db.select('imamfstnm', 'imamlstnm').from('masjid')
    .where('masLstNm', '=', masLstNm)
    .then(data => {
      return db.select('*').from('masjid')
        .where('masLstNm', '=', masLstNm)
        .then(data => {
          res.json(data[0])
        })
        .catch(err => res.status(400).json('unable to get user'))
    })
    .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
  handleUser: handleUser
}