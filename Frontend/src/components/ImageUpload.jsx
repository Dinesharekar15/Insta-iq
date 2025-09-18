import React, { useState, useRef } from 'react';

const ImageUpload = ({ onImageSelect, currentImage = "", placeholder = "Upload image" }) => {
  const [preview, setPreview] = useState(currentImage);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // For demo purposes, we'll use the preview as the image URL
      // In a real app, you would upload to a server and get back a URL
      const mockUpload = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            // Generate a fake URL or use the preview
            const fakeUrl = `assets/images/uploads/${file.name}`;
            resolve(fakeUrl);
          }, 1000);
        });
      };

      const imageUrl = await mockUpload();
      onImageSelect(imageUrl);
      
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setPreview('');
    onImageSelect('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
        Cover Image
      </label>
      
      {preview ? (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img
            src={preview}
            alt="Preview"
            style={{
              width: '150px',
              height: '100px',
              objectFit: 'cover',
              borderRadius: '8px',
              border: '1px solid #ddd'
            }}
          />
          <button
            type="button"
            onClick={removeImage}
            style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              cursor: 'pointer',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${dragActive ? '#007bff' : '#ddd'}`,
            borderRadius: '8px',
            padding: '30px',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: dragActive ? '#f8f9fa' : '#fff',
            transition: 'all 0.3s ease',
            minHeight: '120px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {uploading ? (
            <div>
              <i className="fa fa-spinner fa-spin" style={{ fontSize: '24px', color: '#007bff', marginBottom: '10px' }}></i>
              <p style={{ margin: 0, color: '#666' }}>Uploading...</p>
            </div>
          ) : (
            <div>
              <i className="fa fa-cloud-upload" style={{ fontSize: '24px', color: '#666', marginBottom: '10px' }}></i>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                {placeholder}
              </p>
              <p style={{ margin: '5px 0 0 0', color: '#999', fontSize: '12px' }}>
                Drag & drop or click to browse
              </p>
              <p style={{ margin: '5px 0 0 0', color: '#999', fontSize: '11px' }}>
                PNG, JPG up to 5MB
              </p>
            </div>
          )}
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />
      
      {/* Alternative URL input */}
      <div style={{ marginTop: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '12px' }}>
          Or enter image URL:
        </label>
        <input
          type="text"
          placeholder="https://example.com/image.jpg"
          value={preview.startsWith('data:') ? '' : preview}
          onChange={(e) => {
            setPreview(e.target.value);
            onImageSelect(e.target.value);
          }}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '12px'
          }}
        />
      </div>
    </div>
  );
};

export default ImageUpload;