// app- VehicleRegistrationForm.js


"use strict";

document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault();
  console.log('Form submission detected. Showing success modal.');

  const formData = {
    model: document.getElementById('model').value,
    make: document.getElementById('make').value,
    color: document.getElementById('color').value,
    year: document.getElementById('year').value,
    registrationNumber: document.getElementById('registrationNumber').value,
    vin: document.getElementById('vin').value,
    owner: document.getElementById('owner').value,
    contact: document.getElementById('contact').value,
    address: document.getElementById('address').value
  };

  console.log('Form Data:', formData);

  $('#successModal').modal('show');
});
