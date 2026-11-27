import { useHead } from '@unhead/vue'
import { siteOrigin as SITE_ORIGIN } from '@/router/segments'
import { company } from '@/data/company'

// LocalBusiness structured data, emitted once globally, using the real
// registered address/contact details from dizainsuninterjers.lv.
export function useOrganizationJsonLd() {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Design and Interior Consultation Bureau',
          legalName: company.legalName,
          url: SITE_ORIGIN,
          logo: `${SITE_ORIGIN}/og-image.png`,
          email: company.email,
          telephone: company.phone,
          address: {
            '@type': 'PostalAddress',
            streetAddress: company.address.line,
            postalCode: company.address.postalCode,
            addressCountry: company.address.country,
          },
          identifier: {
            '@type': 'PropertyValue',
            name: 'Registration number',
            value: company.regNr,
          },
        }),
      },
    ],
  })
}
