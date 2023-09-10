const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

// Register user
router.post("/register", async (req, res) => {
  try {
    const { name, email, /* other fields */ } = req.body;

    if (!name || !email /* other required fields */) {
      return res.status(422).json({ error: "Please fill in all required data" });
    }

    const preuser = await users.findOne({ email: email });

    if (preuser) {
      return res.status(422).json({ error: "This user is already registered" });
    } else {
      const adduser = new users({
        name,
        email,
        /* other fields */
      });
      await adduser.save();
      return res.status(201).json(adduser);
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});


// get userdata

router.get("/getdata",async(req,res)=>{
    try {
        const userdata = await users.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

// get individual user

router.get("/getuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await users.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})


// update user data

router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})


// delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await users.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
})


module.export = router;