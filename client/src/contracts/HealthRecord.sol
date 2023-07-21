// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract HealthRecord {
    struct Patient {
        uint256 id;
        string name;
        uint256 age; 
    }
    mapping(uint256 => Patient) public patients;

    event PatientAdded(uint256 indexed id, string name, uint256 age);
    event PatientUpdated(uint256 indexed id, string name, uint256 age);
    event PatientDeleted(uint256 indexed id);
  
    function addPatient(uint256 id, string memory name, uint256 age) public returns (bytes32) {
        require(patients[id].id != id, "Patient with the given ID already exists");
        require(bytes(name).length > 0, "Name field is required");     
        patients[id] = Patient(id, name, age);       
        emit PatientAdded(id, name, age);        
    }

    function updatePatient(uint256 oldId, uint256 newId, string memory newName, uint256 newAge) public returns (bytes32) {
        require(bytes(newName).length > 0, "Name field is required");       
        Patient storage patient = patients[oldId];        
        patient.id = newId;
        patient.name = newName;
        patient.age = newAge;        
        emit PatientUpdated(newId, newName, newAge);        
    }
    
    function deletePatient(uint256 id) public {        
        delete patients[id];        
        emit PatientDeleted(id);
    }

}
