/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/no-unstable-nested-components */
import { AttributeEditor, FormField, Link } from '@cloudscape-design/components';
import { useController, useFieldArray, useFormContext } from 'react-hook-form';
import { FormMultiselect } from '../form/form-multiselect/form-multiselect';
import { FormSelect } from '../form/form-select/form-select';
import { FormInput } from '../form/form-input/form-input';

const defaultControlListConfig = {
  permittedActions: [
    { value: 'SELECT', label: 'View' },
    { value: 'UPDATE', label: 'Update' },
    { value: 'DELETE', label: 'Delete' },
  ],
  accessTypeOptions: [
    { value: 'ROLE', label: 'Role' },
    { value: 'GROUP', label: 'Group' },
    { value: 'USER', label: 'User' },
  ],
  controlListPath: 'controlList',
};

export const ControlListEditor = () => {
  const { control } = useFormContext();
  const {
    fieldState: { error },
  } = useController({ control, name: 'controlList' });
  const { fields, append, remove } = useFieldArray({
    control,
    name: defaultControlListConfig.controlListPath,
  });

  return (
    <FormField
      stretch
      errorText={error?.message}
      label='Controls'
      description='Controls are used to define the access permissions for the resource.'
      constraintText='At least one control must be defined.'
    >
      <AttributeEditor
        addButtonText={'Add control'}
        items={fields}
        empty='No controls added yet.'
        definition={[
          {
            label: 'Permitted actions',
            control: (_, index) => (
              <FormMultiselect
                control={control}
                name={`controlList.${index}.permittedActions`}
                placeholder='Select resource actions'
                options={defaultControlListConfig.permittedActions}
              />
            ),
            info: <Link variant='info'>info</Link>,
          },
          {
            label: 'Access type',
            control: (_, index) => (
              <FormSelect
                control={control}
                name={`controlList.${index}.accessType`}
                options={defaultControlListConfig.accessTypeOptions}
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
        onRemoveButtonClick={({ detail }) => remove(detail.itemIndex)}
        onAddButtonClick={() =>
          append({ accessType: 'GROUP', grantedTo: '', permittedActions: [] })
        }
      />
    </FormField>
  );
};
