import React, { useState } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { post } from '../../API/ApiEndPoints';


// Styled container using Tailwind + MUI Paper
const Container = styled(Paper)(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  marginTop: theme.spacing(4),
  padding: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
}));

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [slug, setSlug] = useState('');

  // Auto generate slug from category name
  const handleNameChange = (e) => {
    const name = e.target.value;
    setCategoryName(name);
    setSlug(name.toLowerCase().replace(/\s+/g, '-')); // Simple slugify
  };

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName || !categoryImage || !slug) {
      alert('Please fill all fields!');
      return;
    }

    const formData = new FormData();
    formData.append('categoryName', categoryName);
    formData.append('slug', slug);
    formData.append('categoryImage', categoryImage);

    try {
      const res = await post('http://localhost:5000/admin/dashboard/create-category', formData);
      alert('Category Added Successfully!');
      console.log(res.data);

      // Clear form
      setCategoryName('');
      setSlug('');
      setCategoryImage(null);
    } catch (err) {
      console.error(err);
      alert('Error adding category',err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <Container>
        <Typography variant="h5" gutterBottom align="center" color="primary">
          Add New Category
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">

          {/* Category Name */}
          <TextField
            label="Category Name"
            fullWidth
            value={categoryName}
            onChange={handleNameChange}
            required
            sx={{marginBottom:'20px'}}
          />

          {/* Slug */}
          <TextField
            label="Slug"
            fullWidth
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            sx={{marginBottom:'20px'}}
          />

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCategoryImage(e.target.files[0])}
              className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
              required
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Category
          </Button>

        </form>
      </Container>
    </div>
  );
}

