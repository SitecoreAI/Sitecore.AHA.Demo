import type { Meta, StoryObj } from '@storybook/react';
import { Default as TextOnlyPromo } from '../components/text-only-promo/TextOnlyPromo';
import { baseParams, baseRendering } from './common/commonData';

const meta = {
  title: 'Components/TextOnlyPromo',
  component: TextOnlyPromo,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TextOnlyPromo>;

export default meta;
type Story = StoryObj<typeof TextOnlyPromo>;

const createTextOnlyPromoFields = () => ({
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
    const fields = createTextOnlyPromoFields();
    return <TextOnlyPromo params={baseParams} rendering={baseRendering} fields={fields} />;
  },
};
