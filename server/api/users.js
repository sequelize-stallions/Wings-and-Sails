const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

//Getting all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      //not sure if we need everything,
      //but we're including just in case
      attributes: [
        'id',
        'firstName',
        'lastName',
        'address',
        'email',
        'fullName'
      ]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id
    const [numberOfUsers, users] = await User.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        email: req.body.email,
        password: req.body.password,
        admin: req.body.admin
      },
      {
        where: {id: userId},
        returning: true,
        plain: true
      }
    )
    res.send(users[0])
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const userID = req.params.id
    await User.destroy({
      where: {
        id: userID
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
