import {
  Box,
  Button,
  ColumnLayout,
  Container,
  Header,
  SpaceBetween,
} from '@cloudscape-design/components';
import { useState } from 'react';

export const ContactInformationContainer = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    fullName: 'John Doe',
    companyName: 'Example Corp',
    address: '1234 Example St',
    phoneNumber: '+1 123 456 7890',
    websiteUrl: 'None',
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // const handleChange = (key: string, value: string) => {
  //   setForm({
  //     ...form,
  //     [key]: value,
  //   });
  // }

  return (
    <Container
      variant='stacked'
      header={
        <Header
          variant='h2'
          actions={isEditing ? undefined : <Button onClick={handleEdit}>Edit</Button>}
        >
          Contact information
        </Header>
      }
      footer={
        isEditing ? (
          <Box float='right'>
            <SpaceBetween direction='horizontal' size='s'>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button variant='primary' onClick={handleSave}>
                Save
              </Button>
            </SpaceBetween>
          </Box>
        ) : undefined
      }
    >
      {isEditing ? (
        <Box>isEditing</Box>
      ) : (
        <ColumnLayout borders='vertical' columns={3}>
          <Box variant='div'>
            <Box fontSize='body-m' color='text-status-inactive'>
              Full name
            </Box>
            <Box>{form.fullName}</Box>
          </Box>
          <Box variant='div'>
            <Box fontSize='body-m' color='text-status-inactive'>
              Company name
            </Box>
            <Box>{form.companyName}</Box>
          </Box>
          <Box variant='div'>
            <Box fontSize='body-m' color='text-status-inactive'>
              Address
            </Box>
            <Box>{form.address}</Box>
          </Box>
          <Box variant='div'>
            <Box fontSize='body-m' color='text-status-inactive'>
              Phone number
            </Box>
            <Box>{form.phoneNumber}</Box>
          </Box>
          <Box variant='div'>
            <Box fontSize='body-m' color='text-status-inactive'>
              Website URL
            </Box>
            <Box>{form.websiteUrl}</Box>
          </Box>
        </ColumnLayout>
      )}
    </Container>
  );
};
