# Admin Portal Guide

## Overview
The admin portal allows you to manage products in your ecommerce store. You can view all products, add new ones, upload images to AWS S3, edit existing listings, manage multi-image galleries, and delete products.

## Accessing the Admin Portal
Navigate to `/admin` in your browser (e.g., `http://localhost:3000/admin`)

## Features

### 1. View All Products
- The admin portal displays all products in a table format
- Shows product image, name, category, price, and rating
- Displays total product count

### 2. Add New Product
1. Click the "Add Product" button
2. Fill in the product details:
   - Product Name (required)
   - Price (required, minimum ₹2599)
   - Category (select from dropdown)
   - Description (required)
   - Colors (comma-separated, e.g., "black, white, navy")
   - Sizes (comma-separated, e.g., "XS, S, M, L, XL")
   - Rating (0-5)
   - Reviews Count
3. Upload Images:
   - Select an image file
   - Click "Upload" to upload to AWS S3
   - The image URL will be automatically added to the form
   - You can add multiple images by uploading more files or adding URLs manually
4. Click "Create Product" to save

### 3. Edit Product & Manage Images
1. Click the pencil icon alongside any product in the table
2. Update pricing, copy, categories, colors, sizes, and ratings as needed
3. Manage the product gallery:
   - Upload additional files or paste hosted URLs
   - Set the primary hero image (used first in the carousel)
   - Remove outdated images instantly
4. Click **Update Product** to save changes

### 4. Delete Product
- Click the trash icon next to any product
- Confirm the deletion
- The product will be permanently removed from the database

### 5. Image Upload
- Images are uploaded to AWS S3 bucket: `lodgezify`
- Images are stored in the `products/` folder
- Each image gets a unique filename with timestamp
- Supported formats: All image formats (jpg, png, gif, webp, etc.)

## Database Setup

### Initial Setup
To seed the database with existing products from mock data, run:
```bash
npm run seed
```

This will:
- Clear all existing products
- Insert all 50 products from `lib/mock-data.ts` into MongoDB

### Environment Variables
Make sure your `.env.local` file contains:
```
MONGODB_URL_DEVELOPMENT=mongodb+srv://mayanksahu0024_db_user:LVYFM1vhdfJj8bSs@cluster0.wv2xjl6.mongodb.net/products

AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIAQZFG5KJOCU2TILEG
AWS_SECRET_ACCESS_KEY=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
AWS_BUCKET_NAME=lodgezify
```

## API Endpoints

### GET /api/products
Returns all products from the database

### POST /api/products
Creates a new product
Body: JSON with product details

### GET /api/products/[id]
Returns a single product by ID

### PATCH /api/products/[id]
Updates an existing product, including gallery assets

### DELETE /api/products/[id]
Deletes a product by ID

### POST /api/upload
Uploads an image to AWS S3
Body: FormData with 'file' field
Returns: { url: string, fileName: string }

## Notes
- All prices must be above ₹2599
- Products are stored in MongoDB database named "products"
- Collection name: "products"
- Images are stored in AWS S3 bucket "lodgezify" in the "products/" folder
- The shop page and home page automatically fetch products from MongoDB
- If MongoDB connection fails, the app falls back to mock data

