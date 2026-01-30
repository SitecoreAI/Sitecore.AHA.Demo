import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  RichText as ContentSdkRichText,
  Field,
  ImageField,
  Link,
  LinkField,
  RichTextField,
  Text,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  PromoImageOne: ImageField;
  PromoImageTwo: ImageField;
  PromoImageThree: ImageField;
  PromoTitle: Field<string>;
  PromoDescription: RichTextField;
  PromoMoreInfo: LinkField;
}

export type AHAPromoProps = ComponentProps & {
  fields: Fields;
};

const AHA_RED = '#c10e21';

const IMAGE_FIELDS: (keyof Pick<Fields, 'PromoImageOne' | 'PromoImageTwo' | 'PromoImageThree'>)[] =
  [
    'PromoImageOne',
    'PromoImageTwo',
    'PromoImageThree',
    'PromoImageOne',
    'PromoImageTwo',
    'PromoImageThree',
  ];

export const Default = (props: AHAPromoProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const styles = props.params?.styles ?? '';
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;

  return (
    <section className={`component aha-promo py-10 lg:py-16 ${styles}`} id={id ?? undefined}>
      <div className="mx-auto max-w-[1170px] px-4">
        <div
          className="grid grid-cols-1 gap-8 rounded-lg border-2 bg-white p-8 lg:grid-cols-2 lg:gap-12 lg:p-12"
          style={{ borderColor: AHA_RED }}
        >
          {/* Left column - Text */}
          <div className="flex flex-col">
            <h2 className="text-foreground mb-4 text-2xl font-bold lg:text-3xl">
              <Text field={props.fields.PromoTitle} />
            </h2>
            <div className="text-foreground mb-6 text-base leading-relaxed lg:text-lg">
              <ContentSdkRichText field={props.fields.PromoDescription} />
            </div>
            <div className="border-foreground-light mb-6 w-2/3 border-t" />
            {(props.fields.PromoMoreInfo?.value?.href || isPageEditing) && (
              <div className="flex justify-center">
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

          {/* Right column - Image grid 2x3 */}
          <div className="grid grid-cols-3 gap-3">
            {IMAGE_FIELDS.map((fieldName, index) => {
              const field = props.fields[fieldName];
              const hasImage = field?.value?.src || isPageEditing;
              if (!hasImage) return null;
              return (
                <div key={index} className="aspect-square overflow-hidden rounded">
                  <ContentSdkImage field={field} className="h-full w-full object-cover" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
