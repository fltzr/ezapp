/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/no-unstable-nested-components */
import { useFieldArray, useFormContext } from 'react-hook-form';
import {
  AttributeEditor,
  Container,
  Header,
  type MultiselectProps,
} from '@cloudscape-design/components';
import type { ControlList, Product } from '../schema/product';
import { FormMultiselect } from '@/common/components/form/form-multiselect/form-multiselect';
import { FormSelect } from '@/common/components/form/form-select/form-select';
import { FormInput } from '@/common/components/form/form-input/form-input';

const permittedActionsOptions: MultiselectProps.Option[] = [
  { value: 'SELECT', label: 'View' },
  { value: 'UPDATE', label: 'Update' },
  { value: 'DELETE', label: 'Delete' },
];

const accessTypeOptions: MultiselectProps.Option[] = [
  { value: 'ROLE', label: 'role' },
  { value: 'GROUP', label: 'group' },
  { value: 'USER', label: 'user' },
];

export const ControlListForm = () => {
  const { control } = useFormContext<Product>();
  const { fields, append, remove } = useFieldArray<Product>({
    control,
    name: 'controlList',
  });

  return (
    <Container header={<Header variant='h2'>Control list</Header>}>
      <AttributeEditor<ControlList>
        addButtonText={'Add control'}
        items={fields}
        definition={[
          {
            label: 'Permitted actions',
            control: (_, index) => (
              <FormMultiselect
                control={control}
                name={`controlList.${index}.permittedActions`}
                placeholder='Select resource actions'
                options={permittedActionsOptions}
              />
            ),
          },
          {
            label: 'Access type',
            control: (_, index) => (
              <FormSelect
                control={control}
                name={`controlList.${index}.accessType`}
                options={accessTypeOptions}
              />
            ),
          },
          {
            label: 'Granted to',
            control: (_, index) => (
              <FormInput control={control} name={`controlList.${index}.grantedTo`} />
            ),
          },
        ]}
        onAddButtonClick={() => append({ permittedActions: [], accessType: 'ROLE', grantedTo: '' })}
        onRemoveButtonClick={({ detail }) => remove(detail.itemIndex)}
      />
    </Container>
  );
};
