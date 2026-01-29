export type AppLocale = 'en' | 'es-ES';

export type LocaleOption = {
  code: AppLocale;
  label: string;
  currency: string;
  currencySymbol: string;
};
