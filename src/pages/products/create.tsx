import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, SpaceBetween } from '@cloudscape-design/components';
import { productSchema, type Product } from './schema/product';
import { ControlListForm } from './components/control-list';
import { ProductForm } from './components/product-form';
import { useAppLayoutStore } from '@/store/use-app-layout-store';

// https://chat.openai.com/share/83a635cf-c006-4925-9678-75514a29f964

const ProductCreate = () => {
  const appLayoutStore = useAppLayoutStore();
  const methods = useForm<Product>({
    resolver: zodResolver(productSchema),
  });

  const handleOnSubmit = (data: Product) => {
    console.info(data);
  };

  useEffect(() => {
    appLayoutStore.setContentLayout('table');

    return () => appLayoutStore.setContentLayout('default');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...methods}>
      <form
        id='form_create-product'
        onSubmit={(event) => {
          // eslint-disable-next-line no-void
          void methods.handleSubmit(handleOnSubmit, (errors) => {
            console.error(`ERROR: ${JSON.stringify(errors, null, 2)}`);
          })(event);
        }}
      >
        <SpaceBetween direction='vertical' size='m'>
          <ProductForm />
          <ControlListForm />
        </SpaceBetween>
        <Box float='left' margin={{ top: 'xxl' }}>
          <SpaceBetween size='m'>
            <Button variant='primary' form='form_create-product' formAction='submit'>
              Create
            </Button>
          </SpaceBetween>
        </Box>
      </form>
    </FormProvider>
  );
};

export const Component = ProductCreate;
