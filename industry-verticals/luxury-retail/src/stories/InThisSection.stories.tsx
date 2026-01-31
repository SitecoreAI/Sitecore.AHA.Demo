import type { Meta, StoryObj } from '@storybook/react';
import { Default as InThisSection } from '../components/in-this-section/InThisSection';
import { CommonParams, CommonRendering } from './common/commonData';
import { InThisSectionStyles } from '@/types/styleFlags';

const meta = {
  title: 'Components/InThisSection',
  component: InThisSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof InThisSection>;

export default meta;
type Story = StoryObj<typeof InThisSection>;

const createInThisSectionFields = () => ({
  Title: { value: 'In this Section' },
  Topic1: { value: 'Eat Smart' },
  Topic2: { value: 'Losing Weight' },
  Topic3: { value: 'Cooking Skills' },
  Image1: {
    value: {
      src: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
      alt: 'Healthy food spread',
    },
  },
  Image2: {
    value: {
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      alt: 'Person exercising',
    },
  },
  Image3: {
    value: {
      src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
      alt: 'Family cooking together',
    },
  },
});

export const Default: Story = {
  render: () => {
    const fields = createInThisSectionFields();
    return <InThisSection params={CommonParams} rendering={CommonRendering} fields={fields} />;
  },
};

export const WithoutTitle: Story = {
  render: () => {
    const fields = createInThisSectionFields();
    return (
      <InThisSection
        params={{
          ...CommonParams,
          styles: `${CommonParams.styles || ''} ${InThisSectionStyles.HideTitle}`,
        }}
        rendering={CommonRendering}
        fields={fields}
      />
    );
  },
};
