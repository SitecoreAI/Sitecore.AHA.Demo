import React, { JSX } from 'react';
import {
  RichText as ContentSdkRichText,
  Link,
  LinkField,
  RichTextField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  PromoText: RichTextField;
  PromoButton: LinkField;
}

export type TextOnlyPromoProps = ComponentProps & {
  fields: Fields;
};

const AHA_RED = '#c10e21';

export const Default = (props: TextOnlyPromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;

  return (
    <section
      className={`component text-only-promo py-10 lg:py-16 ${props.params.styles || ''}`}
      id={id ? id : undefined}
    >
      <div className="mx-auto max-w-[1170px] px-4">
        <div
          className="border-4 bg-white p-8 lg:p-12"
          style={{ borderColor: AHA_RED }}
        >
          <div className="space-y-6">
            {/* Promo Text with italic support for "Healthy for Good™" */}
            <div className="text-foreground text-base leading-relaxed lg:text-lg [&_em]:italic [&_em]:not-italic [&_em]:font-normal">
              <ContentSdkRichText field={props.fields.PromoText} />
            </div>

            {/* Separator line */}
            <div className="border-foreground-light w-2/3 border-t" />

            {/* Button */}
            {(props.fields.PromoButton?.value?.href || isPageEditing) && (
              <Link
                field={props.fields.PromoButton}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-transparent bg-[#c10e21] px-8 py-3 font-medium text-white transition-colors hover:border-[#c10e21] hover:bg-white hover:text-[#c10e21]"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
