                                                                                       
import { useState } from "react";
import "./MultiStepForm.css";

const initialData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  pincode: ""
};

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  // Update form fields dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear the field error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  // Validate current step
  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        newErrors.email = "Enter a valid email";
      }

      if (!/^[6-9]\d{9}$/.test(formData.phone)) {
        newErrors.phone = "Enter a valid 10-digit Indian mobile number";
      }
    }

    if (step === 2) {
      if (!formData.address.trim()) {
        newErrors.address = "Address is required";
      }

      if (!formData.city.trim()) {
        newErrors.city = "City is required";
      }

      if (!/^\d{6}$/.test(formData.pincode)) {
        newErrors.pincode = "Enter a valid 6-digit PIN code";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Go to next step
  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  // Go to previous step
  const handlePrevious = () => {
    setErrors({});
    setStep((prev) => prev - 1);
  };

  // Final submission
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted Data:", formData);

    alert("Form submitted successfully!");

    setFormData(initialData);
    setErrors({});
    setStep(1);
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>

      {/* Progress indicator */}
      <div className="progress">
        <span className={step >= 1 ? "active" : ""}>1</span>
        <span className={step >= 2 ? "active" : ""}>2</span>
        <span className={step >= 3 ? "active" : ""}>3</span>
      </div>

      <form onSubmit={handleSubmit}>

        {/* STEP 1: PERSONAL DETAILS */}
        {step === 1 && (
          <div>
            <h3>Personal Details</h3>

            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            {errors.name && <p className="error">{errors.name}</p>}

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter 10-digit mobile number"
              maxLength={10}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>
        )}

        {/* STEP 2: ADDRESS DETAILS */}
        {step === 2 && (
          <div>
            <h3>Address Details</h3>

            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
            />
            {errors.address && <p className="error">{errors.address}</p>}

            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
            />
            {errors.city && <p className="error">{errors.city}</p>}

            <label>PIN Code</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter 6-digit PIN code"
              maxLength={6}
            />
            {errors.pincode && <p className="error">{errors.pincode}</p>}
          </div>
        )}

        {/* STEP 3: CONFIRMATION */}
        {step === 3 && (
          <div>
            <h3>Review Your Details</h3>

            <div className="review">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Address:</strong> {formData.address}</p>
              <p><strong>City:</strong> {formData.city}</p>
              <p><strong>PIN Code:</strong> {formData.pincode}</p>
            </div>
          </div>
        )}

        {/* NAVIGATION BUTTONS */}
        <div className="buttons">

          {step > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}

          {step < 3 && (
            <button
              type="button"
              onClick={handleNext}
            >
              Next
            </button>
          )}

          {step === 3 && (
            <button type="submit">
              Submit
            </button>
          )}

        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
