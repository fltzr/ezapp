/* eslint-disable react/jsx-props-no-spreading */
import {
  type FormFieldProps,
  type SelectProps,
  FormField,
  Select,
  Spinner,
} from '@cloudscape-design/components';
import { type ControllerProps, type FieldValues, useController } from 'react-hook-form';

type FormSelectProps<T extends FieldValues> = Omit<
  SelectProps,
  'name' | 'value' | 'options' | 'selectedOption'
> &
  Omit<FormFieldProps, 'errorText'> &
  Pick<ControllerProps<T>, 'control' | 'name' | 'rules'> & {
    isLoading?: boolean;
    options: SelectProps.Option[];
  };

export const FormSelect = <T extends FieldValues>({
  name,
  control,
  rules,
  isLoading,
  options,
  ...props
}: FormSelectProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController<T>({ name, control, rules });

  const handleOnChange: SelectProps['onChange'] = (event) => {
    field.onChange(event.detail.selectedOption.value);
  };

  return (
    <FormField
      label={props.label}
      info={props.info}
      description={props.description}
      constraintText={props.constraintText}
      stretch={props.stretch}
      secondaryControl={props.secondaryControl}
      errorText={error?.message}
    >
      {isLoading ? (
        <Spinner size='normal' />
      ) : (
        <Select
          {...props}
          ref={field.ref}
          options={options}
          selectedOption={options.find((option) => option.value === field.value) ?? {}}
          onChange={handleOnChange}
        />
      )}
    </FormField>
  );
};
