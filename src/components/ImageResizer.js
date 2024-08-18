import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button, Box, Typography, Grid, Dialog, DialogContent } from '@mui/material';
const ImageEditor = () => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [scale, setScale] = useState(1);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file.type.startsWith('image/')) {
      window.alert('Upload only image files!')
      setImage(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const handleScaleChange = (event, newValue) => {
    setScale(newValue);
  };
  const generatePreview = useCallback(() => {
    if (!completedCrop || !imgRef.current || !previewCanvasRef.current) {
      return;
    }
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    canvas.width = crop.width * scale;
    canvas.height = crop.height * scale;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop, scale]);

  React.useEffect(() => {
    generatePreview();
  }, [completedCrop, scale, generatePreview]);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleClearImage = () => {
    setImage(null);
    setCompletedCrop(null);
    setCrop({ aspect: 16 / 9 });
    setScale(1);
  };
  const handleSaveCrop = () => {
    if (!completedCrop || !imgRef.current) {
      return;
    }
    const canvas = document.createElement('canvas');
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    canvas.width = completedCrop.width * scale;
    canvas.height = completedCrop.height * scale;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );
    const croppedImageUrl = canvas.toDataURL('image/jpeg');
    setImage(croppedImageUrl);
    handleDialogClose();
  }
  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Image Editor
      </Typography>
      {!image && (
        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed #ccc',
            borderRadius: 2,
            padding: 4,
            cursor: 'pointer',
            '&:hover': { borderColor: 'primary.main' },
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <Typography>Drop the image here ...</Typography>
          ) : (
            <Typography>Drag 'n' drop an image here, or click to select</Typography>
          )}
        </Box>
      )}
      {image && (
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <img
              src={image}
              alt="Uploaded"
              style={{ maxWidth: '100%', cursor: 'pointer' }}
              onClick={handleDialogOpen}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="secondary" onClick={handleClearImage}>
              Clear Image
            </Button>
          </Grid>
        </Grid>
      )}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogContent>
          <Box sx={{ textAlign: 'center' }}>
            <ReactCrop
              src={image}
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              style={{ maxWidth: '100%', maxHeight: 400 }}
            >
              <img ref={imgRef} src={image} alt="Crop me" style={{ maxWidth: '100%' }} />
            </ReactCrop>
          </Box>
        </DialogContent>
        <Button onClick={handleSaveCrop} color="primary" variant="contained">
          Save changes
        </Button>
        <Button onClick={handleDialogClose} color="primary">
          Close
        </Button></Dialog>
    </Box>
  );
};
export default ImageEditor;
