import { Grid, Box } from '@mui/material';
// import { ComboBoxAutocomplete } from '../../components/forms/AutoComplete/ComboBoxAutocomplete';
// import { MultipleValuesAutocomplete } from '../../components/forms/AutoComplete/MultipleValuesAutocomplete';
// import { CheckboxesAutocomplete } from '../../components/forms/AutoComplete/CheckboxesAutocomplete';
// import { SizesAutocomplete } from '../../components/forms/AutoComplete/SizesAutocomplete';
import CartaActualInterface from '../../../src/components/forms/AutoComplete/ExCartaActual';

const ExAutoComplete = () => {
  // 2

  return (
    
    <Box>
      <CartaActualInterface/>

      <Grid container spacing={1}>
        
        
        {/* ------------------------- row 1 ------------------------- */}
        {/* <Grid
          size={{ xs: 12, lg: 4, sm: 6 }}
          sx={{
            display: 'flex',
            alignItems: 'stretch',
          }}
        >
          <ComboBoxAutocomplete />
        </Grid> */}

        {/* ------------------------- row 5 ------------------------- */}
        {/* <Grid
          size={{ xs: 12, lg: 4, sm: 6 }}
          sx={{
            display: 'flex',
            alignItems: 'stretch',
          }}
        >
          <MultipleValuesAutocomplete />
        </Grid> */}

        {/* ------------------------- row 6 ------------------------- */}
        {/* <Grid
          size={{ xs: 12, lg: 4, sm: 6 }}
          sx={{
            display: 'flex',
            alignItems: 'stretch',
          }}
        >
          <CheckboxesAutocomplete />
        </Grid> */}
        {/* ------------------------- row 7 ------------------------- */}
        {/* <Grid
          size={{ xs: 12, lg: 4, sm: 6 }}
          sx={{
            display: 'flex',
            alignItems: 'stretch',
          }}
        >
          <SizesAutocomplete />
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default ExAutoComplete;
