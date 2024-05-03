import { useFormContext } from 'react-hook-form';
import { Container, Header, SpaceBetween } from '@cloudscape-design/components';
import type { Product } from '../schema/product';
import { FormInput } from '@/common/components/form/form-input/form-input';

export const ProductForm = () => {
  const { control } = useFormContext<Product>();

  return (
    <Container header={<Header variant='h2'>Product</Header>}>
      <SpaceBetween direction='vertical' size='m'>
        <FormInput
          disableBrowserAutocorrect
          control={control}
          name='name'
          label='Name'
          description='Enter the name of the product.'
        />
        <FormInput
          disableBrowserAutocorrect
          control={control}
          name='price'
          label='Price'
          description='Enter the price of the product in USD.'
          type='number'
          inputMode='decimal'
        />
      </SpaceBetween>
    </Container>
  );
};
