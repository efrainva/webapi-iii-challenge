const express = require('express');
const db = require('./postDb.js');

const router = express.Router();
router.use((req,res,next)=>{
  console.log('hubs');
  next()
})

router.get('/', async (req, res) => {
  try{
    const route = await db.get(req.query);
    res.status(200).json(route)
  }catch(err){
    console.log(err);
    res.status(500).json({
      message:'err on get' })
  }
});

router.get('/:id',validatePostId,async (req, res) => {
  const select = await db.getById(req.params.id);
  try{ if(select){
    res.status(200).json(select);
  }else{
    res.status(404).json({message:'route no found'})
  } }
  catch(err){
    console.log(err)
    res.status(500).json({
      message:'can not find id'
    })
  }

 });

router.delete('/:id',validatePostId,async (req, res) => {
  try {
    const item = await db.remove(req.params.id);
    if (item > 0) {
      res.status(200).json({ message: 'item is being deleted ' });
    } else {
      res.status(404).json({ message: 'item is not from this universe' });
    }
  } catch (error) {

    console.log(error);
    res.status(500).json({
      message: 'Error could not delete',
    });
  }

});

router.put('/:id',validatePostId,async (req, res) => {
try{
  const routedate = await db.update(req.params.id,req.body);
  if(routedate){
    res.status(200).json({message:'is updating'})
  }else{
    res.status(404).json({
      message:'there could be a wrong id'
    })
  }
}catch(err){
  console.log(err)
  res.status(500).json({message:'something is wrong with update'})
}
});


// router.post('/',async(req,res) =>{
//   try{
//     if(!req.body)
//   const posting = await db.insert(req.body);
//     res.status(200).json(posting);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Cannot post' });
//   }
// });

// custom middleware

function validatePostId(req, res, next) {
  const {id} = req.params;
  Hubs.findById(id)
    .then(hub =>{
      if(hub){
        req.hub = hub;
        next();
      } else {
        next({ message:'invalid :id'})
      }
    })
    .catch(err => {
      res.status(500).json({message:'something failed in validation'})
    })
};



module.exports = router;