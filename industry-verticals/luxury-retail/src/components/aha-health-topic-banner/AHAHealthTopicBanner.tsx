import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  RichText as ContentSdkRichText,
  Text as ContentSdkText,
  Link as ContentSdkLink,
  LinkField,
  Field,
  ImageField,
  RichTextField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Title: Field<string>;
  Subtitle: Field<string>;
  Copy: RichTextField;
  Link: LinkField;
  Image: ImageField;
}

export type AHAHealthTopicBannerProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: AHAHealthTopicBannerProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const styles = props.params?.styles ?? '';
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;

  return (
    <section
      className={`component aha-health-topic-banner w-screen py-10 lg:py-16 ${styles}`}
      id={id ?? undefined}
      style={{
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
      }}
    >
      <div className="mx-auto w-full max-w-[1170px] px-4">
        <div className="flex flex-col items-start text-left">
          {/* Title */}
          <h1 className="text-foreground mb-4 w-full text-2xl font-bold lg:text-4xl">
            <ContentSdkText field={props.fields.Title} />
          </h1>

          {/* Gray horizontal line */}
          <div className="border-foreground-light mb-6 w-full border-t" />

          {/* Two columns: on mobile Image first, then text; on desktop text left, image right */}
          <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Text block - Subtitle, Copy, Link */}
            <div className="order-2 flex flex-col gap-4 lg:order-1">
              <h2 className="text-foreground text-lg font-bold lg:text-xl">
                <ContentSdkText field={props.fields.Subtitle} />
              </h2>
              <div className="text-foreground text-base leading-relaxed lg:text-lg">
                <ContentSdkRichText field={props.fields.Copy} />
              </div>
              {(props.fields.Link?.value?.href || isPageEditing) && (
                <div>
                  <ContentSdkLink
                    field={props.fields.Link}
                    className="inline-flex items-center font-medium text-[#c10e21] hover:underline"
                  />
                </div>
              )}
            </div>

            {/* Image - first on mobile (below line), right on desktop */}
            {(props.fields.Image?.value?.src || isPageEditing) && (
              <div className="order-1 lg:order-2">
                <div className="overflow-hidden rounded-lg">
                  <ContentSdkImage
                    field={props.fields.Image}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
