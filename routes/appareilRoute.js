const Appareil = require('../models/Appareil')
const express = require('express')
const router = new express.Router()


router.post('/create', async (req, res) => {
    const appareil = new Appareil({
        ...req.body
    })
    try {
        appareil.save()
        return res.status(200).send({ appareil })
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.post('/changeTemp', async (req, res) => {
    await Appareil.find({ _id: { "$mod": [2, 0] } }).updateMany({ Temperature: 20 })
    try {
        return res.status(200).send("Appareils modifiés")
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.post('/updateTemp', async (req, res) => {
    await Appareil.find({ Temperature: 20 }).updateMany({ Temperature: 19 })
    try {
        return res.status(200).send("Temperature modifié")
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.get('/getList', async (req, res) => {
    const list = await Appareil.find(
        { Temperature: { $gte: 19 } },
        { Device_name: 1 })
    try {
        return res.status(200).send({ list })
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.get('/getMoy', async (req, res) => {
    const moy = await Appareil.aggregate([
        { $match: { Temperature: { $gt: 19 } } },
        { $group: { _id: null, moy: { $avg: "$Humidity" } } },
        {
            $project: {
                _id: 0
            }
        }
    ])
    try {
        return res.status(200).send(moy)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.get('/getConfortList', async (req, res) => {
    const list = await Appareil.aggregate([
        { $match: { Temperature: { $gte: 18, $lte: 20 } } },
        { $match: { Humidity: { $gte: 40, $lte: 60 } } },
        {
            $project: {
                Device_name: 1
            }
        }
    ])

    var list2 = []
    list.forEach(a => {
        list2.push(a._id)
    })
    await Appareil.deleteMany({ _id: { $nin: list2 } })

    try {
        return res.status(200).send({ list })
    } catch (e) {
        res.status(400).send(e.message)
    }
})


module.exports = router;