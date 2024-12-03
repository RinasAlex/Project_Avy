import React from 'react';
import { useForm } from 'react-hook-form';
import './BadgeForm.css';

const BadgeForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        alert('Badge successfully created!');
        console.log(data);
        reset();
    };

    return (
        <div className="badge-container">
            <h2>Create a Badge</h2>
            <form className="badge-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="title">Badge Title:</label>
                    <input
                        id="title"
                        type="text"
                        className={errors.title ? 'input-error' : ''}
                        {...register('title', { required: 'Badge title is required' })}
                    />
                    {errors.title && <span className="error-text">{errors.title.message}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        className={errors.description ? 'input-error' : ''}
                        {...register('description', { required: 'Description is required' })}
                    />
                    {errors.description && <span className="error-text">{errors.description.message}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="iconUrl">Icon URL:</label>
                    <input
                        id="iconUrl"
                        type="text"
                        className={errors.iconUrl ? 'input-error' : ''}
                        {...register('iconUrl', { required: 'Icon URL is required', pattern: { value: /^(http|https):\/\/[^ "]+$/, message: 'Invalid URL' } })}
                    />
                    {errors.iconUrl && <span className="error-text">{errors.iconUrl.message}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="backgroundColor">Background Color:</label>
                    <input
                        id="backgroundColor"
                        type="color"
                        className={errors.backgroundColor ? 'input-error' : ''}
                        {...register('backgroundColor', { required: 'Background color is required' })}
                    />
                    {errors.backgroundColor && <span className="error-text">{errors.backgroundColor.message}</span>}
                </div>

                <div className="form-buttons">
                    <button type="submit" className="submit-button">Create Badge</button>
                    <button type="button" className="reset-button" onClick={() => reset()}>Reset</button>
                </div>
            </form>
        </div>
    );
};

export default BadgeForm;
