// Get the express Router

const router = require('express').Router();

// Import for knex config object
const knex = require('../knex-config');

// Helper Function for creating a patient
 function createPatient(patient_name,condition,location){
    return knex('patients')
        .insert({
            patient_name: patient_name,
            condition: condition,
            location: location
        })
        .then(result => {
            return result
        })
        
}


// Create New Patient
 router.post('/patients/create', async (req,res) => {
    let patient_name = req.body.patient_name
    let condition = req.body.condition
    let location = req.body.location

    console.log(patient_name,condition,location)

    let createdPatient =  await createPatient(patient_name,condition,location);

    console.log(createdPatient)
    res.json({status: 'Success'})
})

async function GetAllPatients(){
    return await knex('patients')
        .select('*')
}

router.get('/patients', async(req,res) =>{
    let all_patients = await GetAllPatients();
    res.json({status: "Success", data: {patients: all_patients}})
})

/**
 * Get one Patient based on ID
 * @params id
 */

 async function getPatient(id){
     return await knex
        .select('*')
        .from('patients')
        .where('id',id)
 }

 router.get('/patients/:id', async(req,res) => {
     const id = parseInt(req.params.id);
     const patient = await getPatient(id)

     res.json({status: 'success', data: {patient: patient}})
 })


module.exports = router;