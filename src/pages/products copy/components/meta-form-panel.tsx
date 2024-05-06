/* eslint-disable @eslint-react/no-complicated-conditional-rendering */
/* eslint-disable no-nested-ternary */
import { useFormContext } from 'react-hook-form';
import { ExpandableSection, SpaceBetween } from '@cloudscape-design/components';
import type { Product } from '../schema/product';
import { useManufacturerApi } from '../data-access/manufacturer';
import { CategorySelect } from './category-select';

type MetaFormPanelProps = {
  setManufacturerModalOpen: (state: boolean) => void;
  setProductTypeModalOpen: (state: boolean) => void;
  setCatalogCategoryModalOpen: (state: boolean) => void;
};

export const MetaFormPanel = ({
  setManufacturerModalOpen,
  setProductTypeModalOpen,
  setCatalogCategoryModalOpen,
}: MetaFormPanelProps) => {
  const { control } = useFormContext<Product>();
  const { getManufacturers } = useManufacturerApi();

  return (
    <ExpandableSection defaultExpanded variant='container' headerText='Meta'>
      <SpaceBetween direction='vertical' size='m'>
        <CategorySelect
          control={control}
          name='productType'
          label='Product type'
          placeholder='Select a product type'
          options={getManufacturers.data?.map((m) => ({ label: m.name, value: m.id })) ?? []}
          loadingText='Loading product types...'
          statusType={
            getManufacturers.isFetching || getManufacturers.isLoading
              ? 'loading'
              : getManufacturers.isError
              ? 'error'
              : 'finished'
          }
          onAddNew={() => setProductTypeModalOpen(true)}
          onRefresh={() => {
            getManufacturers.refetch().catch((error) => console.error(error));
          }}
          onLoadItems={() => {
            getManufacturers.refetch().catch((error) => console.error(error));
          }}
        />
        <CategorySelect
          control={control}
          name='catalogCategory'
          label='Catalog category'
          placeholder='Select a category'
          options={getManufacturers.data?.map((m) => ({ label: m.name, value: m.id })) ?? []}
          loadingText='Loading catalog categories...'
          statusType={
            getManufacturers.isFetching || getManufacturers.isLoading
              ? 'loading'
              : getManufacturers.isError
              ? 'error'
              : 'finished'
          }
          onAddNew={() => setCatalogCategoryModalOpen(true)}
          onRefresh={() => {
            getManufacturers.refetch().catch((error) => console.error(error));
          }}
          onLoadItems={() => {
            getManufacturers.refetch().catch((error) => console.error(error));
          }}
        />
        <CategorySelect
          control={control}
          name='manufacturer'
          label='Manufacturer'
          placeholder='Select a manufacturer'
          options={getManufacturers.data?.map((m) => ({ label: m.name, value: m.id })) ?? []}
          loadingText='Loading manufacturers...'
          statusType={
            getManufacturers.isFetching || getManufacturers.isLoading
              ? 'loading'
              : getManufacturers.isError
              ? 'error'
              : 'finished'
          }
          onAddNew={() => setManufacturerModalOpen(true)}
          onRefresh={() => {
            getManufacturers.refetch().catch((error) => console.error(error));
          }}
          onLoadItems={() => {
            getManufacturers.refetch().catch((error) => console.error(error));
          }}
        />
      </SpaceBetween>
    </ExpandableSection>
  );
};
