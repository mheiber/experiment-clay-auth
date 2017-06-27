'use strict'
const app = require('express')()
const fetch = require('node-fetch')
const PORT = 4000
const CLAY_URI = 'http://dev.slate.com?edit=true'


app.post('/', (req, res) => {
    const key = req.headers['x-clay-auth']
    if (!key) {
        res
            .status(403)
            .send('send an `X-Clay-Auth` header next time!')
    }
    fetch(CLAY_URI, {
        headers: {
            cookie: `clay-session=${key}`
        }
    })
    .then(response => {
        if (response.url === CLAY_URI) {
            return res.send('successful auth! You sent a valid clay session'
                            + ' in the X-Clay-Auth header')
        }
        else {
            return res
                    .status(403)
                    .send('invalid `X-Clay-Auth`')
        }
    })
    .catch(err => {
        console.error('err', err)
        res.status(500).send('something went wrong')
    })
})

app.listen(process.env.PORT, () => {
    console.log('listening on 4000')
})
