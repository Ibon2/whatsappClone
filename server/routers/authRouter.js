const express = require("express");
const router = express.Router();
const Yup = require("yup");

const formSchema = Yup.object({
    username: Yup.string()
                .required('Username required')
                .min(6, 'Username too short')
                .max(28, 'Username too large'),
    password: Yup.string()
        .required('Password required')
        .min(6, 'Password too short')
        .max(28, 'Password too large'),
});
router.post("/login", (req,res)=>{
    const formData= req.body;
    formSchema
    .validate(formData)
    .catch(err => {
        console.log(err.errors);
    })
    .then(valid=>{
        if (valid){
            console.log("form is good");
        }
    });
});

module.exports = router;