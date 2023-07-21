const HealthRecord = artifacts.require('HealthRecord');

contract('HealthRecord', (accounts) => {
    let healthRecordInstance;
    const addedPatients = [];

    beforeEach(async () => {
        healthRecordInstance = await HealthRecord.deployed();        
    });
    describe("Basic Functionality", () => {
        it('should add a patient record', async () => {
            const id = 1;
            const name = 'John';
            const age = 25;

            // Add the patient record
            await healthRecordInstance.addPatient(id, name, age, { from: accounts[0] });
            // Get the patient record
            const patient = await healthRecordInstance.patients(id);

            // Assert 
            assert.equal(patient.id.toNumber(), id);
            assert.equal(patient.name, name);
            assert.equal(patient.age.toNumber(), age);
            addedPatients.push(patient);

        });

        it('should update an existing patient record', async () => {
            const id = 23;
            const name = 'John';
            const age = 25;

            // Add the initial patient record
            await healthRecordInstance.addPatient(id, name, age, { from: accounts[0] });

            const newId = 23;
            const newName = 'Rose';
            const newAge = 30;

            // Update the patient record
            await healthRecordInstance.updatePatient(id, newId, newName, newAge, { from: accounts[0] });

            // Retrieve the updated patient record
            const updatedPatient = await healthRecordInstance.patients(newId);
            assert.equal(updatedPatient.id.toNumber(), newId);
            assert.equal(updatedPatient.name, newName);
            assert.equal(updatedPatient.age.toNumber(), newAge);
            addedPatients.push(updatedPatient);
        });

        it('should retrieve a patient record for a non-existing ID', async () => {
            const nonExistingId = 999;
            const patient = await healthRecordInstance.patients(nonExistingId);
            assert.equal(patient.id.toNumber(), 0);
            assert.equal(patient.name, '');
            assert.equal(patient.age.toNumber(), 0);
        });

        it('should add multiple patient records and retrieve them correctly', async () => {
            const patientsData = [
                { id: 100, name: 'John', age: 25 },
                { id: 200, name: 'Jane', age: 30 },
                { id: 300, name: 'Alex', age: 35 },
            ];
            for (const patientData of patientsData) {
                const { id, name, age } = patientData;
                await healthRecordInstance.addPatient(id, name, age, { from: accounts[0] });
                const patient = await healthRecordInstance.patients(id);
                assert.equal(patient.id.toNumber(), id);
                assert.equal(patient.name, name);
                assert.equal(patient.age.toNumber(), age);
                addedPatients.push(patient);
            }
        })
        it("should handle retrieving a patient record from a different account", async () => {
            const id = 201;
            const name = "John";
            const age = 30;

            // Add the patient record from account[0]
            await healthRecordInstance.addPatient(id, name, age, { from: accounts[0] });
            // Retrieve the patient record from account[1]
            const patient = await healthRecordInstance.patients(id, { from: accounts[1] });
            // Assert the patient's record is retrieved correctly
            assert.equal(patient.id.toNumber(), id);
            assert.equal(patient.name, name);
            assert.equal(patient.age.toNumber(), age);
        });
    });

    describe("Error Handling", () => {
        it('should handle empty fields during record addition', async () => {
            const id = 6;
            const name = '';
            const age = 50;

            try {
                // Add a patient record with an blank name field
                await healthRecordInstance.addPatient(id, name, age, { from: accounts[0] });
            } catch (error) {
                assert(error.message.includes('Name field is required'));
            }
        });

        it("should not add duplicate patient ID", async () => {

            const patientId = 10;
            const patientName = 'John';
            const patientAge = 25;
            await healthRecordInstance.addPatient(patientId, patientName, patientAge);
            let errorThrown = false;

            try {
                const tx = await healthRecordInstance.addPatient(patientId, patientName, patientAge);
            } catch (error) {
                errorThrown = true;
                // Assert that the error message includes the expected string
                //assert.equal(
                //  error.message.includes("Patient with the given ID already exists"),
                //  true,
                //  "Expected a specific error message"
                //);
            }
            assert.equal(errorThrown, true, "Patient with the given ID already exists");

        })
    });
    describe("Event Emission", () => {
        it("should emit PatientAdded event", async () => {
            const patientId = 11;
            const patientName = 'John';
            const patientAge = 25;
            const tx = await healthRecordInstance.addPatient(patientId, patientName, patientAge);

            assert.equal(tx.logs.length, 1, "Event should be emitted");
            assert.equal(tx.logs[0].event, "PatientAdded", "Event should be PatientAdded");
        })
    });

    describe("Data Consistency", () => {
        it('should update patient age correctly', async () => {
            const id = 1;
            const name = 'John';
            const initialAge = 25;
            const newAge = 30;

            // Deploy the HealthRecord contract
            const healthRecordInstance = await HealthRecord.new();

            // Add a patient record
            await healthRecordInstance.addPatient(id, name, initialAge, { from: accounts[0] });

            // Get the patient record before the update
            const initialPatient = await healthRecordInstance.patients(id);

            // Update the patient's age
            await healthRecordInstance.updatePatient(id, id, name, newAge, { from: accounts[0] });

            // Get the patient record after the update
            const updatedPatient = await healthRecordInstance.patients(id);

            // Assert the initial and updated age values
            assert.equal(initialPatient.age.toNumber(), initialAge, "Initial patient age should match");
            assert.equal(updatedPatient.age.toNumber(), newAge, "Updated patient age should match");
        })
    });

    afterEach(async () => {
        for (let i = 0; i < addedPatients.length; i++) {
            const patient = addedPatients[i];
            await healthRecordInstance.deletePatient(patient.id, { from: accounts[0] });
        }
        addedPatients.length = 0;
    });
});