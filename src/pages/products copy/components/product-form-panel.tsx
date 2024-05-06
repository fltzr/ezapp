import { useFormContext } from 'react-hook-form';
import { ExpandableSection, SpaceBetween } from '@cloudscape-design/components';
import type { Product } from '../schema/product';
import { FormInput } from '@/common/components/form/form-input/form-input';

export const ProductFormPanel = () => {
  const { control } = useFormContext<Product>();

  return (
    <ExpandableSection defaultExpanded variant='container' headerText='Product'>
      <SpaceBetween direction='vertical' size='m'>
        <FormInput
          disableBrowserAutocorrect
          control={control}
          name='name'
          label='Name'
          placeholder='Macbook Pro'
          description='Enter the name of the product.'
        />
        <FormInput
          disableBrowserAutocorrect
          control={control}
          name='price'
          label='Price'
          placeholder='1000.00'
          description='Enter the price of the product in USD.'
          type='number'
          inputMode='decimal'
        />
      </SpaceBetween>
    </ExpandableSection>
  );
};
