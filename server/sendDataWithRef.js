function sendDataWithRef(dataPath, req, res, bodyHasRef = true) {
  let ref;
  if(bodyHasRef)
    ref = req.body.transactionReference;
  else
    ref = req.params.ref;
  
  console.log(req.body);
  
  if(!ref) {
    res.status(500).send('No transactionReference found')
  }
  
  const data = require(dataPath);
  const keys = Object.keys(data._links);
  const dataWithRef = {};
  keys.forEach((key) => {
    if(data._links[key].href)
      dataWithRef[key] = data._links[key].href.replace(':ref', ref)
  });
  res.status(202).send(dataWithRef);
}

module.exports = sendDataWithRef;
