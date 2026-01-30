import React, { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';

const AHA_RED = '#c10e21';

const STATS = [
  {
    value: '19 Million+',
    heading: 'High blood pressure patients helped',
    description:
      'Our high blood pressure quality care initiative ensures lifesaving care for people at risk for heart disease.',
  },
  {
    value: '$6 Billion+',
    heading: 'Invested in pioneering research leading to lifesaving breakthroughs',
    description:
      'The American Heart Association is the largest non-profit, non-governmental funder of cardiovascular and cerebrovascular research.',
  },
  {
    value: '22 Million',
    heading: 'People trained in CPR every year',
    description:
      "9 out of 10 people who have a cardiac arrest outside of the hospital die. If performed immediately, CPR can double or triple a person's chances of survival.",
  },
];

export type AHAChangingTheFutureProps = ComponentProps;

export const Default = (props: AHAChangingTheFutureProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const styles = props.params?.styles ?? '';

  return (
    <section
      className={`component aha-changing-the-future w-screen py-12 lg:py-20 ${styles}`}
      id={id ? id : undefined}
      style={{
        backgroundColor: AHA_RED,
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
      }}
    >
      <div className="mx-auto max-w-[1170px] px-4">
        {/* Title */}
        <h2 className="mb-6 text-3xl font-bold text-white lg:text-4xl">
          How we are changing the future of health together
        </h2>

        {/* Intro paragraph */}
        <p className="mb-12 max-w-4xl text-lg leading-relaxed text-white lg:mb-16">
          Since the American Heart Association&apos;s founding in 1924, deaths from cardiovascular
          diseases have been cut in half. And yet, there are still so many lives to be saved. By
          driving breakthroughs in science, policy and care, together we can continue to advance
          health and transform lives every day.
        </p>

        {/* Stats columns */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3 lg:mb-16">
          {STATS.map((stat, index) => (
            <div key={index} className="flex flex-col">
              <span className="mb-2 text-3xl font-bold text-white lg:text-4xl">{stat.value}</span>
              <h3 className="mb-4 text-sm font-bold text-white lg:text-base">{stat.heading}</h3>
              <p className="text-sm text-white opacity-90 lg:text-base">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full border-2 border-white bg-white px-8 py-3 font-medium text-[#c10e21] transition-colors hover:border-white hover:bg-[#c10e21] hover:text-white"
          >
            Learn more about our impact
          </a>
        </div>
      </div>
    </section>
  );
};
