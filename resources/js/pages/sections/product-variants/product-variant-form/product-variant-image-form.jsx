import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useLocales } from '@/locales';
import { Upload } from '@/components/upload';

const ProductVariantImageForm = ({ data, setData, errors }) => {
  const { t } = useLocales();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setData(
          'image',
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        );
      }
    },
    [data]
  );

  return (
    <Card>
      <CardHeader title={t('Image')} />
      <CardContent>
        <Upload
          file={data.image?.url || data.image?.preview}
          name="image"
          maxSize={3145728}
          onDrop={handleDrop}
          onDelete={() => setData('image', null)}
        />
        {errors?.image && (
          <Typography variant="caption" color="error">
            {errors?.image}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

ProductVariantImageForm.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
  errors: PropTypes.object,
};

export default ProductVariantImageForm;
