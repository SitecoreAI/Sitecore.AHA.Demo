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
}

interface AHAHeroBannerProps extends ComponentProps {
  fields: Fields;
}

export const Default = ({ params, fields }: AHAHeroBannerProps) => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const { styles, RenderingIdentifier: id } = params;

  const showButton2 =
    Boolean(fields?.Button2?.value?.text?.trim()) || isPageEditing;

  if (!fields) {
    return isPageEditing ? (
      <section
        className={`component aha-hero-banner min-h-[32rem] bg-[#C10E0E] ${styles || ''}`}
        id={id}
      >
        <div className="container flex min-h-[32rem] items-center py-12">
          [AHA HERO BANNER]
        </div>
      </section>
    ) : (
      <></>
    );
  }

  return (
    <section
      className={`component aha-hero-banner min-h-[32rem] bg-[#C10E0E] ${styles || ''}`}
      id={id}
    >
      <div className="container flex min-h-[32rem] flex-col gap-8 py-12 lg:flex-row lg:items-center lg:gap-12">
        {/* Left: content (~60%) */}
        <div className="flex flex-1 flex-col justify-center space-y-6 text-white lg:flex-[6]">
          {/* Hard-coded branding */}
          <div className="flex items-center gap-2">
            <HeartIcon className="size-6 shrink-0 text-white" />
            <span className="font-body text-base font-normal text-white">
              American Heart Association
            </span>
          </div>

          <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight lg:text-5xl xl:text-6xl">
            <ContentSdkText field={fields.Title} />
          </h1>

          <div className="font-body text-base font-normal leading-relaxed text-white lg:text-lg [&_.ck-content]:text-white [&_.ck-content_a]:text-white [&_.ck-content_a]:underline [&_.ck-content_p]:mb-3">
            <ContentSdkRichText field={fields.Copy} />
          </div>

          <div className="flex flex-wrap gap-4">
            {(fields.Button1?.value?.href || isPageEditing) && (
              <Link
                field={fields.Button1}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C10E0E] bg-white px-6 py-2.5 font-light text-[#C10E0E] transition-colors hover:bg-white/90"
              />
            )}
            {showButton2 && (fields.Button2?.value?.href || isPageEditing) && (
              <Link
                field={fields.Button2}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C10E0E] bg-white px-6 py-2.5 font-light text-[#C10E0E] transition-colors hover:bg-white/90"
              />
            )}
          </div>
        </div>

        {/* Right: image with white frame and rounded corners (~40%) */}
        <div className="relative flex flex-1 justify-end lg:flex-[4]">
          <div className="bg-white p-2 lg:p-4">
            <ContentSdkImage
              field={fields.Image}
              className="max-h-[28rem] w-full rounded-r-lg object-cover object-center lg:max-h-[32rem] lg:rounded-r-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
