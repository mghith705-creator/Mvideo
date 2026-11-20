import { describe, it, expect } from 'vitest';
import { translations } from '../data/translations';
import type { Language } from '../data/translations';

describe('Translations', () => {
  it('should have both Arabic and English translations', () => {
    const langs: Language[] = ['ar', 'en'];
    for (const lang of langs) {
      const t = translations[lang];
      expect(t.appName).toBeDefined();
      expect(t.home).toBeDefined();
      expect(t.upload).toBeDefined();
      expect(t.playlists).toBeDefined();
      expect(t.account).toBeDefined();
      expect(t.welcome).toBeDefined();
    }
  });

  it('should have different values for Arabic and English', () => {
    expect(translations.ar.welcome).not.toBe(translations.en.welcome);
    expect(translations.ar.home).not.toBe(translations.en.home);
  });

  it('should contain Arabic characters in Arabic translations', () => {
    const arabicText = translations.ar.welcome;
    expect(/[\u0600-\u06FF]/.test(arabicText)).toBe(true);
  });

  it('should contain English text in English translations', () => {
    const englishText = translations.en.welcome;
    expect(/[a-zA-Z]/.test(englishText)).toBe(true);
  });
});

describe('App Name', () => {
  it('should be Mvideo in both languages', () => {
    expect(translations.ar.appName).toBe('Mvideo');
    expect(translations.en.appName).toBe('Mvideo');
  });
});
