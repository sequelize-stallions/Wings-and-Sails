const db = require('../server/db')
const {User, Product, Cart} = require('../server/db/models')

const users = [
  {
    firstName: 'Xavier',
    lastName: 'O',
    userName: 'unicornLover3000',
    address: '123 Candycane Street',
    email: 'unicorns@unicorns.com',
    password: 'horsesrule',
    admin: true
  },
  {
    firstName: 'Noah',
    lastName: 'Schefer',
    userName: 'ponyLover3000',
    address: '123 Gumdrop Street',
    email: 'ponies@ponies.com',
    password: 'poniesrule'
  },
  {
    firstName: 'Masha',
    lastName: 'O',
    userName: 'wantsDemJets',
    address: '123 Rich Street',
    email: 'getDemBills@richperson.com',
    password: 'stacksrule'
  },
  {
    firstName: 'Daphne',
    lastName: 'C',
    userName: 'rollsInTheDough',
    address: '123 Executive Street',
    email: 'getsDatMoney@money.com',
    password: 'billsbillsbills'
  }
]

const products = [
  {
    name: 'Learjet 45XR',
    description:
      'Tastefully appointed cabin with eight passenger, double club configuration. Aft enclosed private lavatory with belted toilet (for added ninth passenger capacity), lighted vanity mirror and sink. Forward full-service galley includes 2 ice drawers and a hot beverage dispenser. Inflight connectivity and the entertainment system includes Aircell GoGo ATG-5000 wi-fi, Iridium Satphone, Airshow 410 enhanced flight information system, forward bulkhead monitor and CD and DVD players. Softgoods upholstered in glove soft light grey leather with complimentary dark grey piping and inserts. Dark wood veneer with high gloss finish and satin nickel plating.',
    imgUrl:
      'http://www.businessair.com/sites/businessair.com/files/imagecache/classifieds_large/_mg_2807.jpg',
    price: 4095000,
    stock: 5
  },
  {
    name: 'Embraer Legacy 500',
    description:
      'Stunning nine (9) passenger configuration featuring a forward wet galley offering a microwave and coffee maker followed by a four (4) place club followed by an aft two (2) place club opposite a three (3) place divan. Private aft belted lavatory with externally serviceable vacuum toilet. The individual seats are completed in beige colored leather complimented by a lightly patterned divan completed in fabric. The woodwork is Quarter Zebrano completed in a high gloss finish complimented by brushed silver plating and light gray sculpted carpeting. Unique stone flooring is found in both the galley and lavatory, countertops are stone veneer.',
    imgUrl:
      'http://www.businessair.com/sites/businessair.com/files/imagecache/classifieds_large/dsc05156.jpg',
    price: 15995000,
    stock: 5
  },
  {
    name: 'Gulfstream G650',
    description:
      'This G650 Forward Galley – 16 Passenger interior configuration consists of a forward galley with annex, a forward lavatory, a four-zone main cabin, an aft lavatory, and an aft in-flight accessible baggage compartment.  The four-zone cabin features a forward cabin with four single seats in club configuration, a second zone with a left-hand three-place berthing divan opposite a credenza, a third zone with a left-hand four-place conference/dining group opposite two club seats, and an aft zone with a left-hand single seat opposite a three-place berthing divan that is certified for two (2) passengers during takeoff and landing.\n\nThe forward cabin’s two (2) forward-facing seats are powered and feature electric lumbar, a leg rest, berthing capability, memory pre-set, back cushion massage, and cushion heat.  All other cabin single seats are manually operated and feature electric lumbar, a leg rest, and berthing capability.',
    imgUrl:
      'http://www.businessair.com/sites/businessair.com/files/imagecache/classifieds_large/1-g650-sn-6258_exterior_logo.jpg',
    price: 52950000,
    stock: 5
  },
  {
    name: 'Augusta AW139',
    description:
      "Very well maintained SAR Configured helicopter with excellent component times remaining. The epitomy of excellency defined in this world class air carrier. Do you like money? Do you like showing your money in the most arrogant and irresponsible ways? Then buy this copter, you won't regret it.",
    imgUrl:
      'http://www.businessair.com/sites/businessair.com/files/imagecache/classifieds_large/aw139_-_sn_31283-web3.jpg',
    price: 9900000,
    stock: 5
  },
  {
    name: 'Bell 412EP',
    description:
      'Helicopters were developed and built during the first half-century of flight, with the Focke-Wulf Fw 61 being the first operational helicopter in 1936. Some helicopters reached limited production, but it was not until 1942 that a helicopter designed by Igor Sikorsky reached full-scale production,[6] with 131 aircraft built.[7] Though most earlier designs used more than one main rotor, it is the single main rotor with anti-torque tail rotor configuration that has become the most common helicopter configuration. Tandem rotor helicopters are also in widespread use due to their greater payload capacity. Coaxial helicopters, tiltrotor aircraft, and compound helicopters are all flying today. Quadcopter helicopters pioneered as early as 1907 in France, and other types of multicopter have been developed for specialized applications such as unmanned drones.',
    imgUrl: 'https://cdn.jetphotos.com/full/5/36631_1547310537.jpg',
    price: 7200000,
    stock: 5
  },
  {
    name: 'Airbus AS350 BA',
    description:
      'The AS350 is a single engine helicopter, powered either by a Lycoming LTS101 or Turbomeca Arriel powerplant (for twin-engined variants, see Eurocopter AS355), that drives a three-blade main rotor, which is furnished with a Starflex rotor head. The type is well known for its high-altitude performance and has seen frequent use by operators in such environments. Both the main and tail rotors make use of composite material and are deliberately designed to minimize corrosion and maintenance requirements. The AS350 was also developed to comply with the stringent noise requirements in place in locations such as national parks; the in-cabin noise levels are such that passengers may also readily converse during flight. The aircraft can also be quickly started up and shut down, which is often useful during emergency medical services roles. It is equipped with hydraulically-assisted flight controls; these controls remain operational, albeit operated with greater physical effort, in the event of a hydraulic failure.',
    imgUrl:
      'http://www.businessair.com/sites/businessair.com/files/imagecache/classifieds_large/22.png',
    price: 1100000,
    stock: 5
  },
  {
    name: 'Admiral Planet Nine',
    description:
      'PLANET NINE, the 73m brand new ice classed explorer yacht, designed by Tim Heywood, has been delivered.  She boasts eight staterooms with two master staterooms on her private Owner’s deck.  With massive volume measuring in at 2,100 GT she is top yacht quality and finished to demanding specifications with a German interior by Fitz, designed by the famous Tino Zervudachi.  She features helicopter landing and garage facilities for an Agusta Grande or similar helicopter and a great beach club.',
    imgUrl:
      'https://cdn.boatinternational.com/bi_prd/bi/library_images/fNeOt0i1Ruik9D9Y6mgI_PLANET-NINE-yacht-At-Anchor-1280x720.jpg',
    price: 95869000,
    stock: 5
  },
  {
    name: 'Amels Aurora Borealis',
    description:
      'A 67m luxury yacht, exemplifying the quality of the AMELS brand, and ensuring comfort and performance at sea. She is currently being built, to be delivered in summer 2019.\n\nThis yacht can accommodate up to 14 guests in 7 stunning staterooms with large windows, including a Master Suite on the main deck. AURORA BOREALIS features a swim platform with a large transom door to the beach club and relaxation space with steam room. While cruising in comfort guests can enjoy the yacht’s 600 square metres of outdoor deck spaces, including the family-friendly sun deck with a hot tub and in-door gym. All Owner’s supplies, including furniture designed by Winch Design are included. Experience life’s finest moments aboard AURORA BOREALIS in your favourite yachting destinations this summer.',
    imgUrl: 'https://yachtharbour.com/static/uploads/3030_4c1bc.jpg',
    price: 94177000,
    stock: 5
  },
  {
    name: 'Nobiskrug Sycara V',
    description:
      'The luxury 68.15M superyacht SYCARA V has joined the Fraser sales fleet. From her glistening condition to her light, airy and modern interior SYCARA V exudes quality everywhere. Having a bridge deck Owner’s stateroom and seven additional staterooms, the layout is really versatile. All accommodations are fitted out with satin finished burled wood, rich walnut, attractive gloss paint and highly polished stainless-steel accents. With an elevator, beach club, gym, tender garages and fantastic sun spaces everywhere, SYCARA V deserves serious consideration. Please note: SYCARA V is Not Offered For Sale Or Charter To US Residents While In US Waters.',
    imgUrl:
      'https://www.fraseryachts.com/yachts-image/sycara-v/Nobiskrug_yacht_for_sale_Sycara-v_7939.jpg',
    price: 67108000,
    stock: 5
  }
]

const carts = [
  {
    userId: 1
  },
  {
    userId: 2
  },
  {
    userId: 3
  },
  {
    userId: 4
  }
]

const seed = async () => {
  try {
    await db.sync({force: true})
    await Promise.all(
      users.map(user => {
        return User.create(user)
      })
    )
    await Promise.all(
      products.map(product => {
        return Product.create(product)
      })
    )
    await Promise.all(
      carts.map(cart => {
        return Cart.create(cart)
      })
    )

    console.log('Seeding Success!')
    db.close()
  } catch (error) {
    console.log('Oh oh! Something went wrong!')
    console.log(error)
  }
}

seed().catch(err => {
  console.error('OMG SOMETHING IS WRONG!')
  console.error(err)
  db.close()
})

module.exports = seed
