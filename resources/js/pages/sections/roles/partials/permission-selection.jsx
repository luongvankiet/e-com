import React from 'react';
import PropTypes from 'prop-types';
import { usePage } from '@inertiajs/react';
import { Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';
import { snakeToTitle } from '@/utils/string';
import { containsAll, containsAtLeastOne } from '@/utils/array';
import Grid from '@mui/material/Unstable_Grid2';
import { useLocales } from '@/locales';

const PermissionSelection = ({ data, setData }) => {
  const { t } = useLocales();

  const { permissions } = usePage().props;

  const handleSelectPermissionGroup = (event, group) => {
    let newPermissions = [];

    if (event.target.checked) {
      newPermissions = [...data.permissions, ...permissions[group]];
    } else {
      newPermissions = data.permissions.filter(
        (value) =>
          !permissions[group].filter(
            (permission) => permission.name === value.name
          ).length
      );
    }

    setData('permissions', [...newPermissions]);
  };

  const handleSelectPermission = (event, permission) => {
    let newPermissions = [];

    if (event.target.checked) {
      newPermissions = [...data.permissions, permission];
    } else {
      newPermissions = data.permissions.filter(
        (value) => value.name !== permission.name
      );
    }

    setData('permissions', [...newPermissions]);
  };

  return (
    <Stack
      spacing={2}
      sx={{
        pt: 0,
        p: 4,
        width: 1,
        borderRadius: 2,
        bgcolor: 'background.neutral',
      }}
    >
      <Typography variant="h5">{t('Permissions')}</Typography>
      <Grid container rowSpacing={4} direction="row">
        {Object.keys(permissions).map((group, index) => (
          <Grid xs={12} md={6} key={`${group}-${index}`}>
            <FormControlLabel
              label={
                <Typography variant="h6">{t(snakeToTitle(group))}</Typography>
              }
              control={
                <Checkbox
                  size="small"
                  checked={containsAll(
                    permissions[group] || [],
                    data.permissions || []
                  )}
                  indeterminate={
                    containsAtLeastOne(
                      permissions[group] || [],
                      data.permissions || []
                    ) &&
                    !containsAll(
                      permissions[group] || [],
                      data.permissions || []
                    )
                  }
                  onChange={(event) =>
                    handleSelectPermissionGroup(event, group)
                  }
                />
              }
            />

            <Stack spacing={1} sx={{ mt: 1 }} useFlexGap flexWrap="wrap">
              {permissions[group].map((permission, permissionIndex) => (
                <FormControlLabel
                  key={`${permission.name}-${permissionIndex}`}
                  label={t(permission.description || permission.name)}
                  control={
                    <Checkbox
                      checked={
                        !!data.permissions.find(
                          (value) => value.name === permission.name
                        )
                      }
                      onChange={(event) =>
                        handleSelectPermission(event, permission)
                      }
                    />
                  }
                />
              ))}
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

PermissionSelection.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
};

export default PermissionSelection;
