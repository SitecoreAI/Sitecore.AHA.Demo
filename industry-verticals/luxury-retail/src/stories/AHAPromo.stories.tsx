import type { Meta, StoryObj } from '@storybook/react';
import { Default as AHAPromo } from '../components/aha-promo/AHAPromo';
import { CommonParams, CommonRendering } from './common/commonData';
import { createImageField, createLinkField, createTextField } from './helpers/createFields';

const meta = {
  title: 'Components/AHAPromo',
  component: AHAPromo,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AHAPromo>;

export default meta;
type Story = StoryObj<typeof AHAPromo>;

const createAHAPromoFields = () => ({
  PromoImageOne: createImageField('placeholder'),
  PromoTitle: createTextField('Get ready for National Wear Red Day® on Feb. 6'),
  PromoDescription: {
    value:
      '<div class="ck-content"><p>Shop the 2026 Go Red for Women Collection and grab the hottest styles, pins and gifts you need to Go Red and show your support for women\'s heart health. Every purchase supports our lifesaving mission.</p></div>',
  },
  PromoMoreInfo: createLinkField('Shop Go Red for Women'),
});

export const Default: Story = {
  render: () => {
    const fields = createAHAPromoFields();
    return <AHAPromo params={CommonParams} rendering={CommonRendering} fields={fields} />;
  },
};
