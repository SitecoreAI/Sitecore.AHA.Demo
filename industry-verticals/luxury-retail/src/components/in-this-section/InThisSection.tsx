import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  Field,
  ImageField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { isParamEnabled } from '@/helpers/isParamEnabled';

interface Fields {
  Title: Field<string>;
  Topic1: Field<string>;
  Topic2: Field<string>;
  Topic3: Field<string>;
  Image1: ImageField;
  Image2: ImageField;
  Image3: ImageField;
}

export type InThisSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: InThisSectionProps): JSX.Element => {
  const { params, fields, rendering } = props;
  const id = params?.RenderingIdentifier;
  const styles = params?.styles || '';
  // Hide Title: checkbox param (Design tab) or hide-title style
  // Params may use "HideTitle" or "Hide Title" depending on serialization
  const hideTitleParam =
    params?.HideTitle ??
    params?.['Hide Title'] ??
    rendering?.params?.HideTitle ??
    rendering?.params?.['Hide Title'] ??
    '';
  const hideTitle = isParamEnabled(hideTitleParam) || styles?.includes('hide-title');
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;

  const topics = [
    { topic: fields.Topic1, image: fields.Image1 },
    { topic: fields.Topic2, image: fields.Image2 },
    { topic: fields.Topic3, image: fields.Image3 },
  ];

  return (
    <section
      className={`component in-this-section py-10 lg:py-16 ${styles}`}
      id={id ? id : undefined}
    >
      <div className="mx-auto max-w-[1170px] px-4">
        {/* Title - hidden when Hide Title style selected (Design > Styling); always shown in edit mode for selection */}
        {(!hideTitle || isPageEditing) && (
          <>
            <h2
              className={`text-foreground mb-4 text-2xl font-bold lg:text-3xl ${
                hideTitle && isPageEditing ? 'opacity-60' : ''
              }`}
            >
              <ContentSdkText field={fields.Title} />
            </h2>
            <div
              className={`border-foreground-light mb-8 border-t ${
                hideTitle && isPageEditing ? 'opacity-60' : ''
              }`}
            />
          </>
        )}

        {/* Cards Grid - in edit mode always render at least one card slot so component has clickable area */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {topics.map((item, index) => {
            const hasImage = item.image?.value?.src || isPageEditing;
            const hasTopic = item.topic?.value || isPageEditing;

            if (!hasImage && !hasTopic && !isPageEditing) return null;

            return (
              <div key={index} className="group cursor-pointer">
                {/* Image */}
                <div className="mb-4 aspect-[3/2] w-full overflow-hidden rounded-lg">
                  <ContentSdkImage
                    field={item.image}
                    width={360}
                    height={240}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Topic Title */}
                <h3 className="text-foreground text-lg font-semibold">
                  <ContentSdkText field={item.topic} />
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
