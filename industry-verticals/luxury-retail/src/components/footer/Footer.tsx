'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Lock } from 'lucide-react';
import {
  ComponentParams,
  ComponentRendering,
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
} from '@sitecore-content-sdk/nextjs';
import type { ImageField, LinkField } from '@sitecore-content-sdk/nextjs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shadcn/components/ui/accordion';

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

interface FooterFields {
  Logo?: ImageField;
  SocialFacebookIcon?: ImageField;
  SocialFacebookLink?: LinkField;
  SocialInstagramIcon?: ImageField;
  SocialInstagramLink?: LinkField;
  SocialXIcon?: ImageField;
  SocialXLink?: LinkField;
  SocialTikTokIcon?: ImageField;
  SocialTikTokLink?: LinkField;
  SocialYouTubeIcon?: ImageField;
  SocialYouTubeLink?: LinkField;
  SocialLinkedInIcon?: ImageField;
  SocialLinkedInLink?: LinkField;
  SocialPinterestIcon?: ImageField;
  SocialPinterestLink?: LinkField;
  TrustBadge1?: ImageField;
  TrustBadge1Link?: LinkField;
  TrustBadge2?: ImageField;
  TrustBadge2Link?: LinkField;
  TrustBadge3?: ImageField;
  TrustBadge3Link?: LinkField;
}

type FooterProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields?: FooterFields;
};

const AHA_RED = '#c10e21';

const SOCIAL_ITEMS: Array<{
  key: string;
  label: string;
  iconKey: keyof FooterFields;
  linkKey: keyof FooterFields;
}> = [
  { key: 'facebook', label: 'Facebook', iconKey: 'SocialFacebookIcon', linkKey: 'SocialFacebookLink' },
  { key: 'instagram', label: 'Instagram', iconKey: 'SocialInstagramIcon', linkKey: 'SocialInstagramLink' },
  { key: 'x', label: 'X', iconKey: 'SocialXIcon', linkKey: 'SocialXLink' },
  { key: 'tiktok', label: 'TikTok', iconKey: 'SocialTikTokIcon', linkKey: 'SocialTikTokLink' },
  { key: 'youtube', label: 'YouTube', iconKey: 'SocialYouTubeIcon', linkKey: 'SocialYouTubeLink' },
  { key: 'linkedin', label: 'LinkedIn', iconKey: 'SocialLinkedInIcon', linkKey: 'SocialLinkedInLink' },
  { key: 'pinterest', label: 'Pinterest', iconKey: 'SocialPinterestIcon', linkKey: 'SocialPinterestLink' },
];

const TRUST_BADGES: Array<{
  key: string;
  label: string;
  imageKey: keyof FooterFields;
  linkKey: keyof FooterFields;
}> = [
  { key: 'bbb', label: 'BBB Accredited Business', imageKey: 'TrustBadge1', linkKey: 'TrustBadge1Link' },
  { key: 'charity', label: 'Charity Navigator', imageKey: 'TrustBadge2', linkKey: 'TrustBadge2Link' },
  { key: 'sectigo', label: 'Secured by Sectigo', imageKey: 'TrustBadge3', linkKey: 'TrustBadge3Link' },
];

