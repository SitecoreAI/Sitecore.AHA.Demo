import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as AHACards } from '../components/aha-cards/AHACards';
import { CommonParams, CommonRendering } from './common/commonData';
import { createImageField, createTextField } from './helpers/createFields';

const meta = {
  title: 'Page Content/AHA Cards',
  component: AHACards,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AHACards>;
export default meta;

type Story = StoryObj<typeof AHACards>;

const baseParams = { ...CommonParams };
const baseRendering = {
  ...CommonRendering,
  componentName: 'AHA Cards',
  params: baseParams,
};

const createAHACardsFields = () => ({
  Icon1: createImageField('placeholder'),
  Icon2: createImageField('placeholder'),
  Icon3: createImageField('placeholder'),
  Icon4: createImageField('placeholder'),
  Title1: createTextField('CPR and ECC Training'),
  Title2: createTextField('Support Network Community'),
  Title3: createTextField('Professional Membership'),
  Title4: createTextField('Volunteer Opportunities'),
  Copy1: createTextField('Be prepared for an emergency: Learn CPR. Save a life.', 1),
  Copy2: createTextField('Join our online community of patients, survivors and caregivers.', 1),
  Copy3: createTextField('Build your professional career and start making an impact today.', 1),
  Copy4: createTextField('Help us create a healthier world free of heart disease and stroke.', 1),
});

export const Default: Story = {
  render: () => {
    const fields = createAHACardsFields();
    return <AHACards params={baseParams} rendering={baseRendering} fields={fields} />;
  },
};
