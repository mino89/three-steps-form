
/**
 * this is a  mock of server api that simulate the
 * backend for this reason i have not written an optimized code
 * and missed generic error handling
 */
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { setTimeout } = require('core-js')

const port = 4000
const timeout = 1000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// simulate the availability of options
const Stock = {
  size: ['M', 'L', 'XXL'],
  color: ['red', 'yellow', 'green'],
  emote: ['cactus', 'pine', 'palm']
}
// simulate the users database of options
const Users = [
  {
    name: 'Mario Rossi',
    email: 'existing-mail@mail.com'
  },
  {
    name: 'Francesco Bianchi',
    email: 'other-existing-mail@mail.com'
  }
]
// simulate available addresses
const Addresses = [
  'existing street 122',
  'main street 46'
]

// check data request from request and check if is available and valid
const Validate = (available, valid, res) => {
  return new Promise((resolve, reject) => {
    if (available && valid) {
      resolve({ available, valid, res })
    } else if (!valid) {
      reject(res.status(400).json({ message: 'compila tutti i campi necessari' }))
    } else {
      reject(new Error('something bad happened'))
    }
  })
}

// check if there is empty fields in request
const ValidateObject = (pred) => (obj) =>
  Object.values(obj).every(
    v => (v && typeof v === 'object') ? ValidateObject(pred)(v) : pred(v)
  )
const CheckNoEmptyProps = ValidateObject(v => v !== '' && v != null)

// check if the items in request are available and in stock
const ValidateAvailability = (obj) => {
  return Object.entries(obj).every((el) => {
    return Stock[el[0]].includes(el[1])
  })
}

// check if user data are in the list of users
const ValidateUser = (obj) => {
  return Users.every((el) => {
    return obj !== el.email
  })
}
// check if request data aren't in the list of addresses
const ValidateAddress = (obj) => {
  return Addresses.every((el) => {
    return obj !== el
  })
}

// Api Endpoints
app.get('/', (req, res) => {
  res.json({
    Stock
  })
})

app.post('/check-availability', (req, res) => {
  const body = req.body
  // check if selected options is available
  const available = ValidateAvailability(body)
  const valid = !!(body.size && body.color && body.emote)
  setTimeout(() => {
    Validate(available, valid, res).then(() => {
      res.status(200).json(body)
    }
    ).catch(() => {
      res.status(400).json({ message: '⚠️ l\'opzione che hai scelto non è disponibile' })
    })
  }, timeout)
})

app.post('/check-users', (req, res) => {
  const body = req.body
  // check if selected options is available
  const available = ValidateUser(body.email)
  const valid = !!(body.name && body.email)
  setTimeout(() => {
    Validate(available, valid, res).then(() => {
      res.status(200).json(body)
    }
    ).catch(() => {
      res.status(400).json({ message: `⚠️ la tua mail ${body.email} risulta già registrata` })
    })
  }, timeout)
})

app.post('/check-address', (req, res) => {
  const body = req.body
  // check if selected options is available
  const available = ValidateAddress(body.address)
  const valid = !!body.address
  setTimeout(() => {
    Validate(available, valid, res).then(() => {
      res.status(200).json(body)
    }
    ).catch(() => {
      res.status(400).json({ message: `⚠️ abbiamo già spedito il tuo regalo a questo indirizzo ${body.address}` })
    })
  }, timeout)
})

app.post('/submit-data', (req, res) => {
  const body = req.body
  // check if selected options is available
  const available = ValidateAvailability(body.configuration) && ValidateUser(body.user.email) && ValidateAddress(body.address.address)
  setTimeout(() => {
    Validate(available, CheckNoEmptyProps(body), res).then(() => {
      res.status(200).json(body)
    }
    ).catch(() => {
      res.status(400).json({ message: '⚠️ Problema nei dati inseriti' })
    })
  }, timeout)
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