const FOOTER_LINKS = {
  aboutUs: [
    { label: 'About the AHA/ASA', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Newsroom', href: '#' },
  ],
  getInvolved: [
    { label: 'Donate Now', href: '#' },
    { label: 'Volunteer', href: '#' },
    { label: 'Advocate', href: '#' },
  ],
  ourSites: [
    { label: 'American Heart Association', href: '#' },
    { label: 'American Stroke Association', href: '#' },
  ],
};

const LEGAL_LINKS = [
  'Careers',
  'Privacy Policy',
  'Medical Advice Disclaimer',
  'Accessibility Statement',
  'Copyright Policy',
  'Ethics Policy',
  'Conflict of Interest Policy',
  'Linking Policy',
  'Whistleblower Policy',
  'Content Editorial Guidelines',
  'Suppliers & Providers',
  'State Fundraising Notices',
];

export const Default = (props: FooterProps) => {
  const id = props.params?.RenderingIdentifier;
  const fields = props.fields;
  const hasLogo = fields?.Logo?.value?.src;

  const renderLogoBlock = (iconSize = 'size-10', textSize = 'text-lg') =>
    hasLogo && fields?.Logo ? (
      <ContentSdkImage
        field={fields.Logo}
        width={160}
        height={40}
        className={`${iconSize} shrink-0 object-contain object-left`}
      />
    ) : (
      <>
        <HeartIcon className={`${iconSize} shrink-0`} style={{ color: AHA_RED }} />
        <span className={`font-body ${textSize} font-semibold`} style={{ color: AHA_RED }}>
          American Heart Association.
        </span>
      </>
    );

  return (
    <section
      className="component footer relative min-w-full"
      id={id}
      style={{
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
      }}
    >
      {/* Top CTA banner: red full viewport width; inner content centered, max 1170px */}
      <div
        className="flex w-full flex-col items-center justify-center py-8 text-white"
        style={{ backgroundColor: AHA_RED }}
      >
        <div className="mx-auto flex w-full max-w-[1170px] flex-col items-center justify-center gap-4 px-4">
          <p className="text-center text-lg font-medium">
            Donate today to help end heart disease and stroke for everyone.
          </p>
          <Link
            href="#"
            className="rounded-full border-2 border-transparent bg-white px-8 py-2.5 font-medium transition-colors hover:border-white hover:bg-[#c10e21] hover:text-white"
            style={{ color: AHA_RED }}
          >
            Donate Now
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="w-full bg-white px-4 py-4">
        <p className="text-foreground-light mx-auto max-w-[1170px] text-center text-sm">
          *All health/medical information on this website has been reviewed and approved by the
          American Heart Association, based on scientific research and American Heart Association
          guidelines.{' '}
          <a href="#" className="text-blue-600 underline">
            Find more information on our content editorial process.
          </a>
        </p>
      </div>

      {/* Main footer content */}
      <div className="w-full bg-white px-4 py-10">
        <div className="mx-auto w-full max-w-[1170px]">
          {/* Desktop: grid with left column + 3 nav columns */}
          <div className="hidden gap-12 lg:grid lg:grid-cols-[1fr_2fr]">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                {renderLogoBlock('size-10', 'text-lg')}
              </div>
              <p className="text-foreground text-sm">7272 Greenville Ave. Dallas, TX 75231</p>
              <p className="text-foreground text-sm">1-800-242-8721</p>
              <Link
                href="#"
                className="inline-flex w-fit rounded-full border-2 border-transparent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:border-[#c10e21] hover:bg-white hover:text-[#c10e21]"
                style={{ backgroundColor: AHA_RED }}
              >
                Contact Us
              </Link>
              <div className="text-foreground text-sm">
                <p>Monday - Friday: 7 a.m. - 7 p.m. CT</p>
                <p>Saturday: 9 a.m. - 5 p.m. CT</p>
                <p>Closed on Sundays</p>
              </div>
              <p className="text-foreground text-sm">Tax Identification Number: 13-5613797</p>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <h5 className="text-foreground mb-4 font-bold">About Us</h5>
                <ul className="space-y-2">
                  {FOOTER_LINKS.aboutUs.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-foreground flex items-center gap-1 text-sm hover:underline"
                      >
                        <ChevronRight className="size-4 shrink-0" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-foreground mb-4 font-bold">Get Involved</h5>
                <ul className="space-y-2">
                  {FOOTER_LINKS.getInvolved.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-foreground flex items-center gap-1 text-sm hover:underline"
                      >
                        <ChevronRight className="size-4 shrink-0" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-foreground mb-4 font-bold">Our Sites</h5>
                <ul className="space-y-2">
                  {FOOTER_LINKS.ourSites.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-foreground flex items-center gap-1 text-sm hover:underline"
                      >
                        <ChevronRight className="size-4 shrink-0" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Mobile: accordion sections (Contact Us, About Us, Get Involved, Our Sites) */}
          <div className="lg:hidden">
            <div className="mb-6 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                {renderLogoBlock('size-12', 'text-xl')}
              </div>
            </div>
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="contact">
                <AccordionTrigger>Contact Us</AccordionTrigger>
                <AccordionContent>
                  <div className="text-foreground space-y-2 text-sm">
                    <p>7272 Greenville Ave. Dallas, TX 75231</p>
                    <p>1-800-242-8721</p>
                    <p>Monday - Friday: 7 a.m. - 7 p.m. CT</p>
                    <p>Saturday: 9 a.m. - 5 p.m. CT</p>
                    <p>Closed on Sundays</p>
                    <p>Tax ID: 13-5613797</p>
                    <Link
                      href="#"
                      className="text-background mt-2 inline-block rounded-full px-6 py-2.5 text-sm font-medium"
                      style={{ backgroundColor: AHA_RED }}
                    >
                      Contact Us
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="about">
                <AccordionTrigger>About Us</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {FOOTER_LINKS.aboutUs.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className="text-foreground flex items-center gap-1 text-sm hover:underline"
                        >
                          <ChevronRight className="size-4 shrink-0" />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="involved">
                <AccordionTrigger>Get Involved</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {FOOTER_LINKS.getInvolved.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className="text-foreground flex items-center gap-1 text-sm hover:underline"
                        >
                          <ChevronRight className="size-4 shrink-0" />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="sites">
                <AccordionTrigger>Our Sites</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {FOOTER_LINKS.ourSites.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className="text-foreground flex items-center gap-1 text-sm hover:underline"
                        >
                          <ChevronRight className="size-4 shrink-0" />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="mt-6 flex justify-center lg:hidden">
            <Link
              href="https://heart.org"
              className="text-foreground flex items-center gap-1 text-sm hover:underline"
            >
              <Lock className="size-4 shrink-0" aria-hidden />
              heart.org
            </Link>
          </div>
        </div>
      </div>

      {/* Social + trust bar */}
      <div className="flex w-full flex-wrap items-center justify-between gap-6 bg-background-muted px-4 py-6">
        <div className="mx-auto flex w-full max-w-[1170px] flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          {SOCIAL_ITEMS.map(({ key, label, iconKey, linkKey }) => {
            const iconField = fields?.[iconKey] as ImageField | undefined;
            const linkField = fields?.[linkKey] as LinkField | undefined;
            const href = linkField?.value?.href ?? '#';
            const hasIcon = iconField?.value?.src;
            const content = hasIcon && iconField ? (
              <ContentSdkImage
                field={iconField}
                width={40}
                height={40}
                className="size-10 rounded-full object-cover"
              />
            ) : (
              <span className="text-xs font-medium">{label.charAt(0)}</span>
            );
            const className =
              'bg-foreground-light flex size-10 items-center justify-center rounded-full text-white transition-opacity hover:opacity-80';
            if (linkField?.value?.href) {
              return (
                <ContentSdkLink key={key} field={linkField} className={className} aria-label={label}>
                  {content}
                </ContentSdkLink>
              );
            }
            return (
              <a key={key} href={href} className={className} aria-label={label}>
                {content}
              </a>
            );
          })}
        </div>
        <div className="flex items-center gap-4">
          {TRUST_BADGES.map(({ key, label, imageKey, linkKey }) => {
            const imageField = fields?.[imageKey] as ImageField | undefined;
            const linkField = fields?.[linkKey] as LinkField | undefined;
            const hasImage = imageField?.value?.src;
            const content = hasImage && imageField ? (
              <ContentSdkImage
                field={imageField}
                width={80}
                height={32}
                className="h-8 w-auto object-contain"
              />
            ) : (
              <span className="text-foreground-light text-xs">{label}</span>
            );
            if (linkField?.value?.href) {
              return (
                <ContentSdkLink key={key} field={linkField} className="shrink-0">
                  {content}
                </ContentSdkLink>
              );
            }
            return <span key={key}>{content}</span>;
          })}
        </div>
        </div>
      </div>

      {/* Bottom legal */}
      <div className="flex w-full flex-col items-center gap-2 bg-background-muted px-4 py-6">
        <div className="mx-auto flex w-full max-w-[1170px] flex-col items-center gap-2">
        <div className="text-foreground flex flex-wrap justify-center gap-x-1 gap-y-1 text-sm">
          {LEGAL_LINKS.map((label, i) => (
            <span key={label} className="flex items-center gap-1">
              {i > 0 && <span>|</span>}
              <Link href="#" className="hover:underline">
                {label}
              </Link>
            </span>
          ))}
        </div>
        <Link href="#" className="text-foreground text-sm hover:underline">
          Your Privacy Rights
        </Link>
        <p className="text-foreground-light max-w-3xl text-center text-xs">
          ©2026 American Heart Association, Inc. All rights reserved. Unauthorized use prohibited.
          The American Heart Association is a qualified 501(c)(3) tax-exempt organization. Red
          Dress™ DHHS, Go Red™ AHA; National Wear Red Day® is a registered trademark.
        </p>
        </div>
      </div>
    </section>
  );
};
