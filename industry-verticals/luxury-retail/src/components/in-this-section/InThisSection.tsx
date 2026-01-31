import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  Field,
  ImageField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

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
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;

  const topics = [
    { topic: props.fields.Topic1, image: props.fields.Image1 },
    { topic: props.fields.Topic2, image: props.fields.Image2 },
    { topic: props.fields.Topic3, image: props.fields.Image3 },
  ];

  return (
    <section
      className={`component in-this-section py-10 lg:py-16 ${props.params.styles || ''}`}
      id={id ? id : undefined}
    >
      <div className="mx-auto max-w-[1170px] px-4">
        {/* Title */}
        <h2 className="text-foreground mb-4 text-2xl font-bold lg:text-3xl">
          <ContentSdkText field={props.fields.Title} />
        </h2>

        {/* Separator line */}
        <div className="border-foreground-light mb-8 border-t" />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {topics.map((item, index) => {
            const hasImage = item.image?.value?.src || isPageEditing;
            const hasTopic = item.topic?.value || isPageEditing;

            if (!hasImage && !hasTopic) return null;

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
