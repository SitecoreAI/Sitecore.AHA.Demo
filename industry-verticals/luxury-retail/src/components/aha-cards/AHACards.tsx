'use client';

import {
  Field,
  ImageField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

interface CardFields {
  Icon: ImageField;
  Title: Field<string>;
  Copy: Field<string>;
}

interface Fields {
  Icon1: ImageField;
  Icon2: ImageField;
  Icon3: ImageField;
  Icon4: ImageField;
  Title1: Field<string>;
  Title2: Field<string>;
  Title3: Field<string>;
  Title4: Field<string>;
  Copy1: Field<string>;
  Copy2: Field<string>;
  Copy3: Field<string>;
  Copy4: Field<string>;
}

interface AHACardsProps extends ComponentProps {
  fields: Fields;
}

const CARD_KEYS = [1, 2, 3, 4] as const;

function Card({
  icon,
  title,
  copy,
  isPageEditing,
}: {
  icon: ImageField;
  title: Field<string>;
  copy: Field<string>;
  isPageEditing: boolean;
}) {
  const hasIcon = icon?.value?.src || isPageEditing;
  return (
    <article className="flex flex-col rounded-lg bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] lg:p-8">
      {hasIcon && (
        <div className="mb-4 flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#c10e21] lg:size-16">
          <ContentSdkImage
            field={icon}
            width={32}
            height={32}
            className="size-7 object-contain object-center lg:size-8"
          />
        </div>
      )}
      {(title?.value || isPageEditing) && (
        <h3 className="font-body text-foreground mb-2 text-lg font-bold lg:text-xl">
          <ContentSdkText field={title} />
        </h3>
      )}
      {(copy?.value || isPageEditing) && (
        <p className="font-body text-foreground-light text-sm leading-relaxed lg:text-base">
          <ContentSdkText field={copy} />
        </p>
      )}
    </article>
  );
}

export const Default = ({ params, fields }: AHACardsProps) => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const { styles, RenderingIdentifier: id } = params;

  if (!fields) {
    return isPageEditing ? (
      <section
        className={`component aha-cards bg-background-muted py-12 lg:py-16 ${styles || ''}`}
        id={id}
      >
        <div className="container">[AHA CARDS]</div>
      </section>
    ) : (
      <></>
    );
  }

  const cards: CardFields[] = CARD_KEYS.map((i) => ({
    Icon: fields[`Icon${i}` as keyof Fields] as ImageField,
    Title: fields[`Title${i}` as keyof Fields] as Field<string>,
    Copy: fields[`Copy${i}` as keyof Fields] as Field<string>,
  }));

  return (
    <section
      className={`component aha-cards bg-background-muted py-12 lg:py-16 ${styles || ''}`}
      id={id}
    >
      <div className="container grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {cards.map((card, index) => (
          <Card
            key={index}
            icon={card.Icon}
            title={card.Title}
            copy={card.Copy}
            isPageEditing={isPageEditing}
          />
        ))}
      </div>
    </section>
  );
};
