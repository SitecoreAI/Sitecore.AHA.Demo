import type { Meta, StoryObj } from '@storybook/react';
import { Default as AHATextPromo } from '../components/aha-text-promo/AHATextPromo';
import { CommonParams, CommonRendering } from './common/commonData';

const meta = {
  title: 'Components/AHATextPromo',
  component: AHATextPromo,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AHATextPromo>;

export default meta;
type Story = StoryObj<typeof AHATextPromo>;

const createAHATextPromoFields = () => ({
  PromoText: {
    value:
      '<p>Join the movement in getting <em>Healthy for Good™</em> today. Because when good health is lived, it can nourish every part of you, your family, and your community for a lifetime.</p>',
  },
  PromoButton: {
    value: {
      href: '#',
      text: 'Sign up for bimonthly hacks & tips',
      title: 'Sign up for bimonthly hacks & tips',
    },
  },
});

export const Default: Story = {
  render: () => {
    const fields = createAHATextPromoFields();
    return <AHATextPromo params={CommonParams} rendering={CommonRendering} fields={fields} />;
  },
};
