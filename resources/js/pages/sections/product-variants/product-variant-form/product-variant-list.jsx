import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  CardHeader,
  List,
  ListItemButton,
  ListItemText,
  Button,
  Divider,
  ListItemAvatar,
} from '@mui/material';
import { Iconify } from '@/components/icons';
import { Link } from '@inertiajs/react';
import RouterLink from '@/components/router-link';
import { route } from 'ziggy-js';
import { routes } from '@/routes';
import { useLocales } from '@/locales';
import Image from '@/components/image';

const ProductVariantList = ({ product, variant }) => {
  const { t } = useLocales();

  return (
    <>
      <Card sx={{ display: 'flex' }}>
        <CardMedia
          component="img"
          sx={{ width: 150 }}
          image={product.featured_image?.url}
          alt="Live from space album cover"
        />
        <CardContent>
          <Stack spacing={0.5}>
            <Typography variant="subtitle1">{product.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              Code: {product.product_code}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              SKU: {product.product_sku}
            </Typography>

            <Link
              component={RouterLink}
              href={route(routes.dashboard.products.edit, product.id)}
              sx={{ typography: 'body2' }}
            >
              <Stack direction="row" spacing={0.5}>
                <Iconify
                  icon="carbon:return"
                  width={20}
                  sx={{ color: 'text.primary' }}
                />
                <Typography variant="body2" color="text.primary">
                  {t('Product detail')}
                </Typography>
              </Stack>
            </Link>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ mt: 3 }}>
        <CardHeader
          title={t('Variant List')}
          action={
            <Button
              component={RouterLink}
              href={route(routes.dashboard.variants.create, [product.id])}
              variant="soft"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              {t('Add')}
            </Button>
          }
        />
        
        <CardContent>
          <List>
            {product.variants?.map((productVariant, index) => (
              <React.Fragment key={productVariant.id}>
                <ListItemButton
                  component={RouterLink}
                  href={route(routes.dashboard.variants.edit, [
                    product.id,
                    productVariant.id,
                  ])}
                  selected={productVariant.id === variant?.id}
                >
                  <ListItemAvatar>
                    <Image
                      alt={productVariant.featured_image?.alt_text}
                      src={productVariant.featured_image?.url}
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: 2,
                        mr: 2,
                      }}
                      variant="rounded"
                      ratio="1/1"
                    />
                  </ListItemAvatar>

                  <ListItemText
                    primary={productVariant.name}
                    secondary={`${t('Quantity')}: ${productVariant.quantity}`}
                  />
                </ListItemButton>

                {index !== product.variants.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </>
  );
};

ProductVariantList.propTypes = {
  product: PropTypes.object,
  variant: PropTypes.object,
};

export default ProductVariantList;
