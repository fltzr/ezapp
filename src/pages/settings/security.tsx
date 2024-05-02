/* eslint-disable jsdoc/require-description-complete-sentence */
/* eslint-disable jsdoc/require-asterisk-prefix */
/* eslint-disable tsdoc/syntax */
import { useEffect } from 'react';
import { SecuritSettingsForm } from './security/components/security-settings-form';
import { useAppLayoutStore } from '@/store/use-app-layout-store';

//https://chat.openai.com/share/283d3941-15b3-4ec2-8f9c-4cea49a8a9d6

const SettingsSecurity = () => {
  const appLayoutStore = useAppLayoutStore();

  useEffect(() => {
    appLayoutStore.setContentLayout('form');

    return () => appLayoutStore.setContentLayout('default');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <SecuritSettingsForm />;
};

export const Component = SettingsSecurity;

/**
             <FormInput
              name='password'
              type='password'
              label='Password'
              control={methods.control}
              placeholder='Enter a password...'
            />
 */
