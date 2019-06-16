/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(async () => {
    await db.sync({force: true})
  })
  describe('column definitions and validations', () => {
    it('has a `firstName`, `lastName`, `address`, `email` and `password`', async () => {
      const customer = await User.create({
        firstName: 'Sherlock',
        lastName: 'Holmes',
        address: '221B Baker Street',
        email: 'deductive@method.com',
        password: 'Doctor Watson'
      })

      expect(customer.firstName).to.equal('Sherlock')
      expect(customer.lastName).to.equal('Holmes')
      expect(customer.address).to.equal('221B Baker Street')
      expect(customer.email).to.equal('deductive@method.com')
    })
    it('`email` and `password` are required', async () => {
      const guest = User.build()
      return guest.validate().then(
        () => {
          throw new Error('Validation should have failed!')
        },
        err => {
          expect(err).to.be.an('error')
        }
      )
    })
    it('it has a VIRTUAL  column `fullName`', async () => {
      const valuedCustomer = await User.create({
        firstName: 'Perry',
        lastName: 'Mason',
        email: 'bestLawyer@world.net'
      })
      expect(valuedCustomer.fullName).to.equal('Perry Mason')
    })

    it('has a hook and capitalizes the first letter of the first and last name before save to the DB', async () => {
      const favCustomer = await User.create({
        firstName: 'miss',
        lastName: 'marple',
        email: 'amateur@detective.net'
      })
      expect(favCustomer.firstName).to.equal('Miss')
      expect(favCustomer.fullName).to.equal('Miss Marple')
    })
  })
  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        await db.sync({force: true})

        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
