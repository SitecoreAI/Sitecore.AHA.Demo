import type { Meta, StoryObj } from '@storybook/react';
import { Default as AHAChangingTheFuture } from '../components/aha-changing-the-future/AHAChangingTheFuture';
import { CommonParams, CommonRendering } from './common/commonData';

const meta = {
  title: 'Components/AHAChangingTheFuture',
  component: AHAChangingTheFuture,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AHAChangingTheFuture>;

export default meta;
type Story = StoryObj<typeof AHAChangingTheFuture>;

export const Default: Story = {
  render: () => <AHAChangingTheFuture params={CommonParams} rendering={CommonRendering} />,
};
