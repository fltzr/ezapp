/* eslint-disable no-void */
/* eslint-disable react/jsx-props-no-spreading */
import { type SubmitHandler, FormProvider, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { SpaceBetween } from '@cloudscape-design/components';
import { useEffect } from 'react';
import { FormSelect } from '@/common/components/form/form-select/form-select';
import { FormInput } from '@/common/components/form/form-input/form-input';

//https://chat.openai.com/share/283d3941-15b3-4ec2-8f9c-4cea49a8a9d6

const fetchSecuritSettings = async () => {
  await new Promise((r) => {
    setTimeout(r, 3 * 1000);
  });

  return {
    tfa: 'off',
    recoveryPreference: 'text',
  };
};

export type SecuritySettingsData = {
  tfa: string;
  recoveryPreference: string;
  password: string;
};

const SettingsSecurity = () => {
  const userPrefs = useQuery({
    queryKey: ['user-security-settings'],
    queryFn: fetchSecuritSettings,
  });

  const methods = useForm<SecuritySettingsData>({
    defaultValues: userPrefs.data,
  });

  const handleOnSubmit: SubmitHandler<SecuritySettingsData> = (data: SecuritySettingsData) => {
    console.info('Form data: ', data);
  };

  useEffect(() => {
    methods.reset(userPrefs.data);

    return () => methods.reset({});
  }, [methods, userPrefs.data]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void methods.handleSubmit(handleOnSubmit);
        }}
      >
        <SpaceBetween size='m' direction='vertical'>
          <FormSelect
            name={'tfa'}
            label='Two-factor authentication'
            constraintText='Default value is on.'
            control={methods.control}
            placeholder='Choose...'
            isLoading={userPrefs.isLoading}
            options={[
              { label: 'on', value: 'on' },
              { label: 'off', value: 'off' },
            ]}
          />
          <FormSelect
            name={'recoveryPreference'}
            label='Account recovery preference'
            constraintText='Default value is email.'
            control={methods.control}
            placeholder='Choose...'
            isLoading={userPrefs.isLoading}
            options={[
              { label: 'email', value: 'email' },
              { label: 'text', value: 'text' },
            ]}
          />

          <FormInput
            name='password'
            type='password'
            label='Password'
            control={methods.control}
            placeholder='Enter a password...'
          />
        </SpaceBetween>
      </form>
    </FormProvider>
  );
};

export const Component = SettingsSecurity;
