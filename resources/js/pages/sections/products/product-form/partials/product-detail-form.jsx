import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useResponsive } from '@/hooks/use-responsive';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useLocales } from '@/locales';
import uuidv4 from '@/utils/uuidv4';
import { Upload } from '@/components/upload';
import Editor from '@/components/editor';

const ProductDetailForm = ({ data, setData, errors }) => {
  const { t } = useLocales();

  const mdUp = useResponsive('up', 'md');

  const [images, setImages] = useState([]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const imageFiles = acceptedFiles.map((newFile) =>
        Object.assign(newFile, {
          id: uuidv4(),
          preview: URL.createObjectURL(newFile),
        })
      );

      const newImages = [...images, ...imageFiles];

      setImages(newImages);
      setData({
        ...data,
        featured_image: data.featured_image || newImages[0],
        image_files:
          (data.image_files && [...data.image_files, ...imageFiles]) ||
          imageFiles,
      });
    },
    [data, images]
  );
  
  const handleRemoveFile = (inputFile) => {
    const imagesFiltered = images.filter((image) => image.id !== inputFile.id);
    setImages(imagesFiltered);

    setData({
      ...data,
      featured_image:
        data.featured_image?.id === inputFile.id
          ? imagesFiltered[0]
          : data.featured_image,
      images: imagesFiltered.filter((image) => !(image instanceof File)),
      image_files: imagesFiltered.filter((image) => image instanceof File),
    });
  };

  const handleRemoveAllFiles = () => {
    setImages([]);

    setData({
      ...data,
      featured_image: null,
      images: [],
      image_files: [],
    });
  };

  const handleSelectFeaturedImage = useCallback(
    (image) => {
      setData('featured_image', image);
    },
    [data]
  );

  useEffect(() => {
    setImages(data?.images || []);
  }, [data]);

  return (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            {t('Details')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('Title, short description, image...')}
          </Typography>
        </Grid>
      )}
      <Grid xs={12} md={8}>
        <Card>
          <CardHeader
            title={t('Details')}
            subheader={t('(*) is required field')}
          />

          <CardContent>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label={`${t('Name')}*`}
                name="name"
                value={data.name || ''}
                error={!!errors?.name}
                helperText={errors?.name}
                onChange={(e) => setData('name', e.target.value)}
              />

              <TextField
                type="text"
                fullWidth
                multiline
                label={t('Short Description')}
                name="short_description"
                rows={5}
                value={data.short_description || ''}
                onChange={(e) => setData('short_description', e.target.value)}
                error={!!errors?.short_description}
                helperText={errors?.short_description}
              />

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">{t('Description')}</Typography>

                <Editor
                  id="product-description"
                  simple
                  name="description"
                  onChange={(value) => setData('description', value)}
                  value={data.description}
                />
              </Stack>

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">{t('Images')}</Typography>
                <Upload
                  multiple
                  thumbnail
                  file={
                    data.featured_image?.url ||
                    data.featured_image?.preview ||
                    images[0]?.preview
                  }
                  selectedFile={data.featured_image || images[0]}
                  files={images}
                  name="images"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onRemove={handleRemoveFile}
                  onRemoveAll={handleRemoveAllFiles}
                  onClickThumbnail={handleSelectFeaturedImage}
                />
                {errors &&
                  Object.keys(errors).map(
                    (errorKey) =>
                      errorKey.includes('image_files') && (
                        <Typography
                          variant="caption"
                          color="error"
                          key={errorKey}
                        >
                          {errors[errorKey]}
                        </Typography>
                      )
                  )}
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

ProductDetailForm.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
  errors: PropTypes.object,
};

export default ProductDetailForm;
