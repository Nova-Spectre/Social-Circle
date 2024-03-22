import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const dropzoneStyle = {
  border: '2px dashed',
  borderColor: 'primary.main',
  padding: '1rem',
  cursor: 'pointer',
  '&:hover': {
    borderColor: 'primary.light',
  },
};

const imageContainerStyle = {
  width: '100px',
  height: '100px',
  overflow: 'hidden',
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const Previews = ({ setFieldValue, values , updatePicturePath , picture }) => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.jpg,.jpeg,.png',
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFieldValue('picture', acceptedFiles[0]);
      updatePicturePath(acceptedFiles[0].name);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const thumbs = files.map((file) => (
    <Box key={file.name} style={{ display: 'inline-flex', marginBottom: '8px', marginRight: '8px' }}>
      <Box style={imageContainerStyle}>
        <img src={file.preview} style={imageStyle} alt={file.name} />
      </Box>
    </Box>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })} style={dropzoneStyle}>
        <input {...getInputProps()} />
        {!values.picture ? (
          <Typography>Add Picture Here</Typography>
        ) : (
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography>{values.picture.name}</Typography>
            <EditOutlinedIcon />
          </Box>
        )}
      </div>
      <aside style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '16px' }}>
        {thumbs}
      </aside>
    </section>
  );
};

export default Previews;
