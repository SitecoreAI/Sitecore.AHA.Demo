import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as AHAHeroBanner } from '../components/aha-hero-banner/AHAHeroBanner';
import { CommonParams, CommonRendering } from './common/commonData';
import { createImageField, createLinkField, createTextField } from './helpers/createFields';

const meta = {
  title: 'Page Content/AHA Hero Banner',
  component: AHAHeroBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AHAHeroBanner>;
export default meta;

type Story = StoryObj<typeof AHAHeroBanner>;

const baseParams = { ...CommonParams };
const baseRendering = {
  ...CommonRendering,
  componentName: 'AHA Hero Banner',
  params: baseParams,
};

const createAHAHeroBannerFields = (options?: { withButton2?: boolean; withLogo?: boolean }) => ({
  Title: createTextField('3X Impact for Wear Red and Give Day'),
  Copy: {
    value: `<div class="ck-content"><p>Give by February 6 for 3X impact and join a nation supporting women's heart health.</p></div>`,
  },
  Button1: createLinkField('Donate Once'),
  Button2: options?.withButton2 !== false ? createLinkField('Donate Monthly') : createLinkField(''),
  Image: createImageField('placeholder'),
  ...(options?.withLogo && { Logo: createImageField('placeholder') }),
});

export const Default: Story = {
  render: () => {
    const fields = createAHAHeroBannerFields();
    return <AHAHeroBanner params={baseParams} rendering={baseRendering} fields={fields} />;
  },
};

export const WithoutButton2: Story = {
  render: () => {
    const fields = createAHAHeroBannerFields({ withButton2: false });
    return <AHAHeroBanner params={baseParams} rendering={baseRendering} fields={fields} />;
  },
};

export const WithCustomLogo: Story = {
  render: () => {
    const fields = createAHAHeroBannerFields({ withLogo: true });
    return <AHAHeroBanner params={baseParams} rendering={baseRendering} fields={fields} />;
  },
};
