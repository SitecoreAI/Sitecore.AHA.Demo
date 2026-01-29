import {
  Field,
  ImageField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  Link,
  LinkField,
  RichTextField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

interface Fields {
  Title: Field<string>;
  Copy: RichTextField;
  Button1: LinkField;
  Button2: LinkField;
  Image: ImageField;
  Logo?: ImageField;
}

interface AHAHeroBannerProps extends ComponentProps {
  fields: Fields;
}

export const Default = ({ params, fields }: AHAHeroBannerProps) => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const { styles, RenderingIdentifier: id } = params;

  const showButton2 = Boolean(fields?.Button2?.value?.text?.trim()) || isPageEditing;

  if (!fields) {
    return isPageEditing ? (
      <section
        className={`component aha-hero-banner relative overflow-visible bg-white ${styles || ''}`}
        id={id}
      >
        <div
          className="absolute inset-0 z-0 bg-[#c10e21] [clip-path:inset(0_0_8rem_0)]"
          aria-hidden
        />
        <div className="relative z-10 container mx-auto max-w-[1170px] flex min-h-[24rem] items-center pt-[10px] pb-[10px] lg:min-h-[28rem]">
          [AHA HERO BANNER]
        </div>
      </section>
    ) : (
      <></>
    );
  }

  return (
    <section
      className={`component aha-hero-banner relative overflow-visible bg-white ${styles || ''}`}
      id={id}
    >
      {/* Red background: bottom clipped so image extends onto white below */}
      <div
        className="absolute inset-0 z-0 bg-[#c10e21] [clip-path:inset(0_0_8rem_0)]"
        aria-hidden
      />
      <div className="relative z-10 container mx-auto max-w-[1170px] flex min-h-[24rem] flex-col gap-6 pt-[10px] pb-[10px] lg:min-h-[28rem] lg:gap-8">
        {/* Branding: full width */}
        <div className="flex w-full items-center gap-2">
          {fields.Logo && (fields.Logo?.value?.src || isPageEditing) ? (
            <ContentSdkImage
              field={fields.Logo}
              width={24}
              height={24}
              className="size-6 shrink-0 object-contain object-left"
            />
          ) : (
            <HeartIcon className="size-6 shrink-0 text-white" />
          )}
          <span className="font-body text-base font-normal text-white">
            American Heart Association
          </span>
        </div>

        {/* Title: full width across entire component */}
        <h1 className="font-body w-full text-3xl leading-tight font-medium tracking-tight text-white lg:text-5xl xl:text-6xl">
          <ContentSdkText field={fields.Title} />
        </h1>

        {/* Copy, buttons, and image: two columns below title */}
        <div className="flex flex-1 flex-col gap-8 lg:flex-row lg:gap-12">
          <div className="flex flex-col space-y-6 text-white lg:flex-[4]">
            <div className="font-body text-base leading-relaxed font-normal text-white lg:text-lg [&_.ck-content]:text-white [&_.ck-content_a]:text-white [&_.ck-content_a]:underline [&_.ck-content_p]:mb-3">
              <ContentSdkRichText field={fields.Copy} />
            </div>
            <div className="flex flex-wrap gap-4 max-sm:flex-col">
              {(fields.Button1?.value?.href || isPageEditing) && (
                <Link
                  field={fields.Button1}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#c10e21] bg-white px-6 py-2.5 font-light text-[#c10e21] transition-colors hover:border-white hover:bg-[#c10e21] hover:text-white max-sm:w-full sm:w-auto"
                />
              )}
              {showButton2 && (fields.Button2?.value?.href || isPageEditing) && (
                <Link
                  field={fields.Button2}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#c10e21] bg-white px-6 py-2.5 font-light text-[#c10e21] transition-colors hover:border-white hover:bg-[#c10e21] hover:text-white max-sm:w-full sm:w-auto"
                />
              )}
            </div>
          </div>
          <div className="relative flex flex-1 justify-end lg:flex-[6]">
            <ContentSdkImage
              field={fields.Image}
              className="max-h-[28rem] w-full rounded-lg object-cover object-center shadow-[0_8px_24px_rgba(0,0,0,0.5)] lg:max-h-[32rem] lg:rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
