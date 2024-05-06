import { useEffect, useRef, useState } from 'react';
import { Box } from '@cloudscape-design/components';
import type { Product } from './schema/product';
import { ProductForms } from './components/product-forms';
import { AddManufacturerModal } from './components/add-manufacturer-modal';
import { AddCatalogCategoryModal } from './components/add-catalog-category-modal';
import { AddProductTypeModal } from './components/add-product-type-modal';
import { useAppLayoutStore } from '@/store/use-app-layout-store';

const CreateProductPage = () => {
  const formRef = useRef<{ reset: () => void }>(null);
  const appLayoutStore = useAppLayoutStore();

  const [isManufacturerModalOpen, setIsManufacturerModalOpen] = useState(false);
  const [isProductTypeModalOpen, setIsProductTypeModalOpen] = useState(false);
  const [isCatalogCategoryModalOpen, setIsCatalogCategoryModalOpen] = useState(false);

  useEffect(() => {
    appLayoutStore.setContentLayout('table');
    appLayoutStore.setNavigationOpen(false);

    return () => {
      appLayoutStore.setContentLayout('default');
      appLayoutStore.setNavigationOpen(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (data: Product) => {
    setIsCatalogCategoryModalOpen(false);
    console.info(JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ maxWidth: '1375px' }}>
      <Box margin={{ left: 'm' }}>
        <ProductForms
          formRef={formRef}
          setManufacturerModalOpen={setIsManufacturerModalOpen}
          setProductTypeModalOpen={setIsProductTypeModalOpen}
          setCatalogCategoryModalOpen={setIsCatalogCategoryModalOpen}
          onSubmit={handleSubmit}
        />
        <AddManufacturerModal
          isVisible={isManufacturerModalOpen}
          onClose={() => setIsManufacturerModalOpen(false)}
        />
        <AddProductTypeModal
          isVisible={isProductTypeModalOpen}
          onClose={() => setIsProductTypeModalOpen(false)}
        />
        <AddCatalogCategoryModal
          isVisible={isCatalogCategoryModalOpen}
          onClose={() => setIsCatalogCategoryModalOpen(false)}
        />
      </Box>
    </div>
  );
};

export const Component = CreateProductPage;
