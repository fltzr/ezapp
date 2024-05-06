import { useEffect, type Ref } from 'react';
import {
  ExpandableSection,
  Grid,
  Header,
  HelpPanel,
  Link,
  SpaceBetween,
} from '@cloudscape-design/components';
import { type Product, productSchema } from '../schema/product';
import { ProductFormPanel } from './product-form-panel';
import { MetaFormPanel } from './meta-form-panel';
import { SummaryPanel } from './summary-panel';
import { BaseForm } from '@/common/components/form/base-form/base-form';
import { Breadcrumbs } from '@/common/components/breadcrumbs/breadcrumbs';
import { ControlListEditor } from '@/common/components/control-list/control-list';
import { useAppLayoutStore } from '@/store/use-app-layout-store';

type ProductFormProps = {
  formRef: Ref<{ reset: () => void }>;
  onSubmit: (data: Product) => void;
  setManufacturerModalOpen: (state: boolean) => void;
  setProductTypeModalOpen: (state: boolean) => void;
  setCatalogCategoryModalOpen: (state: boolean) => void;
};

export const ProductForms = ({
  formRef,
  onSubmit,
  setManufacturerModalOpen,
  setProductTypeModalOpen,
  setCatalogCategoryModalOpen,
}: ProductFormProps) => {
  const { setToolsOpen, setToolsContent } = useAppLayoutStore();

  useEffect(() => {
    setToolsContent(<HelpPanel>form_create-product</HelpPanel>);

    return () => {
      setToolsContent(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BaseForm
      formId='form_create-product'
      formRef={formRef}
      zodSchema={productSchema}
      onSubmit={onSubmit}
    >
      <Grid gridDefinition={[{ colspan: 8 }, { colspan: 4 }]}>
        <SpaceBetween direction='vertical' size='m'>
          <Breadcrumbs />
          <Header
            variant='h1'
            info={
              <Link
                variant='info'
                onFollow={() => {
                  setToolsContent(<HelpPanel>form_create-product</HelpPanel>);
                  setToolsOpen(true);
                }}
              >
                info
              </Link>
            }
          >
            Create a product
          </Header>
          <ProductFormPanel />
          <MetaFormPanel
            setManufacturerModalOpen={setManufacturerModalOpen}
            setProductTypeModalOpen={setProductTypeModalOpen}
            setCatalogCategoryModalOpen={setCatalogCategoryModalOpen}
          />
          <ExpandableSection variant='container' headerText='Access control list'>
            <ControlListEditor />
          </ExpandableSection>
        </SpaceBetween>
        <SummaryPanel />
      </Grid>
    </BaseForm>
  );
};
