import Script from "next/script";

export function StructuredData() {
	const structuredData = {
		"@context": "https://schema.org",
		"@type": ["MedicalBusiness", "Dietitian", "LocalBusiness"],
		"@id": "https://manon-dietetique.fr",
		name: "Manon Chaillou - Diététicienne Nutritionniste",
		alternateName: "Manon Chaillou Diététicienne",
		description:
			"Diététicienne nutritionniste diplômée à Nantes, spécialisée en rééquilibrage alimentaire, nutrition cardiologie, accompagnement obésité et nutrition clinique. Consultations à domicile et téléconsultations.",
		url: process.env.NEXT_PUBLIC_URL,
		telephone: process.env.NEXT_PUBLIC_PHONE,
		email: process.env.NEXT_PUBLIC_EMAIL,
		address: {
			"@type": "PostalAddress",
			streetAddress: "15 Rue de la Paix",
			addressLocality: "Nantes",
			addressRegion: "Loire-Atlantique",
			postalCode: "44000",
			addressCountry: "FR",
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: 47.2184,
			longitude: -1.5536,
		},
		openingHoursSpecification: [
			{
				"@type": "OpeningHoursSpecification",
				dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
				opens: "09:00",
				closes: "18:00",
			},
			{
				"@type": "OpeningHoursSpecification",
				dayOfWeek: "Saturday",
				opens: "09:00",
				closes: "13:00",
			},
		],
		priceRange: "€€",
		paymentAccepted: ["Cash", "Credit Card", "Bank Transfer"],
		currenciesAccepted: "EUR",
		medicalSpecialty: "Nutrition",
		acceptsHealthInsurance: true,
		foundingDate: "2020",
		identifier: {
			"@type": "PropertyValue",
			name: "ADELI",
			value: "449901234",
		},
		founder: {
			"@type": "Person",
			name: "Manon Chaillou",
			jobTitle: "Diététicienne Nutritionniste",
			hasCredential: [
				{
					"@type": "EducationalCredential",
					name: "Diplôme d'État Diététicienne Nutritionniste",
					educationalLevel: "Bachelor",
					credentialCategory: "degree",
				},
				{
					"@type": "EducationalCredential",
					name: "BUT Génie Biologique",
					educationalLevel: "Bachelor",
					credentialCategory: "degree",
				},
			],
			hasOccupation: {
				"@type": "Occupation",
				name: "Diététicienne Nutritionniste",
				occupationLocation: {
					"@type": "City",
					name: "Nantes",
				},
			},
			alumniOf: {
				"@type": "EducationalOrganization",
				name: "IUT Nancy",
			},
			worksFor: {
				"@type": "Hospital",
				name: "CHU de Nantes",
			},
			memberOf: {
				"@type": "ProfessionalService",
				name: "Association des Diététiciens de Loire-Atlantique",
			},
			knowsAbout: [
				"Rééquilibrage alimentaire",
				"Nutrition cardiologie",
				"Accompagnement obésité",
				"Nutrition clinique",
				"Éducation thérapeutique",
				"Gériatrie et pédiatrie",
			],
		},
		areaServed: [
			{
				"@type": "City",
				name: "Nantes",
				containedIn: {
					"@type": "AdministrativeArea",
					name: "Loire-Atlantique",
				},
			},
			{
				"@type": "City",
				name: "Rezé",
			},
			{
				"@type": "City",
				name: "Saint-Herblain",
			},
			{
				"@type": "City",
				name: "Orvault",
			},
			{
				"@type": "City",
				name: "Vertou",
			},
			{
				"@type": "City",
				name: "Bouguenais",
			},
			{
				"@type": "City",
				name: "Carquefou",
			},
		],
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: "Services de Diététique et Nutrition",
			itemListElement: [
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "MedicalProcedure",
						name: "Consultation Diététique Individuelle",
						description:
							"Consultation personnalisée pour rééquilibrage alimentaire et nutrition thérapeutique",
						procedureType: "Consultation individuelle",
						category: "Diététique et nutrition",
					},
				},
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "MedicalProcedure",
						name: "Nutrition Cardiologie",
						description:
							"Accompagnement nutritionnel spécialisé pour les pathologies cardiovasculaires",
						procedureType: "Consultation spécialisée",
						category: "Nutrition thérapeutique",
					},
				},
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "MedicalProcedure",
						name: "Accompagnement Obésité",
						description:
							"Prise en charge nutritionnelle pour l'accompagnement de l'obésité",
						procedureType: "Suivi thérapeutique",
						category: "Nutrition clinique",
					},
				},
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "EducationalEvent",
						name: "Ateliers Collectifs de Nutrition",
						description:
							"Ateliers collectifs pour apprendre et échanger autour de l'alimentation",
						eventType: "Atelier collectif",
						category: "Éducation nutritionnelle",
					},
				},
			],
		},
		image: {
			"@type": "ImageObject",
			url: "https://manon-dietetique.fr/manon.png",
			height: 630,
			width: 1200,
		},
		logo: {
			"@type": "ImageObject",
			url: "https://manon-dietetique.fr/manon.png",
			height: 630,
			width: 1200,
		},
		sameAs: [
			// Ajouter les réseaux sociaux si disponibles
			// "https://www.facebook.com/...",
			// "https://www.instagram.com/...",
			// "https://www.linkedin.com/in/...",
		],
	};

	return (
		<Script
			id="structured-data"
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	);
}
