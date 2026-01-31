import type { Meta, StoryObj } from '@storybook/react';
import { Default as AHAHealthTopicBanner } from '../components/aha-health-topic-banner/AHAHealthTopicBanner';
import { CommonParams, CommonRendering } from './common/commonData';
import { createImageField, createLinkField, createTextField } from './helpers/createFields';

const meta = {
  title: 'Components/AHAHealthTopicBanner',
  component: AHAHealthTopicBanner,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AHAHealthTopicBanner>;

export default meta;
type Story = StoryObj<typeof AHAHealthTopicBanner>;

const createAHAHealthTopicBannerFields = () => ({
  Title: createTextField('Heart Attack'),
  Subtitle: createTextField('What is a Heart Attack?'),
  Copy: {
    value:
      '<div class="ck-content"><p>A heart attack is scary. If you\'ve had one, or are close to someone who has, you\'re not alone. Many people survive a heart attack and go on to enjoy productive lives.</p></div>',
  },
  Link: createLinkField('Learn more about heart attacks'),
  Image: createImageField('placeholder'),
});

export const Default: Story = {
  render: () => {
    const fields = createAHAHealthTopicBannerFields();
    const rendering = { ...CommonRendering, componentName: 'AHAHealthTopicBanner' };
    return <AHAHealthTopicBanner params={CommonParams} rendering={rendering} fields={fields} />;
  },
};
