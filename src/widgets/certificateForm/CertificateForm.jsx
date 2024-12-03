import React from 'react';
import { useForm } from 'react-hook-form';
import './CertificateForm.css'; 

const CertificateForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    alert('The certificate successfully created!');
    console.log(data);
    reset();
  };

  return (
    <div className="certificate-container">
      <h2>Certificate Form</h2>
      <form className="certificate-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            className={errors.name ? 'input-error' : ''}
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <span className="error-text">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="course">Course:</label>
          <input
            id="course"
            type="text"
            className={errors.course ? 'input-error' : ''}
            {...register('course', { required: 'Course is required' })}
          />
          {errors.course && <span className="error-text">{errors.course.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            id="date"
            type="date"
            className={errors.date ? 'input-error' : ''}
            {...register('date', { required: 'Date is required' })}
          />
          {errors.date && <span className="error-text">{errors.date.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="organization">Organization:</label>
          <input
            id="organization"
            type="text"
            className={errors.organization ? 'input-error' : ''}
            {...register('organization', { required: 'Organization is required' })}
          />
          {errors.organization && <span className="error-text">{errors.organization.message}</span>}
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-button">Generate Certificate</button>
          <button type="button" className="reset-button" onClick={() => reset()}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default CertificateForm;
