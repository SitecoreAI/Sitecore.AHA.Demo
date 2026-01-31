import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  RichText as ContentSdkRichText,
  Field,
  ImageField,
  Link,
  LinkField,
  RichTextField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  PromoImageOne: ImageField;
  PromoTitle: Field<string>;
  PromoDescription: RichTextField;
  PromoMoreInfo: LinkField;
}

export type AHAPromoProps = ComponentProps & {
  fields: Fields;
};

const AHA_RED = '#c10e21';

export const Default = (props: AHAPromoProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const styles = props.params?.styles ?? '';
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;

  return (
    <section
      className={`component aha-promo w-screen py-10 lg:py-16 ${styles}`}
      id={id ?? undefined}
      style={{
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
      }}
    >
      <div className="mx-auto w-full max-w-[1170px] px-4">
        <div
          className="grid grid-cols-1 gap-8 rounded-lg bg-white p-8 lg:grid-cols-2 lg:gap-12 lg:p-12"
          style={{ border: `15px solid ${AHA_RED}` }}
        >
          {/* Text - stacked below image on mobile, left on desktop */}
          <div className="order-2 flex flex-col items-start text-left lg:order-1">
            <h2 className="text-foreground mb-4 text-2xl font-bold lg:text-3xl">
              {String(props.fields.PromoTitle?.value ?? '')}
            </h2>
            <div className="space-y-6">
              <div className="text-foreground text-base leading-relaxed lg:text-lg">
                <ContentSdkRichText field={props.fields.PromoDescription} />
              </div>
              <div className="border-foreground-light w-full border-t" />
            </div>
            {(props.fields.PromoMoreInfo?.value?.href || isPageEditing) && (
              <div className="mt-6 flex justify-start">
                <Link
                  field={props.fields.PromoMoreInfo}
                  className="inline-flex items-center gap-1 font-medium text-[#c10e21] hover:underline"
                >
                  {props.fields.PromoMoreInfo.value?.text ?? 'Shop'}
                  <span aria-hidden="true">&gt;</span>
                </Link>
              </div>
            )}
          </div>

          {/* Image - on top on mobile, right on desktop; shrinks on smaller viewports */}
          {(props.fields.PromoImageOne?.value?.src || isPageEditing) && (
            <div className="order-1 mx-auto aspect-[495/343] w-full max-w-[495px] overflow-hidden rounded shadow-xl lg:order-2">
              <ContentSdkImage
                field={props.fields.PromoImageOne}
                width={495}
                height={343}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
