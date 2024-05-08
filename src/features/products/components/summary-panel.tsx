import { useWatch } from 'react-hook-form';
import {
  Button,
  ColumnLayout,
  Container,
  ExpandableSection,
  SpaceBetween,
} from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../schema/product';
import { KeyValuePair } from '@/common/components/key-value-pair/key-value-pair';

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const formatPrice = (price: number): string => (price ? `$${price}` : 'N/A');

export const SummaryPanel = () => {
  const navigate = useNavigate();
  const values = useWatch<Product>();

  return (
    <div style={{ position: 'sticky', top: '52px' }}>
      <ExpandableSection defaultExpanded variant='stacked' headerText='Summary'>
        <ColumnLayout columns={2}>
          <KeyValuePair label='Name'>{values.name}</KeyValuePair>
          <KeyValuePair label='Price'>{formatPrice(values.price ?? 0)}</KeyValuePair>
        </ColumnLayout>
        <SpaceBetween direction='vertical' size='s'>
          {/* <KeyValuePair label='Manufacturer'>{values.manufacturer?.label}</KeyValuePair>
          <KeyValuePair label='Category'>{values.catalogCategory?.label}</KeyValuePair>
          <KeyValuePair label='Product type'>{values.productType?.label}</KeyValuePair> */}
          {JSON.stringify(values, null, 2)}
        </SpaceBetween>
      </ExpandableSection>
      <Container fitHeight variant='stacked'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            wrapText={false}
            formAction='none'
            onClick={(event) => {
              event.preventDefault();
              navigate(-1);
            }}
          >
            Cancel
          </Button>
          <Button wrapText={false} variant='primary' form='form_create-product' formAction='submit'>
            Submit
          </Button>
        </div>
      </Container>
    </div>
  );
};
