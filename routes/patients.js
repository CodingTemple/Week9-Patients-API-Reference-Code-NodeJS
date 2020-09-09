// Get the express Router

const router = require('express').Router();

// Import for knex config object
const knex = require('../knex-config');

// Import for AuthGuard
const authGaurd = require('../authGaurd/authGaurd');

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
 router.post('/patients/create', authGaurd, async (req,res) => {
    let patient_name = req.body.patient_name
    let condition = req.body.condition
    let location = req.body.location


    let createdPatient =  await createPatient(patient_name,condition,location);

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

 /**
  * Helper Function for updating patients
  * @param id
  * @param patient_name
  * @param condition
  * @param location
  * 
  * Update Patient Data inside of Database
  */

  async function updatePatient(id,patient_name,condition,location){
      return await knex('patients')
        .update({patient_name: patient_name, condition: condition, location: location})
        .where('id',id)
  }

  // UPDATE ROUTE for Patients
  router.post('/patients/update/:id', authGaurd, async(req,res) => {
      let id = parseInt(req.params.id)
      let patient_name = req.body.patient_name
      let condition = req.body.condition
      let location = req.body.location

      await updatePatient(id,patient_name,condition,location)

      res.json({status: 'Success'})
  })


  /**
   * Delete Patient Data Helper Function
   * 
   * @param id
   */

   async function deletePatient(id){
       return await knex('patients')
        .where({id:id})
        .del()
   }

   router.delete('/patients/delete/:id', authGaurd, async(req,res) => {
       let id = parseInt(req.params.id);
       await deletePatient(id)

       res.json({status: 'Success - Deleted'})
   })


module.exports = router;